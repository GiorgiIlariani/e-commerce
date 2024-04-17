"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottombarLinks } from "@/constants";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";

const Bottombar = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { data: user, refetch } = useRetrieveUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated]);

  const pathname = usePathname();

  return (
    <section className="bottombar shadow-top">
      <div className="bottombar_container">
        {bottombarLinks.slice(0, isAuthenticated ? 4 : 5).map((link) => {
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
        {isAuthenticated && (
          <div className="bottombar_link">
            <Image
              src={user ? user?.image : "/assets/images/default-user.svg"}
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
