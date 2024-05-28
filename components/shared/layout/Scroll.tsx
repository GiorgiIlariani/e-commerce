"use client";

import Image from "next/image";

const Scroll = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      className="flex h-11 w-full cursor-pointer items-center justify-center bg-primary"
      onClick={handleScroll}>
      <Image
        src="/assets/images/arrow-top.svg"
        alt="arrow top"
        width={20}
        height={20}
      />
    </div>
  );
};

export default Scroll;
