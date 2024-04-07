"use client";

import { NavLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NavItems = () => {
  const pathname = usePathname();
  const storedToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");
  const initialUserLoggedIn = storedToken ? true : false;

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(initialUserLoggedIn);

  const handleLogout = () => {
    localStorage.setItem("access-token", "");
    setIsUserLoggedIn(false);
  };

  return (
    <ul className="flex items-start flex-col gap-10">
      {NavLinks.map(({ label, href }) => {
        const isActive = href === pathname;

        return (
          <Link
            href={href}
            key={href}
            className={`${isActive && "text-[#fec900]"} text-xl font-normal`}>
            {label}
          </Link>
        );
      })}
      {isUserLoggedIn && (
        <div
          className="text-xl font-normal cursor-pointer"
          onClick={handleLogout}>
          Logout
        </div>
      )}
    </ul>
  );
};

export default NavItems;
