import { Separator } from "@/components/ui/separator";
import React from "react";

export const BuyFromCartContent = ({
  remainingBalance,
  additionalFundsNeeded,
  cartProducts,
  userBalance,
}: {
  remainingBalance: number;
  additionalFundsNeeded: number;
  cartProducts: CartProducts[];
  userBalance: number;
}) => {
  const totalCartPrice = cartProducts.reduce(
    (total, product) => total + product.product.price,
    0
  );

  return (
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
        <span className="font-medium">{totalCartPrice} ₾</span>
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
    </div>
  );
};

export default BuyFromCartContent;
