"use client";

import { useState } from "react";
import { toast } from "react-toastify";
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
import { useRouter } from "next/navigation";
import { SignInUser, authenticateUser } from "@/lib/actions/user-actions";

const LogInForm = ({ type }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
      // Set loading state to true
      setIsLoading(true);

      let response;

      // Determine the type of authentication
      if (type === "Sign In") {
        // Sign In user
        response = await SignInUser({
          username: values.username,
          password: values.password,
        });
      } else {
        // Authenticate user
        response = await authenticateUser({
          email: values.email || "test@example.com",
          first_name: values.first_name || "test",
          last_name: values.last_name || "test",
          username: values.username,
          password: values.password,
        });
      }

      // Redirect to sign-in page if user ID exists
      if (response.id) {
        router.push(`/sign-in`);
      }

      // If access token exists, store it in local storage and redirect to home page
      if (response.access) {
        typeof window !== "undefined" &&
          localStorage.setItem("access-token", response.access);
        typeof window !== "undefined" &&
          localStorage.setItem("refresh-token", response.refresh);
        router.push("/");
      }

      // If response indicates incorrect credentials, display error message
      if (!response.refresh || !response.access) {
        if (type !== "Sign Up") {
          toast.error(
            "Incorrect credentials, please provide correct password or username",
            {
              position: "top-center",
              autoClose: 3000,
            }
          );
        }
      }
    } catch (error) {
      // Log any errors that occur during authentication
      console.log(error);
    } finally {
      // Set loading state to false regardless of outcome
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
