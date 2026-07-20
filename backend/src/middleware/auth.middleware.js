const jwt = require("jsonwebtoken");
const prisma = require("../config/db");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "sugandhika_super_secret_jwt_access_token_key_12345");

    // Fetch user and check if active
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, user not found",
      });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error("[Auth Middleware] JWT Error:", error.message);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token expired",
        code: "TOKEN_EXPIRED",
      });
    }
    return res.status(401).json({
      success: false,
      message: "Not authorized, token invalid",
    });
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permissions",
      });
    }
    next();
  };
};

const checkPermission = (permissionName) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    if (req.user.role === "SUPERADMIN") {
      return next(); // Superadmin bypasses permissions
    }

    // Check permissions linked to user roles
    const userPermissions = req.user.roles.flatMap((role) =>
      role.permissions.map((p) => p.name)
    );

    if (!userPermissions.includes(permissionName)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden. Missing permission: ${permissionName}`,
      });
    }
    next();
  };
};

module.exports = {
  protect,
  restrictTo,
  checkPermission,
};
