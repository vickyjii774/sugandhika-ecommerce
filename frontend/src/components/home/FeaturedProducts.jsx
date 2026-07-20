import products from "../../data/products";
import ProductCard from "../product/ProductCard";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";
import Container from "../ui/Container";

export default function FeaturedProducts() {
  return (
    <section className="bg-[#FFF8E7] py-20">
      <Container>
        <SectionTitle
          title="Featured Products"
          subtitle="Discover our best-selling natural mosquito protection products."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button size="lg">
            View All Products
          </Button>
        </div>
      </Container>
    </section>
  );
}