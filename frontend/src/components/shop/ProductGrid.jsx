import ProductCard from "../product/ProductCard";

export default function ProductGrid({ products }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}