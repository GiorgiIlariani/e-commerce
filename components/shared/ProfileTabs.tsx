"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Tabs = [
  {
    route: "/profile/info",
    text: "ინფორმაციის რედაქტირება",
  },
  {
    route: "/profile/password",
    text: "პაროლის ცვლილება",
  },
  {
    route: "/profile/deactivate",
    text: "  ანგარიშის წაშლა",
  },
];

const ProfileTabs = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-10">
      {Tabs.map((tab) => {
        const isActiveTab = pathname === tab.route;

        return (
          <Link
            key={tab.route}
            href={tab.route}
            className={`text-[14px] font-medium ${
              isActiveTab ? "text-black" : "text-[#8996ae]"
            } hover:text-black`}>
            {tab.text}
          </Link>
        );
      })}
    </div>
  );
};

export default ProfileTabs;
