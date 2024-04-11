"use client";

import FilteredProducts from "@/components/products/FilteredProducts";
import { FilterDropdown } from "@/components/shared/FilterDropdown";
import SearchFilterSidebar from "@/components/shared/layout/SearchFilterSidebar";
import { fetchProducts } from "@/lib/actions/product-actions";
import Link from "next/link";
import { useEffect, useState } from "react";

const SearchedProducts = () => {
  const [searchedProducts, setSearchedProducts] = useState([]);

  useEffect(() => {
    const fetchProductsList = async () => {
      const searchedProducts = await fetchProducts();
      setSearchedProducts(searchedProducts);
    };

    fetchProductsList();
  }, []);

  return (
    <main className="w-full min-h-screen wrapper flex flex-col bg-[#f1f3f6]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-[#8996ae] text-sm">
            მთავარი
          </Link>
          <span className="text-[#6773a7] text-sm">
            {searchedProducts.length} განცხადება
          </span>
        </div>

        <div>
          <FilterDropdown />
        </div>
      </div>
      <section className="flex flex-row gap-8 mt-8 items-start">
        <SearchFilterSidebar />
        <FilteredProducts searchedProducts={searchedProducts} />
      </section>
    </main>
  );
};

export default SearchedProducts;
