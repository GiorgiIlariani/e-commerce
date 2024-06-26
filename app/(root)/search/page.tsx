"use client";

import FilteredProducts from "@/components/products/FilteredProducts";
import ProductCardLoader from "@/components/shared/loader/ProductCardLoader";
import { PaginationComponent } from "@/components/shared/Pagination";
import { getCartProducts } from "@/lib/actions/cart-actions";
import { getFavoriteProductsList } from "@/lib/actions/favorite-actions";
import { fetchProducts } from "@/lib/actions/product-actions";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { useAppSelector } from "@/redux/hooks";
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
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const {
    data: user,
    isFetching,
    refetch,
  } = useRetrieveUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  const min_price = searchParams.get("min_price") || "";
  const max_price = searchParams.get("max_price") || "";
  const location = searchParams.get("location") || "";
  const category = searchParams.get("category") || "";
  const searchQuery = searchParams.get("query") || "";
  const page_size = Number(searchParams.get("page_size") || 12);

  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");
  const refreshToken =
    typeof window !== "undefined" && localStorage.getItem("refresh-token");

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchProductsList = async () => {
      console.log({ page });

      try {
        setIsLoading(true);
        const products = await fetchProducts({
          min_price,
          max_price,
          location,
          category,
          searchQuery,
          page_size,
          page,
        });

        setSearchedProducts(products);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductsList();
  }, [page]);

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
    <>
      <div className="flex items-center justify-start mt-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-[#8996ae] text-sm">
            მთავარი
          </Link>
          <span className="text-[#6773a7] text-sm">
            {searchedProducts?.count} განცხადება
          </span>
        </div>
      </div>
      <section className="flex flex-col lg:flex-row gap-8 mb-20 mt-6 items-start">
        {isLoading ? (
          <div className="w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 12 }).map((_, index) => (
              <ProductCardLoader key={index} />
            ))}
          </div>
        ) : searchedProducts?.results.length === 0 ? (
          <div className="w-full text-center mt-10">
            <p className="text-2xl text-gray-500">No products found.</p>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-12">
            <FilteredProducts
              searchedProducts={searchedProducts?.results}
              favoriteProducts={favoriteProducts}
              refetchFavorites={refetchFavorites}
              refetchCartProducts={refetchCartProducts}
              cartProducts={cartProducts}
              isAuthenticated={isAuthenticated}
              userId={user?.id}
            />
            <PaginationComponent
              count={searchedProducts.count}
              page={page}
              setPage={setPage}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default SearchedProducts;
