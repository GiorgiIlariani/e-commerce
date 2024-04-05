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
import { usePathname, useRouter } from "next/navigation";
import { SignInUser, authenticateUser } from "@/lib/actions/user-actions";

const LogInForm = ({ type }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const formDefaultValues =
    type === "Sign In"
      ? {
          username: "",
          password: "",
        }
      : {
          username: "",
          email: "",
          first_name: "",
          last_name: "",
          password: "",
        };

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: formDefaultValues,
  });

  async function onSubmit(values: z.infer<typeof SignInFormSchema>) {
    try {
      setIsLoading(true);
      let response;

      if (type === "Sign In") {
        response = await SignInUser({
          username: values.username,
          password: values.password,
        });
      } else {
        response = await authenticateUser({
          email: values.email || "test@example.com",
          first_name: values.first_name || "test",
          last_name: values.last_name || "test",
          username: values.username,
          password: values.password,
        });
      }

      if (response.id) {
        router.push(`${pathname}/sign-in`);
      }

      if (response.access) {
        typeof window !== "undefined" &&
          localStorage.setItem("access-token", response.access);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sm:space-y-14 space-y-16">
        {/* username */}
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
        {type === "Sign Up" && (
          <>
            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            {/* first name */}
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            {/* last name */}
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Last Name"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </>
        )}
        {/* password */}
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
