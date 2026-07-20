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
    <footer className="bg-forest-900 text-white dark:bg-forest-950">
      
      {/* Top Banner: Trust Badges */}
      <div className="border-b border-forest-800 py-10 px-6">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌱</span>
            <div>
              <h4 className="font-semibold text-sm">100% Natural</h4>
              <p className="text-xs text-forest-200">Citronella, neem & lemongrass</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">👶</span>
            <div>
              <h4 className="font-semibold text-sm">Safe for Kids</h4>
              <p className="text-xs text-forest-200">DEET-free & non-toxic formulas</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🐾</span>
            <div>
              <h4 className="font-semibold text-sm">Pet Friendly</h4>
              <p className="text-xs text-forest-200">Safe protection for furry friends</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🇳🇵</span>
            <div>
              <h4 className="font-semibold text-sm">Handcrafted in Nepal</h4>
              <p className="text-xs text-forest-200">Supporting local organic farmers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>🌿</span>
              <span className="font-heading font-semibold text-2xl">Sugandhika</span>
            </Link>
            <p className="text-sm text-forest-100 leading-relaxed">
              Protecting your home and family naturally. Our premium range of organic mosquito repellents is crafted with love and care from purest Nepalese Ayurvedic extracts.
            </p>
            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-gold-400 transition" aria-label="Facebook"><FiFacebook /></a>
              <a href="#" className="hover:text-gold-400 transition" aria-label="Instagram"><FiInstagram /></a>
              <a href="#" className="hover:text-gold-400 transition" aria-label="Twitter"><FiTwitter /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg text-gold-500 mb-6">Quick Links</h3>
            <div className="flex flex-col gap-3 text-sm text-forest-100">
              <Link to="/shop" className="hover:text-white transition">Explore Shop</Link>
              <Link to="/blog" className="hover:text-white transition">Blogs & News</Link>
              <Link to="/about" className="hover:text-white transition">Our Story (About)</Link>
              <Link to="/contact" className="hover:text-white transition">Contact Us</Link>
              <Link to="/faq" className="hover:text-white transition">FAQs</Link>
            </div>
          </div>

          {/* Policy Pages */}
          <div>
            <h3 className="font-heading font-semibold text-lg text-gold-500 mb-6">Policies</h3>
            <div className="flex flex-col gap-3 text-sm text-forest-100">
              <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link>
              <Link to="/refund-policy" className="hover:text-white transition">Refund & Return Policy</Link>
              <Link to="/shipping-policy" className="hover:text-white transition">Shipping Policy</Link>
            </div>
          </div>

          {/* Newsletter / Payment Methods */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-heading font-semibold text-lg text-gold-500 mb-6">Join Our Newsletter</h3>
              <p className="text-sm text-forest-100 mb-4">Subscribe for herbal tips and exclusive offers.</p>
              <form onSubmit={handleSubscribe} className="relative flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg bg-forest-800 px-4 py-3 text-sm text-white placeholder-forest-200 outline-none border border-forest-750 focus:border-gold-400"
                />
                <button type="submit" className="absolute top-2 right-2 bg-gold-500 p-1.5 rounded-md hover:bg-gold-600 transition" aria-label="Subscribe">
                  <FiSend className="text-forest-900" />
                </button>
              </form>
            </div>

            {/* Payment Methods */}
            <div>
              <h4 className="font-semibold text-sm text-gold-500 mb-3">Accepted Payments</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-forest-800 text-xs px-2.5 py-1.5 rounded-md border border-forest-750 font-bold text-green-400">eSewa</span>
                <span className="bg-forest-800 text-xs px-2.5 py-1.5 rounded-md border border-forest-750 font-bold text-purple-400">Khalti</span>
                <span className="bg-forest-800 text-xs px-2.5 py-1.5 rounded-md border border-forest-750 font-semibold text-amber-400">Cash on Delivery</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-forest-950 py-6 px-6 text-center text-xs text-forest-200">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Sugandhika E-Commerce Platform. All Rights Reserved.</p>
          <p className="text-forest-300">Natural Protection. Family Safe.</p>
        </div>
      </div>

    </footer>
  );
}