"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
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
import {
  updateUserInformation,
  updateUserProfileImage,
} from "@/lib/actions/user-actions";
import isAuth from "@/lib/actions/isAuth";
import { changeUserInformationSchema } from "@/lib/validator";

const InfoPage = () => {
  const [file, setFile] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");
  const refreshToken =
    typeof window !== "undefined" && localStorage.getItem("refresh-token");

  const { data: user, refetch } = useRetrieveUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated]);

  const form = useForm<z.infer<typeof changeUserInformationSchema>>({
    resolver: zodResolver(changeUserInformationSchema),
    defaultValues: {
      image: user ? user?.image : "",
      username: user ? user?.username : "",
      email: user ? user?.email : "",
      agreement: false,
    },
  });

  async function onSubmit(values: z.infer<typeof changeUserInformationSchema>) {
    let imageUploadStatus;
    let userInfoStatus;
    if (!accessToken || !refreshToken) return;

    try {
      setIsLoading(true);

      if (file.length) {
        const status = await updateUserProfileImage({
          accessToken,
          image: file[0],
        });
        imageUploadStatus = status;
      }

      if (user?.email !== values.email || user?.username !== values.username) {
        const status = await updateUserInformation(
          values,
          accessToken,
          refreshToken
        );
        userInfoStatus = status;
      }

      if (imageUploadStatus === 200 || userInfoStatus === 200) {
        toast.success("user account details changed successfully!");
      }

      if (
        file.length === 0 &&
        user?.email !== values.email &&
        user?.username !== values.username
      ) {
        return;
      }

      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const handleCancelChanges = () => {
    form.reset({
      image: user?.image,
      username: user?.username,
      email: user?.email,
      agreement: false,
    });
  };

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
                    <Image
                      src={field.value}
                      alt="image"
                      width={64}
                      height={64}
                      priority
                      className="object-cover w-16 h-16 rounded-[12px]"
                    />
                  )}
                </FormLabel>
                <FormControl className="flex-1 font-normal text-lg text-gray-200">
                  <Input
                    accept="image/*"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleImageChange(e, field.onChange)}
                  />
                </FormControl>
                <div className="flex flex-col">
                  <p className="text-[#a3adc0] text-sm">Profile photo</p>
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
              <FormItem className="flex flex-col space-y-4 p-4">
                <div className="flex flex-row space-x-3 space-y-0">
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
                </div>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <Separator className="w-full my-2 bg-[#e4e7ed]" />
          <div className="w-full flex justify-between">
            <Button
              type="button"
              className="bg-transparent rounded-lg py-[22px] text-[#8996ae] text-center font-medium hover:underline"
              onClick={handleCancelChanges}>
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

export default isAuth(InfoPage);
