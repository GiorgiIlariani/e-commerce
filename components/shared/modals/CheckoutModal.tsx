"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Separator } from "../../ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { PayForProducts } from "@/lib/actions/transactions";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

export function CheckoutModal({
  cartProducts,
  totalPrice,
  accessToken,
  refreshToken,
  user,
}: {
  cartProducts: CartProducts[];
  totalPrice: number;
  accessToken: string | false | null;
  refreshToken: string | false | null;
  user: UserDetailsTypes | undefined;
}) {
  const [isGoingToBuy, setIsGoingToBuy] = useState(false);
  const router = useRouter();
  const userBalance = user?.balance || 0;
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
      const paymentPromises = cartProducts.map(
        async ({ product, quantity }) => {
          const status = await PayForProducts({
            accessToken: accessToken as string,
            refreshToken: refreshToken as string,
            product: product.id,
            quantity: quantity,
          });
          return status;
        }
      );

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

  return (
    <Dialog>
      <DialogTrigger className="min-w-[68px] h-[50px] rounded-2xl bg-white flex items-center justify-center cursor-pointer">
        <Button
          type="button"
          className="bg-[#fec900] rounded-lg py-[22px] text-white text-center hover:bg-[#ffdb4d] px-[72px] font-semibold">
          Buy
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white md:h-auto min-w-[624px] h-screen flex flex-col gap-4">
        <DialogHeader className="text-lg font-semibold">
          შეკვეთის დეტალები
        </DialogHeader>
        <Separator className="border border-gray-100" />
        {isGoingToBuy ? (
          <div className="space-y-4">
            {remainingBalance >= 0 ? (
              <>
                You are about to buy the following products:
                <ul className="list-disc mt-3">
                  {cartProducts.map((product, index) => (
                    <li key={index} className="font-bold">
                      {index + 1}. {product.product.name}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                You do not have enough balance to buy the following products:
                <ul className="list-disc mt-3">
                  {cartProducts.map((product, index) => (
                    <li key={index} className="font-bold">
                      {index + 1}. {product.product.name}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <Separator className="border" />
            <div className="flex justify-between">
              <span>Total Cart Price:</span>
              <span className="font-medium">{totalPrice} ₾</span>
            </div>
            <div className="flex justify-between">
              <span>Your Balance:</span>
              <span className="font-medium">{userBalance} ₾</span>
            </div>
            {remainingBalance >= 0 ? (
              <div className="flex justify-between">
                <span>Balance After Purchase:</span>
                <span className="text-[#4a6cfa] font-medium">
                  {remainingBalance} ₾
                </span>
              </div>
            ) : (
              <div className="flex justify-between text-red-600">
                <span>Additional Funds Needed:</span>
                <span className="text-[#4a6cfa] font-medium">
                  {additionalFundsNeeded} ₾
                </span>
              </div>
            )}
            <Button
              className="w-full text-white text-base font-bold py-6 bg-[#fec900] rounded-lg"
              onClick={handlePay}>
              {remainingBalance >= 0 ? "Pay" : "Close"}
            </Button>
          </div>
        ) : (
          <div className="mt-16 w-full flex flex-col gap-16 lg:grid lg:grid-cols-12">
            <div className="w-full lg:col-span-5 lg:pl-[80px] xl:pl-[110px]  pl-0">
              <div className="w-full rounded-[24px] py-8 px-6 bg-[#f1f3f680]">
                <ul className="w-full flex flex-col gap-5 mt-2 mb-8">
                  {cartProducts.map(({ product, quantity }) => (
                    <li key={product.id} className="w-full flex-between">
                      <p className="text-[#272a37] text-sm">
                        {" "}
                        {product.name.slice(0, 20)}
                      </p>
                      <span className="text-[#272a37] text-sm">
                        {quantity} x {product.price * quantity}₾
                      </span>
                    </li>
                  ))}
                  <li className="w-full flex-between">
                    <p className="text-[#4a6cfa] text-sm">ჯამი:</p>
                    <span className="text-[#4a6cfa] text-sm">{totalPrice}</span>
                  </li>
                </ul>
                <Button
                  className="w-full text-white text-base font-bold py-6 bg-[#fec900] rounded-lg"
                  onClick={() => setIsGoingToBuy(true)}>
                  Pay
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
