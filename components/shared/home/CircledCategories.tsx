"use client";

import { CircledCategoriesConstants } from "@/constants";
import Image from "next/image";

const CircledCategories = () => {
  return (
    <section className="w-full flex flex-col gap-5">
      <h4 className="font-semibold text-lg">Top Visited Categories</h4>
      <div className="w-full flex flex-row justify-between items-center">
        {CircledCategoriesConstants.map(({ img, title, id }) => (
          <div key={id} className="flex flex-col items-center">
            <div className="w-[183px] h-[180px] bg-white hover:bg-primary transition duration-300 ease-out rounded-full flex items-center justify-center cursor-pointer">
              <Image src={img} alt={title} width={100} height={100} />
            </div>
            <div className="text-[13px] font-bold mt-4 text-center">
              {title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CircledCategories;
