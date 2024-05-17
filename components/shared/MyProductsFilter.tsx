"use client";

import { useState, useEffect, Dispatch } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";
import Dropdown from "./Dropdown";
import { MdKeyboardArrowDown } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MyProductsFilter = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const updateUrl = () => {
      const queryParams = new URLSearchParams();

      // Add or remove the 'search' parameter based on the 'query'
      if (query) {
        queryParams.set("search", query);
      } else {
        queryParams.delete("search");
      }

      // Add or remove the 'category' parameter based on the 'selectedCategory'
      if (selectedCategory) {
        queryParams.set("category", selectedCategory);
      } else {
        queryParams.delete("category");
      }

      // Add or remove the 'minPrice' parameter based on 'minPrice'
      if (minPrice) {
        queryParams.set("min_price", minPrice.toString());
      } else {
        queryParams.delete("min_price");
      }

      // Add or remove the 'maxPrice' parameter based on 'maxPrice'
      if (maxPrice) {
        queryParams.set("max_price", maxPrice.toString());
      } else {
        queryParams.delete("max_price");
      }

      const url = queryParams.toString();
      router.push(`${pathname}/?${url}`, { scroll: false });
    };

    const debouncedUpdateUrl = setTimeout(updateUrl, 300);

    return () => {
      clearTimeout(debouncedUpdateUrl);
    };
  }, [query, selectedCategory, minPrice, maxPrice]);

  return (
    <div className="w-full rounded-[16px] py-6 px-4 bg-white flex flex-col sm:flex-row items-center gap-4 mt-6">
      {/* search */}
      <div className="flex-1 w-full sm:max-w-[320px]">
        <Input
          type="text"
          className="input-field"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* categories */}
      <div className="flex-1 w-full sm:max-w-[230px]">
        <Dropdown
          value={selectedCategory}
          placeholder="category"
          type="category"
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* price */}
      <div className="flex-1 w-full sm:max-w-full">
        <Popover>
          <PopoverTrigger asChild className="w-full py-[22px] flex-between">
            <Button variant="outline" className="flex-between w-full">
              <p>Price</p> <MdKeyboardArrowDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-white">
            <div className="flex items-center gap-5">
              <Input
                type="number"
                placeholder="from"
                className="input-field"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <Input
                type="number"
                placeholder="To"
                className="input-field"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default MyProductsFilter;
