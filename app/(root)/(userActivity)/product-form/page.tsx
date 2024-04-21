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
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState } from "react";
import AdditionalInformation from "@/components/shared/AdditionalInformation";
import Dropdown from "@/components/shared/Dropdown";
import { postImages, postProduct } from "@/lib/actions/product-actions";
import UploadImageContainer from "@/components/forms/product-form/UploadImageContainer";
import { productFormSchema } from "@/lib/validator";
import UploadedImages from "@/components/forms/product-form/uploadedImages";

const ProductFormPage = () => {
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      description: "",
      name: "",
      price: "",
      location: "",
      images: [],
      category: "",
    },
  });

  async function onSubmit(values: z.infer<typeof productFormSchema>) {
    try {
      setLoading(true);
      if (!accessToken) return;
      // const product = await postProduct(values, accessToken);
      // const productId = product?.id;
      // await postImages("3", accessToken, values.images);
      console.log(values.images);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // const handleImagesChange = async (
  //   e: ChangeEvent<HTMLInputElement>,
  //   field: any
  // ) => {
  //   e.preventDefault();

  //   const fileReader = new FileReader();
  //   const selectedFiles = e.target.files;

  //   if (!selectedFiles || selectedFiles.length === 0) {
  //     return;
  //   }

  //   const imagePromises: Promise<string>[] = [];

  //   for (let i = 0; i < selectedFiles.length; i++) {
  //     const file = selectedFiles[i];

  //     if (file.type.includes("image")) {
  //       const promise = new Promise<string>((resolve) => {
  //         fileReader.onload = (event) => {
  //           const imageDataUrl = event.target?.result?.toString() || "";
  //           resolve(imageDataUrl);
  //         };
  //         fileReader.readAsDataURL(file);
  //       });

  //       imagePromises.push(promise);
  //     }
  //   }

  //   try {
  //     const imageDataUrls = await Promise.all(imagePromises);
  //     const newImages = [...field.value, ...imageDataUrls];
  //     field.onChange(newImages);
  //     setImages(newImages);
  //   } catch (error) {
  //     console.error("Error reading image files:", error);
  //     // Handle error gracefully
  //   }
  // };

  const handleImagesChange = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sm:space-y-14 space-y-16">
        <div className="w-full bg-white rounded-3xl py-10 px-10 mt-5">
          <h2 className="text-lg font-bold">განცხადების დეტალები</h2>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full mt-6">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                    placeholder="Category"
                    type="category"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
        </div>

        {/* upload images */}
        <div className="w-full bg-white rounded-3xl p-10 mt-5 flex flex-col">
          <AdditionalInformation text="სწორად შერჩეული ფოტოებით მეტ ადამიანს მიიზიდავ" />

          <div className="w-full flex flex-wrap items-center gap-3 mb-5">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className={`${images.length === 0 && "w-full"}`}>
                  <FormControl>
                    <UploadImageContainer
                      handleImagesChange={handleImagesChange}
                      field={field}
                      isAtListOneImage={images.length > 0}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* {images.map((image, index) => {
              const isFirstImage = index === 0; // Check if it's the first image
              return (
                <UploadedImages
                  key={index}
                  imageUrl={image}
                  isFirstImage={isFirstImage}
                  index={index}
                  // handleImageRemove={handleImageRemove}
                  // handleAddAsFirstImage={handleAddAsFirstImage}
                />
              );
            })} */}
          </div>
        </div>

        <div className="w-full flex flex-col bg-white rounded-3xl p-10 mt-5">
          <h2 className="text-lg font-bold">ძირითადი მახასიათებლები</h2>
          <AdditionalInformation text="დაამატე შესაფერისი სათაური და აღწერა" />
          <div className="flex flex-col gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>სათაური*</FormLabel>
                  <FormControl>
                    <Input {...field} className="input-field" />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>აღწერა*</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="input-field" rows={5} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="w-full flex flex-col bg-white rounded-2xl p-7 mt-5">
          <h2 className="text-lg font-bold">ფასი</h2>

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>მიუთითე ნივთის ფასი*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="0"
                    className="input-field"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex flex-col bg-white rounded-3xl py-10 px-10 mt-5">
          <h2 className="text-[20px] font-bold tracking-wide">
            საკონტაქტო ინფორმაცია
          </h2>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full mt-6">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                    placeholder="Location"
                    type="location"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full bg-white flex justify-between items-center px-12 py-6 rounded-[20px] mt-5">
          <div className="font-bold text-base bg-transparent hover:underline text-gray-400 cursor-pointer hover:decoration-blue-900">
            Cancel
          </div>
          <Button
            type="submit"
            className="text-white text-base font-bold px-10 py-[14px] bg-[#fec900] rounded-lg">
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductFormPage;
