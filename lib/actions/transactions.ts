import { fetchWithRetry } from "./refresh-token";

 const url = 'http://16.16.253.75';

 interface PayForProductsProps {
    accessToken: string;
    refreshToken: string;
    product: number;
    quantity: number;
 }

export const PayForProducts = async ({
  accessToken,
  refreshToken,
  product,
  quantity,
}: PayForProductsProps) => {
  const options: RequestInit = {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product,
      quantity,
    }),
  };

  try {
    const response = await fetchWithRetry(
      `${url}/transactions/orders/`,
      options,
      accessToken,
      refreshToken
    );

    if (!response.ok) {
      throw new Error("Failed to pay");
    }

    return response.status;
  } catch (error) {
    console.error("Error while paying:", error);
    throw error;
  }
};
