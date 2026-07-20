import { useState } from "react";
import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter, FiSend } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (email.trim()) {
      toast.success("Thank you for subscribing to our newsletter! 🌿");
      setEmail("");
    }
  };

  return (
    <footer className="mt-auto bg-forest-900 text-white dark:bg-forest-950">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-semibold"
            >
              <span>🌿</span>
              <span>Sugandhika</span>
            </Link>

            <p className="text-sm text-forest-100 leading-relaxed">
              Protecting your home and family naturally. Our premium range of
              organic mosquito repellents is crafted with love and care from
              pure Nepalese Ayurvedic extracts.
            </p>

            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-gold-400">
                <FiFacebook />
              </a>
              <a href="#" className="hover:text-gold-400">
                <FiInstagram />
              </a>
              <a href="#" className="hover:text-gold-400">
                <FiTwitter />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gold-500">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2 text-sm text-forest-100">
              <Link to="/shop">Explore Shop</Link>
              <Link to="/blog">Blogs & News</Link>
              <Link to="/about">Our Story</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/faq">FAQs</Link>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gold-500">
              Policies
            </h3>

            <div className="flex flex-col gap-2 text-sm text-forest-100">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/refund-policy">Refund Policy</Link>
              <Link to="/shipping-policy">Shipping Policy</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gold-500">
              Join Our Newsletter
            </h3>

            <p className="mb-4 text-sm text-forest-100">
              Subscribe for herbal tips and exclusive offers.
            </p>

            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-forest-700 bg-forest-800 px-4 py-3 text-sm text-white placeholder-forest-300 focus:border-gold-500 focus:outline-none"
              />

              <button
                type="submit"
                className="absolute right-2 top-2 rounded-md bg-gold-500 p-2 hover:bg-gold-600"
              >
                <FiSend className="text-forest-900" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-forest-800 bg-forest-950 py-3">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 text-center text-xs text-forest-200 md:flex-row">
          <p>
            © {new Date().getFullYear()} Sugandhika E-Commerce Platform. All
            Rights Reserved.
          </p>

          <p className="text-forest-300">
            Natural Protection. Family Safe.
          </p>
        </div>
      </div>
    </footer>
  );
}