"use client";

import MyProductsFilter from "@/components/shared/MyProductsFilter";
import UserActivityHeader from "@/components/shared/UserActivityHeader";
import isAuth from "@/lib/actions/isAuth";
import { fetchProducts } from "@/lib/actions/product-actions";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";

const MyProductsPage = () => {
  const [myProducts, setMyProducts] = useState<ProductList>([]);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const {
    data: user,
    isLoading,
    isFetching,
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
        const myProducts = await fetchProducts({ user: user?.id });
        setMyProducts(myProducts.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyProducts();
  }, []);

  return (
    <section className="w-full min-h-screen bg-[#f1f3f6]">
      <div className="wrapper flex flex-col">
        <UserActivityHeader route="My Products" />

        <MyProductsFilter />
      </div>
    </section>
  );
};

export default isAuth(MyProductsPage);
