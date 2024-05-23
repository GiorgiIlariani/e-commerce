"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface TabsTypes {
  route: string;
  text: string;
}

const TabsComponent = ({ tabs }: { tabs: TabsTypes[] }) => {
  const pathname = usePathname();

  return (
    <div className="flex gap-3 xs:gap-14 justify-between xs:justify-normal">
      {tabs.map((tab) => {
        const isActiveTab = pathname === tab.route;

        return (
          <Link
            key={tab.route}
            href={tab.route}
            className={`text-sm sm:text-base font-medium sm:font-semibold ${
              isActiveTab ? "text-black" : "text-[#8996ae]"
            } hover:text-black`}>
            {tab.text}
          </Link>
        );
      })}
    </div>
  );
};

export default TabsComponent;
