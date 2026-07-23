import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import SEO from "../components/common/SEO";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" />
      <div className="bg-beige-50 dark:bg-forest-950 min-h-[70vh] flex items-center justify-center py-20 transition-colors duration-300">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto text-center bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-8 md:p-12 shadow-sm"
          >
            <span className="text-6xl mb-6 block">🍃</span>
            <h1 className="font-heading text-6xl font-extrabold text-forest-850 dark:text-white mb-4">
              404
            </h1>
            <h2 className="font-heading text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Lost in the Forest
            </h2>
            <p className="text-gray-500 dark:text-sage-100 text-sm md:text-base leading-relaxed mb-8">
              The page you are looking for has either been pruned, renamed, or never existed in the Sugandhika garden.
            </p>
            <Link
              to="/"
              className="inline-block rounded-xl bg-forest-700 px-8 py-3.5 font-semibold text-white hover:bg-forest-800 transition duration-300 dark:bg-forest-600 dark:hover:bg-forest-700 shadow-md shadow-forest-800/10"
            >
              Return to Safety
            </Link>
          </motion.div>
        </Container>
      </div>
    </>
  );
}
