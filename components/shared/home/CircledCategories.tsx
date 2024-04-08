"use client";

import { CircledCategoriesConstants } from "@/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";

import { Navigation } from "swiper/modules";

const CircledCategories = () => {
  return (
    <section className="w-full">
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
          1400: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1000: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}>
        {CircledCategoriesConstants.map(({ img, title, id }) => (
          <SwiperSlide key={id} className="flex flex-col items-center">
            <div className="w-[183px] h-[180px] bg-white hover:bg-[#fec900] transition duration-300 ease-out rounded-full flex items-center justify-center cursor-pointer">
              <Image src={img} alt={title} width={100} height={100} />
            </div>
            <div className="text-[13px] font-bold mt-4 text-center">
              {title}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CircledCategories;
