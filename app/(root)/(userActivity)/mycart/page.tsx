"use client";

import Link from "next/link";
import { MdAddShoppingCart } from "react-icons/md";
import { Button } from "@/components/ui/button";
import UserActivityHeader from "@/components/shared/UserActivityHeader";
import { useEffect, useState } from "react";
import { getCartProducts } from "@/lib/actions/cart-actions";

const MyCartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);

  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (!accessToken) return;
      const cartProducts = await getCartProducts(accessToken);
      setCartProducts(cartProducts);
    };
    fetchCartProducts();
  }, []);

  console.log({ cartProducts });

  return (
    <section className="w-full min-h-screen bg-[#f1f3f6]">
      <div className="wrapper flex flex-col">
        <UserActivityHeader route="My Cart" />
        {cartProducts.length === 0 ? (
          <div className="w-full flex flex-col justify-center items-center pt-[100px] pb-[200px] rounded-[16px] text-center bg-white mt-8">
            <div className="flex h-12 w-12 items-center justify-center text-xl duration-300 ease-out rounded-full bg-gray-300">
              <MdAddShoppingCart fontSize={16} />
            </div>
            <p className="text-lg font-bold mt-4">Your cart is empty</p>
            <p className="text-[#8996ae] text-base mt-4">
              Look at the ads of online stores and add the desired items to the
              cart
            </p>
            <Link href="/search">
              <Button className="mt-8 text-white bg-[#fec900] rounded-2xl px-12 py-7">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="w-full bg-white border border-[#e4e7ed] rounded-3xl mt-4">
            <div className="flex-between py-4 px-6 border-b border-[#f3f4f6]">
              <div></div>
              <Button className="text-[#8996ae] bg-[#f1f3f6] p-4 rounded-lg text-sm font-bold">
                კალათის გასუფთავება
              </Button>
            </div>
            <div></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyCartPage;
