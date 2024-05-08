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
import { ChangeEvent, useEffect, useState } from "react";
import AdditionalInformation from "@/components/shared/AdditionalInformation";
import Dropdown from "@/components/shared/Dropdown";
import {
  editProduct,
  fetchSingleProduct,
  postImages,
  postProduct,
} from "@/lib/actions/product-actions";
import UploadImageContainer from "@/components/forms/product-form/UploadImageContainer";
import { productFormSchema } from "@/lib/validator";
import UploadedImages from "@/components/forms/product-form/uploadedImages";
import { useRouter, useSearchParams } from "next/navigation";
import UserActivityHeader from "@/components/shared/UserActivityHeader";
import { toast } from "react-toastify";
import isAuth from "@/lib/actions/isAuth";

type ProductImageType = string[] | { id: number; image: string }[];

const ProductFormPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<ProductImageType>([]);
  const [imagesForUpload, setImagesForUpload] = useState<any>([]);
  const [product, setProduct] = useState<Product>();
  const searchParams = useSearchParams();

  const productId = searchParams.get("productId");

  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");

  const refreshToken =
    typeof window !== "undefined" && localStorage.getItem("refresh-token");

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      description: product ? product?.description : "",
      name: product ? product?.name : "",
      price: product ? String(product?.price) : "",
      location: product ? String(product?.location) : "",
      images: product ? product?.images : [],
      category: product ? String(product?.category) : "",
    },
  });

  useEffect(() => {
    const fetchEditedProduct = async () => {
      try {
        if (!productId) return;

        const product = await fetchSingleProduct(productId);
        setProduct(product);

        console.log(product);

        // Set the default values for the form fields after fetching the product data
        form.reset({
          description: product.description,
          name: product.name,
          price: String(product.price), // You can modify this accordingly
          location: String(product.location), // You can modify this accordingly
          images: product.images, // You can modify this accordingly
          category: String(product.category[0]), // You can modify this accordingly
        });
        setImages(product.images);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEditedProduct();
  }, []);

  async function onSubmit(values: z.infer<typeof productFormSchema>) {
    try {
      setLoading(true);
      if (!accessToken || !refreshToken) return;

      if (productId) {
        // User is editing an existing product
        const product = await editProduct(
          productId,
          values,
          accessToken,
          refreshToken
        );
        await postImages(
          String(product?.id),
          accessToken,
          imagesForUpload,
          refreshToken
        );
        router.push(`/search/${product.id}`);
      } else {
        // User is creating a new product
        const product = await postProduct(values, accessToken, refreshToken);
        await postImages(
          String(product?.id),
          accessToken,
          imagesForUpload,
          refreshToken
        );

        // Redirect user
        router.push("/search");
      }

      // successMessage
      toast.success(
        `Product ${productId ? "updated" : "created"} successfully!`
      );

      // Reset form values and state
      form.reset();
      setImages([]);
      setImagesForUpload([]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleImagesChange = async (
    e: ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    e.preventDefault();

    const selectedFiles = e.target.files;

    if (!selectedFiles || selectedFiles.length === 0) {
      return;
    }

    // Convert FileList to array
    const filesArray = Array.from(selectedFiles);

    // Calculate the total number of images after adding the new ones
    const totalImages = images.length + filesArray.length;

    // Check if adding the new images will exceed the limit of 12
    if (totalImages > 12) {
      // Display an error message or handle the error gracefully
      console.error("Exceeded maximum number of images (12)");
      return;
    }

    const imagePromises = filesArray.map((file) => {
      if (file.type.includes("image")) {
        return new Promise<string>((resolve) => {
          const fileReader = new FileReader();
          fileReader.onload = (event) => {
            const imageDataUrl = event.target?.result?.toString() || "";
            resolve(imageDataUrl);
          };
          fileReader.readAsDataURL(file);
        });
      }
      return Promise.resolve("");
    });

    try {
      const imageDataUrls = await Promise.all(imagePromises);
      const newImages = [...field.value, ...imageDataUrls.filter(Boolean)];
      field.onChange(newImages);
      setImages(newImages);
      setImagesForUpload([...imagesForUpload, ...filesArray]);
    } catch (error) {
      console.error("Error reading image files:", error);
      // Handle error gracefully
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#f1f3f6]">
      <div className="wrapper flex flex-col gap-3">
        <UserActivityHeader route="Create Product" />
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
                        {images.length < 12 && (
                          <UploadImageContainer
                            handleImagesChange={handleImagesChange}
                            field={field}
                            isAtListOneImage={images.length > 0}
                          />
                        )}
                      </FormControl>
                    </FormItem>
                  )}
                />

                {images.map((image, index) => {
                  const isFirstImage = index === 0; // Check if it's the first image
                  const imageUrl =
                    typeof image === "string" ? image : image.image;
                  return (
                    <UploadedImages
                      key={index}
                      imageUrl={imageUrl}
                      isFirstImage={isFirstImage}
                      index={index}
                      // handleImageRemove={handleImageRemove}
                      // handleAddAsFirstImage={handleAddAsFirstImage}
                    />
                  );
                })}
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
                {loading
                  ? productId
                    ? "Editing..."
                    : "Submitting..."
                  : productId
                  ? "Edit"
                  : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default isAuth(ProductFormPage);
