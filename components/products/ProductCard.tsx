import * as React from "react";
import { Separator } from "../ui/separator";
import { IoIosHeartEmpty } from "react-icons/io";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { addToFavorites } from "@/lib/actions/favorite-actions";

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
}: Product) => {
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");

  const handleFavoriteClick = async () => {
    try {
      if (!accessToken) return;
      const favoritedProduct = await addToFavorites(String(id), accessToken);
      console.log(favoritedProduct);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      // href={`/search/${id}`}
    >
      <div className="relative h-48 overflow-hidden px-4 pt-4">
        {images.map(({ image, id }) => (
          <img
            key={id}
            alt="product img"
            src={image}
            className="w-full h-full rounded-[8px] object-cover"
          />
        ))}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <Separator className="my-4" />
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-700">{price}₾</span>
          <div
            className="flex items-center justify-center bg-gray-200 text-gray-600 rounded-[8px] w-8 h-8"
            onClick={handleFavoriteClick}>
            <IoIosHeartEmpty className="text-base" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
