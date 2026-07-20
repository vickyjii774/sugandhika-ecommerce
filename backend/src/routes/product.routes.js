const express = require("express");
const productController = require("../controllers/product.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

const router = express.Router();

// Public routes
router.get("/", productController.getAll);
router.get("/categories", productController.getCategories);
router.get("/:slug", productController.getBySlug);

// User protected review routes
router.post("/:id/reviews", protect, productController.createReview);

// Admin only routes
router.post("/", protect, restrictTo("ADMIN", "SUPERADMIN"), productController.create);
router.put("/:id", protect, restrictTo("ADMIN", "SUPERADMIN"), productController.update);
router.delete("/:id", protect, restrictTo("ADMIN", "SUPERADMIN"), productController.delete);
router.post("/categories", protect, restrictTo("ADMIN", "SUPERADMIN"), productController.createCategory);

module.exports = router;
