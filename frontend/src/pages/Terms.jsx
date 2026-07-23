import Container from "../components/ui/Container";
import SEO from "../components/common/SEO";

export default function Terms() {
  return (
    <>
      <SEO title="Terms & Conditions" />
      <div className="bg-beige-50 dark:bg-forest-950 py-16 transition-colors duration-300">
        <Container>
          <div className="max-w-3xl mx-auto bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-8 md:p-12 shadow-sm">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-forest-900 dark:text-white mb-6">
              Terms & Conditions
            </h1>
            <p className="text-sm text-gray-400 mb-8">Last Updated: July 20, 2026</p>

            <div className="space-y-6 text-gray-600 dark:text-sage-100 leading-relaxed text-sm md:text-base">
              <section>
                <h2 className="font-heading text-xl font-bold text-gray-800 dark:text-white mb-3">1. Agreement to Terms</h2>
                <p>
                  By accessing and utilizing the Sugandhika web platform, you agree to comply with and be bound by these terms. If you disagree with any portion of these conditions, please refrain from using our e-commerce portal.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-gray-800 dark:text-white mb-3">2. Products & Inventory</h2>
                <p>
                  We aim to display product descriptions, pricing, ingredients, and stock parameters as accurately as possible. Sugandhika reserves the right to modify prices, discontinue herbal products, or limit purchase quantities without prior notification.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-gray-800 dark:text-white mb-3">3. Payments & Order Placements</h2>
                <p>
                  By submitting an order, you agree to make full payment via COD (Cash on Delivery) or our listed eSewa/Khalti interfaces. We verify all transactions before fulfillment. Fraudulent attempts will result in immediate termination of user profiles.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-gray-800 dark:text-white mb-3">4. Intellectual Property</h2>
                <p>
                  All website designs, branding elements, logo graphics, images, descriptions, and written content are the exclusive property of Sugandhika and protected under intellectual property guidelines.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
