import { HowToBuy } from "@/constants";
import HowToBuyEmoji from "@/public/assets/images/howToBuy/how-to-buy-emoj.svg";
import Image from "next/image";

const HowToBuyOnline = () => {
  return (
    <section className="w-full pb-20 pt-20 bg-white mt-20">
      <div className="flex w-full items-center justify-center">
        <Image src={HowToBuyEmoji} alt="how to buy" priority />
      </div>
      <h2 className="my-4 text-center text-[18px] font-bold">
        How to buy online?
      </h2>
      {/* cards */}
      <div className="mx-auto mt-10 grid max-w-[1000px] grid-cols-1 xs:grid-cols-2 md:grid-cols-4">
        {HowToBuy.map(({ img, title, id }) => (
          <div className="flex items-center justify-center" key={id}>
            <div className="mt-4 flex w-[192px] flex-col items-center justify-center p-2 px-3">
              <Image
                src={img}
                alt={title}
                className="object-contain"
                priority
              />
              <h4 className="mt-4 text-center text-[13px] font-medium text-[#272a37]">
                {title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowToBuyOnline;
