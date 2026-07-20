const express = require("express");
const couponController = require("../controllers/coupon.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

const router = express.Router();

// Publicly check coupon code validity
router.post("/validate", couponController.validate);

// Admin-only coupon settings
router.post("/", protect, restrictTo("ADMIN", "SUPERADMIN"), couponController.create);
router.get("/", protect, restrictTo("ADMIN", "SUPERADMIN"), couponController.getAll);
router.delete("/:id", protect, restrictTo("ADMIN", "SUPERADMIN"), couponController.delete);

module.exports = router;
