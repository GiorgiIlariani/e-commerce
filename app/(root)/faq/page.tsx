import { Button } from "@/components/ui/button";
import { FaqPageConstants } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FaqPage = () => {
  return (
    <section className="w-full min-h-screen bg-white">
      <div className="wrapper my-8">
        <h2 className="font-bold text-2xl">Help center</h2>

        <div className="flex flex-col justify-between items-center">
          <div className="w-full mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {FaqPageConstants.map((item) => (
              <Link
                href={item.href}
                className="border rounded-2xl py-[28px] flex-center px-4 text-center"
                key={item.id}>
                <div className="flex flex-col items-center gap-3">
                  <Image src={item.image} alt="image" width={54} height={54} />
                  <h4>{item.title}</h4>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex-center mt-10">
            <div className="flex flex-col items-center gap-4">
              <h3>Need more help?</h3>
              <Link href="/contact">
                <Button className="w-[150px] h-[50px] rounded-lg text-white bg-[#4a6cfa]">
                  Message us
                </Button>
              </Link>
              <p className="text-center">
                Or call us any day from 10am to 19pm +995 (032) 280 00 35
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqPage;
