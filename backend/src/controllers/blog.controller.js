const prisma = require("../config/db");

const blogController = {
  // 1. GET ALL BLOGS
  async getAll(req, res, next) {
    try {
      const { category, search } = req.query;
      const where = { isPublished: true };

      if (category) {
        where.category = category;
      }

      if (search) {
        where.OR = [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
        ];
      }

      const blogs = await prisma.blog.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });

      res.status(200).json({ success: true, blogs });
    } catch (error) {
      next(error);
    }
  },

  // 2. GET BLOG BY SLUG
  async getBySlug(req, res, next) {
    const { slug } = req.params;
    try {
      const blog = await prisma.blog.findUnique({
        where: { slug },
        include: {
          comments: {
            where: { isApproved: true },
            orderBy: { createdAt: "desc" },
          },
        },
      });

      if (!blog) {
        return res.status(404).json({ success: false, message: "Blog post not found" });
      }

      res.status(200).json({ success: true, blog });
    } catch (error) {
      next(error);
    }
  },

  // 3. CREATE BLOG POST (Admin)
  async create(req, res, next) {
    const { title, slug, content, bannerImage, category, metaTitle, metaDescription, isPublished } = req.body;
    try {
      const blog = await prisma.blog.create({
        data: {
          title,
          slug,
          content,
          bannerImage,
          authorId: req.user.id,
          category,
          metaTitle,
          metaDescription,
          isPublished: isPublished === "true" || isPublished === true,
        },
      });
      res.status(201).json({ success: true, blog, message: "Blog post created successfully" });
    } catch (error) {
      next(error);
    }
  },

  // 4. POST COMMENT ON BLOG
  async postComment(req, res, next) {
    const { blogId } = req.params;
    const { name, email, content } = req.body;
    try {
      const comment = await prisma.comment.create({
        data: {
          blogId,
          name,
          email,
          content,
          isApproved: true, // Auto-approve or toggle based on config
        },
      });
      res.status(201).json({ success: true, comment, message: "Comment added successfully" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = blogController;
