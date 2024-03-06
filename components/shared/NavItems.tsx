"use client";

import { NavLinks, headerIcons } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const pathname = usePathname();
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
    </ul>
  );
};

export default NavItems;
