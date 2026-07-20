const express = require("express");
const adminController = require("../controllers/admin.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/analytics", protect, restrictTo("ADMIN", "SUPERADMIN"), adminController.getAnalytics);

module.exports = router;
