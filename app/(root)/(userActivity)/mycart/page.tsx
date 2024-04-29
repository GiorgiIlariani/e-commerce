"use client";

import Link from "next/link";
import { MdAddShoppingCart } from "react-icons/md";
import { Button } from "@/components/ui/button";
import UserActivityHeader from "@/components/shared/UserActivityHeader";
import { useEffect, useState } from "react";
import {
  getCartProducts,
  removeAllCartItem,
  removeProductFromCart,
} from "@/lib/actions/cart-actions";
import CartItem from "@/components/shared/CartItem";
import { toast } from "react-toastify";
import Spinner from "@/components/shared/Spinner";

const MyCartPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cartProducts, setCartProducts] = useState<CartProducts[]>([]);

  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");
  const refreshToken =
    typeof window !== "undefined" && localStorage.getItem("refresh-token");

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (!accessToken || !refreshToken) return;
      try {
        setIsLoading(true);
        const cartProducts = await getCartProducts(accessToken, refreshToken);

        const priceArr = cartProducts.map(
          (item: CartProducts) => item.product.price
        );
        setCartProducts(cartProducts);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCartProducts();
  }, []);

  const handleRemoveCartItem = async (productId: number) => {
    try {
      if (!accessToken || !refreshToken) return;
      const status = await removeProductFromCart(
        String(productId),
        accessToken,
        refreshToken
      );

      if (status === 204) {
        // Update cartProducts state by filtering out the removed item
        setCartProducts((prevCartProducts) =>
          prevCartProducts.filter((item) => item.product.id !== productId)
        );

        toast.success("Item removed Successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveAllCartItem = async () => {
    try {
      if (!accessToken || !refreshToken) return;
      setCartProducts([]);
      await removeAllCartItem(accessToken, refreshToken);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] w-full flex-center">
        <Spinner lg />
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-[#f1f3f6]">
      <div className="wrapper flex flex-col gap-3">
        <UserActivityHeader route="My Cart" />

        {cartProducts.length === 0 ? (
          <div className="w-full flex flex-col justify-center items-center pt-[100px] pb-[200px] rounded-[16px] text-center bg-white">
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
          <div className="w-full bg-white border border-[#e4e7ed] rounded-3xl">
            <div className="flex-col flex-between gap-10 py-7 px-6 border-b border-[#f3f4f6]">
              <Button
                className="self-end text-[#8996ae] bg-[#f1f3f6] hover:bg-[#FEC900] hover:text-white p-4 rounded-lg text-sm font-bold"
                onClick={handleRemoveAllCartItem}>
                კალათის გასუფთავება
              </Button>

              <div className="w-full h-[1px] bg-gray-300" />

              {cartProducts.map((item, i) => (
                <CartItem
                  key={i}
                  cartItem={item}
                  handleRemoveCartItem={handleRemoveCartItem}
                />
              ))}
              <p className="self-start text-md text-gray-400">
                ჯამი: <span className="text-blue-600 text-lg">***₾</span>
              </p>
              {/* {total ? (
                <p className="self-start text-md text-gray-400">
                  ჯამი: <span className="text-blue-600 text-lg">{total}₾</span>
                </p>
              ) : (
                ""
              )} */}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyCartPage;
