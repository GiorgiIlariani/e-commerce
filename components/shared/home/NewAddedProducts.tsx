"use client";

import ProductCard from "@/components/products/ProductCard";
import { fetchProducts } from "@/lib/actions/product-actions";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NewAddedCategories = () => {
  const [products, setProducts] = useState<ProductList>([]);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const newProducts = await fetchProducts({ page_size: 12 });
        setProducts(newProducts.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewProducts();
  }, []);

  return (
    <div className="w-full mt-10 flex flex-col gap-10">
      <div className="w-full flex-between">
        <h5 className="text-lg font-semibold">ახალი დამატებული</h5>

        <Link href="/search" className="font-medium hover:underline">
          ყველას ნახვა
        </Link>
      </div>

      <div className="w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {products.map((product) => (
          <ProductCard key={product?.id} {...product} isNewProduct={true} />
        ))}
      </div>
    </div>
  );
};

export default NewAddedCategories;
