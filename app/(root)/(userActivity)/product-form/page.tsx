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
import { useEffect, useState } from "react";
import AdditionalInformation from "@/components/shared/AdditionalInformation";
import Dropdown from "@/components/shared/Dropdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postProduct } from "@/lib/actions/product-actions";
import { fetchCategoriesList } from "@/lib/actions/categories-actions";
import UploadImageContainer from "@/components/forms/product-form/UploadImageContainer";

const formSchema = z.object({
  description: z.string().optional(),
  name: z.string(),
  price: z.string(),
  location: z.string(),
  // images: z.string().array().min(2).max(12),
  category: z.string(),
});

const ProductFormPage = () => {
  const user =
    typeof window !== "undefined" && localStorage.getItem("access-token");
  const [images, setImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "", // არის
      name: "", // არის
      price: "", // არის
      location: "", // არის
      // images: [], // არააა ჯერ
      category: "", // არის
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      if (!user) return;
      const product = await postProduct(values, user);

      console.log(product);
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
        <div className="w-full bg-white rounded-3xl py-10 px-10 mt-5">
          <h2 className="text-xl font-bold">განცხადების დეტალები</h2>
          <h5 className="text-sm mt-3">განცხადების ტიპი</h5>
          <div className="flex items-center gap-x-3 my-[10px]">
            <Button
              type="button"
              className="rounded-3xl bg-[#4a6cfa] text-white px-7 py-[10px]">
              გაყიდვა
            </Button>
          </div>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* upload images */}
        <div className="w-full bg-white rounded-3xl p-10 mt-5 flex flex-col">
          <AdditionalInformation text="სწორად შერჩეული ფოტოებით მეტ ადამიანს მიიზიდავ" />
          {images.length === 0 ? (
            <UploadImageContainer
            // setFieldValue={setFieldValue}
            // handleImageChange={handleImageChange}
            />
          ) : (
            <div className="w-full flex flex-wrap items-center gap-3 mb-5">
              {/* // <UploadImageContainer
              //   setFieldValue={setFieldValue}
              //   handleImageChange={handleImageChange}
              //   alreadyUploadedImage={true}
              // />
              // {images.map((image, index) => {
              //   const src = URL.createObjectURL(image);
              //   const isFirstImage = index === 0; // Check if it's the first image

              //   return (
              //     <UploadedImages
              //       key={index}
              //       src={src}
              //       isFirstImage={isFirstImage}
              //       image={image}
              //       index={index}
              //       handleImageRemove={handleImageRemove}
              //       handleAddAsFirstImage={handleAddAsFirstImage}
              //     />
              //   );
              // })} */}
            </div>
          )}
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
                <FormMessage />
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
              <FormItem>
                <FormLabel>აირჩიე მდებარეობა*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="input-field">
                      <SelectValue placeholder="აირჩიე მდებარეობა" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* {categories.map((category) => (
                      <SelectItem value={category?.name} key={category.id}>
                        {category?.name}
                      </SelectItem>
                    ))} */}

                    <SelectItem value="Tbilisi">Tbilisi</SelectItem>
                    <SelectItem value="Rustavi">Rustavi</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full bg-white flex justify-between items-center px-12 py-6 rounded-[20px] mt-5">
          <div className="font-bold text-base bg-transparent hover:underline text-gray-400 cursor-pointer hover:decoration-blue-900">
            გაუქმება
          </div>
          <Button
            type="submit"
            className="text-white text-base font-bold px-10 py-[14px] bg-[#fec900] rounded-lg">
            გამოქვეყნება
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductFormPage;
