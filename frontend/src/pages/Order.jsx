import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Container from "../components/ui/Container";
import SEO from "../components/common/SEO";
import { motion } from "framer-motion";
import { FiCheckCircle, FiArrowRight, FiShoppingBag, FiTruck } from "react-icons/fi";

export default function Order() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || `SUG-${Date.now().toString().slice(-6)}`;
  const method = searchParams.get("method") || "COD";
  const transactionId = searchParams.get("transactionId") || null;

  return (
    <>
      <SEO title="Order Confirmed" />
      <div className="bg-beige-50 dark:bg-forest-950 min-h-[75vh] flex items-center justify-center py-20 transition-colors duration-300">
        <Container>
          <div className="max-w-xl mx-auto text-center bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-8 md:p-12 shadow-sm">
            
            {/* Animated Check */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-forest-100 text-forest-700 dark:bg-forest-850 dark:text-sage-200 mb-6"
            >
              <FiCheckCircle className="text-4xl" />
            </motion.div>

            <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
              Thank You for Your Order!
            </h1>
            <p className="text-sm text-gray-500 dark:text-sage-105 leading-relaxed mb-8">
              Your order has been received and is currently being processed by our nursery packaging team. A confirmation receipt will be sent shortly.
            </p>

            {/* Invoice summary cards */}
            <div className="bg-beige-50/70 dark:bg-forest-950 border border-gray-100 dark:border-forest-850 rounded-2xl p-5 mb-8 text-left space-y-3.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Order ID:</span>
                <span className="font-bold text-gray-700 dark:text-white">#{orderId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Payment Option:</span>
                <span className="font-semibold text-gray-700 dark:text-white">
                  {method === "COD" ? "Cash on Delivery" : `${method} (Mock Instant)`}
                </span>
              </div>
              {transactionId && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Transaction Ref:</span>
                  <span className="font-mono text-xs text-gray-700 dark:text-sage-200 truncate max-w-[150px]">{transactionId}</span>
                </div>
              )}
              <div className="flex justify-between text-sm pt-3.5 border-t border-gray-200/50 dark:border-forest-800">
                <span className="text-gray-400 flex items-center gap-1">
                  <FiTruck /> Shipping Estimate:
                </span>
                <span className="font-semibold text-forest-750 dark:text-sage-100">2 – 4 Business Days</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/shop"
                className="flex items-center justify-center gap-2 rounded-xl border border-forest-600 px-6 py-3.5 text-sm font-semibold text-forest-700 hover:bg-forest-50 transition duration-300 dark:text-sage-100 dark:hover:bg-forest-800/40"
              >
                <FiShoppingBag />
                <span>Continue Shopping</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center justify-center gap-2 rounded-xl bg-forest-700 hover:bg-forest-800 text-white px-6 py-3.5 text-sm font-semibold transition duration-300 dark:bg-forest-600 dark:hover:bg-forest-700 shadow-md shadow-forest-800/10"
              >
                <span>Track Orders</span>
                <FiArrowRight />
              </Link>
            </div>

          </div>
        </Container>
      </div>
    </>
  );
}
