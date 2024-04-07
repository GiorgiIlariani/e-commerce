"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottombarLinks } from "@/constants";
import Image from "next/image";

const Bottombar = () => {
  const storedToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");
  const initialUserLoggedIn = storedToken ? true : false;

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(initialUserLoggedIn);

  const pathname = usePathname();

  return (
    <section className="bottombar shadow-top">
      <div className="bottombar_container">
        {bottombarLinks.slice(0, isUserLoggedIn ? 4 : 5).map((link) => {
          const isActive = pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${isActive ? "bg-[#fec900]" : ""}`}>
              {link.icon}
              <p className="max-xs:hidden text-sm font-medium">
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
        {isUserLoggedIn && (
          <div className="bottombar_link">
            <Image
              src="/assets/images/default-user.svg"
              width={24}
              height={24}
              alt="person"
              className="cursor-pointer"
            />
            <p className="max-xs:hidden text-sm font-medium">Profile</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Bottombar;
