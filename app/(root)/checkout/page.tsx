"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getNextThreeDays } from "@/utils";
import Link from "next/link";
import React, { useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";

interface DeliveryDay {
  today: string;
  date: number;
  price: number;
}

const CheckoutPage = () => {
  const deliveryDays: DeliveryDay[] = getNextThreeDays();
  const [selectedDay, setSelectedDay] = useState(deliveryDays[0].date);

  const handleSelectDay = (day: DeliveryDay) => {
    setSelectedDay(day.date);
  };

  return (
    <main className="w-full min-h-screen bg-white">
      <div className="w-full wrapper">
        <div className="w-full flex-between mt- border-b pb-8">
          <h4 className="text-lg font-semibold">შეკვეთის დეტალები</h4>
          <Link href="/mycart">
            <MdAddShoppingCart />
          </Link>
        </div>

        <div className="mt-16 w-full grid grid-cols-12">
          <div className="col-span-7 flex flex-col gap-6 pr-20">
            {/* <div className="flex flex-col gap-6">
            <h4 className="text-lg font-semibold">Delivery Details</h4>
            <div className="flex flex-col gap-3">
              <h2></h2>
            </div>
          </div> */}
            <Textarea
              rows={5}
              placeholder="გამოიყენე მეორე მისამართის ჩასაწერად ან სხვა დამატებითი ინფორმაციისთვის"
              className="w-full px-4 py-6"
            />
            <div className="flex flex-col gap-4 items-start">
              <h4 className="text-lg font-semibold">Delivery</h4>
              <div className="w-full flex items-center gap-6">
                {deliveryDays.map((day, index) => (
                  <Button
                    key={index}
                    className={`w-full flex-1 flex-between px-3 py-6 border border-[#dee2e6] ${
                      selectedDay === day.date
                        ? "border-[#4a6cfa] bg-[#4a6cfa1a]"
                        : "border-[#dee2e6] bg-transparent"
                    }`}
                    onClick={() => handleSelectDay(day)}>
                    <p className="flex items-center font-normal gap-2 text-base">
                      {day.today} {day.date} :
                    </p>
                    <span className="font-semibold text-base">
                      {day.price}₾
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-5 pl-[110px]">
            <div className="w-full rounded-[24px] py-8 px-6 bg-[#f1f3f680]">
              <Button className="w-full text-white text-base font-bold py-6 bg-[#fec900] rounded-lg">
                Pay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
