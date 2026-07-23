import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { productsService } from "../services/products.service";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Container from "../components/ui/Container";
import SEO from "../components/common/SEO";
import ProductCard from "../components/product/ProductCard";
import productsMock from "../data/products";
import { FiHeart, FiShare2, FiShoppingCart, FiMinus, FiPlus, FiAlertCircle } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaLink } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    setLoading(true);
    productsService
      .getBySlug(slug)
      .then((data) => {
        if (data) {
          setProduct(data);
          const defaultImg = data.images?.[0]?.url || data.image || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600";
          setSelectedImage(defaultImg);
        } else {
          // Check mock details
          const mockMatch = productsMock.find(p => p.slug === slug);
          if (mockMatch) {
            setProduct(mockMatch);
            setSelectedImage(mockMatch.image);
          }
        }
      })
      .catch(() => {
        const mockMatch = productsMock.find(p => p.slug === slug);
        if (mockMatch) {
          setProduct(mockMatch);
          setSelectedImage(mockMatch.image);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-beige-50 dark:bg-forest-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-forest-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h2 className="font-heading text-3xl font-bold text-gray-800 dark:text-white">Product Not Found</h2>
          <Link to="/shop" className="mt-4 inline-block text-forest-700 hover:underline dark:text-sage-200">
            Back to Shop
          </Link>
        </div>
      </Container>
    );
  }

  const isLiked = isInWishlist(product.id);
  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} x ${product.name || product.title} added to cart! 🛒`);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  const handleShare = (platform) => {
    if (platform === "link") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product URL copied to clipboard! 🔗");
    } else {
      toast.success(`Opening ${platform} Share (Simulated)... 🌿`);
    }
  };

  // Mock specs and details if not present in the record
  const specs = product.specifications || {
    Weight: "150g",
    Pieces: "20 sticks",
    "Burn Time": "45 minutes",
    Storage: "Cool, dry place",
  };

  const ingredients = product.ingredients || ["Citronella", "Neem", "Lemongrass", "Eucalyptus", "Natural wood powder"];
  const benefits = product.benefits || ["100% Herbal & Chemical Free", "Infant and Pet Safe", "Therapeutic relaxing scent", "Biodegradable packaging"];
  const directions = product.directions || ["Light the tip of the incense stick.", "Wait 10 seconds for it to glow.", "Blow out the flame gently.", "Place it in a secure incense holder."];

  return (
    <>
      <SEO title={product.name || product.title} description={product.shortDescription || product.description} />
      
      <div className="bg-beige-50 dark:bg-forest-950 py-12 transition-colors duration-300">
        <Container>
          
          {/* Breadcrumb back */}
          <div className="mb-6">
            <Link to="/shop" className="text-sm font-semibold text-gray-400 hover:text-forest-750 transition">
              ← Shop Collection
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-12 bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-6 md:p-10 shadow-sm mb-12">
            
            {/* Gallery Column (Lg: col-span-6) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-beige-50 dark:bg-forest-950 border border-gray-100 dark:border-forest-800 relative group">
                <img
                  src={selectedImage}
                  alt={product.name || product.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-102"
                />
              </div>

              {/* Thumbnails strip */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img.url)}
                      className={`h-16 w-16 rounded-xl overflow-hidden border-2 transition duration-300 ${
                        selectedImage === img.url ? "border-forest-700 shadow-sm" : "border-gray-150 hover:border-forest-300"
                      }`}
                    >
                      <img src={img.url} alt={`thumb-${idx}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Column (Lg: col-span-6) */}
            <div className="lg:col-span-6 flex flex-col">
              <span className="text-xs uppercase tracking-widest font-bold text-gray-400 dark:text-sage-200">
                {product.brand || "Sugandhika"} • {product.category?.name || "Herbal"}
              </span>

              <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white mt-2 mb-3">
                {product.name || product.title}
              </h1>

              {/* Rating header */}
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-sage-200 mb-6 select-none">
                <span className="text-gold-500 text-lg font-bold">★</span>
                <span className="font-bold text-gray-700 dark:text-white">{product.rating || "4.8"}</span>
                <span>({product.reviews?.length || 24} customer reviews)</span>
              </div>

              {/* Price Panel */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-extrabold text-forest-800 dark:text-sage-100">
                  Rs. {product.price}
                </span>
                {product.oldPrice && (
                  <>
                    <span className="text-lg text-gray-400 line-through">Rs. {product.oldPrice}</span>
                    <span className="bg-forest-100 text-forest-800 dark:bg-forest-850 dark:text-sage-100 px-3 py-1 rounded-lg text-xs font-bold">
                      {discountPercent}% OFF
                    </span>
                  </>
                )}
              </div>

              <p className="text-sm md:text-base text-gray-500 dark:text-sage-200 leading-relaxed mb-6">
                {product.shortDescription || product.description}
              </p>

              {/* Quantity Increments */}
              <div className="flex items-center gap-4 mb-6 select-none">
                <span className="text-xs font-bold text-gray-400 uppercase">Quantity:</span>
                <div className="flex items-center border border-gray-250 dark:border-forest-800 rounded-xl px-2.5 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-gray-500 hover:text-forest-700"
                  >
                    <FiMinus />
                  </button>
                  <span className="font-bold text-sm px-4 dark:text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-gray-500 hover:text-forest-700"
                  >
                    <FiPlus />
                  </button>
                </div>
                <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  In Stock (Nepal wide delivery)
                </span>
              </div>

              {/* Action Panels */}
              <div className="grid gap-3 sm:grid-cols-2 pt-6 border-t border-gray-100 dark:border-forest-850 mt-auto">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 rounded-xl border border-forest-700 hover:bg-forest-50 text-forest-750 font-semibold py-4 transition duration-300 dark:text-sage-100 dark:hover:bg-forest-850/40 cursor-pointer"
                >
                  <FiShoppingCart />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-semibold py-4 transition duration-300 dark:bg-forest-600 dark:hover:bg-forest-700 shadow-md shadow-forest-800/10 cursor-pointer text-center"
                >
                  Buy Now
                </button>
              </div>

              {/* Extra tools */}
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-sage-200 mt-6 pt-4 border-t border-gray-100 dark:border-forest-850">
                <button
                  onClick={() => (isLiked ? removeFromWishlist(product.id) : addToWishlist(product))}
                  className="flex items-center gap-1.5 hover:text-red-500 transition font-medium"
                >
                  <FiHeart className={isLiked ? "fill-red-500 text-red-500" : ""} />
                  <span>{isLiked ? "In Wishlist" : "Add to Wishlist"}</span>
                </button>

                {/* Share icons */}
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold text-gray-400">Share:</span>
                  <button onClick={() => handleShare("Facebook")} className="hover:text-blue-600 transition" aria-label="Share on Facebook"><FaFacebook /></button>
                  <button onClick={() => handleShare("Twitter")} className="hover:text-blue-400 transition" aria-label="Share on Twitter"><FaTwitter /></button>
                  <button onClick={() => handleShare("link")} className="hover:text-forest-600 transition" aria-label="Copy Link"><FaLink /></button>
                </div>
              </div>

            </div>

          </div>

          {/* HTML Tabs details */}
          <div className="bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-6 md:p-10 shadow-sm mb-12">
            
            {/* Header Tabs */}
            <div className="flex flex-wrap border-b border-gray-100 dark:border-forest-850 gap-4 mb-8">
              {["description", "ingredients", "benefits", "usage", "specifications"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-semibold capitalize transition duration-300 relative cursor-pointer ${
                    activeTab === tab ? "text-forest-750 dark:text-sage-100" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="detailsTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest-700" />
                  )}
                </button>
              ))}
            </div>

            {/* Panel details */}
            <div className="text-gray-600 dark:text-sage-100 leading-relaxed text-sm md:text-base min-h-[150px]">
              {activeTab === "description" && (
                <p className="font-serif text-lg leading-relaxed italic">
                  {product.description || "No full description added."}
                </p>
              )}

              {activeTab === "ingredients" && (
                <div className="space-y-3">
                  <p className="font-semibold text-gray-800 dark:text-white mb-2">Ayurvedic Ingredients Formulation:</p>
                  <ul className="grid gap-2 sm:grid-cols-2 list-disc pl-5">
                    {ingredients.map((ing, idx) => (
                      <li key={idx} className="font-medium">{ing}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "benefits" && (
                <div className="space-y-3">
                  <p className="font-semibold text-gray-800 dark:text-white mb-2">Herbal Product Benefits:</p>
                  <ul className="grid gap-2 sm:grid-cols-2 list-disc pl-5">
                    {benefits.map((ben, idx) => (
                      <li key={idx} className="font-medium text-forest-800 dark:text-sage-200">{ben}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "usage" && (
                <div className="space-y-3">
                  <p className="font-semibold text-gray-800 dark:text-white mb-2">Directions For Use:</p>
                  <ol className="list-decimal pl-5 space-y-1.5">
                    {directions.map((dir, idx) => (
                      <li key={idx} className="font-medium">{dir}</li>
                    ))}
                  </ol>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="max-w-md">
                  <table className="w-full border-collapse">
                    <tbody>
                      {Object.entries(specs).map(([key, val]) => (
                        <tr key={key} className="border-b border-gray-100 dark:border-forest-850 text-sm">
                          <td className="py-2.5 font-bold text-gray-400 uppercase text-xs">{key}</td>
                          <td className="py-2.5 font-semibold text-gray-800 dark:text-white text-right">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>

          {/* Related products */}
          <div className="space-y-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-forest-900 dark:text-white">
              Related Products
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {productsMock.filter(p => p.id !== product.id).slice(0, 3).map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>

        </Container>
      </div>
    </>
  );
}