"use client";

import React, { useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { IoSearch } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/utils";
import { Filters } from "../modals/FiltersModal";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClick = () => {
    let newUrl = "";

    if (query) {
      const searchedCategoriesString =
        localStorage.getItem("searchedCategories");
      const searchedCategories = searchedCategoriesString
        ? JSON.parse(searchedCategoriesString)
        : [];

      if (!searchedCategories.includes(query.toLowerCase())) {
        searchedCategories.push(query.toLowerCase());
        localStorage.setItem(
          "searchedCategories",
          JSON.stringify(searchedCategories)
        );
      }

      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "query",
        value: query,
      });

      router.push(`/search/${newUrl}`, { scroll: false });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["query"],
      });
    }
  };

  return (
    <section>
      <h2 className="font-medium text-xl xs:text-2xl">
        Everything you're looking for
      </h2>
      <div className="flex items-center gap-4 pt-6">
        <Input
          placeholder="iphone 14"
          value={query}
          onChange={changeHandler}
          className="h-[50px] px-4 outline-none rounded-2xl border border-[#fec900] ring-none"
        />
        <Filters />

        <Button
          className="h-[50px] text-white bg-[#fec900] min-w-[180px] rounded-2xl px-[14px] items-center gap-3 text-base  hidden md:flex"
          onClick={handleClick}>
          <IoSearch />
          Search
        </Button>
      </div>
    </section>
  );
};

export default SearchComponent;
