import { Link } from "react-router-dom";
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiMenu } from "react-icons/fi";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-700">
          🌿 Sugandhika
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 text-xl">
          <button><FiSearch /></button>
          <button><FiHeart /></button>
        <Link to="/cart">
        <FiShoppingCart />
        </Link>
          <button><FiUser /></button>

          <button className="md:hidden">
            <FiMenu />
          </button>
        </div>
      </nav>
    </header>
  );
}