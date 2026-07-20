const prisma = require("../config/db");

const faqController = {
  async getAll(req, res, next) {
    try {
      const faqs = await prisma.fAQ.findMany({
        where: { isActive: true },
        orderBy: { category: "asc" },
      });
      res.status(200).json({ success: true, faqs });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    const { question, answer, category } = req.body;
    try {
      const faq = await prisma.fAQ.create({
        data: { question, answer, category },
      });
      res.status(201).json({ success: true, faq, message: "FAQ created successfully" });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      await prisma.fAQ.delete({ where: { id } });
      res.status(200).json({ success: true, message: "FAQ deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = faqController;
