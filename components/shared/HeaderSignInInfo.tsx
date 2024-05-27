"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "../ui/separator";
import { SignedInNavbarPopupConstants } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { FaAngleDown } from "react-icons/fa6";

const HeaderSignInInfo = ({
  user,
  isLoading,
  isFetching,
}: HeaderSignInInfoProps) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  if (isLoading || isFetching) {
    return null;
  }

  return (
    <>
      {user ? (
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center justify-center gap-2 px-2 cursor-pointer border border-[#dee2e6] py-[6px] rounded-xl">
              <Image
                src={user?.image}
                alt="user image"
                width={25}
                height={25}
                className="rounded-full object-cover h-[25px] w-[25px]"
              />
              <p>{user?.first_name}</p>
              <FaAngleDown />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] bg-white hidden md:block absolute -right-[61px] top-0">
            <div className="flex items-center gap-3">
              <Image
                src={user?.image}
                alt="user image"
                width={40}
                height={40}
                className="rounded-full object-cover h-[40px] w-[40px]"
              />
              <div className="flex flex-col gap-1">
                <h5 className="text-sm font-semibold">
                  {user?.first_name} {user?.last_name}
                </h5>
                {user?.username}
              </div>
            </div>
            <Separator className="w-full border border-gray-100 my-2" />
            <div className="flex flex-col gap-5 px-1 py-3">
              {SignedInNavbarPopupConstants.map((item) => {
                const isActive = item.route === pathname;

                return (
                  <Link
                    href={item?.route}
                    key={item.id}
                    className={`text-sm font-medium hover:text-[#fec900] transition duration-200 ${
                      isActive ? "text-[#fec900]" : "text-[#6f7383]"
                    }`}>
                    {item?.text}
                  </Link>
                );
              })}
            </div>
            <Separator className="border border-gray-100 my-2" />
            <div
              className="px-1 py-3 text-sm font-medium text-[#6f7383] cursor-pointer"
              onClick={handleLogout}>
              Logout
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Link href="/sign-in">
          <Button className="flex items-center gap-2 rounded-xl px-2 border border-[#E5E5E5]">
            <Image
              src="/assets/images/person.svg"
              alt="person"
              width={20}
              height={20}
            />
            <span className="text-xs font-medium">Log in</span>
          </Button>
        </Link>
      )}
    </>
  );
};

export default HeaderSignInInfo;
