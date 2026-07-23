import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import Container from "../components/ui/Container";
import SEO from "../components/common/SEO";
import { Link } from "react-router-dom";
import { FiTrash2, FiShoppingCart, FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function WishList() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
    toast.success(`Moved ${product.title || product.name} to cart! 🛒`);
  };

  if (wishlistItems.length === 0) {
    return (
      <>
        <SEO title="My Wishlist" />
        <div className="bg-beige-50 dark:bg-forest-950 min-h-[60vh] flex items-center justify-center py-20 transition-colors duration-300">
          <Container>
            <div className="max-w-md mx-auto text-center bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-10 shadow-sm">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-forest-50 dark:bg-forest-850 text-forest-700 dark:text-sage-200 mb-6">
                <FiHeart className="text-3xl" />
              </div>
              <h1 className="font-heading text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Your Wishlist is Empty
              </h1>
              <p className="text-sm text-gray-500 dark:text-sage-100 leading-relaxed mb-8">
                Save your favorite organic mosquito repellent sprays and incense sticks here while browsing.
              </p>
              <Link
                to="/shop"
                className="inline-block rounded-xl bg-forest-700 px-8 py-3.5 font-semibold text-white hover:bg-forest-800 transition duration-300 dark:bg-forest-600 dark:hover:bg-forest-700 shadow-md shadow-forest-800/10"
              >
                Explore Shop
              </Link>
            </div>
          </Container>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="My Wishlist" />
      <div className="bg-beige-50 dark:bg-forest-950 min-h-screen py-16 transition-colors duration-300">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-forest-900 dark:text-white mb-10">
              My Wishlist ({wishlistItems.length})
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {wishlistItems.map((item) => {
                const isDiscounted = item.salePrice && item.salePrice < item.price;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-5 shadow-sm overflow-hidden"
                  >
                    {/* Image Block */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-beige-50 dark:bg-forest-950 mb-4">
                      <img
                        src={item.images?.[0]?.url || item.image || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400"}
                        alt={item.title || item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Meta Info */}
                    <div className="flex-grow">
                      <span className="text-xs text-gray-400 dark:text-sage-200 uppercase tracking-widest font-semibold">{item.brand || "Sugandhika"}</span>
                      <h2 className="font-heading text-lg font-bold text-gray-800 dark:text-white mt-1 mb-2 hover:text-forest-650 truncate">
                        <Link to={`/product/${item.slug}`}>{item.title || item.name}</Link>
                      </h2>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-base font-bold text-forest-800 dark:text-sage-100">
                          Rs. {item.salePrice || item.price}
                        </span>
                        {isDiscounted && (
                          <span className="text-xs text-gray-400 line-through dark:text-sage-250">
                            Rs. {item.price}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Panel */}
                    <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-forest-850 mt-auto">
                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="flex-grow flex items-center justify-center gap-2 rounded-xl bg-forest-700 hover:bg-forest-800 text-white text-xs font-semibold py-3 transition duration-300 dark:bg-forest-600 dark:hover:bg-forest-700"
                      >
                        <FiShoppingCart />
                        <span>Move to Cart</span>
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition duration-300 dark:border-red-900/40 dark:hover:bg-red-950/20"
                        aria-label="Remove item"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
