"use client";

import ProductCard from "./ProductCard";

const FilteredProducts = ({
  searchedProducts,
  favoriteProducts,
  refetchFavorites,
  refetchCartProducts,
  cartProducts,
  isAuthenticated,
  userId,
}: FilteredProductsForm) => {
  return (
    <div className="w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-20">
      {searchedProducts.map((productItem) => {
        const favorireProductIds = favoriteProducts.map(
          (product: FavoriteProductList) => product?.product?.id
        );
        const cartProductsId = cartProducts.map(
          (product: CartProducts) => product?.product?.id
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
            isAuthenticated={isAuthenticated}
            userId={userId}
          />
        );
      })}
    </div>
  );
};

export default FilteredProducts;
