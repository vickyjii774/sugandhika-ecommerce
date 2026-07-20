const express = require("express");
const faqController = require("../controllers/faq.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", faqController.getAll);
router.post("/", protect, restrictTo("ADMIN", "SUPERADMIN"), faqController.create);
router.delete("/:id", protect, restrictTo("ADMIN", "SUPERADMIN"), faqController.delete);

module.exports = router;
