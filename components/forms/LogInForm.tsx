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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInFormSchema } from "@/lib/validator";
import { useState } from "react";

const LogInForm = ({ type }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const formDefaultValues =
    type === "SignIn"
      ? {
          email: "",
          password: "",
        }
      : { email: "", password: "", username: "" };

  // const formSchema = type === "SignIn" ? SignInFormSchema : SignUpFormSchema;

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: formDefaultValues,
  });

  function onSubmit(values: z.infer<typeof SignInFormSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    console.log({ values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} className="input-field" />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  {...field}
                  className="input-field"
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        {type === "SignUp" && (
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Username"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
        )}
        <Button
          type="submit"
          className="w-full bg-[#fec900] rounded-lg py-[22px] text-white text-center font-medium text-xl hover:bg-[#ffdb4d]"
          disabled={isLoading}>
          {isLoading ? `${type}...` : type}
        </Button>
      </form>
    </Form>
  );
};

export default LogInForm;
