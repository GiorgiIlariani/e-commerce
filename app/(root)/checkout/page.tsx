"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getCartProducts } from "@/lib/actions/cart-actions";
import { PayForProducts } from "@/lib/actions/transactions";
import { getNextThreeDays } from "@/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";

interface DeliveryDay {
  today: string;
  date: number;
  price: number;
}

const CheckoutPage = () => {
  const deliveryDays: DeliveryDay[] = getNextThreeDays();
  const [selectedDay, setSelectedDay] = useState(deliveryDays[0].date);
  const [cartProducts, setCartProducts] = useState<CartProducts[]>([]);

  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");
  const refreshToken =
    typeof window !== "undefined" && localStorage.getItem("refresh-token");

  const handleSelectDay = (day: DeliveryDay) => {
    setSelectedDay(day.date);
  };

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (!accessToken || !refreshToken) return;
      const cartProducts = await getCartProducts(accessToken, refreshToken);
      setCartProducts(cartProducts);
    };
    fetchCartProducts();
  }, []);

  const calculateTotalPrice = () => {
    const cartTotal = cartProducts.reduce(
      (total, { product }) => total + product.price * product.quantity,
      0
    );
    const deliveryPrice =
      deliveryDays.find((day) => day.date === selectedDay)?.price || 0;
    return cartTotal + deliveryPrice;
  };

  const selectedDeliveryPrice =
    deliveryDays.find((day) => day.date === selectedDay)?.price || 0;

  const handlePay = async () => {
    if (!accessToken || !refreshToken) {
      console.log("Tokens are missing");
      return;
    }

    try {
      // Iterate over each product in the cart and make a payment request
      const promises = cartProducts.map(({ product }) =>
        PayForProducts({
          accessToken: accessToken as string,
          refreshToken: refreshToken as string,
          product: product.id,
          quantity: product.quantity,
        })
      );

      // Wait for all payment requests to complete
      const results = await Promise.all(promises);

      console.log("Payment successful", results);
      // You can navigate to a success page or show a success message here
    } catch (error) {
      console.log("Error while making payment:", error);
      // Handle the error appropriately (e.g., show an error message)
    }
  };

  return (
    <main className="w-full min-h-screen bg-white">
      <div className="w-full wrapper">
        <div className="w-full flex-between">
          <h4 className="text-lg font-semibold">შეკვეთის დეტალები</h4>
          <Link href="/mycart">
            <MdAddShoppingCart />
          </Link>
        </div>

        <div className="mt-16 w-full grid grid-cols-12">
          <div className="col-span-7 flex flex-col gap-6 pr-20">
            {/* <div className="flex flex-col gap-6">
            <h4 className="text-lg font-semibold">Delivery Details</h4>
            <div className="flex flex-col gap-3">
              <h2></h2>
            </div>
          </div> */}
            <Textarea
              rows={5}
              placeholder="გამოიყენე მეორე მისამართის ჩასაწერად ან სხვა დამატებითი ინფორმაციისთვის"
              className="w-full px-4 py-6"
            />
            <div className="flex flex-col gap-4 items-start">
              <h4 className="text-lg font-semibold">Delivery</h4>
              <div className="w-full flex items-center gap-6">
                {deliveryDays.map((day, index) => (
                  <Button
                    key={index}
                    className={`w-full flex-1 flex-between px-3 py-6 border border-[#dee2e6] ${
                      selectedDay === day.date
                        ? "border-[#4a6cfa] bg-[#4a6cfa1a]"
                        : "border-[#dee2e6] bg-transparent"
                    }`}
                    onClick={() => handleSelectDay(day)}>
                    <p className="flex items-center font-normal gap-2 text-base">
                      {day.today} {day.date} :
                    </p>
                    <span className="font-semibold text-base">
                      {day.price}₾
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-5 pl-[110px]">
            <div className="w-full rounded-[24px] py-8 px-6 bg-[#f1f3f680]">
              <ul className="w-full flex flex-col gap-5 mt-2 mb-8">
                {cartProducts.map(({ product }) => (
                  <li key={product.id} className="w-full flex-between">
                    <p className="text-[#272a37] text-sm">
                      {" "}
                      {product.name.slice(0, 20)}
                    </p>
                    <span className="text-[#272a37] text-sm">
                      {product.quantity} x {product.price * product.quantity}₾
                    </span>
                  </li>
                ))}
                <li className="w-full flex-between">
                  <p className="text-sm text-[#272a37]">ადგილზე მიტანა:</p>
                  <span className="text-sm text-[#272a37]">
                    {selectedDeliveryPrice}₾
                  </span>
                </li>
                <li className="w-full flex-between">
                  <p className="text-[#4a6cfa] text-sm">ჯამი:</p>
                  <span className="text-[#4a6cfa] text-sm">
                    {calculateTotalPrice()}₾
                  </span>
                </li>
              </ul>
              <Button
                className="w-full text-white text-base font-bold py-6 bg-[#fec900] rounded-lg"
                onClick={handlePay}>
                Pay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
