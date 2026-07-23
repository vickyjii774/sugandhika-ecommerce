import Container from "../components/ui/Container";
import SEO from "../components/common/SEO";

export default function RefundPolicy() {
  return (
    <>
      <SEO title="Refund & Return Policy" />
      <div className="bg-beige-50 dark:bg-forest-950 py-16 transition-colors duration-300">
        <Container>
          <div className="max-w-3xl mx-auto bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-8 md:p-12 shadow-sm">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-forest-900 dark:text-white mb-6">
              Refund & Return Policy
            </h1>
            <p className="text-sm text-gray-400 mb-8">Last Updated: July 20, 2026</p>

            <div className="space-y-6 text-gray-600 dark:text-sage-100 leading-relaxed text-sm md:text-base">
              <section>
                <h2 className="font-heading text-xl font-bold text-gray-800 dark:text-white mb-3">1. Return Window</h2>
                <p>
                  As we sell natural and consumable hygiene/wellness products, returns are accepted within 7 days of delivery only if the items are unopened, unused, and in their original packaging.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-gray-800 dark:text-white mb-3">2. Damaged or Defective Goods</h2>
                <p>
                  If you receive damaged, defective, or incorrect items, please contact us immediately at <span className="text-forest-700 dark:text-sage-200 font-semibold font-sans">support@sugandhika.com</span> with details and photos. We will organize a free replacement delivery.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-gray-800 dark:text-white mb-3">3. Processing Refunds</h2>
                <p>
                  Once returns are received and checked, we will send an email confirmation. Refunds are processed back to the original eSewa/Khalti account or via bank transfer within 5-7 business days. Shipping charges are non-refundable.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
