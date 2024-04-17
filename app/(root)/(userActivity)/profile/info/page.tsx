"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { ChangeEvent, useEffect, useState } from "react";

const formSchema = z.object({
  image: z.string().optional(),
  username: z.string(),
  email: z.string().email(),
  agreement: z.boolean(),
});

const InfoPage = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { data: user, refetch } = useRetrieveUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: user ? user?.profile?.image : "",
      username: user ? user?.username : "",
      email: user ? user?.email : "",
      agreement: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel className="w-16 h-16  border broder-[#e4e7ed] cursor-pointer rounded-[12px]">
                  {field.value && (
                    <div>user image</div>
                    // <Image
                    //   src={field.value}
                    //   alt="image"
                    //   width={64}
                    //   height={64}
                    //   priority
                    //   className="object-contain w-16 h-16 rounded-[12px]"
                    // />
                  )}
                </FormLabel>
                <FormControl className="flex-1 font-normal text-lg text-gray-200">
                  <Input
                    {...field}
                    accept="image/*"
                    type="file"
                    className="hidden"
                  />
                </FormControl>
                <div className="flex flex-col">
                  <p className="text-[#a3adc0] text-sm">პროფილის ფოტო</p>
                  <span className="text-[#728cfb] text-sm">64x128px</span>
                </div>
              </FormItem>
            )}
          />

          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="text-sm font-medium text-[#a3adc0]">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} className="input-field" />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="text-sm font-medium text-[#a3adc0]">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} className="input-field" />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="agreement"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-[#272a37]">
                    Agreement{" "}
                    <span className="text-[#4a6cfa]"> data processing</span>
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Separator className="w-full my-2 bg-[#e4e7ed]" />
          <div className="w-full flex justify-between">
            <Button
              type="submit"
              className="bg-transparent rounded-lg py-[22px] text-[#8996ae] text-center font-medium hover:underline">
              გაუქმება
            </Button>
            <Button
              type="submit"
              className="bg-[#fec900] rounded-lg py-[22px] text-white text-center font-medium hover:bg-[#ffdb4d]">
              შენახვა
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default InfoPage;
