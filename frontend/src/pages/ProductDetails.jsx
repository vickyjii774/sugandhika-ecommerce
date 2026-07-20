import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { productsService } from "../services/products.service";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";


export default function ProductDetails() {
  const { addToCart } = useCart();
  const { slug } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    productsService.getBySlug(slug).then(setProduct);
  }, [slug]);

  if (!product) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h2 className="text-3xl font-bold">Product not found</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="grid gap-12 py-16 lg:grid-cols-2">
        {/* Image */}
        <div className="rounded-2xl bg-green-50 p-8">
          <img
            src={product.image}
            alt={product.name}
            className="mx-auto max-h-[500px] object-contain"
          />
        </div>

        {/* Details */}
        <div>
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            {product.badge}
          </span>

          <h1 className="mt-4 text-4xl font-bold">
            {product.name}
          </h1>

          <p className="mt-3 text-gray-600">
            {product.description}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-3xl font-bold text-green-700">
              Rs. {product.price}
            </span>

            <span className="text-xl text-gray-400 line-through">
              Rs. {product.oldPrice}
            </span>
          </div>

          <div className="mt-6">
            ⭐ {product.rating} ({product.reviews} reviews)
          </div>

        <Button
  className="mt-8 w-full"
  onClick={() => {
    console.log("BUTTON CLICKED");
    addToCart(product);
  }}
>
  Add to Cart
</Button>

        </div>
      </div>
    </Container>
  );
}