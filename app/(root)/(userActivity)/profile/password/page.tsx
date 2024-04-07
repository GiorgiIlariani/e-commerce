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

const formSchema = z.object({
  newPassword: z.string().min(4, {
    message: "პაროლის სიგრძე უნდა აღემატებოდეს 4 სიმბოლოს",
  }),
  repeatNewPassword: z.string().min(4, {
    message: "პაროლის სიგრძე უნდა აღემატებოდეს 4 სიმბოლოს",
  }),
  currentPassword: z.string().min(4, {
    message: "პაროლის სიგრძე უნდა აღემატებოდეს 4 სიმბოლოს",
  }),
});

const PasswordPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      repeatNewPassword: "",
      currentPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <section className="w-full flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col 1200:flex-row gap-6 items-center mb-8">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="w-full 1200:w-1/2">
                  <FormLabel className="text-sm font-medium text-[#a3adc0]">
                    New Password*
                  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} className="input-field" />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repeatNewPassword"
              render={({ field }) => (
                <FormItem className="w-full 1200:w-1/2">
                  <FormLabel className="text-sm font-medium text-[#a3adc0]">
                    Repeat New Password*
                  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} className="input-field" />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem className="w-full 1200:w-1/2">
                <FormLabel className="text-sm font-medium text-[#a3adc0]">
                  Current Password*
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} className="input-field" />
                </FormControl>
                <FormMessage className="text-red-600" />
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

export default PasswordPage;
