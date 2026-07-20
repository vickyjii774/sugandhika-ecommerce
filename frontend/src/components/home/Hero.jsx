import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-linear-to-br from-green-50 via-white to-green-100">
      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-between gap-12 px-6 py-20 md:flex-row">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            🌿 100% Natural Mosquito Protection
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-gray-900 md:text-7xl">
            Keep Your Family
            <span className="block text-green-700">Mosquito Free</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-600">
            Sugandhika brings nature-powered mosquito protection made from
            herbal ingredients like citronella, neem, lemongrass and eucalyptus.
          </p>

          <div className="mt-10 flex gap-4">
            <Link to="/shop">
  <button className="rounded-xl bg-green-700 px-6 py-3 text-white">
    Shop Now
  </button>
</Link>

            <button className="flex items-center gap-2 rounded-xl border border-green-700 px-7 py-4 font-semibold text-green-700 transition hover:bg-green-50">
              Learn More
              <FiArrowRight />
            </button>
          </div>

          <div className="mt-12 flex gap-12">
            <div>
              <h2 className="text-3xl font-bold text-green-700">10K+</h2>
              <p className="text-gray-500">Happy Customers</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-green-700">100%</h2>
              <p className="text-gray-500">Natural</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-green-700">24/7</h2>
              <p className="text-gray-500">Protection</p>
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-1 justify-center"
        >
          <div className="flex h-[450px] w-[450px] items-center justify-center rounded-full bg-green-200 shadow-2xl">
            <div className="text-center">
              <div className="text-8xl">🌿</div>
              <p className="mt-4 text-xl font-bold text-green-800">
                Product Image
              </p>
              <p className="text-gray-600">
                (We'll replace this with your real product photo)
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}