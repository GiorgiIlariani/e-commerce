"use client";

import { checkoutOrder } from "@/lib/actions/order.actions";
// import { checkoutOrder } from "@/lib/actions/order.actions";
import { Button } from "../ui/button";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ cartProducts }: { cartProducts: CartProducts[] }) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }
    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const onCheckout = async () => {
    // Sum up the prices of all products in the cart
    const totalPrice = cartProducts.reduce(
      (acc, { product }) => acc + product.price,
      0
    );

    // Extract product IDs from cartProducts
    const productIds = cartProducts.map(({ product }) => product.id);

    // Create order object
    const order = {
      buyerId: cartProducts[0]?.product?.user, // Assuming all products have the same buyer ID
      price: totalPrice,
      productIds,
    };

    await checkoutOrder(order);
  };

  return (
    <form action={onCheckout} method="post">
      <Button
        type="submit"
        role="link"
        className="bg-[#fec900] rounded-lg py-[22px] text-white text-center hover:bg-[#ffdb4d] px-[72px] font-semibold">
        Buy
      </Button>
    </form>
  );
};

export default Checkout;
