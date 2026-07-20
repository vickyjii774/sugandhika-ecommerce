const prisma = require("../config/db");

const productController = {
  // 1. GET ALL PRODUCTS (With filters, search, sorting, pagination)
  async getAll(req, res, next) {
    try {
      const {
        search,
        category,
        subcategory,
        minPrice,
        maxPrice,
        rating,
        inStock,
        sort,
        page = 1,
        limit = 12,
      } = req.query;

      const skip = (parseInt(page) - 1) * parseInt(limit);
      const take = parseInt(limit);

      // Where clauses
      const where = { isActive: true };

      if (search) {
        where.OR = [
          { title: { contains: search, mode: "insensitive" } },
          { shortDescription: { contains: search, mode: "insensitive" } },
          { longDescription: { contains: search, mode: "insensitive" } },
          { tags: { has: search } },
        ];
      }

      if (category) {
        where.category = { slug: category };
      }

      if (subcategory) {
        where.subcategory = { slug: subcategory };
      }

      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = parseFloat(minPrice);
        if (maxPrice) where.price.lte = parseFloat(maxPrice);
      }

      if (rating) {
        where.averageRating = { gte: parseFloat(rating) };
      }

      if (inStock === "true") {
        where.stock = { gt: 0 };
      } else if (inStock === "false") {
        where.stock = 0;
      }

      // Sorting
      let orderBy = { createdAt: "desc" }; // default Newest
      switch (sort) {
        case "oldest":
          orderBy = { createdAt: "asc" };
          break;
        case "priceLow":
          orderBy = { price: "asc" };
          break;
        case "priceHigh":
          orderBy = { price: "desc" };
          break;
        case "popularity":
        case "bestSelling":
          orderBy = { averageRating: "desc" }; // fallback sorting for rating
          break;
        default:
          orderBy = { createdAt: "desc" };
      }

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          include: {
            images: true,
            category: true,
            subcategory: true,
          },
          orderBy,
          skip,
          take,
        }),
        prisma.product.count({ where }),
      ]);

      res.status(200).json({
        success: true,
        products,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      });
    } catch (error) {
      next(error);
    }
  },

  // 2. GET SINGLE PRODUCT BY SLUG
  async getBySlug(req, res, next) {
    const { slug } = req.params;
    try {
      const product = await prisma.product.findUnique({
        where: { slug },
        include: {
          images: true,
          videos: true,
          category: true,
          subcategory: true,
          reviews: {
            where: { isApproved: true },
            include: {
              user: {
                select: { firstName: true, lastName: true },
              },
            },
            orderBy: { createdAt: "desc" },
          },
        },
      });

      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      // Fetch related products (same category)
      const related = await prisma.product.findMany({
        where: {
          categoryId: product.categoryId,
          id: { not: product.id },
          isActive: true,
        },
        take: 4,
        include: { images: true },
      });

      res.status(200).json({ success: true, product, related });
    } catch (error) {
      next(error);
    }
  },

  // 3. CREATE PRODUCT (Admin)
  async create(req, res, next) {
    try {
      const {
        title,
        slug,
        sku,
        barcode,
        price,
        salePrice,
        discount,
        categoryId,
        subcategoryId,
        stock,
        weight,
        size,
        dimensions,
        shortDescription,
        longDescription,
        ingredients,
        benefits,
        directions,
        safetyInstructions,
        specifications,
        images, // Array of strings (urls)
        tags,
      } = req.body;

      const product = await prisma.product.create({
        data: {
          title,
          slug,
          sku,
          barcode,
          price: parseFloat(price),
          salePrice: salePrice ? parseFloat(salePrice) : null,
          discount: discount ? parseFloat(discount) : 0,
          categoryId,
          subcategoryId: subcategoryId || null,
          stock: parseInt(stock) || 0,
          weight: weight ? parseFloat(weight) : null,
          size,
          dimensions,
          shortDescription,
          longDescription,
          ingredients: ingredients || [],
          benefits: benefits || [],
          directions: directions || [],
          safetyInstructions: safetyInstructions || [],
          specifications: specifications || {},
          tags: tags || [],
          images: {
            create: images ? images.map((url, idx) => ({ url, isFeatured: idx === 0 })) : [],
          },
        },
      });

      res.status(201).json({ success: true, product, message: "Product created successfully" });
    } catch (error) {
      next(error);
    }
  },

  // 4. UPDATE PRODUCT (Admin)
  async update(req, res, next) {
    const { id } = req.params;
    try {
      const data = { ...req.body };
      if (data.price) data.price = parseFloat(data.price);
      if (data.salePrice !== undefined) data.salePrice = data.salePrice ? parseFloat(data.salePrice) : null;
      if (data.discount) data.discount = parseFloat(data.discount);
      if (data.stock !== undefined) data.stock = parseInt(data.stock);
      if (data.weight) data.weight = parseFloat(data.weight);

      // Handle image updates if images array is provided
      if (data.images) {
        await prisma.productImage.deleteMany({ where: { productId: id } });
        data.images = {
          create: data.images.map((url, idx) => ({ url, isFeatured: idx === 0 })),
        };
      }

      const product = await prisma.product.update({
        where: { id },
        data,
      });

      res.status(200).json({ success: true, product, message: "Product updated successfully" });
    } catch (error) {
      next(error);
    }
  },

  // 5. DELETE PRODUCT (Admin)
  async delete(req, res, next) {
    const { id } = req.params;
    try {
      await prisma.product.delete({ where: { id } });
      res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  },

  // 6. CREATE PRODUCT REVIEW (Customer)
  async createReview(req, res, next) {
    const { id: productId } = req.params;
    const { rating, title, comment } = req.body;
    try {
      const review = await prisma.review.create({
        data: {
          userId: req.user.id,
          productId,
          rating: parseInt(rating),
          title,
          comment,
        },
      });

      // Recalculate Product average rating
      const aggregate = await prisma.review.aggregate({
        where: { productId, isApproved: true },
        _avg: { rating: true },
      });

      await prisma.product.update({
        where: { id: productId },
        data: { averageRating: aggregate._avg.rating || rating },
      });

      res.status(201).json({ success: true, review, message: "Review submitted successfully" });
    } catch (error) {
      next(error);
    }
  },

  // 7. GET CATEGORIES & SUBCATEGORIES
  async getCategories(req, res, next) {
    try {
      const categories = await prisma.category.findMany({
        include: { subcategories: true },
      });
      res.status(200).json({ success: true, categories });
    } catch (error) {
      next(error);
    }
  },

  async createCategory(req, res, next) {
    const { name, slug, description, image } = req.body;
    try {
      const category = await prisma.category.create({
        data: { name, slug, description, image },
      });
      res.status(201).json({ success: true, category, message: "Category created successfully" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productController;
