"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

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
import { updateUserInformation } from "@/lib/actions/user-actions";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import isAuth from "@/lib/actions/isAuth";
import { changePasswordSchema } from "@/lib/validator";

const PasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    repeatNewPassword: false,
  });

  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");
  const refreshToken =
    typeof window !== "undefined" && localStorage.getItem("refresh-token");

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: "",
      repeatNewPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    if (values.newPassword !== values.repeatNewPassword) {
      toast.error("Password does not match!");
      return;
    }

    if (!accessToken || !refreshToken) return;
    try {
      setIsLoading(true);
      const status = await updateUserInformation(
        { password: values.newPassword },
        accessToken,
        refreshToken
      );
      if (status === 200) {
        toast.success("password Changed successfully!");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCancel = () => {
    form.reset({
      newPassword: "",
      repeatNewPassword: "",
    });
  };

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
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword.newPassword ? "text" : "password"}
                        {...field}
                        className="rounded-lg ring-none border border-[#DBDBDB] text-[16px] font-medium leading-[24px] py-[22px] outline-none px-14"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      onClick={() =>
                        setShowPassword((prevState) => ({
                          ...prevState,
                          newPassword: !prevState.newPassword,
                        }))
                      }
                      className="outline-none absolute left-1 top-1">
                      {showPassword.newPassword ? (
                        <FaRegEye className="h-6 w-6 text-gray-400" />
                      ) : (
                        <FaRegEyeSlash className="h-6 w-6 text-gray-400" />
                      )}
                    </Button>
                  </div>
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
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={
                          showPassword.repeatNewPassword ? "text" : "password"
                        }
                        {...field}
                        className="rounded-lg ring-none border border-[#DBDBDB] text-[16px] font-medium leading-[24px] py-[22px] outline-none px-14"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      onClick={() =>
                        setShowPassword((prevState) => ({
                          ...prevState,
                          repeatNewPassword: !prevState.repeatNewPassword,
                        }))
                      }
                      className="outline-none absolute left-1 top-1">
                      {showPassword.repeatNewPassword ? (
                        <FaRegEye className="h-6 w-6 text-gray-400" />
                      ) : (
                        <FaRegEyeSlash className="h-6 w-6 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex justify-between">
            <Button
              type="button"
              className="bg-transparent rounded-lg py-[22px] text-[#8996ae] text-center font-medium hover:underline"
              onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#fec900] rounded-lg py-[22px] text-white text-center font-medium hover:bg-[#ffdb4d]">
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default isAuth(PasswordPage);
