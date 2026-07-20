import { FaStar } from "react-icons/fa";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const testimonials = [
  {
    name: "Aarav Sharma",
    location: "Kathmandu",
    review:
      "Sugandhika herbal spray keeps mosquitoes away without any harsh smell. My family loves it!",
    rating: 5,
  },
  {
    name: "Priya Rai",
    location: "Pokhara",
    review:
      "Finally, a natural mosquito repellent that actually works. Highly recommended.",
    rating: 5,
  },
  {
    name: "Suman Thapa",
    location: "Butwal",
    review:
      "Excellent quality and beautiful packaging. I will definitely buy again.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionTitle
          title="What Our Customers Say"
          subtitle="Trusted by families across Nepal."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-gray-100 bg-white p-8 shadow-md transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-4 flex text-yellow-400">
                {[...Array(item.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <p className="italic text-gray-600">
                "{item.review}"
              </p>

              <div className="mt-6">
                <h3 className="font-bold text-forest-700">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}