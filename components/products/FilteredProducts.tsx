"use client";

import ProductCard from "./ProductCard";

const FilteredProducts = ({
  searchedProducts,
  favoriteProducts,
  refetchFavorites,
  refetchCartProducts,
  cartProducts,
}: {
  searchedProducts: Product[];
  favoriteProducts: any;
  refetchFavorites: () => Promise<void>;
  refetchCartProducts: () => Promise<void>;
  cartProducts: CartProducts[];
}) => {
  return (
    <div className="w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {searchedProducts.map((productItem) => {
        const favorireProductIds = favoriteProducts.map(
          (product: any) => product?.product?.id
        );
        const cartProductsId = cartProducts.map(
          (product: any) => product?.product?.id
        );

        const isFavorite = favorireProductIds.includes(productItem.id);
        const isInCart = cartProductsId.includes(productItem.id);

        return (
          <ProductCard
            key={productItem?.id}
            {...productItem}
            isFavorite={isFavorite}
            isInCart={isInCart}
            refetchFavorites={refetchFavorites}
            refetchCartProducts={refetchCartProducts}
          />
        );
      })}
    </div>
  );
};

export default FilteredProducts;
