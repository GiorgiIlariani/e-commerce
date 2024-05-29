"use client";

import ProductCard from "@/components/products/ProductCard";
import Spinner from "@/components/shared/loader/Spinner";
import { PaginationComponent } from "@/components/shared/Pagination";
import UserActivityHeader from "@/components/shared/UserActivityHeader";
import { Button } from "@/components/ui/button";
import { getFavoriteProductsList } from "@/lib/actions/favorite-actions";
import isAuth from "@/lib/actions/isAuth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { url } from "@/lib/utils";

const FavoritesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState<
    FavoriteProductList[]
  >([]);
  const searchParams = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));

  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");
  const refreshToken =
    typeof window !== "undefined" && localStorage.getItem("refresh-token");

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      if (!accessToken || !refreshToken) return;
      try {
        setIsLoading(true);
        const favoriteProducts = await getFavoriteProductsList(
          accessToken,
          refreshToken
        );

        setFavoriteProducts(favoriteProducts);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFavoriteProducts();
  }, []);

  // if (isLoading) {
  //   return (
  //     <div className="min-h-[70vh] w-full flex-center">
  //       <Spinner lg />
  //     </div>
  //   );
  // }

  return (
    <section className="w-full min-h-screen bg-[#f1f3f6] relative">
      <div className="wrapper flex flex-col">
        <UserActivityHeader route="My Favourites" />
        {isLoading ? (
          <div className="min-h-[70vh] w-full flex-center">
            <Spinner lg />
          </div>
        ) : favoriteProducts.length === 0 ? (
          <div className="w-full flex flex-col justify-center items-center pt-[140px] text-center">
            <div className="flex h-12 w-12 items-center justify-center text-xl duration-300 ease-out rounded-full bg-gray-300">
              <AiOutlineHeart fontSize={16} />
            </div>
            <p className="text-lg font-bold mt-4">You have no favorites list</p>
            <p className="text-[#8996ae] text-base mt-4">
              Click the heart icon on the product photo to add to favorites in
              the right corner
            </p>
            <Link href="/search">
              <Button className="mt-8 text-white bg-[#fec900] rounded-2xl px-12 py-7">
                Create list
              </Button>
            </Link>
          </div>
        ) : (
          <div className="w-full my-[120px] md:my-10 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 mt-8">
            {favoriteProducts.map((favoriteProduct) => (
              <ProductCard
                key={favoriteProduct?.product?.id}
                {...favoriteProduct?.product}
                isFavorite={true}
                baseUrl={url}
                setFavoriteProducts={setFavoriteProducts}
                isOnFavoritePage={true}
              />
            ))}

            <PaginationComponent
              count={favoriteProducts.length}
              page={page}
              setPage={setPage}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default isAuth(FavoritesPage);
