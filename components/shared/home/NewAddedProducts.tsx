"use client";

import ProductCard from "@/components/products/ProductCard";
import ProductCardLoader from "@/components/shared/loader/ProductCardLoader";
import { fetchProducts } from "@/lib/actions/product-actions";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NewAddedCategories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductList>([]);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        setIsLoading(true);
        const newProducts = await fetchProducts({ page_size: 12 });

        setProducts(newProducts.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewProducts();
  }, []);

  if (!isLoading && products.length === 0) {
    return (
      <div className="mt-10 w-full flex flex-col gap-20">
        <div className="w-full flex-between">
          <h5 className="text-lg font-semibold">Newly Added</h5>

          <Link href="/search" className="font-medium hover:underline">
            See All
          </Link>
        </div>
        <p className="text-xl font-semibold text-center">
          No New Products To Show!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mt-10 flex flex-col gap-10">
      <div className="w-full flex-between">
        <h5 className="text-lg font-semibold">Newly Added</h5>

        <Link href="/search" className="font-medium hover:underline">
          See All
        </Link>
      </div>
      {isLoading ? (
        <div className="w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {Array.from({ length: 12 }).map((_, index) => (
            <ProductCardLoader key={index} />
          ))}
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {products.map((product) => (
            <ProductCard key={product?.id} {...product} isNewProduct={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewAddedCategories;
