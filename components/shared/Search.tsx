"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoSearch } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/utils";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, router, searchParams]);

  return (
    <section className="wrapper">
      <h2 className="font-medium text-2xl">Everything you're looking for</h2>
      <div className="flex items-center gap-5 pt-6">
        <Input
          placeholder="მაგ.Iphone 14"
          value={query}
          onChange={changeHandler}
          className="py-6 px-4 outline-none rounded-2xl border border-[#fec900] ring-none"
        />
        <Button className="text-white bg-[#fec900] min-w-[180px] rounded-2xl px-[14px] py-6 flex items-center gap-3 text-base">
          <IoSearch />
          Search
        </Button>
      </div>
    </section>
  );
};

export default SearchComponent;
