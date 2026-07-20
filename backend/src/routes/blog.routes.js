const express = require("express");
const blogController = require("../controllers/blog.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

const router = express.Router();

// Public routes
router.get("/", blogController.getAll);
router.get("/:slug", blogController.getBySlug);
router.post("/:blogId/comments", blogController.postComment);

// Admin creation routes
router.post("/", protect, restrictTo("ADMIN", "SUPERADMIN"), blogController.create);

module.exports = router;
