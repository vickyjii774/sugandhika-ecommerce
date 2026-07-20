import products from "../data/products";

export const productsService = {
  getAll() {
    return Promise.resolve(products);
  },

  getBySlug(slug) {
    return Promise.resolve(
      products.find((product) => product.slug === slug)
    );
  },

  search(query) {
    const q = query.toLowerCase();

    return Promise.resolve(
      products.filter((product) =>
        product.name.toLowerCase().includes(q)
      )
    );
  },
};