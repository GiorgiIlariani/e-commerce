"use client";

import { fetchSingleProduct } from "@/lib/actions/product-actions";
import { MdAccessTime } from "react-icons/md";
import { TbCurrencyLari } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { sliceDescription } from "@/utils";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Spinner from "@/components/shared/loader/Spinner";
import { convertDate } from "../../../../utils";
import { fetchDropdownContentList } from "@/lib/actions/selectData-actions";

const ProductDetailsPage = ({ params }: { params: { id: string } }) => {
  const [isSliced, setIsSliced] = useState(true);
  const [productDetails, setProductDetails] = useState<Product>();
  const [location, setLocation] = useState("");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSingleProductDetails = async () => {
      try {
        setIsLoading(true);
        const details = await fetchSingleProduct(params.id);
        const locationData = await fetchDropdownContentList("location");

        setLocation(locationData[details?.location - 1].name);
        setProductDetails(details);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSingleProductDetails();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] w-full flex-center">
        <Spinner lg />
      </div>
    );
  }

  return (
    <section className="wrapper flex flex-col lg:flex-row gap-8 w-full bg-[#f1f3f6] py-10">
      <div className="basis-2/5 shrink-0 bg-white flex flex-col justify-center gap-4 rounded-2xl h-max">
        <div className="w-[320px] mx-auto">
          <Swiper
            mousewheel
            slidesPerView={1}
            spaceBetween={10}
            navigation={true}
            thumbs={{
              swiper: thumbsSwiper && !thumbsSwiper ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 object-cover">
            {productDetails?.images?.map((image) => (
              <SwiperSlide key={image.id}>
                <Image
                  src={image.image}
                  alt="product image"
                  width={300}
                  height={350}
                  className="object-cover w-full  h-[300px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="max-w-[390px] h-[130px] pb-4 px-3 mx-auto">
          <Swiper
            spaceBetween={10}
            slidesPerView={
              productDetails?.images.length! < 3
                ? productDetails?.images.length
                : 3
            }
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
            onSwiper={setThumbsSwiper as any}>
            {productDetails?.images?.map((image) => (
              <SwiperSlide key={image.id}>
                <Image
                  src={image.image}
                  alt="product image"
                  width={120}
                  height={100}
                  className="rounded-2xl object-cover max-w-[120px] h-[100px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <article className="flex-1 flex flex-col justify-between lg:justify-start gap-4 bg-white rounded-2xl p-6">
        <div className="flex flex-wrap gap-8 text-lg font-semibold">
          <p className="flex gap-2 items-center">ID: {productDetails?.id}</p>

          <p className="flex gap-2 items-center">
            <span className="text-gray-500">
              <FaLocationDot />
            </span>
            {location}
          </p>

          <p className="flex gap-2 items-center ml-6">
            <span className="text-gray-500">
              <MdAccessTime />
            </span>
            {convertDate(productDetails?.created_at!)}
          </p>
        </div>

        <div className="text-3xl font-semibold mt-6">
          <h3>{productDetails?.name}</h3>
          <p className="flex items-center gap-1 mt-4">
            {productDetails?.price}
            <span>
              <TbCurrencyLari />
            </span>
          </p>
        </div>

        <div className="w-full h-[1px] bg-gray-500 my-4" />

        {productDetails?.description && (
          <p className="flex flex-col gap-10 justify-start text-gray-700">
            {sliceDescription(productDetails?.description, 300, isSliced)}
            {productDetails?.description.length > 300 && (
              <button
                className="text-blue-500 w-max"
                onClick={() => setIsSliced((prev) => !prev)}>
                {isSliced ? "Continue reading" : "show less"}
              </button>
            )}
          </p>
        )}
      </article>
    </section>
  );
};

export default ProductDetailsPage;
