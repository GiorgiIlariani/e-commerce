"use client";

import { CircledCategoriesConstants } from "@/constants";
import useSmoothHorizontalScroll from "use-smooth-horizontal-scroll";
// import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

const CircledCategories = () => {
  const { scrollContainerRef, handleScroll } = useSmoothHorizontalScroll();

  return (
    <section className="w-full">
      <div
        className="w-full flex items-center overflow-auto no-scrollbar gap-x-7"
        ref={scrollContainerRef as React.RefObject<HTMLDivElement>}
        onScroll={handleScroll}>
        {CircledCategoriesConstants.map(({ img, title, id }) => (
          <div className="flex flex-col items-center gap-y-[16px]" key={id}>
            <div className="w-[183px] h-[180px] bg-white hover:bg-[#fec900] transition duration-300 ease-out rounded-full flex items-center justify-center cursor-pointer">
              <Image src={img} alt={title} width={100} height={100} />
            </div>
            <div className="text-[13px] font-bold text-center">{title}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CircledCategories;
