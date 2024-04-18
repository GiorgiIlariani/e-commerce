import * as React from "react";
import { Separator } from "../ui/separator";
import { IoIosHeartEmpty } from "react-icons/io";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { sliceDescription } from "@/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/lib/actions/favorite-actions";

const ProductCard = ({
  id,
  name,
  description,
  category,
  price,
  quantity,
  created_at,
  location,
  images,
  user,
  isFavorite,
  refetchFavorites,
}: Product & {
  isFavorite: boolean;
  refetchFavorites: () => Promise<void>;
}) => {
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");

  const handleFavoriteClick = async () => {
    try {
      if (!accessToken) return;
      if (!isFavorite) {
        await addToFavorites(String(id), accessToken);
      } else {
        await removeFromFavorites(String(23), accessToken);
      }
      // After adding/removing favorite, trigger refetch
      refetchFavorites();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link
      className="flex flex-col justify-between bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer xs:max-w-[350px] px-3 py-3 hover:scale-105 transition duration-300"
      href={`/search/${id}`}>
      <div className="relative w-full h-40 overflow-hidden">
        <Swiper
          mousewheel
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper">
          {images.map(({ image, id }) => (
            <SwiperSlide
              key={id}
              className="text-center flex justify-center items-center">
              <Image
                alt="product img"
                src={image}
                className="w-full h-full rounded-2xl object-cover"
                fill
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="relative flex flex-col flex-1 justify-between gap-3 p-4">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-gray-800 capitalize">
            {name}
          </h3>
          <p className="text-sm text-gray-600 mt-3">
            {sliceDescription(description, 65, true)}
          </p>
        </div>

        <div>
          <Separator className="mb-4 border" />

          <div className="flex-between">
            <span className="text-lg font-bold text-gray-700">{price}₾</span>
            <div
              className={`${
                isFavorite
                  ? "bg-[#fec900] text-white"
                  : "bg-gray-200 text-black"
              } flex-center rounded-[8px]  w-8 h-8 hover:text-white hover:bg-[#fec900] transition duration-300 favorite-icon`}
              onClick={handleFavoriteClick}>
              <IoIosHeartEmpty className="text-lg" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
