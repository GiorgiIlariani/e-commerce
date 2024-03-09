import Link from "next/link";
import { MdAddShoppingCart } from "react-icons/md";
import { FaGreaterThan } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const MyCart = async () => {
  return (
    <section className="w-full min-h-screen bg-[#f1f3f6]">
      <div className="wrapper flex flex-col">
        <div className="pt-2">
          <div className="flex gap-x-2 items-center mt-3">
            <Link href="/" className="text-base text-[#8996ae]">
              Main
            </Link>
            <FaGreaterThan fontSize={8} />
            <p className="text-base text-[#8996ae]">My Cart</p>
          </div>
          <strong className="text-[24px]">My Cart</strong>
        </div>
        <div className="w-full flex flex-col justify-center items-center pt-[100px] pb-[200px] rounded-[16px] text-center bg-white mt-8">
          <div className="flex h-12 w-12 items-center justify-center text-xl duration-300 ease-out rounded-full bg-gray-300">
            <MdAddShoppingCart fontSize={16} />
          </div>
          <p className="text-lg font-bold mt-4">Your cart is empty</p>
          <p className="text-[#8996ae] text-base mt-4">
            Look at the ads of online stores and add the desired items to the
            cart
          </p>
          <Button className="mt-8 text-white bg-[#fec900] rounded-2xl px-12 py-7">
            Start Shopping
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MyCart;
