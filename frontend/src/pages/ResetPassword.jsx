import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "../components/ui/Container";
import SEO from "../components/common/SEO";
import { FiLock, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Invalid reset token.");
      return;
    }
    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    const result = await resetPassword(token, password);
    setLoading(false);
    if (result.success) {
      setSuccess(true);
    }
  };

  return (
    <>
      <SEO title="Reset Password" />
      <div className="bg-beige-50 dark:bg-forest-950 min-h-[70vh] flex items-center justify-center py-20 transition-colors duration-300">
        <Container>
          <div className="max-w-md mx-auto bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-8 md:p-10 shadow-sm">
            
            {success ? (
              <div className="text-center space-y-4">
                <span className="text-4xl block text-green-500">✓</span>
                <h1 className="font-heading text-2xl font-bold text-gray-800 dark:text-white">Password Updated</h1>
                <p className="text-sm text-gray-500 dark:text-sage-100 leading-relaxed mb-6">
                  Your password has been successfully reset. You can now log in using your new credentials.
                </p>
                <Link
                  to="/login"
                  className="w-full inline-block rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-semibold py-3.5 transition duration-300 dark:bg-forest-600 dark:hover:bg-forest-700 shadow-md shadow-forest-800/10 cursor-pointer"
                >
                  Go to Login
                </Link>
              </div>
            ) : (
              <div>
                <h1 className="font-heading text-2xl font-bold text-gray-800 dark:text-white mb-2">Reset Password</h1>
                <p className="text-xs text-gray-405 mb-6">Enter your new secure password below to finalize account changes.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase">New Password</label>
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

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase">Confirm Password</label>
                    <div className="relative">
                      <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-forest-750 hover:bg-forest-800 text-white font-semibold py-3.5 transition duration-300 disabled:opacity-50 dark:bg-forest-600 dark:hover:bg-forest-700 shadow-md shadow-forest-800/10 cursor-pointer"
                  >
                    {loading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    ) : (
                      "Update Password"
                    )}
                  </button>
                </form>
              </div>
            )}

          </div>
        </Container>
      </div>
    </>
  );
}
