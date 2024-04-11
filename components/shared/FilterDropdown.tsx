"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function FilterDropdown() {
  const [selectedItem, setSelectedItem] = useState("თარიღი კლებადი");

  const handleMenuItemClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-[170px]">
        <Button variant="outline">{selectedItem}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[170px]">
        <DropdownMenuGroup className="ring-none">
          <DropdownMenuItem
            className="cursor-pointer hover:text-blue-300"
            onClick={() => handleMenuItemClick("თარიღი კლებადი")}>
            თარიღი კლებადი
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:text-blue-300"
            onClick={() => handleMenuItemClick("თარიღი ზრდადი")}>
            თარიღი ზრდადი
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="ring-none">
          <DropdownMenuItem
            className="cursor-pointer hover:text-blue-300"
            onClick={() => handleMenuItemClick("ფასი ზრდადი")}>
            ფასი ზრდადი
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:text-blue-300"
            onClick={() => handleMenuItemClick("ფასი კლებადი")}>
            ფასი კლებადი
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="ring-none">
          <DropdownMenuItem
            className="cursor-pointer hover:text-blue-300"
            onClick={() => handleMenuItemClick("ნახვები ზრდადი")}>
            ნახვები ზრდადი
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:text-blue-300"
            onClick={() => handleMenuItemClick("ნახვები კლებადი")}>
            ნახვები კლებადი
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
