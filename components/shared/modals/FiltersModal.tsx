"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { VscSettings } from "react-icons/vsc";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { IoTrashBinSharp } from "react-icons/io5";
import { Input } from "../../ui/input";
import { filtersFormSchema } from "@/lib/validator";
import { useRouter } from "next/navigation";
import Dropdown from "../Dropdown";

export function Filters() {
  const router = useRouter();

  const form = useForm<z.infer<typeof filtersFormSchema>>({
    resolver: zodResolver(filtersFormSchema),
    defaultValues: {
      location: "",
      min_price: "",
      max_price: "",
    },
  });

  function onSubmit(values: z.infer<typeof filtersFormSchema>) {
    const { min_price, max_price, location } = values;
    const queryParams = [];

    if (min_price !== "") queryParams.push(`min_price=${min_price}`);
    if (max_price !== "") queryParams.push(`max_price=${max_price}`);
    if (location !== "") queryParams.push(`location=${location}`);

    const queryString =
      queryParams.length > 0 ? `/search/?${queryParams.join("&")}` : "/search/";

    router.push(queryString);
  }

  return (
    <Dialog>
      <DialogTrigger className="min-w-[68px] h-[50px] rounded-2xl bg-white flex items-center justify-center cursor-pointer">
        <VscSettings />
      </DialogTrigger>
      <DialogContent className="bg-white md:h-auto md:min-w-[624px] h-screen min-w-full flex flex-col gap-4">
        <DialogHeader className="text-lg font-semibold">
          Additional Filters
        </DialogHeader>
        <Separator className="border border-gray-100" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* <div className="w-full flex flex-col gap-4"> */}
            {/* select */}
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-base">Location</span>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Dropdown
                        onChangeHandler={field.onChange}
                        value={field.value}
                        placeholder="Location"
                        type="location"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
            </div>
            {/* price */}
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-base mb-2">Price</span>
              <div className="flex items-center justify-between gap-3">
                <FormField
                  control={form.control}
                  name="min_price"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm font-medium text-[#a3adc0]">
                        From
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="input"
                          {...field}
                          className="input-field"
                          placeholder="from"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="max_price"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm font-medium text-[#a3adc0]">
                        To
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="input"
                          {...field}
                          className="input-field"
                          placeholder="to"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Separator className="border border-gray-100" />
            <div className="w-full flex justify-between items-center gap-2">
              <div
                className="flex  items-center gap-3 text-[#DF2935] text-lg cursor-pointer"
                onClick={() => form.reset()}>
                <IoTrashBinSharp />
                <span>clean up</span>
              </div>
              <Button
                type="submit"
                className="text-white bg-[#fec900] rounded-lg px-12 py-4 text-base">
                Search
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
