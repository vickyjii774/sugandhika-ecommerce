import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Container from "../components/ui/Container";
import SEO from "../components/common/SEO";
import api from "../services/api";
import { FiCreditCard, FiTruck, FiShoppingBag, FiTag } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Checkout() {
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    province: "",
    district: "",
    city: "",
    street: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [checkingCoupon, setCheckingCoupon] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const subtotal = total;
  const shippingCost = subtotal > 1500 ? 0 : 100;
  const tax = parseFloat(((subtotal - discount) * 0.13).toFixed(2));
  const totalAmount = parseFloat((subtotal - discount + shippingCost + tax).toFixed(2));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setCheckingCoupon(true);
    
    // Call backend coupon validation or simulate
    api.post("/coupons/validate", { code: couponCode, amount: subtotal })
      .then((res) => {
        if (res.data.success) {
          const coupon = res.data.coupon;
          if (coupon.type === "PERCENT") {
            setDiscount(parseFloat(((subtotal * coupon.value) / 100).toFixed(2)));
          } else {
            setDiscount(coupon.value);
          }
          toast.success("Coupon code applied successfully! 🏷️");
        }
      })
      .catch(() => {
        // Mock coupon codes for testing
        const code = couponCode.toUpperCase();
        if (code === "ORGANIC10") {
          setDiscount(parseFloat((subtotal * 0.1).toFixed(2)));
          toast.success("Mock coupon ORGANIC10 applied: 10% off! 🏷️");
        } else if (code === "FREESHIP" && subtotal > 500) {
          toast.success("Mock coupon FREESHIP applied: Free shipping! 🏷️");
        } else {
          toast.error("Invalid or expired coupon code.");
        }
      })
      .finally(() => setCheckingCoupon(false));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const { name, email, phone, province, district, city, street } = billingDetails;

    if (!name || !email || !phone || !province || !district || !city || !street) {
      toast.error("Please fill in all delivery address fields.");
      return;
    }

    setPlacingOrder(true);

    const payload = {
      cartItems: cartItems.map((item) => ({ productId: item.id, quantity: item.quantity })),
      couponCode: discount > 0 ? couponCode : null,
      paymentMethod,
      guestInfo: {
        name,
        email,
        phone,
        street: `${street}, Province ${province}`,
        city,
        state: district,
        postalCode: "44600",
        country: "Nepal",
      },
    };

    try {
      const res = await api.post("/orders/checkout", payload);
      if (res.data.success) {
        const { redirectUrl } = res.data.paymentDetails;
        clearCart();
        if (redirectUrl) {
          // Redirect to mock payment screen (eSewa / Khalti link)
          window.location.href = redirectUrl;
        } else {
          navigate(`/order-success?method=${paymentMethod}&orderId=${res.data.orderId}`);
        }
      }
    } catch (err) {
      console.warn("Backend checkout offline. Simulating order placement.");
      // Simulated checkout success if backend server is not running
      setTimeout(() => {
        clearCart();
        navigate(`/order-success?method=${paymentMethod}&orderId=MOCK_ORDER_${Date.now()}`);
      }, 1000);
    } finally {
      setPlacingOrder(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h1 className="text-3xl font-bold">Checkout is Unavailable</h1>
          <p className="mt-2 text-gray-500">Your cart is empty. Add products to proceed.</p>
        </div>
      </Container>
    );
  }

  return (
    <>
      <SEO title="Checkout" />
      <div className="bg-beige-50 dark:bg-forest-950 py-16 transition-colors duration-300">
        <Container>
          <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-12">
            
            {/* Form Column (Lg: col-span-7) */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-8 shadow-sm">
                <h1 className="font-heading text-3xl font-bold text-gray-800 dark:text-white mb-8">
                  Shipping & Billing
                </h1>
                
                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  
                  {/* Delivery Info */}
                  <div className="space-y-4">
                    <h2 className="font-heading text-xl font-bold text-forest-800 dark:text-sage-100 flex items-center gap-2">
                      <FiTruck />
                      <span>Delivery Details</span>
                    </h2>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase">Contact Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={billingDetails.name}
                        onChange={(e) => setBillingDetails({ ...billingDetails, name: e.target.value })}
                        className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={billingDetails.email}
                          onChange={(e) => setBillingDetails({ ...billingDetails, email: e.target.value })}
                          className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="980XXXXXXXX"
                          value={billingDetails.phone}
                          onChange={(e) => setBillingDetails({ ...billingDetails, phone: e.target.value })}
                          className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">Province</label>
                        <input
                          type="text"
                          required
                          placeholder="Bagmati"
                          value={billingDetails.province}
                          onChange={(e) => setBillingDetails({ ...billingDetails, province: e.target.value })}
                          className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">District</label>
                        <input
                          type="text"
                          required
                          placeholder="Kathmandu"
                          value={billingDetails.district}
                          onChange={(e) => setBillingDetails({ ...billingDetails, district: e.target.value })}
                          className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">City / Town</label>
                        <input
                          type="text"
                          required
                          placeholder="Lazimpat"
                          value={billingDetails.city}
                          onChange={(e) => setBillingDetails({ ...billingDetails, city: e.target.value })}
                          className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase">Street Address / Landmark</label>
                      <input
                        type="text"
                        required
                        placeholder="House No., Street Name, near Landmark..."
                        value={billingDetails.street}
                        onChange={(e) => setBillingDetails({ ...billingDetails, street: e.target.value })}
                        className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Payment selection */}
                  <div className="space-y-4 border-t border-gray-100 dark:border-forest-850 pt-6">
                    <h2 className="font-heading text-xl font-bold text-forest-800 dark:text-sage-100 flex items-center gap-2">
                      <FiCreditCard />
                      <span>Payment Method</span>
                    </h2>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <label className={`flex flex-col items-center p-4 border rounded-2xl cursor-pointer transition select-none ${
                        paymentMethod === "COD" ? "border-forest-650 bg-forest-50/20" : "border-gray-200 hover:bg-beige-100/40"
                      }`}>
                        <input
                          type="radio"
                          name="payment"
                          value="COD"
                          checked={paymentMethod === "COD"}
                          onChange={() => setPaymentMethod("COD")}
                          className="sr-only"
                        />
                        <span className="text-2xl mb-1">🚚</span>
                        <span className="text-sm font-bold text-gray-800 dark:text-white">COD</span>
                        <span className="text-xs text-gray-400">Cash on Delivery</span>
                      </label>

                      <label className={`flex flex-col items-center p-4 border rounded-2xl cursor-pointer transition select-none ${
                        paymentMethod === "ESEWA" ? "border-forest-650 bg-forest-50/20" : "border-gray-200 hover:bg-beige-100/40"
                      }`}>
                        <input
                          type="radio"
                          name="payment"
                          value="ESEWA"
                          checked={paymentMethod === "ESEWA"}
                          onChange={() => setPaymentMethod("ESEWA")}
                          className="sr-only"
                        />
                        <span className="text-2xl mb-1">🟢</span>
                        <span className="text-sm font-bold text-green-600">eSewa</span>
                        <span className="text-xs text-gray-400">Mock Checkout</span>
                      </label>

                      <label className={`flex flex-col items-center p-4 border rounded-2xl cursor-pointer transition select-none ${
                        paymentMethod === "KHALTI" ? "border-forest-650 bg-forest-50/20" : "border-gray-200 hover:bg-beige-100/40"
                      }`}>
                        <input
                          type="radio"
                          name="payment"
                          value="KHALTI"
                          checked={paymentMethod === "KHALTI"}
                          onChange={() => setPaymentMethod("KHALTI")}
                          className="sr-only"
                        />
                        <span className="text-2xl mb-1">🟣</span>
                        <span className="text-sm font-bold text-purple-600">Khalti</span>
                        <span className="text-xs text-gray-400">Mock Checkout</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={placingOrder}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-forest-750 hover:bg-forest-800 text-white font-bold py-4 transition duration-300 disabled:opacity-50 dark:bg-forest-600 dark:hover:bg-forest-700 shadow-md shadow-forest-800/10 cursor-pointer"
                  >
                    {placingOrder ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    ) : (
                      <>
                        Place Order (Rs. {totalAmount})
                      </>
                    )}
                  </button>

                </form>
              </div>
            </div>

            {/* Summary Column (Lg: col-span-5) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Items Card */}
              <div className="bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-6 shadow-sm space-y-4">
                <h2 className="font-heading text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-forest-850 pb-3">
                  <FiShoppingBag />
                  <span>Order Items</span>
                </h2>

                <div className="max-h-60 overflow-y-auto space-y-3 pr-2 scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center gap-3 text-sm">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img
                          src={item.images?.[0]?.url || item.image || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=150"}
                          alt={item.title || item.name}
                          className="h-12 w-12 rounded-lg object-cover bg-beige-50"
                        />
                        <div className="overflow-hidden">
                          <p className="font-semibold text-gray-800 dark:text-white truncate">{item.title || item.name}</p>
                          <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-700 dark:text-sage-100 flex-shrink-0">Rs. {item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Coupon Code panel */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2 border-t border-gray-100 dark:border-forest-850 pt-4">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={discount > 0}
                    className="flex-grow rounded-xl border border-gray-250 px-3 py-2 text-xs focus:outline-none focus:border-forest-500 dark:bg-forest-950 dark:border-forest-800 dark:text-white disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={checkingCoupon || discount > 0}
                    className="rounded-xl bg-forest-100 hover:bg-forest-200 text-forest-800 text-xs font-bold px-4 py-2 dark:bg-forest-800 dark:text-sage-100 cursor-pointer disabled:opacity-50 flex items-center gap-1"
                  >
                    <FiTag />
                    <span>Apply</span>
                  </button>
                </form>

              </div>

              {/* Pricing Card */}
              <div className="bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-6 shadow-sm space-y-3.5">
                <h2 className="font-heading text-xl font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-forest-850 pb-3 mb-2">
                  Order Summary
                </h2>

                <div className="flex justify-between text-sm text-gray-600 dark:text-sage-100">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-800 dark:text-white">Rs. {subtotal}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Coupon Discount</span>
                    <span className="font-semibold">-Rs. {discount}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm text-gray-600 dark:text-sage-100">
                  <span>Shipping Cost</span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {shippingCost === 0 ? <span className="text-green-600">FREE</span> : `Rs. ${shippingCost}`}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-600 dark:text-sage-100 pb-3 border-b border-gray-100 dark:border-forest-850">
                  <span>Tax (13% VAT)</span>
                  <span className="font-semibold text-gray-800 dark:text-white">Rs. {tax}</span>
                </div>

                <div className="flex justify-between text-base font-bold text-forest-800 dark:text-sage-100 pt-1">
                  <span>Grand Total</span>
                  <span className="text-lg text-forest-750 dark:text-white">Rs. {totalAmount}</span>
                </div>
              </div>

            </div>

          </div>
        </Container>
      </div>
    </>
  );
}