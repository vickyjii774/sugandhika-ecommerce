import Container from "../components/ui/Container";
import SEO from "../components/common/SEO";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO title="Privacy Policy" />
      <div className="bg-beige-50 dark:bg-forest-950 py-16 transition-colors duration-300">
        <Container>
          <div className="max-w-3xl mx-auto bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-8 md:p-12 shadow-sm">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-forest-900 dark:text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-400 mb-8">Last Updated: July 20, 2026</p>

            <div className="space-y-6 text-gray-600 dark:text-sage-100 leading-relaxed text-sm md:text-base">
              <section>
                <h2 className="font-heading text-xl font-bold text-gray-800 dark:text-white mb-3">1. Information We Collect</h2>
                <p>
                  At Sugandhika, we respect your privacy. We collect personal information you provide directly, including name, shipping address, email, phone number, and billing selections when placing orders or registering.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-gray-800 dark:text-white mb-3">2. How We Use Your Information</h2>
                <p>
                  We utilize collected information to fulfill orders, verify eSewa/Khalti transactions, coordinate Cash on Delivery shipments, communicate customer account updates, send newsletter updates (if subscribed), and optimize site browsing experiences.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-gray-800 dark:text-white mb-3">3. Data Protection & Security</h2>
                <p>
                  We implement industry-standard security protocols to guard your account. Password hashes are encrypted using bcrypt, and API exchanges are executed over secure HTTPS connections. We never sell or lease user profiles to advertising companies.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-gray-800 dark:text-white mb-3">4. Contact Information</h2>
                <p>
                  If you have queries concerning this policy or wish to request data deletions, please contact our support desk at <span className="text-forest-700 dark:text-sage-200 font-semibold">privacy@sugandhika.com</span>.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
