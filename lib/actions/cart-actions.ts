import { url } from "../utils";
import { fetchWithRetry } from "./refresh-token";


export const addToCart = async (
  productId: string,
  accessToken: string,
  quantity: number,
  refreshToken: string
) => {
  const options: RequestInit = {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product: productId,
      quantity,
    }),
  };

  try {
    const response = await fetchWithRetry(
      `${url}/carts/`,
      options,
      accessToken,
      refreshToken
    );

    if (!response.ok) {
      throw new Error("Failed to add to cart");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error while adding to cart:", error);
    throw error;
  }
};

export const getCartProducts = async (
  accessToken: string,
  refreshToken: string
) => {
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  try {
    const response = await fetchWithRetry(
      `${url}/carts/`,
      options,
      accessToken,
      refreshToken
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error while getting cart products:", error);
    throw error;
  }
};

export const removeProductFromCart = async (
  productId: string,
  accessToken: string,
  refreshToken: string,
  path?: string
) => {
  const options: RequestInit = {
    method: "DELETE",
    headers: {
      accept: "*/*",
    },
  };

  try {
    const response = await fetchWithRetry(
      `${url}/carts/${productId}/`,
      options,
      accessToken,
      refreshToken
    );

    if (!response.ok) {
      throw new Error("Failed to remove from cart");
    }

    return response.status;
  } catch (error) {
    console.error("Error while removing from cart:", error);
    throw error;
  }
};

export const removeAllCartItem = async (
  accessToken: string,
  refreshToken: string
) => {
  const options: RequestInit = {
    method: "DELETE",
    headers: {
      accept: "*/*",
    },
  };

  try {
    const response = await fetchWithRetry(
      `${url}/carts/all/`,
      options,
      accessToken,
      refreshToken
    );

    if (!response.ok) {
      throw new Error("Failed to remove all items from cart");
    }

    return response.status;
  } catch (error) {
    console.error("Error while removing all items from cart:", error);
    throw error;
  }
};