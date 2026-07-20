require("dotenv").config();
const app = require("./app");
const prisma = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Verify database connection
    await prisma.$connect();
    console.log("Database connection has been established successfully via Prisma. 🐘");

    // Start Express listener
    app.listen(PORT, () => {
      console.log(`Sugandhika Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT} 🚀`);
    });
  } catch (error) {
    console.error("Unable to start server:", error.message);
    process.exit(1);
  }
};

startServer();
