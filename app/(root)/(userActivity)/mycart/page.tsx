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
import Spinner from "@/components/shared/loader/Spinner";
import isAuth from "@/lib/actions/isAuth";
import { CheckoutModal } from "@/components/shared/modals/CheckoutModal";
import { useAppSelector } from "@/redux/hooks";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";

const MyCartPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cartProducts, setCartProducts] = useState<CartProducts[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0); // State to store total price
  const [selectedCartProductsId, setSelectedCartProductsId] = useState<
    number[]
  >([]);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const {
    data: user,
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

        // Calculate total price for each product and update state
        const updatedCartProducts = cartProducts.map((item: CartProducts) => ({
          ...item,
          totalPrice: item.product.price * item.product.quantity,
          quantity: item.product.quantity, // ახლახან დავამატე
        }));

        setCartProducts(updatedCartProducts);

        // Calculate total price of all products, considering the quantity
        const totalPrice = updatedCartProducts.reduce(
          (acc: number, curr: CartProducts) =>
            acc + curr.product.price * curr.product.quantity,
          0
        );

        setTotalPrice(totalPrice);
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
        // // Update cartProducts state by filtering out the removed item
        setCartProducts(
          cartProducts.filter((item) => item.product.id !== productId)
        );

        console.log(cartProducts);

        // Calculate total price again after removing item
        const totalPrice = cartProducts
          .filter((item) => item.product.id !== productId)
          .reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
        setTotalPrice(totalPrice);

        toast.success("Item removed Successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveAllCartItem = async () => {
    try {
      if (!accessToken || !refreshToken) return;
      if (selectedCartProductsId.length === 0) {
        // If no items are selected, remove all items
        setCartProducts([]);
        setTotalPrice(0); // Reset total price
        await removeAllCartItem(accessToken, refreshToken);
        toast.success("All items removed Successfully!");
      } else {
        // If there are selected items, remove only those
        const selectedItemsIds = selectedCartProductsId.map((id) => String(id));
        const remainingItems = cartProducts.filter(
          (item) => !selectedItemsIds.includes(String(item.product.id))
        );
        setCartProducts(remainingItems);
        // Calculate total price again after removing selected items
        // * curr.quantity
        const totalPrice = remainingItems.reduce(
          (acc, curr) => acc + curr.product.price,
          0
        );

        setTotalPrice(totalPrice);
        // Remove selected items from backend
        for (const itemId of selectedItemsIds) {
          await removeProductFromCart(itemId, accessToken, refreshToken);
        }
        // Clear the selected cart items state
        setSelectedCartProductsId([]);
        toast.success("Selected items removed Successfully!");
      }
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
            <div className="flex-col flex-between gap-10 py-7 px-3 md:px-6 border-b border-[#f3f4f6]">
              <Button
                className="self-end text-[#8996ae] bg-[#f1f3f6] hover:bg-[#FEC900] hover:text-white p-4 rounded-lg text-sm font-bold"
                onClick={handleRemoveAllCartItem}>
                {selectedCartProductsId.length > 0
                  ? "remove selected products"
                  : "remove all products"}
              </Button>

              <div className="w-full h-[1px] bg-gray-300" />

              {cartProducts.map((item) => (
                <CartItem
                  key={item.product.id}
                  cartItem={item}
                  handleRemoveCartItem={handleRemoveCartItem}
                  selectedCartProductsId={selectedCartProductsId}
                  setSelectedCartProductsId={setSelectedCartProductsId}
                  setTotalPrice={setTotalPrice}
                  setCartProducts={setCartProducts}
                />
              ))}
              <div className="w-full flex-between">
                <p className="self-start text-md text-gray-400">
                  Sum:{" "}
                  <span className="text-blue-600 text-lg">{totalPrice} ₾</span>
                </p>
                <CheckoutModal
                  cartProducts={cartProducts}
                  totalPrice={totalPrice}
                  accessToken={accessToken}
                  refreshToken={refreshToken}
                  user={user}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default isAuth(MyCartPage);
