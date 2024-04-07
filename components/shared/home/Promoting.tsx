import React from "react";
import BuySellLogo from "@/public/assets/images/buy-sell.png";
import Image from "next/image";
import { Button } from "../../ui/button";

const Promoting = () => {
  return (
    <div className="w-full mx-auto my-20 rounded-3xl bg-white py-6">
      <div className="w-full h-full flex items-center gap-x-[15px] flex-col md:flex-row">
        <div className="flex flex-col gap-y-8 justify-center items-start xl:px-12 py-6 px-6 order-1 flex-1">
          <h2 className="font-bold text-2xl md:text-lg xs:text-base">
            იყიდე-გაყიდე ნივთები მარტივად და სწრაფად
          </h2>
          <p className="text-[#8996ae] text-base xs:text-sm">
            იყიდე/გაყიდე მეორადი ან ახალი პროდუქცია განვადების შესაძლებლობით
            ონლაინ. ისარგებლე კურიერის მომსახურებით ან პირადად შეხვდით
            ერთმანეთს.
          </p>
          <Button className="rounded-lg bg-[#fec900] px-10 py-3 text-[14px] font-bold text-white">
            იყიდე ახლა
          </Button>
        </div>
        <div className="h-full pl-7 px-[15px] flex-1">
          <Image
            src={BuySellLogo}
            alt="buySell logo"
            className="w-full h-[150px] object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Promoting;
