import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut, FiSettings, FiSun, FiMoon } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 glass shadow-sm transition duration-300 dark:glass-dark dark:border-forest-900">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-forest-800 dark:text-sage-100">
          <span className="text-3xl">🌿</span>
          <span className="font-heading font-semibold text-2xl">Sugandhika</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={({ isActive }) => `nav-link font-medium transition duration-300 hover:text-forest-600 dark:text-sage-100 dark:hover:text-sage-200 ${isActive ? "text-forest-700 active" : "text-gray-600"}`}>
            Home
          </NavLink>
          <NavLink to="/shop" className={({ isActive }) => `nav-link font-medium transition duration-300 hover:text-forest-600 dark:text-sage-100 dark:hover:text-sage-200 ${isActive ? "text-forest-700 active" : "text-gray-600"}`}>
            Shop
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => `nav-link font-medium transition duration-300 hover:text-forest-600 dark:text-sage-100 dark:hover:text-sage-200 ${isActive ? "text-forest-700 active" : "text-gray-600"}`}>
            Blog
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link font-medium transition duration-300 hover:text-forest-600 dark:text-sage-100 dark:hover:text-sage-200 ${isActive ? "text-forest-700 active" : "text-gray-600"}`}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link font-medium transition duration-300 hover:text-forest-600 dark:text-sage-100 dark:hover:text-sage-200 ${isActive ? "text-forest-700 active" : "text-gray-600"}`}>
            Contact
          </NavLink>
        </div>

        {/* Icons / Actions */}
        <div className="flex items-center gap-5 text-xl">
          
          

          {/* Theme toggle */}
          <button onClick={toggleTheme} className="text-gray-600 transition duration-300 hover:text-forest-600 dark:text-sage-200" aria-label="Toggle theme">
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>

          {/* Wishlist Icon */}
          <Link to="/wishlist" className="relative text-gray-600 transition duration-300 hover:text-forest-600 dark:text-sage-200" aria-label="Wishlist">
            <FiHeart />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-forest-600 text-xs font-bold text-white">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="relative text-gray-600 transition duration-300 hover:text-forest-600 dark:text-sage-200" aria-label="Cart">
            <FiShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-forest-600 text-xs font-bold text-white animate-pulse">
                {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            {user ? (
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-1 text-gray-600 transition duration-300 hover:text-forest-600 dark:text-sage-200"
              >
                <FiUser />
              </button>
            ) : (
              <Link to="/login" className="text-sm font-semibold text-forest-700 hover:text-forest-950 dark:text-sage-100" aria-label="Login">
                Sign In
              </Link>
            )}

            {showProfileDropdown && user && (
              <div className="absolute right-0 mt-3 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-lg dark:border-forest-900 dark:bg-forest-950">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-forest-900">
                  <p className="text-sm font-bold text-gray-800 dark:text-sage-100">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-gray-500 truncate dark:text-sage-200">{user.email}</p>
                </div>
                
                <Link to="/dashboard" onClick={() => setShowProfileDropdown(false)} className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-beige-100 dark:text-sage-100 dark:hover:bg-forest-900">
                  <FiUser className="text-sm" /> Dashboard
                </Link>

                {(user.role === "ADMIN" || user.role === "SUPERADMIN") && (
                  <Link to="/admin" onClick={() => setShowProfileDropdown(false)} className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-beige-100 dark:text-sage-100 dark:hover:bg-forest-900">
                    <FiSettings className="text-sm" /> Admin Panel
                  </Link>
                )}

                <button
                  onClick={() => {
                    logout();
                    setShowProfileDropdown(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-forest-900"
                >
                  <FiLogOut className="text-sm" /> Log Out
                </button>
              </div>
            )}
          </div>

          {/* Hamburger Menu (Mobile) */}
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 md:hidden dark:text-sage-200" aria-label="Toggle menu">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="glass border-t border-gray-100 p-6 md:hidden dark:glass-dark dark:border-forest-900">
          

          <div className="flex flex-col gap-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="font-semibold text-gray-800 dark:text-sage-100">Home</Link>
            <Link to="/shop" onClick={() => setIsOpen(false)} className="font-semibold text-gray-800 dark:text-sage-100">Shop</Link>
            <Link to="/blog" onClick={() => setIsOpen(false)} className="font-semibold text-gray-800 dark:text-sage-100">Blog</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="font-semibold text-gray-800 dark:text-sage-100">About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="font-semibold text-gray-800 dark:text-sage-100">Contact</Link>
            
            {user ? (
              <>
                <hr className="my-2 border-gray-100 dark:border-forest-900" />
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="font-semibold text-forest-700 dark:text-sage-100">Dashboard</Link>
                {(user.role === "ADMIN" || user.role === "SUPERADMIN") && (
                  <Link to="/admin" onClick={() => setIsOpen(false)} className="font-semibold text-forest-700 dark:text-sage-100">Admin Panel</Link>
                )}
                <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left font-semibold text-red-600">Log Out</button>
              </>
            ) : (
              <>
                <hr className="my-2 border-gray-100 dark:border-forest-900" />
                <Link to="/login" onClick={() => setIsOpen(false)} className="font-semibold text-forest-700 dark:text-sage-100">Sign In</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}