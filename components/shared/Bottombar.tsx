"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";

const Bottombar = () => {
  const pathname = usePathname();

  return (
    <section className="bottombar shadow-top">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
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
      </div>
    </section>
  );
};

export default Bottombar;
