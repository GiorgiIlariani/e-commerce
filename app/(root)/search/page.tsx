"use client";

import FilteredProducts from "@/components/products/FilteredProducts";
import { FilterDropdown } from "@/components/shared/FilterDropdown";
import SearchFilterSidebar from "@/components/shared/layout/SearchFilterSidebar";
import { getCartProducts } from "@/lib/actions/cart-actions";
import { getFavoriteProductsList } from "@/lib/actions/favorite-actions";
import { fetchProducts } from "@/lib/actions/product-actions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchedProducts = () => {
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const searchParams = useSearchParams();

  const min_price = searchParams.get("min_price") || "";
  const max_price = searchParams.get("max_price") || "";
  const location = searchParams.get("location") || "";

  const token =
    typeof window !== "undefined" && localStorage.getItem("access-token");

  useEffect(() => {
    const fetchProductsList = async () => {
      const products = await fetchProducts({
        min_price,
        max_price,
        location,
      });
      setSearchedProducts(products);
    };

    fetchProductsList();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (token) {
          const favorites = await getFavoriteProductsList(token);
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
        if (token) {
          const cartProducts = await getCartProducts(token);
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
      if (token) {
        const favorites = await getFavoriteProductsList(token);

        setFavoriteProducts(favorites);
      }
    } catch (error) {
      console.error("Error refetching favorites:", error);
    }
  };

  const refetchCartProducts = async () => {
    try {
      if (token) {
        const cartProducts = await getCartProducts(token);

        setCartProducts(cartProducts);
      }
    } catch (error) {
      console.error("Error refetching cart products:", error);
    }
  };

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
      <section className="flex flex-col lg:flex-row gap-8 mt-8 items-start">
        {/* <SearchFilterSide`bar /> */}
        <FilteredProducts
          searchedProducts={searchedProducts}
          favoriteProducts={favoriteProducts}
          refetchFavorites={refetchFavorites}
          refetchCartProducts={refetchCartProducts}
          cartProducts={cartProducts}
        />
      </section>
    </main>
  );
};

export default SearchedProducts;
