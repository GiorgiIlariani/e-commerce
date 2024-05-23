"use client";

import { ConfirmationModal } from "@/components/shared/modals/ConfirmationModal";
import BuyFromCartContent from "@/components/shared/modals/content/BuyFromCartContent";
import { ConfirmationModalContent } from "@/components/shared/modals/content/ConfirmationContent";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getCartProducts } from "@/lib/actions/cart-actions";
import { PayForProducts } from "@/lib/actions/transactions";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { useAppSelector } from "@/redux/hooks";
import { getNextThreeDays } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";

interface DeliveryDay {
  today: string;
  date: number;
  price: number;
}

const CheckoutPage = () => {
  const deliveryDays: DeliveryDay[] = getNextThreeDays();
  const [selectedDay, setSelectedDay] = useState(deliveryDays[0].date);
  const [cartProducts, setCartProducts] = useState<CartProducts[]>([]);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");
  const refreshToken =
    typeof window !== "undefined" && localStorage.getItem("refresh-token");

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

  const handleSelectDay = (day: DeliveryDay) => {
    setSelectedDay(day.date);
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      const fetchCartProducts = async () => {
        if (!accessToken || !refreshToken) return;

        const cartProducts = await getCartProducts(accessToken, refreshToken);
        setCartProducts(cartProducts);
      };
      fetchCartProducts();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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

  const userBalance = user?.balance || 0;
  const totalPrice = calculateTotalPrice();
  const remainingBalance = userBalance - totalPrice;
  const additionalFundsNeeded = totalPrice - userBalance;

  const handlePay = async () => {
    if (additionalFundsNeeded > 0) {
      toast.error("Insufficient funds. Please add more money to your account.");
      return;
    }

    if (!accessToken || !refreshToken) {
      console.log("Tokens are missing");
      return;
    }

    try {
      // Iterate over each product in the cart and make a payment request
      const paymentPromises = cartProducts.map(async ({ product }) => {
        const status = await PayForProducts({
          accessToken: accessToken as string,
          refreshToken: refreshToken as string,
          product: product.id,
          quantity: product.quantity,
        });
        return status;
      });

      const paymentResults = await Promise.all(paymentPromises);

      const allSuccessful = paymentResults.every((status) => status === 201);

      if (allSuccessful) {
        toast.success("Payment successful! Enjoy your products.");
        router.push("/");
      } else {
        toast.error("Some payments failed. Please try again later.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onConfirmationCancel = () => {
    setShowAlertDialog(false);
  };

  return (
    <>
      <main className="w-full min-h-screen bg-white">
        <div className="w-full wrapper">
          <div className="w-full flex-between">
            <h4 className="text-lg font-semibold">შეკვეთის დეტალები</h4>
            <Link href="/mycart">
              <MdAddShoppingCart />
            </Link>
          </div>

          <div className="mt-16 w-full flex flex-col gap-16 lg:grid lg:grid-cols-12">
            <div className="w-full lg:col-span-7 flex flex-col gap-6 pr-0 lg:pr-20">
              <Textarea
                rows={5}
                placeholder="გამოიყენე მეორე მისამართის ჩასაწერად ან სხვა დამატებითი ინფორმაციისთვის"
                className="w-full px-4 py-6"
              />
              <div className="flex flex-col gap-4 items-start">
                <h4 className="text-lg font-semibold">Delivery</h4>
                <div className="w-full flex flex-col xs:flex-row items-center gap-6">
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
            <div className="w-full lg:col-span-5 lg:pl-[80px] xl:pl-[110px]  pl-0">
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
                  onClick={() => setShowAlertDialog(true)}>
                  Pay
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ConfirmationModal
        message={
          <BuyFromCartContent
            remainingBalance={remainingBalance}
            additionalFundsNeeded={additionalFundsNeeded}
            cartProducts={cartProducts}
            userBalance={userBalance}
          />
        }
        title="Confirm Purchase"
        onConfirm={handlePay}
        open={showAlertDialog}
        onOpenChange={setShowAlertDialog}
        isLoading={isLoading}
        onCancel={onConfirmationCancel}
      />
    </>
  );
};

export default CheckoutPage;
