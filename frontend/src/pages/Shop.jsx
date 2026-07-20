import { useMemo, useState } from "react";
import products from "../data/products";

import Container from "../components/ui/Container";
import SearchBar from "../components/shop/SearchBar";
import SortDropdown from "../components/shop/SortDropdown";
import FilterSidebar from "../components/shop/FilterSidebar";
import ProductGrid from "../components/shop/ProductGrid";
import { FiSearch } from "react-icons/fi";



export default function Shop() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const filteredProducts = useMemo(() => {
    let data = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "low") {
      data.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      data.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      data.sort((a, b) => b.rating - a.rating);
    }

    return data;
  }, [search, sort]);

  return (
    <Container>
      <div className="py-10">
        <h1 className="mb-8 text-4xl font-bold text-green-800">
          Shop Sugandhika
        </h1>

        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>

          <SortDropdown value={sort} onChange={setSort} />
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <div>
            <FilterSidebar />
          </div>

<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">  <div className="relative flex-1">
    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

    <input
      type="text"
      placeholder="Search products..."
      className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 focus:border-forest-500 focus:outline-none"
    />
  </div>

  <select className="rounded-xl border border-gray-300 px-5 py-3">
    <option>All Categories</option>
    <option>Spray</option>
    <option>Coil</option>
    <option>Cream</option>
  </select>

  <select className="rounded-xl border border-gray-300 px-5 py-3">
    <option>Newest</option>
    <option>Price Low → High</option>
    <option>Price High → Low</option>
  </select>
</div>


          <div className="lg:col-span-3">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
      <div className="mt-16 flex justify-center gap-3">
  <button className="rounded-lg border px-4 py-2">
    Previous
  </button>

  <button className="rounded-lg bg-forest-600 px-4 py-2 text-white">
    1
  </button>

  <button className="rounded-lg border px-4 py-2">
    2
  </button>

  <button className="rounded-lg border px-4 py-2">
    Next
  </button>
</div>
    </Container>
  );
}