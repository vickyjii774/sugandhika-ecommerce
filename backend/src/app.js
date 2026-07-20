const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const { apiLimiter } = require("./middleware/rateLimiter.middleware");
const { errorHandler, notFound } = require("./middleware/error.middleware");

// Routes
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const couponRoutes = require("./routes/coupon.routes");
const blogRoutes = require("./routes/blog.routes");
const faqRoutes = require("./routes/faq.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

// Security Headers
app.use(helmet());

// Enable CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Response compression
app.use(compression());

// Request logger
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Apply general API Rate Limiter
app.use("/api/", apiLimiter);

// API Endpoints
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/coupons", couponRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/faqs", faqRoutes);
app.use("/api/v1/admin", adminRoutes);

// Base Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Sugandhika E-Commerce API Service is up and running 🌿",
    version: "1.0.0",
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
