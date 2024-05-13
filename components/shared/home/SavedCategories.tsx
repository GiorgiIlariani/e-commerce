"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Import Swiper styles
import "swiper/css";

import { Navigation } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// mui
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const SavedCategories = () => {
  const [selectedButton, setSetelectedButton] = useState<
    "lastSearched" | "saved"
  >("lastSearched");

  // get last saved categories from localstorage
  const initialSavedCategories =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("searchedCategories")!)) ||
    [];
  const [savedCategories, setSavedCategories] = useState(
    initialSavedCategories
  );

  // get favorite categories from localstorage
  const initialFavoriteCategories =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("favoriteCategories")!)) ||
    [];

  const [favoriteCategories, setFavoriteCategories] = useState(
    initialFavoriteCategories
  );

  const router = useRouter();

  const handleFavoriteClick = (clickedCategory: string) => {
    const index = favoriteCategories.indexOf(clickedCategory);
    if (index !== -1) {
      const updatedFavorites = [...favoriteCategories];
      updatedFavorites.splice(index, 1);
      setFavoriteCategories(updatedFavorites);
      typeof window !== "undefined" &&
        localStorage.setItem(
          "favoriteCategories",
          JSON.stringify(updatedFavorites)
        );
    } else {
      const updatedFavorites = [...favoriteCategories, clickedCategory];
      setFavoriteCategories(updatedFavorites);
      typeof window !== "undefined" &&
        localStorage.setItem(
          "favoriteCategories",
          JSON.stringify(updatedFavorites)
        );
    }
  };

  const handleSavedCategoryClick = (category: string) => {
    router.push(`/search?query=${category}`);
  };

  const categoriesToShow =
    selectedButton === "lastSearched" ? savedCategories : favoriteCategories;

  return (
    <section className="mt-10">
      <div className="w-full flex justify-between items-center">
        <div className="flex md:items-center gap-4 flex-col md:flex-row">
          <h2 className="text-lg font-bold">Continue Searching</h2>
          <div className="flex items-center gap-4">
            <Button
              className={`py-[7px] rounded-[20px] px-7 hover:bg-white font-semibold text-sm ${
                selectedButton === "lastSearched"
                  ? "bg-white"
                  : "bg-[rgba(137,150,174,.1)]"
              }`}
              onClick={() => setSetelectedButton("lastSearched")}>
              Last visited
            </Button>
            <Button
              className={`py-[7px] rounded-[20px] px-7 hover:bg-white font-semibold text-sm ${
                selectedButton === "saved"
                  ? "bg-white"
                  : "bg-[rgba(137,150,174,.1)]"
              }`}
              onClick={() => setSetelectedButton("saved")}>
              Saved
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <Button className="image-swiper-btn image-swiper-button-prev">
            <ChevronLeftIcon />
          </Button>
          <Button className="image-swiper-btn image-swiper-button-next">
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      <div className="w-full flex justify-start gap-x-5 mt-10 items-center overflow-auto no-scrollbar">
        <Swiper
          mousewheel
          direction="horizontal"
          className="mySwiper"
          pagination={false}
          navigation={{
            nextEl: ".image-swiper-button-next",
            prevEl: ".image-swiper-button-prev",
            disabledClass: "swiper-button-disabled",
          }}
          modules={[Navigation]}
          breakpoints={{
            1200: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            900: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
          }}>
          {categoriesToShow?.map((item: string, index: number) => (
            <SwiperSlide
              key={index}
              className="p-[21px] rounded-2xl bg-white cursor-pointer"
              onClick={() => handleSavedCategoryClick(item)}>
              <div className="flex justify-between items-center">
                <h3>{item}</h3>
                <div
                  className={`w-10 h-10 rounded-full cursor-pointer border border-gray-200 ${
                    favoriteCategories.includes(item)
                      ? "bg-[#ffe999] border-none"
                      : ""
                  } flex justify-center items-center text-xs`}
                  onClick={(e) => {
                    handleFavoriteClick(item);
                    e.stopPropagation();
                  }}>
                  <FavoriteIcon
                    color={
                      favoriteCategories.includes(item) ? "primary" : "disabled"
                    }
                    fontSize="small"
                    sx={{
                      color: favoriteCategories.includes(item)
                        ? "#ffc107"
                        : "gray",
                    }}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SavedCategories;
