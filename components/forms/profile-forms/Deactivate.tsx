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
import { deactivateFormSchema } from "@/lib/validator";
import { useState } from "react";
import { deleteUser } from "@/lib/actions/user-actions";

const DeactivateForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const user =
    typeof window !== "undefined" && localStorage.getItem("access-token");
  const form = useForm<z.infer<typeof deactivateFormSchema>>({
    resolver: zodResolver(deactivateFormSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof deactivateFormSchema>) {
    try {
      if (!user) return;

      const isAccountDeactivated = await deleteUser(user, values.password);

      console.log({ isAccountDeactivated });

      setIsLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-[#a3adc0]">
                Password*
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} className="input-field" />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <div className="w-full flex  justify-end">
          <Button
            type="submit"
            className="bg-transparent rounded-lg py-[22px] text-[#8996ae] text-center font-medium hover:underline">
            გაუქმება
          </Button>
          <Button
            type="submit"
            className="bg-[#fec900] rounded-lg py-[22px] text-white text-center font-medium hover:bg-[#ffdb4d]">
            დადასტურება
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DeactivateForm;