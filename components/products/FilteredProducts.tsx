import React from "react";
import ProductCard from "./ProductCard";

const FilteredProducts = ({
  searchedProducts,
}: {
  searchedProducts: ProductList;
}) => {
  return (
    <div className="w-[calc(100%-300px)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {searchedProducts.map((productItem) => (
        <ProductCard key={productItem?.id} {...productItem} />
      ))}
    </div>
  );
};

export default FilteredProducts;
