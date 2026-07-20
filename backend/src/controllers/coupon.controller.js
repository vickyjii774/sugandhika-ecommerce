const prisma = require("../config/db");

const couponController = {
  // 1. VALIDATE COUPON
  async validate(req, res, next) {
    const { code, amount } = req.body;
    try {
      const coupon = await prisma.coupon.findUnique({
        where: { code: code.toUpperCase() },
      });

      if (!coupon || !coupon.isActive) {
        return res.status(404).json({ success: false, message: "Coupon code not found or inactive" });
      }

      if (coupon.expiryDate < new Date()) {
        return res.status(400).json({ success: false, message: "Coupon has expired" });
      }

      if (coupon.usedCount >= coupon.usageLimit) {
        return res.status(400).json({ success: false, message: "Coupon usage limit reached" });
      }

      if (parseFloat(amount) < coupon.minPurchase) {
        return res.status(400).json({
          success: false,
          message: `Minimum purchase amount of Rs. ${coupon.minPurchase} is required for this coupon`,
        });
      }

      res.status(200).json({
        success: true,
        coupon: {
          code: coupon.code,
          type: coupon.type,
          value: coupon.value,
          maxDiscount: coupon.maxDiscount,
        },
        message: "Coupon applied successfully!",
      });
    } catch (error) {
      next(error);
    }
  },

  // 2. CREATE COUPON (Admin)
  async create(req, res, next) {
    const { code, type, value, minPurchase, maxDiscount, expiryDate, usageLimit } = req.body;
    try {
      const existing = await prisma.coupon.findUnique({ where: { code: code.toUpperCase() } });
      if (existing) {
        return res.status(400).json({ success: false, message: "Coupon code already exists" });
      }

      const coupon = await prisma.coupon.create({
        data: {
          code: code.toUpperCase(),
          type,
          value: parseFloat(value),
          minPurchase: minPurchase ? parseFloat(minPurchase) : 0,
          maxDiscount: maxDiscount ? parseFloat(maxDiscount) : null,
          expiryDate: new Date(expiryDate),
          usageLimit: parseInt(usageLimit) || 1,
        },
      });

      res.status(201).json({ success: true, coupon, message: "Coupon created successfully" });
    } catch (error) {
      next(error);
    }
  },

  // 3. GET ALL COUPONS (Admin)
  async getAll(req, res, next) {
    try {
      const coupons = await prisma.coupon.findMany({
        orderBy: { createdAt: "desc" },
      });
      res.status(200).json({ success: true, coupons });
    } catch (error) {
      next(error);
    }
  },

  // 4. DELETE COUPON (Admin)
  async delete(req, res, next) {
    const { id } = req.params;
    try {
      await prisma.coupon.delete({ where: { id } });
      res.status(200).json({ success: true, message: "Coupon deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = couponController;
