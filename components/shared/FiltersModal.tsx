"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { VscSettings } from "react-icons/vsc";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { IoTrashBinSharp } from "react-icons/io5";
import { Input } from "../ui/input";

export function Filters() {
  return (
    <Dialog>
      <DialogTrigger className="min-w-[68px] h-[50px] rounded-2xl bg-[#f1f3f6] hidden md:flex items-center justify-center cursor-pointer">
        <VscSettings />
      </DialogTrigger>
      {/* min-w-full min-h-screen md:max-h-[734px] md:min-w-[624px]  */}
      <DialogContent className="bg-white md:h-auto md:min-w-[624px] h-screen min-w-full flex flex-col gap-4">
        <DialogHeader className="text-lg font-semibold">
          Additional Filters
        </DialogHeader>
        <Separator className="border border-gray-100" />
        <div className="w-full flex flex-col gap-4">
          {/* select */}
          <div className="flex flex-col gap-2">
            <span className="text-gray-500 text-base">Location</span>
            <Select>
              <SelectTrigger className="w-full ring-none">
                <SelectValue placeholder="Choose location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Gori">Gori</SelectItem>
                <SelectItem value="Tbilisi">Tbilisi</SelectItem>
                <SelectItem value="Kutaisi">Kutaisi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* price */}
          <div className="flex flex-col gap-2">
            <span className="text-gray-500 text-base mb-2">Price</span>
            <div className="flex items-center gap-3">
              <Input
                placeholder="from"
                // value={query}
                // onChange={changeHandler}
                className="ring-none"
              />
              <span>{" - "}</span>
              <Input
                placeholder="To"
                // value={query}
                // onChange={changeHandler}
                className="ring-none"
              />
            </div>
          </div>
        </div>

        <Separator className="border border-gray-100" />
        <div className="w-full flex justify-between items-center gap-2">
          <div className="flex items-center gap-3 text-[#DF2935] text-lg cursor-pointer">
            <IoTrashBinSharp />
            <span>clean up</span>
          </div>
          <Button className="text-white bg-[#fec900] rounded-lg px-12 py-4 text-base">
            Search
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
