import { useEffect, useState } from "react";
import { productsService } from "../services/products.service";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsService.getAll().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return {
    products,
    loading,
  };
}