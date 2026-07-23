import Container from "../components/ui/Container";
import SEO from "../components/common/SEO";

export default function ShippingPolicy() {
  return (
    <>
      <SEO title="Shipping Policy" />
      <div className="bg-beige-50 dark:bg-forest-950 py-16 transition-colors duration-300">
        <Container>
          <div className="max-w-3xl mx-auto bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-8 md:p-12 shadow-sm">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-forest-900 dark:text-white mb-6">
              Shipping Policy
            </h1>
            <p className="text-sm text-gray-400 mb-8">Last Updated: July 20, 2026</p>

            <div className="space-y-6 text-gray-600 dark:text-sage-100 leading-relaxed text-sm md:text-base">
              <section>
                <h2 className="font-heading text-xl font-bold text-gray-800 dark:text-white mb-3">1. Delivery Zones & Timeline</h2>
                <p>
                  We coordinate deliveries across Nepal. Orders in the Kathmandu Valley are shipped within 24-48 business hours. Deliveries outside Kathmandu Valley take between 2 to 4 business days.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-gray-800 dark:text-white mb-3">2. Shipping Charges</h2>
                <p>
                  Delivery inside Kathmandu Valley is Rs. 100, and free for orders over Rs. 1,500. Out-of-valley shipping is a flat rate of Rs. 150. Shipping charges are computed at the checkout stage.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-gray-800 dark:text-white mb-3">3. Shipments Tracking</h2>
                <p>
                  Once dispatched, you will receive an SMS or email listing your tracking credentials. You can track your order using the code in our tracking page under the user profile dashboard.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
