import products from "../data/products";

export const productsService = {
  getAll() {
    return Promise.resolve(products);
  },

  getBySlug(slug) {
    return Promise.resolve(
      products.find((p) => p.slug === slug)
    );
  },
};
