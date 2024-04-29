import Link from "next/link";
import React from "react";
import { FaGreaterThan } from "react-icons/fa";

const UserActivityHeader = ({ route }: { route: string }) => {
  return (
    <div>
      <div className="flex gap-x-2 items-center mt-3">
        <Link href="/" className="text-base text-[#8996ae]">
          Main
        </Link>
        <FaGreaterThan fontSize={8} />
        <p className="text-base text-[#8996ae]">{route}</p>
      </div>
      <strong className="text-[24px]">{route}</strong>
    </div>
  );
};

export default UserActivityHeader;
