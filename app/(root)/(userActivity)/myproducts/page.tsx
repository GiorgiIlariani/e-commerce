"use client";

import MyProductsFilter from "@/components/shared/MyProductsFilter";
import UserActivityHeader from "@/components/shared/UserActivityHeader";
import { Button } from "@/components/ui/button";
import isAuth from "@/lib/actions/isAuth";
import { fetchProducts } from "@/lib/actions/product-actions";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoListOutline } from "react-icons/io5";

const MyProductsPage = () => {
  const [myProducts, setMyProducts] = useState<ProductList>([]);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // const {
  //   data: user,
  //   isLoading,
  //   isFetching,
  //   refetch,
  // } = useRetrieveUserQuery(undefined, {
  //   skip: !isAuthenticated,
  // });

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     refetch();
  //   }
  // }, [isAuthenticated]);

  // useEffect(() => {
  //   const fetchMyProducts = async () => {
  //     try {
  //       const myProducts = await fetchProducts({ user: user?.id });
  //       setMyProducts(myProducts.results);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchMyProducts();
  // }, []);

  return (
    <section className="w-full min-h-screen bg-[#f1f3f6]">
      <div className="wrapper flex flex-col">
        <UserActivityHeader route="My Products" />

        <MyProductsFilter />

        {myProducts.length === 0 ? (
          <div className="w-full flex flex-col justify-center items-center pt-[100px] pb-[200px] rounded-[16px] text-center bg-white mt-10">
            <div className="flex h-12 w-12 items-center justify-center text-xl duration-300 ease-out rounded-full bg-gray-300">
              <IoListOutline fontSize={16} />
            </div>

            <p className="text-lg font-bold mt-4">
              You have nt uploaded product
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
        ) : (
          <div className="w-full"></div>
        )}
      </div>
    </section>
  );
};

export default isAuth(MyProductsPage);
