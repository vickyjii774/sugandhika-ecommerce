import { useCart } from "../context/CartContext";
import Container from "../components/ui/Container";
import { Link, useNavigate } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import SEO from "../components/common/SEO";
import toast from "react-hot-toast";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  const handleCheckoutRedirect = () => {
    navigate("/checkout");
  };

  const discount = 0; // Handled at checkout
  const shippingCost = total > 1500 ? 0 : 100;
  const tax = parseFloat(((total) * 0.13).toFixed(2));
  const estimatedTotal = parseFloat((total + shippingCost + tax).toFixed(2));

  if (cartItems.length === 0) {
    return (
      <>
        <SEO title="Shopping Cart" />
        <div className="bg-beige-50 dark:bg-forest-950 min-h-[60vh] flex items-center justify-center py-20 transition-colors duration-300">
          <Container>
            <div className="max-w-md mx-auto text-center bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-10 shadow-sm">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-forest-50 dark:bg-forest-850 text-forest-750 dark:text-sage-200 mb-6">
                <FiShoppingBag className="text-3xl" />
              </div>
              <h1 className="font-heading text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Your Cart is Empty
              </h1>
              <p className="text-sm text-gray-500 dark:text-sage-100 leading-relaxed mb-8">
                You haven't added any premium natural mosquito repellents to your cart yet.
              </p>
              <Link
                to="/shop"
                className="inline-block rounded-xl bg-forest-700 px-8 py-3.5 font-semibold text-white hover:bg-forest-800 transition duration-300 dark:bg-forest-600 dark:hover:bg-forest-700 shadow-md shadow-forest-800/10"
              >
                Start Shopping
              </Link>
            </div>
          </Container>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Shopping Cart" />
      <div className="bg-beige-50 dark:bg-forest-950 min-h-screen py-16 transition-colors duration-300">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-forest-900 dark:text-white mb-10">
              Shopping Cart ({cartItems.reduce((acc, c) => acc + c.quantity, 0)})
            </h1>

            <div className="grid gap-10 lg:grid-cols-12">
              
              {/* Items List (Lg: col-span-8) */}
              <div className="lg:col-span-8 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-5 shadow-sm gap-4"
                  >
                    {/* Left content: Thumbnail image and meta details */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={item.images?.[0]?.url || item.image || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=150"}
                        alt={item.title || item.name}
                        className="h-20 w-20 rounded-xl object-cover bg-beige-50"
                      />
                      <div className="overflow-hidden">
                        <span className="text-[10px] text-gray-400 dark:text-sage-200 uppercase tracking-widest font-bold block">{item.brand || "Sugandhika"}</span>
                        <h2 className="font-heading text-lg font-bold text-gray-800 dark:text-white truncate max-w-[200px] mt-0.5">
                          <Link to={`/product/${item.slug}`} className="hover:text-forest-650 transition">{item.title || item.name}</Link>
                        </h2>
                        <span className="text-sm font-bold text-forest-750 dark:text-sage-100">Rs. {item.price}</span>
                      </div>
                    </div>

                    {/* Right content: Increments, removal triggers, totals */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100 dark:border-forest-850">
                      
                      {/* Quantity counters */}
                      <div className="flex items-center border border-gray-250 dark:border-forest-800 rounded-xl px-2.5 py-1 select-none">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-gray-500 hover:text-forest-750"
                        >
                          <FiMinus />
                        </button>
                        <span className="font-bold text-sm px-3 dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-gray-500 hover:text-forest-750"
                        >
                          <FiPlus />
                        </button>
                      </div>

                      {/* Item Subtotal Price */}
                      <span className="font-bold text-gray-800 dark:text-white min-w-[80px] text-right">
                        Rs. {item.price * item.quantity}
                      </span>

                      {/* Trash */}
                      <button
                        onClick={() => {
                          removeFromCart(item.id);
                          toast.success("Removed item from cart");
                        }}
                        className="text-gray-400 hover:text-red-500 transition duration-300 p-1.5"
                        aria-label="Remove item"
                      >
                        <FiTrash2 />
                      </button>

                    </div>
                  </div>
                ))}

                {/* Continue Shopping button */}
                <div className="pt-4 select-none">
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-forest-750 hover:underline dark:text-sage-100"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Summary Card Column (Lg: col-span-4) */}
              <div className="lg:col-span-4">
                <div className="bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-6 shadow-sm space-y-4">
                  <h2 className="font-heading text-2xl font-bold text-gray-800 dark:text-white pb-3 border-b border-gray-100 dark:border-forest-850">
                    Order Summary
                  </h2>

                  <div className="space-y-3.5 text-sm text-gray-600 dark:text-sage-100">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold text-gray-800 dark:text-white">Rs. {total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Shipping</span>
                      <span className="font-bold text-gray-800 dark:text-white">
                        {shippingCost === 0 ? <span className="text-green-600">FREE</span> : `Rs. ${shippingCost}`}
                      </span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-gray-100 dark:border-forest-850">
                      <span>Tax (13% VAT)</span>
                      <span className="font-bold text-gray-800 dark:text-white">Rs. {tax}</span>
                    </div>
                    <div className="flex justify-between text-base font-extrabold text-forest-800 dark:text-sage-100 pt-1">
                      <span>Estimated Total</span>
                      <span className="text-lg text-forest-750 dark:text-white">Rs. {estimatedTotal}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckoutRedirect}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-semibold py-4 transition duration-300 dark:bg-forest-600 dark:hover:bg-forest-700 shadow-md shadow-forest-800/10 cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <FiArrowRight />
                  </button>

                  <div className="text-[10px] text-gray-400 text-center select-none">
                    Free shipping inside Kathmandu Valley for orders over Rs. 1,500
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Container>
      </div>
    </>
  );
}