"use client";

import FilteredProducts from "@/components/products/FilteredProducts";
import ProductCardLoader from "@/components/products/ProductCardLoader";
import { getCartProducts } from "@/lib/actions/cart-actions";
import { getFavoriteProductsList } from "@/lib/actions/favorite-actions";
import { fetchProducts } from "@/lib/actions/product-actions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchedProducts = () => {
  const [searchedProducts, setSearchedProducts] =
    useState<SearchedProductTypes>({
      count: 0,
      next: null,
      previous: null,
      results: [],
    });
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const min_price = searchParams.get("min_price") || "";
  const max_price = searchParams.get("max_price") || "";
  const location = searchParams.get("location") || "";
  const searchQuery = searchParams.get("query") || "";

  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");
  const refreshToken =
    typeof window !== "undefined" && localStorage.getItem("refresh-token");

  useEffect(() => {
    const fetchProductsList = async () => {
      try {
        setIsLoading(true);
        const products = await fetchProducts({
          min_price,
          max_price,
          location,
          searchQuery,
        });
        setSearchedProducts(products);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductsList();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (accessToken && refreshToken) {
          const favorites = await getFavoriteProductsList(
            accessToken,
            refreshToken
          );
          setFavoriteProducts(favorites);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        if (accessToken && refreshToken) {
          const cartProducts = await getCartProducts(accessToken, refreshToken);
          setCartProducts(cartProducts);
        }
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };

    fetchCartProducts();
  }, []);

  const refetchFavorites = async () => {
    try {
      if (accessToken && refreshToken) {
        const favorites = await getFavoriteProductsList(
          accessToken,
          refreshToken
        );

        setFavoriteProducts(favorites);
      }
    } catch (error) {
      console.error("Error refetching favorites:", error);
    }
  };

  const refetchCartProducts = async () => {
    try {
      if (accessToken && refreshToken) {
        const cartProducts = await getCartProducts(accessToken, refreshToken);

        setCartProducts(cartProducts);
      }
    } catch (error) {
      console.error("Error refetching cart products:", error);
    }
  };

  return (
    <main className="w-full min-h-screen wrapper flex flex-col bg-[#f1f3f6]">
      <div className="flex items-center justify-start">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-[#8996ae] text-sm">
            მთავარი
          </Link>
          <span className="text-[#6773a7] text-sm">
            {searchedProducts?.results.length} განცხადება
          </span>
        </div>
      </div>
      <section className="flex flex-col lg:flex-row gap-8 my-8 items-start">
        {/* <SearchFilterSide`bar /> */}
        {isLoading ? (
          <div className="w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 12 }).map((_, index) => (
              <ProductCardLoader key={index} />
            ))}
          </div>
        ) : (
          <FilteredProducts
            searchedProducts={searchedProducts?.results}
            favoriteProducts={favoriteProducts}
            refetchFavorites={refetchFavorites}
            refetchCartProducts={refetchCartProducts}
            cartProducts={cartProducts}
          />
        )}
      </section>
    </main>
  );
};

export default SearchedProducts;
