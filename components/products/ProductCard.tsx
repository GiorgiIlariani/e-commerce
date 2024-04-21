import * as React from "react";
import { Separator } from "../ui/separator";
import { IoIosHeartEmpty } from "react-icons/io";
import Image from "next/image";
import { sliceDescription, sliceTitle } from "@/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { MdAddShoppingCart } from "react-icons/md";

import "swiper/css";
import "swiper/css/pagination";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/lib/actions/favorite-actions";
import { useRouter } from "next/navigation";
import { addToCart, removeProductFromCart } from "@/lib/actions/cart-actions";

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
  isInCart,
  refetchFavorites,
  refetchCartProducts,
  baseUrl,
}: Product & {
  isFavorite?: boolean;
  isInCart?: boolean;
  refetchFavorites?: () => Promise<void>;
  refetchCartProducts?: () => Promise<void>;
  baseUrl?: string;
}) => {
  const router = useRouter();

  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");

  const handleFavoriteClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    try {
      e.stopPropagation();
      if (!accessToken) return;
      if (!isFavorite) {
        await addToFavorites(String(id), accessToken);
      } else {
        await removeFromFavorites(String(id), accessToken);
      }
      refetchFavorites && refetchFavorites();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCart = async (e: React.MouseEvent<HTMLDivElement>) => {
    try {
      e.stopPropagation();
      if (!accessToken) return;
      if (!isInCart) {
        await addToCart(String(id), accessToken, quantity);
      } else {
        await removeProductFromCart(String(id), accessToken);
      }
      refetchCartProducts && refetchCartProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex flex-col justify-between bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer xs:max-w-[370px] px-3 py-3 hover:scale-105 transition duration-300"
      onClick={() => router.push(`/search/${id}`)}>
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
                src={baseUrl ? baseUrl + image : image}
                className="w-full h-full rounded-2xl object-cover"
                fill
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="relative flex flex-col flex-1 justify-between gap-3 p-2">
        <div className="mb-1">
          <h3 className="text-base font-semibold text-gray-800 capitalize overflow-ellipsis whitespace-normal">
            {sliceTitle(description, 20, true)}
          </h3>
          <p className="text-sm text-gray-600 mt-3">
            {sliceDescription(description, 65, true)}
          </p>
        </div>

        <div>
          <Separator className="mb-3 border" />

          <div className="flex-between">
            <span className="text-lg font-bold text-gray-700">{price}₾</span>
            <div className="flex items-center gap-2">
              <div
                className={`${
                  isInCart
                    ? "bg-[#fec900] text-white"
                    : "bg-gray-200 text-black"
                } flex-center rounded-[8px]  w-8 h-8 hover:text-white hover:bg-[#fec900] transition duration-300 `}
                onClick={handleAddCart}>
                <MdAddShoppingCart className="text-lg" />
              </div>
              <div
                className={`${
                  isFavorite
                    ? "bg-[#fec900] text-white"
                    : "bg-gray-200 text-black"
                } flex-center rounded-[8px]  w-8 h-8 hover:text-white hover:bg-[#fec900] transition duration-300 `}
                onClick={handleFavoriteClick}>
                <IoIosHeartEmpty className="text-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
