import React, { Dispatch, SetStateAction } from "react";
import ProductCard from "./ProductCard";

const FilteredProducts = ({
  searchedProducts,
  favoriteProducts,
  refetchFavorites,
}: {
  searchedProducts: ProductList;
  favoriteProducts: any;
  refetchFavorites: () => Promise<void>;
}) => {
  return (
    <div className="w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {searchedProducts.map((productItem) => {
        const favorireProductIds = favoriteProducts.map(
          (product: any) => product.product
        );
        const isFavorite = favorireProductIds.includes(productItem.id);

        return (
          <ProductCard
            key={productItem?.id}
            {...productItem}
            isFavorite={isFavorite}
            refetchFavorites={refetchFavorites}
          />
        );
      })}
    </div>
  );
};

export default FilteredProducts;
