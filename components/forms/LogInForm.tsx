"use client";

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
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/redux/features/authApiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setAuth } from "@/redux/features/authSlice";

const LogInForm = ({ type }: LoginFormProps) => {
  const [register] = useRegisterMutation();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
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
    const { username, first_name, last_name, email, password } = values;

    if (type === "Sign Up") {
      register({ username, first_name, last_name, email, password })
        .unwrap()
        .then(() => {
          toast.success("Account has beed created successfully!");

          router.push("/sign-in");
        })
        .catch(() => {
          toast.error("Failed to register account");
        });
    }

    if (type === "Sign In") {
      login({ password, username })
        .unwrap()
        .then((response) => {
          typeof window !== "undefined" &&
            localStorage.setItem("access-token", response.access);
          typeof window !== "undefined" &&
            localStorage.setItem("refresh-token", response.refresh);

          dispatch(setAuth());
          toast.success("Logged in");
          router.push("/");
        })
        .catch(() => {
          toast.error("Failed to log in");
        });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sm:space-y-14 space-y-16">
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
          className="w-full bg-primary rounded-lg py-[22px] text-white text-center font-medium text-xl hover:bg-[#ffdb4d]"
          disabled={isLoading}>
          {isLoading ? `${type}...` : type}
        </Button>
      </form>
    </Form>
  );
};

export default LogInForm;
