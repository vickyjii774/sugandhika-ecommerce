import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const isLiked = isInWishlist(product.id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.title} added to cart! 🛒`);
  };

  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white p-4 shadow-sm border border-gray-100 dark:border-forest-900 dark:bg-forest-950"
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-beige-50 dark:bg-forest-900">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.images?.[0]?.url || product.image || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400"}
            alt={product.title || product.name}
            className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full shadow-md transition duration-300 ${
            isLiked ? "bg-red-50 text-red-500" : "bg-white text-gray-500 hover:text-red-500 dark:bg-forest-900"
          }`}
          aria-label="Wishlist toggle"
        >
          <FiHeart className={isLiked ? "fill-red-500" : ""} />
        </button>

        {/* Promo badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {discountPercent > 0 && (
            <span className="rounded-md bg-forest-600 px-2.5 py-1 text-xs font-bold text-white">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isFeatured && (
            <span className="rounded-md bg-gold-500 px-2.5 py-1 text-xs font-bold text-white">
              Featured
            </span>
          )}
          {product.badge && (
            <span className="rounded-md bg-purple-600 px-2.5 py-1 text-xs font-bold text-white">
              {product.badge}
            </span>
          )}
        </div>
      </div>

      {/* Info container */}
      <div className="mt-4 flex flex-1 flex-col">
        <span className="text-xs text-gray-400 dark:text-sage-200 uppercase tracking-widest font-semibold">{product.brand || "Sugandhika"}</span>
        <h3 className="mt-1 font-heading text-lg font-bold text-gray-800 hover:text-forest-600 transition dark:text-sage-100">
          <Link to={`/product/${product.slug}`}>{product.title || product.name}</Link>
        </h3>
        
        {/* Rating */}
        <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 dark:text-sage-200">
          <span className="text-gold-500 font-bold">★</span>
          <span>{product.averageRating || product.rating || "4.8"}</span>
          <span>({product.reviews?.length || product.reviews || 0} reviews)</span>
        </div>

        {/* Description */}
        <p className="mt-2 text-xs text-gray-400 line-clamp-2 leading-relaxed dark:text-sage-200">
          {product.shortDescription || product.description}
        </p>

        {/* Price & Cart button */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-forest-800 dark:text-sage-100">
              Rs. {product.salePrice || product.price}
            </span>
            {product.salePrice && (
              <span className="text-sm text-gray-400 line-through dark:text-sage-200">
                Rs. {product.price}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-700 text-white hover:bg-forest-800 transition duration-300 dark:bg-forest-600 dark:hover:bg-forest-700"
            aria-label="Add to cart"
          >
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </motion.div>
  );
}