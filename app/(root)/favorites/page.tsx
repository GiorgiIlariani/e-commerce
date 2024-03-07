import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { FaGreaterThan } from "react-icons/fa";

const page = () => {
  return (
    <section className="w-full min-h-screen bg-[#f1f3f6]">
      <div className="wrapper flex flex-col ">
        <div className="pt-2">
          <div className="flex gap-x-2 items-center mt-3">
            <Link href="/" className="text-base text-[#8996ae]">
              Main
            </Link>
            <FaGreaterThan fontSize={8} />
            <p className="text-base text-[#8996ae]">My favorites</p>
          </div>
          <strong className="text-[24px]">My favorites</strong>
        </div>
        <div className="w-full flex flex-col justify-center items-center mt-[140px] text-center">
          <div className="flex h-12 w-12 items-center justify-center text-xl duration-300 ease-out rounded-full bg-gray-300">
            <AiOutlineHeart fontSize={16} />
          </div>
          <p className="text-lg font-bold mt-4">You have no favorites list</p>
          <p className="text-[#8996ae] text-base mt-4">
            Click the heart icon on the product photo to add to favorites in the
            right corner
          </p>
          <Button className="mt-8 text-white bg-[#fec900] rounded-2xl px-12 py-7 text-xl">
            Create list
          </Button>
        </div>
      </div>
    </section>
  );
};

export default page;
