'use client';

import { useState } from "react";
import { refreshTokenFunc } from "@/utils";

const useAuthenticatedFetch = () => {
  const [accessToken, setAccessToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null
  );
  const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refresh-token") : null;

  const authenticatedFetch = async (url: string, options: RequestInit = {}): Promise<any> => {
    if (!accessToken) {
      throw new Error("Access token not found");
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);

      // If there's an error, attempt to refresh the token
      if (!refreshToken) {
        throw new Error("Refresh token not found");
      }

      try {
        const newAccessToken = await refreshTokenFunc(refreshToken);
        // Update access token in localStorage
        localStorage.setItem("access-token", newAccessToken.access);
        setAccessToken(newAccessToken.access);

        // Retry the request with the new access token
        const response = await fetch(url, {
          ...options,
          headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${newAccessToken.access}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch after token refresh");
        }

        return await response.json();
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        // Handle error while refreshing token
        throw refreshError;
      }
    }
  };

  return authenticatedFetch;
};

export default useAuthenticatedFetch;

