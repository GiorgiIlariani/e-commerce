"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoSearch } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/utils";
import { VscSettings } from "react-icons/vsc";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  // const searchParams = useSearchParams();
  const router = useRouter();

  // const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setQuery(e.target.value);
  // };

  // const handleClick = () => {
  //   let newUrl = "";

  //   if (query) {
  //     newUrl = formUrlQuery({
  //       params: searchParams.toString(),
  //       key: "query",
  //       value: query,
  //     });
  //   } else {
  //     newUrl = removeKeysFromQuery({
  //       params: searchParams.toString(),
  //       keysToRemove: ["query"],
  //     });
  //   }

  //   router.push(newUrl, { scroll: false });
  // };

  return (
    <section className="wrapper">
      <h2 className="font-medium text-xl xs:text-2xl">
        Everything you're looking for
      </h2>
      <div className="flex items-center gap-4 pt-6">
        {/* <Input
          placeholder="iphone 14"
          value={query}
          onChange={changeHandler}
          className="h-[50px] px-4 outline-none rounded-2xl border border-[#fec900] ring-none"
        /> */}
        {/* <div className="min-w-[68px] h-[50px] rounded-2xl bg-[#f1f3f6] hidden md:flex items-center justify-center cursor-pointer">
          <VscSettings />
        </div> */}
        {/* <Button
          className="h-[50px] text-white bg-[#fec900] min-w-[180px] rounded-2xl px-[14px] items-center gap-3 text-base  hidden md:flex"
          onClick={handleClick}
        >
          <IoSearch />
          Search
        </Button> */}
      </div>
    </section>
  );
};

export default SearchComponent;
