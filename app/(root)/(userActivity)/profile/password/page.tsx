"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
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
import { updateUserInformation } from "@/lib/actions/user-actions";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import isAuth from "@/lib/actions/isAuth";

const formSchema = z.object({
  newPassword: z.string().min(4, {
    message: "პაროლის სიგრძე უნდა აღემატებოდეს 4 სიმბოლოს",
  }),
  repeatNewPassword: z.string().min(4, {
    message: "პაროლის სიგრძე უნდა აღემატებოდეს 4 სიმბოლოს",
  }),
});

const PasswordPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");
  const refreshToken =
    typeof window !== "undefined" && localStorage.getItem("refresh-token");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      repeatNewPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.newPassword !== values.repeatNewPassword) {
      toast.error("Password does not match!");
      return;
    }

    if (!accessToken || !refreshToken) return;
    const status = await updateUserInformation(
      { password: values.newPassword },
      accessToken,
      refreshToken
    );
    if (status === 200) {
      toast.success("password Changes successfully, please log in again.");
      dispatch(logout());
      router.push("/sign-in");
    }
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

export default isAuth(PasswordPage);
