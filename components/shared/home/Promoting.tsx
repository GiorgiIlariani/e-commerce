import React from "react";

import Image from "next/image";
import { Button } from "../../ui/button";
import Link from "next/link";

const Promoting = ({
  buttonText,
  image,
  title,
  description,
  route,
}: PromotingProps) => {
  return (
    <div className="w-full mx-auto my-20 rounded-3xl bg-white py-6">
      <div className="w-full h-full flex items-center gap-x-[15px] flex-col md:flex-row">
        <div className="flex flex-col gap-y-8 justify-center items-start xl:px-12 py-6 px-6 order-1 flex-1">
          <h2 className="font-bold text-2xl md:text-lg xs:text-base">
            {title}
          </h2>
          <p className="text-[#8996ae] text-base xs:text-sm">{description}</p>
          <Link href={route}>
            <Button className="rounded-lg bg-primary px-10 py-3 text-[14px] font-bold text-white">
              {buttonText}
            </Button>
          </Link>
        </div>
        <div className="h-full pl-7 px-[15px] flex-1">
          <Image
            src={image.src}
            alt={image.alt}
            className="w-full h-[150px] object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Promoting;
