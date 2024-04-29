"use client";

import UserActivityHeader from "@/components/shared/UserActivityHeader";
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

  console.log(myProducts);

  return (
    <section className="w-full min-h-screen bg-[#f1f3f6]">
      <div className="wrapper flex flex-col">
        <UserActivityHeader route="My Products" />

        <div className="w-full"></div>
      </div>
    </section>
  );
};

export default MyProductsPage;
