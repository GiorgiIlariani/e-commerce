"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { fetchCurrentUser } from "@/lib/actions/user-actions";
const HeaderSignInInfo = () => {
  const [userDetails, setUserDetails] = useState<UserDetailsTypes>();

  const user =
    typeof window !== "undefined" && localStorage.getItem("access-token");

  useEffect(() => {
    const fetchCurrentUserDetails = async () => {
      if (!user) return;
      const userDetails = await fetchCurrentUser(user);
      setUserDetails(userDetails);
    };
    fetchCurrentUserDetails();
  }, []);

  const content = userDetails ? (
    <div className="w-[120px] flex items-center gap-2 px-1 cursor-pointer">
      <Image
        src={userDetails?.profile?.image}
        alt="user image"
        width={25}
        height={25}
      />
      {userDetails?.username}
    </div>
  ) : (
    <Link href="/sign-in">
      <Button className="flex items-center gap-2 rounded-xl px-2 border border-[#E5E5E5]">
        <Image
          src="/assets/images/person.svg"
          alt="person"
          width={20}
          height={20}
        />
        <span className="text-xs font-medium">შესვლა</span>
      </Button>
    </Link>
  );

  return content;
};

export default HeaderSignInInfo;
