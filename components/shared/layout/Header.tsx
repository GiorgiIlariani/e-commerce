"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../../ui/button";
import { headerIcons } from "@/constants";
import MobileNav from "./MobileNav";
import HeaderSignInInfo from "../HeaderSignInInfo";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";

const Header = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const {
    data: user,
    isLoading,
    isFetching,
    refetch,
  } = useRetrieveUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated]);

  return (
    <header className="w-full border-b border-[#e5e7eb]">
      <div className="wrapper flex-between">
        {/* left side of the navbar */}
        <Link href="/">
          <Image
            src="/assets/images/mymarket.svg"
            alt="market logo"
            className="cursor-pointer object-contain"
            width={150}
            height={40}
            priority
          />
        </Link>
        {/* right side of the header */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/product-form">
            <Button className="flex items-center gap-2 rounded-xl px-6 bg-[#FFF4CC] hover:bg-[#FFF4CC]">
              <Image
                src="/assets/images/add-sign.svg"
                alt="add-sign"
                width={20}
                height={20}
              />
              <span className="text-xs font-medium">დამატება</span>
            </Button>
          </Link>
          <ul className="flex items-center">
            {headerIcons.map(({ href, icon }) => (
              <Link href={href} className="icon-overlay" key={href}>
                {icon}
              </Link>
            ))}
          </ul>

          <HeaderSignInInfo
            user={user}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        </div>
        {/* mobile navigation */}
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
