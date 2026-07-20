import { Link } from "react-router-dom";
import { FaLeaf, FaSprayCanSparkles } from "react-icons/fa6";
import { GiSpiralShell } from "react-icons/gi";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const categories = [
  {
    name: "Mosquito Spray",
    icon: <FaSprayCanSparkles size={40} />,
    color: "bg-forest-100",
    link: "/shop",
  },
  {
    name: "Mosquito Coil",
    icon: <GiSpiralShell size={40} />,
    color: "bg-sage-100",
    link: "/shop",
  },
  {
    name: "Herbal Products",
    icon: <FaLeaf size={40} />,
    color: "bg-beige-100",
    link: "/shop",
  },
];

export default function Categories() {
  return (
    <section className="py-20">
      <Container>
        <SectionTitle
          title="Shop by Category"
          subtitle="Choose the product that best suits your family's needs."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className={`${category.color} group rounded-3xl p-10 text-center shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl`}
            >
              <div className="mb-6 flex justify-center text-forest-700">
                {category.icon}
              </div>

              <h3 className="text-xl font-semibold">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}