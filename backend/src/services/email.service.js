const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.mailtrap.io",
  port: parseInt(process.env.SMTP_PORT || "2525"),
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
});

const emailService = {
  async sendEmail({ to, subject, html }) {
    const mailOptions = {
      from: process.env.SMTP_FROM || "noreply@sugandhika.com",
      to,
      subject,
      html,
    };
    return transporter.sendMail(mailOptions);
  },

  async sendVerificationEmail(email, name, token) {
    const verificationUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify-email?token=${token}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #faf7f0;">
        <h2 style="color: #1e3d2f; text-align: center;">Welcome to Sugandhika! 🌿</h2>
        <p>Dear ${name},</p>
        <p>Thank you for choosing Sugandhika. We are committed to protecting your home naturally with our premium herbal mosquito repellents.</p>
        <p>Please click the button below to verify your email address and activate your account:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #2e7d32; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Verify Email Address</a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #666;"><a href="${verificationUrl}">${verificationUrl}</a></p>
        <p>If you did not register for this account, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #888; text-align: center;">Sugandhika E-Commerce | Natural & Eco-Friendly Protection</p>
      </div>
    `;
    return this.sendEmail({ to: email, subject: "Verify Your Sugandhika Account 🌿", html });
  },

  async sendPasswordResetEmail(email, name, token) {
    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password?token=${token}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #faf7f0;">
        <h2 style="color: #1e3d2f; text-align: center;">Reset Your Password 🔑</h2>
        <p>Dear ${name},</p>
        <p>We received a request to reset your password for your Sugandhika account. Click the button below to choose a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #2e7d32; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #666;"><a href="${resetUrl}">${resetUrl}</a></p>
        <p>This password reset link will expire in 1 hour.</p>
        <p>If you did not request a password reset, you can safely ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #888; text-align: center;">Sugandhika E-Commerce | Natural & Eco-Friendly Protection</p>
      </div>
    `;
    return this.sendEmail({ to: email, subject: "Reset Your Sugandhika Password 🔑", html });
  },

  async sendOrderInvoiceEmail(email, name, order) {
    const itemsList = order.items
      .map(
        (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${item.product.title}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: right;">Rs. ${item.price}</td>
      </tr>
    `
      )
      .join("");

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #faf7f0;">
        <h2 style="color: #1e3d2f; text-align: center;">Thank You for Your Order! 📦</h2>
        <p>Dear ${name || "Valued Customer"},</p>
        <p>Your order <strong>#${order.orderNumber}</strong> has been successfully placed. Here are your order details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background-color: #2e7d32; color: white;">
              <th style="padding: 10px; text-align: left;">Product</th>
              <th style="padding: 10px; text-align: center;">Qty</th>
              <th style="padding: 10px; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsList}
          </tbody>
        </table>
        
        <div style="text-align: right; margin-top: 15px; font-size: 16px;">
          <p>Subtotal: Rs. ${order.totalAmount}</p>
          <p>Discount: -Rs. ${order.discountAmount}</p>
          <p>Shipping: Rs. ${order.shippingAmount}</p>
          <p>Tax: Rs. ${order.taxAmount}</p>
          <p style="font-weight: bold; color: #2e7d32; font-size: 18px;">Total Paid: Rs. ${order.payableAmount}</p>
        </div>
        
        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        <p><strong>Shipping Address:</strong> ${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.postalCode}</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/track-order?id=${order.id}" style="background-color: #2e7d32; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Track Your Order</a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #888; text-align: center;">Sugandhika E-Commerce | Natural & Eco-Friendly Protection</p>
      </div>
    `;
    return this.sendEmail({ to: email, subject: `Sugandhika Order Confirmation #${order.orderNumber} 📦`, html });
  },
};

module.exports = emailService;
