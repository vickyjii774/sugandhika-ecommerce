import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "../components/ui/Container";
import SEO from "../components/common/SEO";
import { FiUser, FiMail, FiPhone, FiLock, FiUserPlus } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword, termsAccepted } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!termsAccepted) {
      toast.error("You must accept the Terms and Conditions.");
      return;
    }

    setLoading(true);
    const result = await register(email, password, firstName, lastName);
    setLoading(false);
    if (result.success) {
      navigate("/login");
    }
  };

  return (
    <>
      <SEO title="Create Account" />
      <div className="bg-beige-50 dark:bg-forest-950 min-h-[85vh] flex items-center justify-center py-20 transition-colors duration-300">
        <Container>
          <div className="max-w-md mx-auto bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-8 md:p-10 shadow-sm">
            
            {/* Header */}
            <div className="text-center mb-8">
              <span className="text-3xl">🌿</span>
              <h1 className="font-heading text-3xl font-bold text-forest-900 dark:text-white mt-3">
                Create Account
              </h1>
              <p className="text-xs text-gray-400 dark:text-sage-200 mt-1 uppercase tracking-wider font-semibold">
                Join Sugandhika and shop organic
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">First Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-3 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Last Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-3 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="98XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Confirm Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 py-1 select-none">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                  className="rounded border-gray-300 text-forest-600 focus:ring-forest-500"
                />
                <label htmlFor="terms" className="text-xs text-gray-600 dark:text-sage-100">
                  I agree to the{" "}
                  <Link to="/terms" className="font-semibold text-forest-750 hover:underline dark:text-sage-200">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy-policy" className="font-semibold text-forest-750 hover:underline dark:text-sage-200">
                    Privacy Policy
                  </Link>
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
                    Register <FiUserPlus />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500 dark:text-sage-200 mt-8">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-forest-750 hover:underline dark:text-sage-100">
                Sign in here
              </Link>
            </p>

          </div>
        </Container>
      </div>
    </>
  );
}