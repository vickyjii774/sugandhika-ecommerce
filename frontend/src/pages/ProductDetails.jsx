import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { productsService } from "../services/products.service";
import Container from "../components/ui/Container";


export default function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    productsService.getBySlug(slug).then(setProduct);
  }, [slug]);

  if (!product) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h2 className="text-3xl font-bold">
            Product not found
          </h2>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="grid gap-12 py-16 lg:grid-cols-2">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>

      <ProductTabs product={product} />

      <RelatedProducts currentProduct={product} />
    </Container>
  );
}