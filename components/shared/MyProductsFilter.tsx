"use client";

import * as React from "react";
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
import { formUrlQuery, removeKeysFromQuery } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";

const MyProductsFilter = () => {
  React.useState([]);
  const [date, setDate] = React.useState<Date>();
  const [query, setQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
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
  }, [query, searchParams, router]);

  return (
    <div className="w-full rounded-[16px] py-6 px-4 bg-white flex items-center gap-4 mt-6">
      {/* search */}
      <div className="flex-1 max-w-[320px]">
        <Input
          type="text"
          className="input-field"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* categories */}
      <div className="flex-1 max-w-[230px]">
        <Dropdown
          // onChangeHandler={setSelectedCategory}
          value={selectedCategory}
          placeholder="category"
          type="category"
        />
      </div>

      {/* date picker */}
      <div className="relative flex-1 max-w-[160px]">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal py-[22px]",
                !date && "text-muted-foreground"
              )}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>თარიღი</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 bg-white">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* price */}
      <div className="flex-1 max-w-[130px]">
        <Popover>
          <PopoverTrigger asChild className="w-full py-[22px] flex-between">
            <Button variant="outline" className="flex-between w-full">
              <p>ფასი</p> <MdKeyboardArrowDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-white">
            <div className="flex items-center gap-5">
              <Input type="number" placeholder="from" className="input-field" />
              <Input type="number" placeholder="To" className="input-field" />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default MyProductsFilter;
