"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Import Swiper styles
import "swiper/css";

import { Navigation } from "swiper/modules";
import { Button } from "@/components/ui/button";

const SavedCategories = () => {
  const [selectedButton, setSetelectedButton] = useState<number>(1);
  const [savedCategories, setSavedCategories] = useState<any>([
    "iphone",
    "computer",
    "ipad",
    "tablet",
    "blabla",
  ]);

  return (
    <section className="mt-10">
      <div className="w-full flex justify-between items-center">
        <div className="flex md:items-center gap-4 flex-col md:flex-row">
          <h2 className="text-lg font-bold">გააგრძელე ძიება</h2>
          <div className="flex items-center gap-4">
            <Button
              className={`py-[7px] rounded-[20px] px-7 hover:bg-white font-semibold text-sm ${
                selectedButton === 2 ? "bg-white" : "bg-[rgba(137,150,174,.1)]"
              }`}>
              ბოლო
            </Button>
            <Button
              className={`py-[7px] rounded-[20px] px-7 hover:bg-white font-semibold text-sm ${
                selectedButton === 2 ? "bg-white" : "bg-[rgba(137,150,174,.1)]"
              }`}>
              შენახული
            </Button>
          </div>
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
          {savedCategories?.map((item: string[], index: number) => (
            <SwiperSlide
              key={index}
              className="p-[21px] rounded-2xl bg-white cursor-pointer w-[calc(33.33%-14px)] lg:w-[calc(50%-12px)] mdFull flex-shrink-0">
              <div className="flex justify-between items-center">
                <h3>{item}</h3>
                <div className="w-10 h-10 rounded-full cursor-pointer border border-gray-200 flex justify-center items-center text-xs">
                  <FavoriteIcon color="disabled" fontSize="small" />
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
