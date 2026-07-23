import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "../components/ui/Container";
import SEO from "../components/common/SEO";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate("/profile");
    }
  };

  const handleSocialLogin = (platform) => {
    toast.success(`Redirecting to ${platform} Login (Simulated)... 🌿`);
  };

  return (
    <>
      <SEO title="Sign In" />
      <div className="bg-beige-50 dark:bg-forest-950 min-h-[80vh] flex items-center justify-center py-20 transition-colors duration-300">
        <Container>
          <div className="max-w-md mx-auto bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-8 md:p-10 shadow-sm">
            
            {/* Header */}
            <div className="text-center mb-8">
              <span className="text-3xl">🌿</span>
              <h1 className="font-heading text-3xl font-bold text-forest-900 dark:text-white mt-3">
                Welcome Back
              </h1>
              <p className="text-xs text-gray-400 dark:text-sage-200 mt-1 uppercase tracking-wider font-semibold">
                Sign in to your Sugandhika account
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-bold text-gray-500 uppercase">Password</label>
                  <Link to="/forgot-password" className="text-xs font-semibold text-forest-700 hover:underline dark:text-sage-200">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between py-1">
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-sage-100 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-forest-600 focus:ring-forest-500"
                  />
                  <span>Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-semibold py-3.5 transition duration-300 disabled:opacity-50 dark:bg-forest-600 dark:hover:bg-forest-700 shadow-md shadow-forest-800/10 cursor-pointer"
              >
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                    Sign In <FiLogIn />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-150 dark:border-forest-800"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-gray-400 uppercase">Or continue with</span>
              <div className="flex-grow border-t border-gray-150 dark:border-forest-800"></div>
            </div>

            {/* Social Logins */}
            <div className="grid gap-3 grid-cols-2">
              <button
                onClick={() => handleSocialLogin("Google")}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-250 py-3 text-sm text-gray-600 hover:bg-gray-50 transition dark:border-forest-850 dark:text-sage-100 dark:hover:bg-forest-800/40"
              >
                <FaGoogle className="text-red-500" />
                <span>Google</span>
              </button>
              <button
                onClick={() => handleSocialLogin("Facebook")}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-250 py-3 text-sm text-gray-600 hover:bg-gray-50 transition dark:border-forest-850 dark:text-sage-100 dark:hover:bg-forest-800/40"
              >
                <FaFacebookF className="text-blue-600" />
                <span>Facebook</span>
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500 dark:text-sage-200 mt-8">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-forest-750 hover:underline dark:text-sage-100">
                Register here
              </Link>
            </p>

          </div>
        </Container>
      </div>
    </>
  );
}