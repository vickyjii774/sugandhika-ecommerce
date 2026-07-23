import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../components/ui/Container";
import SEO from "../components/common/SEO";
import ProductCard from "../components/product/ProductCard";
import productsMock from "../data/products";
import { FiSearch, FiSliders, FiX, FiInfo } from "react-icons/fi";
import api from "../services/api";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters state
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(600); // Max Rs. 600
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync search state from URL query param
  useEffect(() => {
    const querySearch = searchParams.get("search");
    if (querySearch) {
      setSearch(querySearch);
    }
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    api.get("/products")
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.products);
        } else {
          setProducts(productsMock);
        }
      })
      .catch(() => {
        console.warn("Backend products offline. Using mock products.");
        setProducts(productsMock);
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", "Mosquito Repellent", "Aromatherapy & Wellness"];

  // Filter and Sort calculation
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter(
        (p) =>
          (p.title || p.name).toLowerCase().includes(term) ||
          (p.shortDescription || p.description || "").toLowerCase().includes(term)
      );
    }

    // Category filter
    if (category !== "All") {
      result = result.filter((p) => p.category?.name === category || p.category === category);
    }

    // Price filter
    result = result.filter((p) => (p.price) <= priceRange);

    // Availability filter
    if (inStockOnly) {
      result = result.filter((p) => p.stock > 0 || p.availability === "In Stock");
    }

    // Sort filter
    if (sortOption === "low-to-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-to-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "ratings") {
      result.sort((a, b) => (b.averageRating || b.rating || 0) - (a.averageRating || a.rating || 0));
    } else {
      // Newest default sorting
      result.sort((a, b) => (b.id > a.id ? 1 : -1));
    }

    return result;
  }, [products, search, category, priceRange, inStockOnly, sortOption]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const clearAllFilters = () => {
    setSearch("");
    setCategory("All");
    setPriceRange(600);
    setInStockOnly(false);
    setSortOption("newest");
    setSearchParams({});
  };

  return (
    <>
      <SEO title="Shop Natural Repellents" />
      <div className="bg-beige-50 dark:bg-forest-950 min-h-screen py-16 transition-colors duration-300">
        <Container>
          
          {/* Header titles */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="font-heading text-4xl font-bold text-forest-900 dark:text-white">
              Sugandhika Garden Shop
            </h1>
            <p className="text-sm text-gray-500 mt-2 dark:text-sage-100">
              Browse our premium catalog of baby-safe, pet-safe organic mosquito repellent coils, incense, and wellness sprays.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            
            {/* 1. Filter Sidebar Column (Lg: col-span-3 - Desktop only) */}
            <aside className="hidden lg:block lg:col-span-3 bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-6 shadow-sm h-fit">
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-forest-850 pb-3">
                <h2 className="font-heading text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <FiSliders /> Filters
                </h2>
                <button onClick={clearAllFilters} className="text-xs text-forest-700 hover:underline font-semibold dark:text-sage-200">
                  Reset
                </button>
              </div>

              {/* Filters categories */}
              <div className="space-y-6">
                
                {/* Category checkboxes */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-gray-400 uppercase select-none">Category</h3>
                  <div className="flex flex-col gap-2">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center gap-2 text-sm text-gray-700 dark:text-sage-100 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={category === cat}
                          onChange={() => { setCategory(cat); setCurrentPage(1); }}
                          className="text-forest-650 focus:ring-forest-500 rounded-full"
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-forest-850">
                  <div className="flex justify-between items-baseline select-none">
                    <h3 className="text-xs font-bold text-gray-400 uppercase">Max Price</h3>
                    <span className="text-sm font-bold text-forest-750 dark:text-sage-100">Rs. {priceRange}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="600"
                    step="50"
                    value={priceRange}
                    onChange={(e) => { setPriceRange(parseInt(e.target.value)); setCurrentPage(1); }}
                    className="w-full accent-forest-700"
                  />
                  <div className="flex justify-between text-[10px] text-gray-450 select-none">
                    <span>Rs. 100</span>
                    <span>Rs. 600</span>
                  </div>
                </div>

                {/* Stock availability */}
                <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-forest-850">
                  <h3 className="text-xs font-bold text-gray-400 uppercase select-none">Availability</h3>
                  <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-sage-100 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => { setInStockOnly(e.target.checked); setCurrentPage(1); }}
                      className="rounded border-gray-300 text-forest-600 focus:ring-forest-500"
                    />
                    <span>In Stock Only</span>
                  </label>
                </div>

              </div>
            </aside>

            {/* 2. Products Grid Panel (Lg: col-span-9) */}
            <main className="lg:col-span-9 space-y-6">
              
              {/* Toolbar Controls */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-2xl p-4 shadow-sm">
                
                {/* Search Bar */}
                <div className="relative w-full sm:max-w-xs">
                  <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                    className="w-full rounded-xl border border-gray-200 bg-beige-50/30 py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-forest-500 dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                  />
                </div>

                {/* Mobile Filter toggle button / Sort Options */}
                <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-end items-center">
                  
                  {/* Mobile Filters toggler */}
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="lg:hidden flex items-center gap-1.5 border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold text-gray-700 dark:text-sage-100 dark:border-forest-800"
                  >
                    <FiSliders /> Filters
                  </button>

                  <div className="flex items-center gap-2 select-none">
                    <span className="text-xs font-bold text-gray-450 uppercase hidden md:inline">Sort:</span>
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="rounded-xl border border-gray-200 bg-beige-50/30 py-2 px-3 text-xs font-semibold focus:outline-none focus:border-forest-500 dark:bg-forest-950 dark:border-forest-800 dark:text-sage-100"
                    >
                      <option value="newest">Newest Arrivals</option>
                      <option value="low-to-high">Price: Low to High</option>
                      <option value="high-to-low">Price: High to Low</option>
                      <option value="ratings">Top Rated</option>
                    </select>
                  </div>

                </div>

              </div>

              {/* Products list or skeletons */}
              {loading ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, idx) => (
                    <div key={idx} className="h-96 rounded-3xl bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 p-4 space-y-4 animate-pulse">
                      <div className="aspect-square rounded-2xl bg-beige-100 dark:bg-forest-950"></div>
                      <div className="h-4 w-1/3 bg-beige-100 dark:bg-forest-950 rounded-full"></div>
                      <div className="h-6 w-3/4 bg-beige-100 dark:bg-forest-950 rounded-full"></div>
                      <div className="h-4 w-1/2 bg-beige-100 dark:bg-forest-950 rounded-full"></div>
                    </div>
                  ))}
                </div>
              ) : paginatedProducts.length > 0 ? (
                <>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {paginatedProducts.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>

                  {/* Pagination control */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2 pt-10 select-none">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold hover:bg-white disabled:opacity-40 transition duration-300 dark:border-forest-800 dark:text-white"
                      >
                        Prev
                      </button>
                      {[...Array(totalPages)].map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentPage(idx + 1)}
                          className={`rounded-xl px-4 py-2 text-sm font-bold transition duration-300 border ${
                            currentPage === idx + 1
                              ? "bg-forest-750 text-white border-forest-750"
                              : "bg-white text-gray-700 border-gray-200 hover:bg-beige-100 dark:bg-forest-900 dark:text-sage-100 dark:border-forest-800"
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold hover:bg-white disabled:opacity-40 transition duration-300 dark:border-forest-800 dark:text-white"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20 bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-10 shadow-sm max-w-md mx-auto">
                  <span className="text-4xl mb-4 block">🔍</span>
                  <h3 className="font-heading text-xl font-bold text-gray-800 dark:text-white mb-2">No Products Found</h3>
                  <p className="text-sm text-gray-500 dark:text-sage-100 leading-relaxed mb-6">
                    Try adjusting your filters or search keywords to explore alternative herbal products.
                  </p>
                  <button onClick={clearAllFilters} className="rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-semibold text-xs px-6 py-2.5 transition dark:bg-forest-600 dark:hover:bg-forest-700 shadow-sm">
                    Clear All Filters
                  </button>
                </div>
              )}

            </main>

          </div>
        </Container>
      </div>

      {/* Mobile Filters Modal Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm lg:hidden select-none">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            className="w-full max-w-xs bg-white dark:bg-forest-900 h-full p-6 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-forest-850 pb-3">
                <h3 className="font-heading text-lg font-bold text-gray-850 dark:text-white flex items-center gap-1.5">
                  <FiSliders /> Filters
                </h3>
                <button onClick={() => setShowMobileFilters(false)} className="p-1.5 text-gray-400 hover:text-gray-600">
                  <FiX className="text-xl" />
                </button>
              </div>

              {/* Mobile Filter panels */}
              <div className="space-y-6 overflow-y-auto max-h-[70vh]">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-400 uppercase">Category</h4>
                  <div className="flex flex-col gap-2">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center gap-2 text-sm text-gray-700 dark:text-sage-100 cursor-pointer">
                        <input
                          type="radio"
                          name="mobileCategory"
                          checked={category === cat}
                          onChange={() => { setCategory(cat); setCurrentPage(1); }}
                          className="text-forest-650 rounded-full"
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-forest-850">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-xs font-bold text-gray-400 uppercase">Max Price</h4>
                    <span className="text-sm font-bold text-forest-750 dark:text-sage-100 font-sans">Rs. {priceRange}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="600"
                    step="50"
                    value={priceRange}
                    onChange={(e) => { setPriceRange(parseInt(e.target.value)); setCurrentPage(1); }}
                    className="w-full accent-forest-700"
                  />
                </div>

                <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-forest-850">
                  <h4 className="text-xs font-bold text-gray-400 uppercase">Availability</h4>
                  <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-sage-100 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => { setInStockOnly(e.target.checked); setCurrentPage(1); }}
                      className="rounded border-gray-300 text-forest-600 focus:ring-forest-500"
                    />
                    <span>In Stock Only</span>
                  </label>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-semibold py-3 transition duration-300 dark:bg-forest-600 dark:hover:bg-forest-700 cursor-pointer text-center"
            >
              Apply Filters
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}