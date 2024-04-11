"use client";

import { fetchCategoriesList } from "@/lib/actions/categories-actions";
import { refreshTokenFunc } from "@/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CategoryTypes {
  id: number;
  name: string;
}

const SearchFilterSidebar = () => {
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");
  const refreshToken =
    typeof window !== "undefined" && localStorage.getItem("refresh-token");
  const [categories, setCategories] = useState<CategoryTypes[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!accessToken || !refreshToken) return;

      try {
        // Fetch categories with current access token
        const { categories, status, accesToken } = await fetchCategoriesList(
          accessToken
        );

        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);

        // If there's an error, attempt to refresh the token
        try {
          const newAccessToken = await refreshTokenFunc(refreshToken);
          //  // Update access token in localStorage
          typeof window !== "undefined" &&
            localStorage.setItem("access-token", newAccessToken.access);

          // //  // Retry fetching categories with the new token
          const { categories, status, accesToken } = await fetchCategoriesList(
            newAccessToken.access
          );
          setCategories(categories);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          // Handle error while refreshing token
        }
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-white w-[240px] rounded-lg py-8 px-4">
      <ul className="flex flex-col gap-3">
        {categories.map((category) => (
          <Link
            href={category?.name}
            key={category?.id}
            className="text-sm font-medium hover:text-blue-400">
            {category?.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SearchFilterSidebar;
