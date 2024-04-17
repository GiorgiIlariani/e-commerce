"use client";

import { NavLinks } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";

const NavItems = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
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
      {isAuthenticated && (
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
