const express = require("express");
const orderController = require("../controllers/order.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

const router = express.Router();

// Checkout route (Public for guest checkout, optional auth header)
router.post("/checkout", (req, res, next) => {
  if (req.headers.authorization) {
    protect(req, res, next);
  } else {
    next();
  }
}, orderController.checkout);

// Verify payments
router.post("/verify-payment", orderController.verifyPayment);

// Track order (Public query)
router.get("/track", orderController.trackOrder);

// Customer Dashboard orders
router.get("/user", protect, orderController.getUserOrders);

// Admin order status adjustments
router.put("/:id/status", protect, restrictTo("ADMIN", "SUPERADMIN"), orderController.updateStatus);

module.exports = router;
