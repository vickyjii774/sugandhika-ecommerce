import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "../components/ui/Container";
import SEO from "../components/common/SEO";
import { FiMail, FiArrowLeft, FiSend } from "react-icons/fi";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    setLoading(true);
    const result = await forgotPassword(email);
    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    }
  };

  return (
    <>
      <SEO title="Forgot Password" />
      <div className="bg-beige-50 dark:bg-forest-950 min-h-[70vh] flex items-center justify-center py-20 transition-colors duration-300">
        <Container>
          <div className="max-w-md mx-auto bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-8 md:p-10 shadow-sm">
            
            {/* Back to Login */}
            <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-forest-750 transition mb-6">
              <FiArrowLeft /> Back to login
            </Link>

            {submitted ? (
              <div className="text-center space-y-4">
                <span className="text-4xl block">📩</span>
                <h1 className="font-heading text-2xl font-bold text-gray-800 dark:text-white">Check Your Inbox</h1>
                <p className="text-sm text-gray-500 dark:text-sage-100 leading-relaxed">
                  We've dispatched password reset links to <span className="font-semibold text-forest-700 dark:text-sage-200">{email}</span>. Click the link to complete verification.
                </p>
              </div>
            ) : (
              <div>
                <h1 className="font-heading text-2xl font-bold text-gray-800 dark:text-white mb-2">Forgot Password?</h1>
                <p className="text-xs text-gray-405 mb-6">Enter your registered email address below, and we will send you a password recovery verification link.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
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

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-forest-750 hover:bg-forest-800 text-white font-semibold py-3.5 transition duration-300 disabled:opacity-50 dark:bg-forest-600 dark:hover:bg-forest-700 shadow-md shadow-forest-800/10 cursor-pointer"
                  >
                    {loading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    ) : (
                      <>
                        Send Recovery Link <FiSend />
                      </>
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
