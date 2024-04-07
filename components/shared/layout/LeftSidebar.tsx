"use client";

import { fetchCurrentUser } from "@/lib/actions/user-actions";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import personImg from "@/public/assets/images/default-user.svg";
import { IoIosAdd } from "react-icons/io";
import { Separator } from "../../ui/separator";
import Link from "next/link";

const LeftSidebar = () => {
  const storedToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");
  const [userDetails, setUserDetails] = useState<UserDetailsTypes>();

  if (!storedToken) return null;

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchCurrentUser(storedToken);
      setUserDetails(user);
    };
    fetchUser();
  }, []);

  return (
    <div className="w-[250px] xl:w-[290px] bg-white px-4 py-5 border-2 border-[#e7eaf3] rounded-2xl">
      <div className="flex items-center gap-2">
        <Image
          src={userDetails?.profile?.image || personImg}
          alt="profile image"
          width={40}
          height={40}
          className="rounded-full object-contain"
        />
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold">
            {userDetails?.first_name || "Giorgi"}{" "}
            {userDetails?.last_name || "Ilariani"}
          </h2>
          <p>{userDetails?.username || "Codemaster"}</p>
        </div>
      </div>
      <div className="w-full flex justify-between items-center px-3 py-3 border rounded-lg mt-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">ბალანსი</h3>
          {/* hard coded */}
          <strong className="font-bold text-xl">0.00</strong>
        </div>
        <div className="flex items-center gap-2">
          <h4>შევსება</h4>
          <div className="w-7 h-7 flex justify-center items-center bg-[#d0d8fa] rounded-[4px]">
            <IoIosAdd />
          </div>
        </div>
      </div>
      <Separator className="border border-gray-100 my-8" />
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-6">
          <Image
            src="/assets/images/userActivity/product-form.svg"
            alt="add sign"
            width={32}
            height={32}
          />
          <Link href="/profile" className="text-[#6f7383] font-medium text-sm">
            ანგარიშის რედაქტირება
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Image
            src="/assets/images/userActivity/logout.svg"
            alt="add sign"
            width={32}
            height={32}
          />
          <Link href="/profile" className="text-[#6f7383] font-medium text-sm">
            გასვლა
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
