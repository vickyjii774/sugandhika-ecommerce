import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiShield, FiSmile, FiHeart, FiAward, FiCheck } from "react-icons/fi";
import api from "../services/api";
import ProductCard from "../components/product/ProductCard";
import SEO from "../components/common/SEO";
import productsMock from "../data/products";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get("/products");
        if (res.data.success && res.data.products.length > 0) {
          setFeaturedProducts(res.data.products.filter(p => p.isFeatured).slice(0, 3));
        } else {
          setFeaturedProducts(productsMock);
        }
      } catch (err) {
        console.warn("Backend not accessible, falling back to mock data.");
        setFeaturedProducts(productsMock);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const stats = [
    { number: "10K+", label: "Happy Families Protection" },
    { number: "100%", label: "Natural Organic Herbs" },
    { number: "45 Min", label: "Slow Burn Protection" },
    { number: "DEET", label: "Free & Non-Toxic Safe" }
  ];

  const faqs = [
    {
      q: "Are Sugandhika products safe for babies?",
      a: "Yes, Sugandhika products are made from 100% herbal ingredients such as Citronella, Neem, and Lemongrass. They do not contain DEET, d-trans-allethrin, or other toxic chemicals, making them safe for kids, babies, and pets when used as directed."
    },
    {
      q: "How long do the incense sticks burn?",
      a: "Each Sugandhika incense stick burns for approximately 45 minutes, and the natural aroma continues to repel mosquitoes for another 2 to 3 hours after burning."
    },
    {
      q: "Do you offer cash on delivery?",
      a: "Yes, we offer Cash on Delivery (COD) inside Kathmandu valley and other major cities in Nepal. You can also pay online via eSewa or Khalti."
    }
  ];

  return (
    <>
      <SEO title="Home" />

      {/* 1. Full Screen Hero Section */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-gradient-to-br from-sage-100 via-beige-50 to-sage-200 py-20 dark:from-forest-950 dark:to-forest-900">
        
        {/* Animated Background Details */}
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-forest-200/30 blur-3xl dark:bg-forest-800/10"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, -15, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-sage-200/40 blur-3xl dark:bg-forest-800/20"
          />
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 items-center relative z-10">
          {/* Hero Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-forest-100 px-3.5 py-1.5 text-sm font-semibold text-forest-800 dark:bg-forest-900/60 dark:text-sage-100">
              <span>🍃</span> 100% Herbal Mosquito Repellents
            </div>
            
            <h1 className="font-heading text-5xl font-semibold leading-[1.1] text-forest-900 dark:text-white md:text-6xl">
              Protect Your Family <br />
              <span className="italic text-forest-600 dark:text-sage-200">Naturally & Gently</span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-sage-100 max-w-lg leading-relaxed">
              Crafted from pure citronella, neem, eucalyptus, and organic resin. Say goodbye to toxic chemical coils and protect your home with premium, Ayurvedic herbal care.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                to="/shop"
                className="flex items-center gap-2 rounded-xl bg-forest-700 px-8 py-4 font-semibold text-white shadow-lg shadow-forest-800/20 hover:bg-forest-800 transition duration-300 dark:bg-forest-600 dark:hover:bg-forest-700"
              >
                Shop Collection <FiArrowRight />
              </Link>
              <Link
                to="/about"
                className="rounded-xl border border-forest-600 px-8 py-4 font-semibold text-forest-700 hover:bg-forest-50 transition duration-300 dark:text-sage-100 dark:hover:bg-forest-900"
              >
                Explore Story
              </Link>
            </div>
          </motion.div>

          {/* Hero Right: Premium Image Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative h-[420px] w-[340px] md:h-[480px] md:w-[380px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60 dark:border-forest-800/50 bg-beige-200">
              <img
                src="https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=800"
                alt="Sugandhika Premium Incense Sticks"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs uppercase tracking-widest font-semibold text-gold-400">Ayurvedic Craftsmanship</span>
                <h3 className="font-heading text-2xl font-bold">Natural Mosquito Incense</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="bg-forest-900 py-16 text-white dark:bg-forest-950">
        <div className="mx-auto max-w-7xl px-6 grid gap-8 sm:grid-cols-2 md:grid-cols-4 text-center">
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col gap-1 border-r last:border-0 border-forest-800"
            >
              <span className="font-heading text-4xl md:text-5xl font-extrabold text-gold-400">{s.number}</span>
              <span className="text-sm text-forest-200 font-medium">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Why Choose Sugandhika (Organic Grid) */}
      <section className="py-24 px-6 bg-beige-50 dark:bg-forest-900">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-950 dark:text-white">Why Choose Sugandhika?</h2>
            <p className="mt-4 text-gray-500 dark:text-sage-100">Our commitment is to offer powerful mosquito defense solutions that honor nature and prioritize your health.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm dark:bg-forest-950 dark:border-forest-900">
              <div className="h-12 w-12 rounded-xl bg-forest-100 flex items-center justify-center text-forest-700 text-xl font-bold dark:bg-forest-900 dark:text-sage-100 mb-6">🌿</div>
              <h3 className="text-lg font-bold mb-3 dark:text-sage-100">100% Ayurvedic Base</h3>
              <p className="text-sm text-gray-500 leading-relaxed dark:text-sage-200">Crafted strictly from plants extracts, eucalyptus oils, citronella essences, wood dust, and natural resin. No chemicals.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm dark:bg-forest-950 dark:border-forest-900">
              <div className="h-12 w-12 rounded-xl bg-forest-100 flex items-center justify-center text-forest-700 text-xl font-bold dark:bg-forest-900 dark:text-sage-100 mb-6">👶</div>
              <h3 className="text-lg font-bold mb-3 dark:text-sage-100">Family & Infant Safe</h3>
              <p className="text-sm text-gray-500 leading-relaxed dark:text-sage-200">Free from toxic charcoal dust, synthetic fragrances, and harmful DEET chemicals. Safe to inhale around children and elderly.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm dark:bg-forest-950 dark:border-forest-900">
              <div className="h-12 w-12 rounded-xl bg-forest-100 flex items-center justify-center text-forest-700 text-xl font-bold dark:bg-forest-900 dark:text-sage-100 mb-6">🐰</div>
              <h3 className="text-lg font-bold mb-3 dark:text-sage-100">Cruelty-Free & Green</h3>
              <p className="text-sm text-gray-500 leading-relaxed dark:text-sage-200">Ethically handmade by local co-operatives in Nepal. Biodegradable packaging, organic harvesting, and zero animal testing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Products Showcase */}
      <section className="py-24 px-6 bg-white dark:bg-forest-950">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-baseline mb-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-950 dark:text-white">Our Best Sellers</h2>
              <p className="text-sm text-gray-500 mt-2 dark:text-sage-200">Pure botanical defense. Shop our highly rated repellent items.</p>
            </div>
            <Link to="/shop" className="flex items-center gap-1.5 text-sm font-semibold text-forest-700 hover:text-forest-800 transition dark:text-sage-100 mt-4 sm:mt-0">
              View All Products <FiArrowRight />
            </Link>
          </div>

          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-forest-600 border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. Testimonial Section */}
      <section className="py-24 px-6 bg-beige-50 dark:bg-forest-900">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-3xl text-gold-500 font-bold">“</span>
          <h2 className="font-heading text-3xl font-bold text-forest-950 dark:text-white mb-6">What Families Say</h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white/80 p-8 rounded-3xl shadow-sm glass dark:bg-forest-950/80 dark:border-forest-800"
          >
            <p className="text-lg italic text-gray-700 leading-relaxed dark:text-sage-100">
              "We have babies at home and mosquitoes in Kathmandu are a real threat. Sugandhika natural sticks give me peace of mind because they don't produce choking black smoke, yet they keep the rooms bug-free. The herbal aroma is amazing!"
            </p>
            <div className="mt-6 flex flex-col items-center">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
                alt="Aarav's Mother"
                className="h-14 w-14 rounded-full object-cover shadow-md border-2 border-forest-500"
              />
              <span className="mt-3 font-bold text-sm text-gray-800 dark:text-white">Aarav's Mother</span>
              <span className="text-xs text-gray-400">Kathmandu, Nepal</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-24 px-6 bg-white dark:bg-forest-950">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-forest-950 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-sm text-gray-500 mt-2 dark:text-sage-200">Got questions? We have natural answers.</p>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-150 rounded-2xl overflow-hidden dark:border-forest-900"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="flex w-full justify-between items-center px-6 py-4 text-left font-bold text-gray-800 hover:bg-beige-50 transition dark:text-sage-100 dark:hover:bg-forest-900"
                >
                  <span>{faq.q}</span>
                  <span>{activeFaq === idx ? "−" : "+"}</span>
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-5 pt-1 text-sm text-gray-500 leading-relaxed dark:text-sage-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}