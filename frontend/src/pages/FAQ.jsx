import { useState } from "react";
import Container from "../components/ui/Container";
import SEO from "../components/common/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiHelpCircle } from "react-icons/fi";

const faqData = [
  {
    category: "Product Safety",
    q: "Are Sugandhika products safe for infants and newborns?",
    a: "Absolutely. Sugandhika mosquito repellents are 100% DEET-free, charcoal-free, and formulated exclusively with organic botanical oils (citronella, neem, eucalyptus, lemongrass). They do not release toxic residues or heavy smoke, making them perfectly safe to burn or spray around newborns, children, and pregnant women under normal ventilation."
  },
  {
    category: "Product Safety",
    q: "Can I use the repellent spray directly on my dog or cat?",
    a: "While our ingredients are non-toxic, we recommend spraying the repellent on pet bedding, collars, or indoor areas rather than directly on their skin or fur. Citronella and eucalyptus oils are highly concentrated, and pets may have sensitive skin or find the direct scent overwhelming."
  },
  {
    category: "Usage & Burning",
    q: "How long does one incense stick burn, and how long does the effect last?",
    a: "Each premium incense stick has a burn time of approximately 45 minutes. The slow-release organic smoke creates a botanical shield that continues to repel mosquitoes and other flying bugs for an additional 2 to 3 hours in an average-sized room."
  },
  {
    category: "Usage & Burning",
    q: "Can the diffuser oil be used in electric and candle vaporizers?",
    a: "Yes, our Pure Citronella Diffuser Oil is highly versatile. Simply add 5-8 drops into the water bowl of your electric diffuser, ultrasonic humidifier, or candle burner to purify the air and clear mosquitoes."
  },
  {
    category: "Shipping & Delivery",
    q: "What areas do you deliver to, and what are the delivery charges?",
    a: "We deliver across Nepal. Delivery within Kathmandu Valley is flat Rs. 100 (Free for orders above Rs. 1,500) and takes 24-48 hours. Outside-valley shipping is Rs. 150 and takes 2-4 business days."
  },
  {
    category: "Payments",
    q: "What payment gateways are supported?",
    a: "We support Cash on Delivery (COD) for all major cities. We also support digital instant payments via eSewa and Khalti directly through our checkout page."
  }
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState(null);

  const categories = ["All", ...new Set(faqData.map((f) => f.category))];

  const filteredFaqs = faqData.filter((faq) => {
    const matchesSearch =
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEO title="FAQs" description="Have questions about Sugandhika organic repellents? Read our frequently asked questions about product safety, ingredients, delivery, and payments." />
      <div className="bg-beige-50 min-h-screen py-16 dark:bg-forest-950 transition-colors duration-300">
        <Container>
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-forest-100 dark:bg-forest-900 text-forest-700 dark:text-sage-200 mb-4">
              <FiHelpCircle className="text-3xl" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-forest-900 dark:text-white">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-gray-500 dark:text-sage-100 text-base">
              Explore information regarding product safety, herbal ingredients, shipping timelines, and online payment methods.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-10 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search by keywords (e.g. baby safety, burn time)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-12 pr-4 shadow-sm focus:border-forest-500 focus:outline-none dark:bg-forest-900 dark:border-forest-800 dark:text-white"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(null);
                }}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-forest-750 text-white border-forest-750 shadow-md"
                    : "bg-white text-gray-600 border-gray-250 hover:bg-beige-100 dark:bg-forest-900 dark:text-sage-100 dark:border-forest-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm dark:bg-forest-900 dark:border-forest-800 transition duration-300"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="flex w-full justify-between items-center px-6 py-5 text-left font-bold text-gray-800 dark:text-white hover:bg-beige-50/50 dark:hover:bg-forest-800/40 transition duration-300"
                  >
                    <span className="font-heading text-lg md:text-xl pr-4">{faq.q}</span>
                    <span className="text-forest-600 dark:text-sage-200 font-medium text-xl">
                      {openIndex === idx ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-1 text-sm md:text-base text-gray-500 dark:text-sage-200 leading-relaxed border-t border-gray-100 dark:border-forest-800">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-sage-200 text-lg">No FAQs found matching your query.</p>
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
