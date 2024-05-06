'use server';

import { redirect } from 'next/navigation';
import Stripe from 'stripe';

type CheckoutOrderProps = {
    buyerId: number;
    price: number;
    productIds: number[];
    // productTitle: string;
}

export const checkoutOrder = async (order: CheckoutOrderProps) => {
  console.log(order.productIds);
    
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price =  Number(order.price) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price, //price 
            product_data: {
              name: "Order", //order.eventTitle
            }
          },
          quantity: 1
        },
      ],
      metadata: {
        productId:  order.productIds[0],
        buyerId: order.buyerId, // order.buyerId,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!)
  } catch (error) {
    throw error;
  }
}