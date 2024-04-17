"use client";

import { refreshTokenFunc } from "@/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const SearchFilterSidebar = () => {
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");

  return (
    <div className="bg-white w-[240px] rounded-lg py-8 px-4">
      <ul className="flex flex-col gap-3">
        {/* {categories.map((category) => (
          <Link
            href={category?.name}
            key={category?.id}
            className="text-sm font-medium hover:text-blue-400">
            {category?.name}
          </Link>
        ))} */}
      </ul>
    </div>
  );
};

export default SearchFilterSidebar;
