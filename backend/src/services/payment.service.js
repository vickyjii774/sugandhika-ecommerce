class PaymentGateway {
  async initiate(order) {
    throw new Error("initiate method must be implemented");
  }
  async verify(payload) {
    throw new Error("verify method must be implemented");
  }
}

// 1. MOCK KHALTI GATEWAY
class KhaltiGateway extends PaymentGateway {
  async initiate(order) {
    // Return a mock verification path since real integrations are disabled
    const transactionUuid = `KHALTI-MOCK-${order.id}-${Date.now()}`;
    return {
      paymentMethod: "KHALTI",
      transactionId: transactionUuid,
      clientSecret: null,
      redirectUrl: `${process.env.FRONTEND_URL || "http://localhost:5173"}/order-success?method=KHALTI&transactionId=${transactionUuid}&orderId=${order.id}`,
    };
  }

  async verify(payload) {
    return {
      success: true,
      transactionId: payload.transactionId || `KHALTI-MOCK-${payload.orderId}`,
      details: { status: "Paid via Khalti (Mock)" },
    };
  }
}

// 2. MOCK ESEWA GATEWAY
class EsewaGateway extends PaymentGateway {
  async initiate(order) {
    const transactionUuid = `ESEWA-MOCK-${order.id}-${Date.now()}`;
    return {
      paymentMethod: "ESEWA",
      transactionId: transactionUuid,
      clientSecret: null,
      redirectUrl: `${process.env.FRONTEND_URL || "http://localhost:5173"}/order-success?method=ESEWA&transactionId=${transactionUuid}&orderId=${order.id}`,
    };
  }

  async verify(payload) {
    return {
      success: true,
      transactionId: payload.transactionId || `ESEWA-MOCK-${payload.orderId}`,
      details: { status: "Paid via eSewa (Mock)" },
    };
  }
}

// 3. CASH ON DELIVERY (COD) GATEWAY
class CodGateway extends PaymentGateway {
  async initiate(order) {
    return {
      paymentMethod: "COD",
      transactionId: `COD-${order.id}-${Date.now()}`,
      clientSecret: null,
      redirectUrl: `${process.env.FRONTEND_URL || "http://localhost:5173"}/order-success?method=COD&orderId=${order.id}`,
    };
  }

  async verify(payload) {
    return {
      success: true,
      transactionId: payload.transactionId || `COD-VERIFY-${payload.orderId}`,
      details: { status: "Cash Pending Delivery" },
    };
  }
}

// Factory Pattern
class PaymentGatewayFactory {
  static getGateway(method) {
    switch (method.toUpperCase()) {
      case "KHALTI":
        return new KhaltiGateway();
      case "ESEWA":
        return new EsewaGateway();
      case "COD":
        return new CodGateway();
      default:
        throw new Error(`Unsupported payment method: ${method}`);
    }
  }
}

module.exports = {
  PaymentGatewayFactory,
};
