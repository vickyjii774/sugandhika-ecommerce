import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import SEO from "../components/common/SEO";
import { motion } from "framer-motion";
import { FiCalendar, FiUser, FiArrowRight } from "react-icons/fi";

const blogsMock = [
  {
    slug: "deet-free-repellents-guide",
    title: "The Ultimate Guide to DEET-Free Mosquito Repellents",
    excerpt: "Discover how steam-distilled essential oils offer protective barriers against mosquitoes without the chemical hazards of DEET.",
    date: "July 20, 2026",
    author: "Dr. Anjali R.",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600"
  },
  {
    slug: "charcoal-free-incense-benefits",
    title: "Why Charcoal-Free Incense is Essential for Infant Health",
    excerpt: "Most standard coils release toxic soot and carbon smoke. Learn how charcoal-free, resin-based incense sticks protect children's lungs.",
    date: "July 15, 2026",
    author: "Prasanna K.",
    category: "Baby Safety",
    image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=600"
  },
  {
    slug: "5-ayurvedic-herbs-for-protection",
    title: "5 Himalayan Herbs That Repel Mosquitoes Instantly",
    excerpt: "From wild Pokhara citronella to bitter neem extracts, explore the natural defenses that nature has gifted us.",
    date: "July 08, 2026",
    author: "Sujata Shrestha",
    category: "Herbs Guide",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600"
  }
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Wellness", "Baby Safety", "Herbs Guide"];

  const filteredBlogs = blogsMock.filter(
    (blog) => activeCategory === "All" || blog.category === activeCategory
  );

  return (
    <>
      <SEO title="Blogs & Articles" description="Explore our articles on Ayurvedic herbal mosquito repellents, infant respiratory safety, organic farming in Pokhara, and natural wellness tips." />
      <div className="bg-beige-50 dark:bg-forest-950 min-h-screen py-16 transition-colors duration-300">
        <Container>
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-forest-600 dark:text-sage-200">Sugandhika Journal</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-forest-900 dark:text-white mt-4 mb-4">
              Herbal Wisdom & Safety
            </h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-sage-100">
              Read recommendations from pediatricians and wellness experts on protecting your home naturally and understanding our ingredients.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition duration-300 border ${
                  activeCategory === cat
                    ? "bg-forest-750 text-white border-forest-750"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-beige-100 dark:bg-forest-900 dark:text-sage-100 dark:border-forest-800 cursor-pointer"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Editorial Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {filteredBlogs.map((blog, idx) => (
              <motion.article
                key={blog.slug}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition duration-300"
              >
                {/* Image block */}
                <div className="relative aspect-video overflow-hidden bg-beige-50">
                  <Link to={`/blog/${blog.slug}`}>
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                  </Link>
                  <span className="absolute top-4 left-4 bg-white/80 dark:bg-forest-950/80 backdrop-blur-md text-[10px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full text-forest-800 dark:text-sage-200">
                    {blog.category}
                  </span>
                </div>

                {/* Content block */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 select-none">
                    <span className="flex items-center gap-1"><FiCalendar /> {blog.date}</span>
                    <span className="flex items-center gap-1"><FiUser /> {blog.author}</span>
                  </div>

                  <h2 className="font-heading text-xl font-bold text-gray-800 dark:text-white mb-3 hover:text-forest-650 transition">
                    <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-sage-200 leading-relaxed mb-6 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <Link
                    to={`/blog/${blog.slug}`}
                    className="flex items-center gap-1.5 text-sm font-bold text-forest-750 hover:text-forest-850 dark:text-sage-100 mt-auto hover:underline"
                  >
                    <span>Read Article</span>
                    <FiArrowRight />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

        </Container>
      </div>
    </>
  );
}
