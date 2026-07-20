const prisma = require("../config/db");

const adminController = {
  async getAnalytics(req, res, next) {
    try {
      // 1. Core aggregates
      const [orderStats, customerCount, productCount, lowStockProducts, recentOrders] = await Promise.all([
        prisma.order.aggregate({
          where: { paymentStatus: "PAID" },
          _sum: { payableAmount: true },
          _count: { id: true },
        }),
        prisma.user.count({ where: { role: "CUSTOMER" } }),
        prisma.product.count(),
        prisma.product.findMany({
          where: { stock: { lte: 10 } },
          select: { id: true, title: true, sku: true, stock: true },
        }),
        prisma.order.findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
          include: {
            user: { select: { firstName: true, lastName: true, email: true } },
          },
        }),
      ]);

      // 2. Sales group by month (Chart data)
      const salesByMonth = await prisma.$queryRaw`
        SELECT 
          TO_CHAR(COALESCE("createdAt", CURRENT_TIMESTAMP), 'YYYY-MM') AS month,
          SUM("payableAmount")::FLOAT as revenue,
          COUNT(id)::INT as count
        FROM "Order"
        WHERE "paymentStatus" = 'PAID'
        GROUP BY TO_CHAR(COALESCE("createdAt", CURRENT_TIMESTAMP), 'YYYY-MM')
        ORDER BY month ASC
      `.catch(() => []); // Fallback for SQLite/other databases in case of incompatible query syntax

      // 3. Top selling products
      const topProducts = await prisma.orderItem.groupBy({
        by: ["productId"],
        _sum: { quantity: true },
        orderBy: {
          _sum: { quantity: "desc" },
        },
        take: 5,
      });

      const topProductsWithDetails = await Promise.all(
        topProducts.map(async (tp) => {
          const product = await prisma.product.findUnique({
            where: { id: tp.productId },
            select: { title: true, price: true, sku: true },
          });
          return {
            ...product,
            qtySold: tp._sum.quantity,
          };
        })
      );

      res.status(200).json({
        success: true,
        summary: {
          revenue: orderStats._sum.payableAmount || 0,
          orders: orderStats._count.id || 0,
          customers: customerCount,
          products: productCount,
        },
        lowStock: lowStockProducts,
        recentOrders,
        salesChart: salesByMonth,
        topProducts: topProductsWithDetails,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = adminController;
