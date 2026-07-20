import { useMemo, useState } from "react";

import { useProducts } from "../hooks/useProducts";

import ProductGrid from "../components/product/ProductGrid";
import ProductFilters from "../components/product/ProductFilters";
import SearchBar from "../components/product/SearchBar";
import SortDropdown from "../components/product/SortDropdown";
import Pagination from "../components/product/Pagination";

import Loader from "../components/ui/Loader";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";

export default function Shop() {
  const { products, loading } = useProducts();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    switch (sort) {
      case "priceLow":
        result.sort((a, b) => a.price - b.price);
        break;

      case "priceHigh":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      default:
        break;
    }

    return result;
  }, [products, search, sort]);

  if (loading) return <Loader />;

  return (
    <section className="bg-[#FFF8E7] py-16">
      <Container>
        <SectionTitle
          title="Shop"
          subtitle="Explore our natural mosquito protection products."
        />

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:max-w-md">
            <SearchBar
              value={search}
              onChange={setSearch}
            />
          </div>

          <SortDropdown
            value={sort}
            onChange={setSort}
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div>
            <ProductFilters />
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <>
                <ProductGrid products={filteredProducts} />
                <Pagination />
              </>
            ) : (
              <div className="rounded-xl bg-white p-10 text-center shadow">
                <h2 className="text-2xl font-bold">
                  No products found
                </h2>

                <p className="mt-2 text-gray-500">
                  Try another search.
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}