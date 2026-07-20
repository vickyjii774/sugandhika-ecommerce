import { Shield, Leaf, Heart, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Leaf className="h-8 w-8 text-green-700" />,
    title: "100% Natural",
    description: "Made with herbal ingredients like citronella, neem, and eucalyptus.",
  },
  {
    icon: <Shield className="h-8 w-8 text-green-700" />,
    title: "Effective Protection",
    description: "Repels mosquitoes naturally without harsh chemicals.",
  },
  {
    icon: <Heart className="h-8 w-8 text-green-700" />,
    title: "Family Safe",
    description: "Suitable for homes with children and pets when used as directed.",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-green-700" />,
    title: "Pleasant Aroma",
    description: "Enjoy a refreshing herbal fragrance while staying protected.",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Why Choose Sugandhika?
          </h2>
          <p className="mt-4 text-gray-600">
            Natural protection for a healthier home.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-green-100 bg-green-50 p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
            >
              {feature.icon}
              <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}