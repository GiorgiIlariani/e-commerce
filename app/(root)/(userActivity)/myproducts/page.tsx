"use client";

import MyProductsFilter from "@/components/shared/MyProductsFilter";
import UserActivityHeader from "@/components/shared/UserActivityHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import isAuth from "@/lib/actions/isAuth";
import { fetchProducts, removeProduct } from "@/lib/actions/product-actions";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { useAppSelector } from "@/redux/hooks";
import { convertDate, sliceTitle } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoListOutline } from "react-icons/io5";
import { WiTime10 } from "react-icons/wi";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import MyProductsLoader from "@/components/shared/loader/MyProductsLoader";

const MyProductsPage = () => {
  const [myProducts, setMyProducts] = useState<ProductList>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const min_price = searchParams.get("min_price") || "";
  const max_price = searchParams.get("max_price") || "";

  const router = useRouter();

  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");
  const refreshToken =
    typeof window !== "undefined" && localStorage.getItem("refresh-token");

  const {
    data: user,
    // isLoading,
    refetch,
  } = useRetrieveUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        setIsLoading(true);
        const myProducts = await fetchProducts({
          user: user?.id,
          searchQuery,
          category,
          min_price,
          max_price,
        });
        setMyProducts(myProducts.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyProducts();
  }, [searchQuery, category, min_price, max_price]);

  const handleProductEdit = (productId: number) => {
    router.push(`/product-form?productId=${productId}`);
  };

  const handleRemoveProduct = async (productId: number) => {
    try {
      if (!accessToken || !refreshToken) return;
      setIsLoading(true);
      const status = await removeProduct(productId, accessToken, refreshToken);

      if (status === 204) {
        // Remove the deleted product from the list
        setMyProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        toast.success("Product removed successfully!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#f1f3f6]">
      <div className="wrapper flex flex-col">
        <UserActivityHeader route="My Products" />

        <MyProductsFilter />

        {myProducts.length === 0 && !isLoading && searchParams.size === 0 ? (
          <div className="w-full flex flex-col justify-center items-center pt-[100px] pb-[200px] rounded-[16px] text-center bg-white mt-10">
            <div className="flex h-12 w-12 items-center justify-center text-xl duration-300 ease-out rounded-full bg-gray-300">
              <IoListOutline fontSize={16} />
            </div>

            <p className="text-lg font-bold mt-4">
              You have not uploaded product
            </p>
            <p className="text-[#8996ae] text-base mt-4">
              After adding product you can easily manage products from this page
            </p>

            <Link href="/product-form">
              <Button className="mt-8 text-white bg-[#fec900] rounded-2xl px-12 py-7">
                Add product
              </Button>
            </Link>
          </div>
        ) : isLoading ? (
          <div className="w-full flex flex-col justify-center gap-6 p-6 runded-[16px] bg-white mt-10">
            {Array.from({ length: 5 }).map((_, index) => (
              <MyProductsLoader key={index} />
            ))}
          </div>
        ) : myProducts.length === 0 && searchParams.size > 0 ? (
          <div className="w-full text-2xl text-center min-h-[70vh] font-bold flex items-center justify-center">
            No Products to show!
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center gap-6 py-6 px-3 sm:px-6 rounded-[16px] text-center bg-white mt-10">
            {myProducts.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center border-b pb-4">
                <div className="w-[30%] xs:w-[20%] flex items-center gap-3">
                  <Input
                    type="checkbox"
                    // id={String(cartItem?.product.id)}
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-white checked:bg-[#fec900]"
                    // checked={selectedCartProductsId.includes(cartItem.product.id)}
                    // onChange={handleCheckboxToggle}
                  />
                  <Link href={`/search/${product.id}`}>
                    <Image
                      src={product.images[0].image}
                      alt="product image"
                      width={80}
                      height={80}
                      className="object-cover w-14 h-14 sm:w-20 sm:h-20 rounded-[16px]"
                    />
                  </Link>
                </div>

                <div className="w-[25%] text-start hidden xl:block">
                  <p className="text-gray-500 mb-2 font-semibold">
                    ID: {product.id}
                  </p>
                  <h4 className="text-sm sm:text-base font-normal sm:font-semibold  text-nowrap">
                    {sliceTitle(product.name, 20, true)}
                  </h4>
                </div>

                <p className="text-xl font-bold">₾{product.price}</p>

                <p className="xs:flex items-center gap-2 text-gray-500 font-semibold hidden">
                  <WiTime10 />
                  {convertDate(product.created_at)}
                </p>

                <div className="flex items-center gap-3">
                  <div
                    className="icon-overlay"
                    onClick={() => handleProductEdit(product.id)}>
                    <CiEdit />
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="icon-overlay">
                        <HiDotsHorizontal />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] absolute -right-4 bg-white">
                      <div className="flex flex-col gap-4">
                        <div
                          className="flex items-center gap-3 cursor-pointer"
                          onClick={() => handleRemoveProduct(product.id)}>
                          <MdDeleteOutline />
                          <p className="text-red-600 text-sm font-semibold">
                            remove
                          </p>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default isAuth(MyProductsPage);
