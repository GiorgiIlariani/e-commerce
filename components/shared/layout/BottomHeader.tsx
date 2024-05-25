import Link from "next/link";
import React from "react";

const BottomHeader = () => {
  return (
    <div className="hidden lg:block w-full border-[#e5e7eb]">
      <div className="wrapper flex-between">
        <div className="flex items-center gap-6">
          <Link
            href="/contact"
            className="text-sm font-semibold hover:text-[#fec900] transition duration-200">
            Contact
          </Link>
          <Link
            href="/faq"
            className="text-sm font-semibold hover:text-[#fec900] transition duration-200">
            Help center
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/product-form"
            className="text-sm font-semibold hover:text-[#fec900] transition duration-200">
            add Product
          </Link>
          <Link
            href="/favorites"
            className="text-sm font-semibold hover:text-[#fec900] transition duration-200">
            Favorites
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomHeader;
