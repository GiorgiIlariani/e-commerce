import Link from "next/link";
import React from "react";

const BottomHeader = () => {
  return (
    <div className="w-full border-b border-[#e5e7eb]">
      <div className="wrapper flex-between">
        <div className="flex items-center gap-4">
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
        <div className="flex items-center gap-4">
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
      </div>
    </div>
  );
};

export default BottomHeader;