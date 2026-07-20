const emailService = require("../services/email.service");

const processEmailJob = async (job) => {
  const { type, email, name, data } = job.data;
  console.log(`[Job Processor] Handling email job: ${type} to ${email}`);

  try {
    switch (type) {
      case "VERIFY_EMAIL":
        await emailService.sendVerificationEmail(email, name, data.token);
        break;
      case "RESET_PASSWORD":
        await emailService.sendPasswordResetEmail(email, name, data.token);
        break;
      case "ORDER_INVOICE":
        await emailService.sendOrderInvoiceEmail(email, name, data.order);
        break;
      default:
        console.warn(`[Job Processor] Unknown email job type: ${type}`);
    }
  } catch (err) {
    console.error(`[Job Processor] Failed to execute job for ${email}:`, err);
    throw err; // Re-throw to let BullMQ handle retries
  }
};

module.exports = { processEmailJob };
