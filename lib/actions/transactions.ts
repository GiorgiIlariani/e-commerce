import { fetchWithRetry } from "./refresh-token";

const url = "https://nika2004.pythonanywhere.com";

interface PayForProductsProps {
  accessToken: string;
  refreshToken: string;
  product: number;
  quantity: number;
}

interface FillBalanceProps {
  accessToken: string;
  refreshToken: string;
  amount: number;
}

interface TransferToSomeoneProps {
  accessToken: string;
  refreshToken: string;
  receiver: number;
  amount: number;
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

export const fillBalance = async ({
  accessToken,
  refreshToken,
  amount,
}: FillBalanceProps) => {
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${accessToken}`,
    },

  };

  try {
    const response = await fetchWithRetry(
      `${url}/payments/?amount=${amount}`,
      options,
      accessToken,
      refreshToken
    );

    if (!response.ok) {
      throw new Error("Failed transaction");
    }

    const transactionUrl = await response.json();

    return { transactionUrl, status: response.status };

  } catch (error) {
    console.error("Error while fill balance:", error);
    throw error;
  }
};

export const getTransactionsOrdersList = async ({
  accessToken,
  refreshToken,

}: {
  accessToken: string;
  refreshToken: string;
}) => {
  const options: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetchWithRetry(
      `${url}/transactions/orders/`,
      options,
      accessToken,
      refreshToken
    );

    if (!response.ok) {
      throw new Error("Failed to get transaction orders");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error while getting transactions orders:", error);
    throw error;
  }
}

export const getTransactionsList = async ({
  accessToken,
  refreshToken,

}: {
  accessToken: string;
  refreshToken: string;
}) => {
  const options: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetchWithRetry(
      `${url}/transactions/`,
      options,
      accessToken,
      refreshToken
    );

    if (!response.ok) {
      throw new Error("Failed to get transaction orders");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error while getting transactions orders:", error);
    throw error;
  }
}

export const transferToSomeone = async ({ accessToken, refreshToken, receiver, amount }: TransferToSomeoneProps) => {
  const options: RequestInit = {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        receiver,
        amount,
    }),
  };

  try {
    const response = await fetchWithRetry(
      `${url}/transactions/`,
      options,
      accessToken,
      refreshToken
    );

    if (!response.ok) {
      throw new Error("Failed to transfer money");
    }

    const data = await response.json();

    return { data, status: response.status };
  } catch (error) {
    console.error("Error while transfering money:", error);
    throw error;
  }

}