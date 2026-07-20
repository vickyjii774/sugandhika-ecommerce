const prisma = require("../config/db");
const { PaymentGatewayFactory } = require("../services/payment.service");
const { addJob } = require("../jobs/queue");

const orderController = {
  // 1. PLACE ORDER (COD, STRIPE, KHALTI, ESEWA)
  async checkout(req, res, next) {
    const {
      cartItems, // Array of { productId, quantity }
      couponCode,
      shippingAddressId,
      billingAddressId,
      paymentMethod,
      guestInfo, // { email, name, phone, street, city, state, postalCode, country }
    } = req.body;

    try {
      if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ success: false, message: "Cart is empty" });
      }

      // Start transaction
      const result = await prisma.$transaction(async (tx) => {
        let totalAmount = 0;
        const itemsToCreate = [];

        // Validate items and inventory
        for (const item of cartItems) {
          const product = await tx.product.findUnique({ where: { id: item.productId } });
          if (!product) {
            throw new Error(`Product not found: ${item.productId}`);
          }
          if (product.stock < item.quantity) {
            throw new Error(`Insufficient stock for product: ${product.title}. Available: ${product.stock}`);
          }

          // Decrement inventory stock
          await tx.product.update({
            where: { id: product.id },
            data: { stock: product.stock - item.quantity },
          });

          const price = product.salePrice || product.price;
          totalAmount += price * item.quantity;

          itemsToCreate.push({
            productId: product.id,
            price: price,
            quantity: item.quantity,
          });
        }

        // Apply coupon code if exists
        let discountAmount = 0;
        let coupon = null;
        if (couponCode) {
          coupon = await tx.coupon.findUnique({ where: { code: couponCode } });
          if (!coupon || !coupon.isActive || coupon.expiryDate < new Date() || coupon.usedCount >= coupon.usageLimit) {
            throw new Error("Coupon is invalid or expired");
          }
          if (totalAmount < coupon.minPurchase) {
            throw new Error(`Minimum purchase of Rs. ${coupon.minPurchase} is required for this coupon`);
          }

          if (coupon.type === "PERCENT") {
            discountAmount = (totalAmount * coupon.value) / 100;
            if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
              discountAmount = coupon.maxDiscount;
            }
          } else if (coupon.type === "FLAT") {
            discountAmount = coupon.value;
          } else if (coupon.type === "FREE_SHIPPING") {
            // Handled below in shipping costs
          }
        }

        // Calculate Shipping and Tax
        let shippingAmount = totalAmount > 1500 ? 0 : 100; // Free shipping over 1500
        if (coupon && coupon.type === "FREE_SHIPPING") {
          shippingAmount = 0;
        }

        const taxAmount = parseFloat(((totalAmount - discountAmount) * 0.13).toFixed(2)); // 13% VAT
        const payableAmount = parseFloat((totalAmount - discountAmount + shippingAmount + taxAmount).toFixed(2));

        // Get shipping/billing addresses
        let shipAddrId = shippingAddressId;
        let billAddrId = billingAddressId || shippingAddressId;

        // If guest checkout, create address
        if (!req.user && guestInfo) {
          const guestAddress = await tx.address.create({
            data: {
              street: guestInfo.street,
              city: guestInfo.city,
              state: guestInfo.state,
              postalCode: guestInfo.postalCode,
              country: guestInfo.country,
            },
          });
          shipAddrId = guestAddress.id;
          billAddrId = guestAddress.id;
        }

        if (!shipAddrId) {
          throw new Error("Shipping address is required");
        }

        // Create Order
        const orderNumber = `SUG-${Date.now()}`;
        const order = await tx.order.create({
          data: {
            orderNumber,
            userId: req.user ? req.user.id : null,
            guestEmail: req.user ? null : guestInfo?.email,
            guestName: req.user ? null : guestInfo?.name,
            guestPhone: req.user ? null : guestInfo?.phone,
            totalAmount,
            discountAmount,
            shippingAmount,
            taxAmount,
            payableAmount,
            paymentMethod,
            shippingAddressId: shipAddrId,
            billingAddressId: billAddrId,
            status: "PENDING",
            paymentStatus: "PENDING",
            items: {
              create: itemsToCreate,
            },
          },
          include: {
            items: {
              include: { product: true },
            },
            shippingAddress: true,
          },
        });

        // Track Coupon Usage
        if (coupon) {
          await tx.couponUsage.create({
            data: {
              couponId: coupon.id,
              userId: req.user ? req.user.id : null,
              orderId: order.id,
            },
          });

          await tx.coupon.update({
            where: { id: coupon.id },
            data: { usedCount: coupon.usedCount + 1 },
          });
        }

        return order;
      });

      // Initiate payment via Factory
      const gateway = PaymentGatewayFactory.getGateway(paymentMethod);
      const initPayment = await gateway.initiate(result);

      // Save payment transaction if COD (COD is initialized instantly)
      if (paymentMethod === "COD") {
        await prisma.payment.create({
          data: {
            orderId: result.id,
            transactionId: initPayment.transactionId,
            paymentMethod: "COD",
            amount: result.payableAmount,
            status: "PENDING_DELIVERY",
          },
        });

        // Trigger order success email immediately for COD
        const email = req.user ? req.user.email : guestInfo.email;
        const name = req.user ? `${req.user.firstName} ${req.user.lastName}` : guestInfo.name;
        await addJob("emailQueue", {
          type: "ORDER_INVOICE",
          email,
          name,
          data: { order: result },
        });
      }

      res.status(201).json({
        success: true,
        orderId: result.id,
        orderNumber: result.orderNumber,
        paymentDetails: initPayment,
        message: "Order placed successfully. Complete payment if required.",
      });
    } catch (error) {
      console.error("[Checkout Controller] Checkout error:", error);
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // 2. VERIFY PAYMENT (Called after redirects/callbacks)
  async verifyPayment(req, res, next) {
    const { paymentMethod, payload } = req.body;
    try {
      const gateway = PaymentGatewayFactory.getGateway(paymentMethod);
      const verification = await gateway.verify(payload);

      if (verification.success) {
        const transactionId = verification.transactionId;

        // Find associated order
        let order = await prisma.order.findFirst({
          where: {
            OR: [
              { id: payload.orderId },
              { orderNumber: payload.orderNumber },
              { id: verification.details?.purchase_order_id }, // for Khalti
              { items: { some: { order: { id: payload.orderId } } } }
            ]
          },
          include: {
            items: { include: { product: true } },
            shippingAddress: true,
            user: true,
          },
        });

        if (!order) {
          // Alternative lookup for esewa/stripe
          order = await prisma.order.findFirst({
            where: {
              OR: [
                { id: transactionId.split("-")[0] }, // Esewa transaction ID holds orderId
                { id: verification.details?.metadata?.orderId }
              ]
            },
            include: {
              items: { include: { product: true } },
              shippingAddress: true,
              user: true,
            },
          });
        }

        if (!order) {
          return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (order.paymentStatus === "PAID") {
          return res.status(200).json({ success: true, message: "Payment already verified", order });
        }

        // Update Order in DB
        const updatedOrder = await prisma.order.update({
          where: { id: order.id },
          data: {
            paymentStatus: "PAID",
            status: "PROCESSING",
          },
        });

        // Record payment txn
        await prisma.payment.create({
          data: {
            orderId: order.id,
            transactionId: transactionId,
            paymentMethod: paymentMethod,
            amount: order.payableAmount,
            status: "SUCCESSFUL",
            details: verification.details,
          },
        });

        // Trigger Order Success Invoice Email
        const email = order.user ? order.user.email : order.guestEmail;
        const name = order.user ? `${order.user.firstName} ${order.user.lastName}` : order.guestName;
        await addJob("emailQueue", {
          type: "ORDER_INVOICE",
          email,
          name,
          data: { order },
        });

        return res.status(200).json({
          success: true,
          message: "Payment verified successfully",
          order: updatedOrder,
        });
      }

      res.status(400).json({ success: false, message: "Payment verification failed", details: verification });
    } catch (error) {
      next(error);
    }
  },

  // 3. TRACK ORDER
  async trackOrder(req, res, next) {
    const { number } = req.query; // order id or orderNumber
    try {
      const order = await prisma.order.findFirst({
        where: {
          OR: [{ id: number }, { orderNumber: number }],
        },
        include: {
          items: { include: { product: true } },
          shippingAddress: true,
        },
      });

      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }

      res.status(200).json({ success: true, order });
    } catch (error) {
      next(error);
    }
  },

  // 4. GET USER ORDERS (Dashboard)
  async getUserOrders(req, res, next) {
    try {
      const orders = await prisma.order.findMany({
        where: { userId: req.user.id },
        include: {
          items: { include: { product: true } },
        },
        orderBy: { createdAt: "desc" },
      });
      res.status(200).json({ success: true, orders });
    } catch (error) {
      next(error);
    }
  },

  // 5. UPDATE ORDER STATUS (Admin)
  async updateStatus(req, res, next) {
    const { id } = req.params;
    const { status, trackingCarrier, trackingNumber } = req.body;
    try {
      const updatedOrder = await prisma.order.update({
        where: { id },
        data: {
          status,
          trackingCarrier,
          trackingNumber,
        },
      });
      res.status(200).json({ success: true, order: updatedOrder, message: "Order status updated successfully" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = orderController;
