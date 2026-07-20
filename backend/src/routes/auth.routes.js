const express = require("express");
const authController = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");
const { authLimiter } = require("../middleware/rateLimiter.middleware");

const router = express.Router();

// Public auth routes (rate limited)
router.post("/register", authLimiter, authController.register);
router.get("/verify-email", authController.verifyEmail);
router.post("/login", authLimiter, authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

// Protected user routes
router.get("/profile", protect, authController.getProfile);
router.put("/profile", protect, authController.updateProfile);
router.post("/change-password", protect, authController.changePassword);
router.post("/logout", authController.logout);

module.exports = router;
