import { FiSend } from "react-icons/fi";
import Container from "../ui/Container";
import Button from "../ui/Button";

export default function Newsletter() {
  return (
    <section className="bg-forest-700 py-20 text-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-4xl font-bold">
            Stay Updated 🌿
          </h2>

          <p className="mt-4 text-gray-200">
            Subscribe to receive the latest herbal products, offers and health
            tips directly in your inbox.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl px-5 py-4 text-gray-800 outline-none"
            />

            <Button className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600">
              Subscribe
              <FiSend />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}