const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const prisma = require("../config/db");
const { addJob } = require("../jobs/queue");

const generateTokens = async (userId, role) => {
  const accessToken = jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET || "sugandhika_super_secret_jwt_access_token_key_12345",
    { expiresIn: process.env.JWT_ACCESS_EXPIRY || "15m" }
  );

  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET || "sugandhika_super_secret_jwt_refresh_token_key_67890",
    { expiresIn: process.env.JWT_REFRESH_EXPIRY || "7d" }
  );

  // Save refresh token in database
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.token.create({
    data: {
      userId,
      token: refreshToken,
      type: "REFRESH",
      expiresAt,
    },
  });

  return { accessToken, refreshToken };
};

const authController = {
  async register(req, res, next) {
    const { email, password, firstName, lastName } = req.body;
    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email is already registered" });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          passwordHash,
          firstName,
          lastName,
          role: "CUSTOMER",
        },
      });

      // Generate Verification Token
      const verificationToken = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours expiry

      await prisma.token.create({
        data: {
          userId: user.id,
          token: verificationToken,
          type: "VERIFICATION",
          expiresAt,
        },
      });

      // Queue Verification Email
      await addJob("emailQueue", {
        type: "VERIFY_EMAIL",
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        data: { token: verificationToken },
      });

      res.status(201).json({
        success: true,
        message: "Registration successful. Please check your email to verify your account.",
        user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
      });
    } catch (error) {
      next(error);
    }
  },

  async verifyEmail(req, res, next) {
    const { token } = req.query;
    try {
      if (!token) {
        return res.status(400).json({ success: false, message: "Verification token is required" });
      }

      const tokenRecord = await prisma.token.findUnique({
        where: { token },
        include: { user: true },
      });

      if (!tokenRecord || tokenRecord.type !== "VERIFICATION" || tokenRecord.expiresAt < new Date()) {
        return res.status(400).json({ success: false, message: "Token is invalid or expired" });
      }

      await prisma.user.update({
        where: { id: tokenRecord.userId },
        data: { isVerified: true },
      });

      // Delete the verification token
      await prisma.token.delete({ where: { id: tokenRecord.id } });

      res.status(200).json({
        success: true,
        message: "Email successfully verified. You can now log in.",
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordMatch) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }

      const tokens = await generateTokens(user.id, user.role);

      // Audit Log
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: "LOGIN",
          details: `User logged in successfully`,
          ipAddress: req.ip,
          userAgent: req.headers["user-agent"],
        },
      });

      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isVerified: user.isVerified,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async refreshToken(req, res, next) {
    const { refreshToken } = req.body;
    try {
      if (!refreshToken) {
        return res.status(400).json({ success: false, message: "Refresh token is required" });
      }

      const tokenRecord = await prisma.token.findUnique({
        where: { token: refreshToken },
        include: { user: true },
      });

      if (!tokenRecord || tokenRecord.type !== "REFRESH" || tokenRecord.expiresAt < new Date()) {
        return res.status(401).json({ success: false, message: "Refresh token invalid or expired" });
      }

      // Generate new tokens
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "sugandhika_super_secret_jwt_refresh_token_key_67890");
      const tokens = await generateTokens(tokenRecord.user.id, tokenRecord.user.role);

      // Delete the old refresh token to prevent reuse (Refresh Token Rotation)
      await prisma.token.delete({ where: { id: tokenRecord.id } });

      res.status(200).json({
        success: true,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    } catch (error) {
      next(error);
    }
  },

  async forgotPassword(req, res, next) {
    const { email } = req.body;
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        // Return 200 for security reasons (don't reveal registered emails)
        return res.status(200).json({
          success: true,
          message: "If the email is registered, a password reset link has been sent.",
        });
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour expiry

      await prisma.token.create({
        data: {
          userId: user.id,
          token: resetToken,
          type: "PASSWORD_RESET",
          expiresAt,
        },
      });

      // Queue Reset Email
      await addJob("emailQueue", {
        type: "RESET_PASSWORD",
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        data: { token: resetToken },
      });

      res.status(200).json({
        success: true,
        message: "If the email is registered, a password reset link has been sent.",
      });
    } catch (error) {
      next(error);
    }
  },

  async resetPassword(req, res, next) {
    const { token, newPassword } = req.body;
    try {
      if (!token || !newPassword) {
        return res.status(400).json({ success: false, message: "Token and new password are required" });
      }

      const tokenRecord = await prisma.token.findUnique({
        where: { token },
        include: { user: true },
      });

      if (!tokenRecord || tokenRecord.type !== "PASSWORD_RESET" || tokenRecord.expiresAt < new Date()) {
        return res.status(400).json({ success: false, message: "Token is invalid or expired" });
      }

      const passwordHash = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { id: tokenRecord.userId },
        data: { passwordHash },
      });

      // Delete the reset token
      await prisma.token.delete({ where: { id: tokenRecord.id } });

      // Delete all refresh tokens for this user for security (force logout everywhere)
      await prisma.token.deleteMany({
        where: { userId: tokenRecord.userId, type: "REFRESH" },
      });

      res.status(200).json({
        success: true,
        message: "Password reset successful. You can now log in with your new password.",
      });
    } catch (error) {
      next(error);
    }
  },

  async changePassword(req, res, next) {
    const { currentPassword, newPassword } = req.body;
    try {
      const user = await prisma.user.findUnique({ where: { id: req.user.id } });
      const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Incorrect current password" });
      }

      const passwordHash = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { id: req.user.id },
        data: { passwordHash },
      });

      // Delete other refresh tokens for security
      await prisma.token.deleteMany({
        where: { userId: req.user.id, type: "REFRESH" },
      });

      res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
      next(error);
    }
  },

  async logout(req, res, next) {
    const { refreshToken } = req.body;
    try {
      if (refreshToken) {
        await prisma.token.delete({ where: { token: refreshToken } }).catch(() => {});
      }
      res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  },

  async getProfile(req, res, next) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isVerified: true,
          createdAt: true,
          addresses: true,
        },
      });
      res.status(200).json({ success: true, user });
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req, res, next) {
    const { firstName, lastName } = req.body;
    try {
      const user = await prisma.user.update({
        where: { id: req.user.id },
        data: { firstName, lastName },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isVerified: true,
          createdAt: true,
        },
      });
      res.status(200).json({ success: true, user, message: "Profile updated successfully" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
