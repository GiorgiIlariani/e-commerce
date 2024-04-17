"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import Spinner from "./Spinner";

const HeaderSignInInfo = ({
  user,
  isLoading,
  isFetching,
}: {
  user: UserDetailsTypes | undefined;
  isLoading: boolean;
  isFetching: boolean;
}) => {
  if (isLoading || isFetching) {
    return <Spinner />;
  }

  return (
    <>
      {user ? (
        <div className="w-[120px] flex items-center gap-2 px-1 cursor-pointer">
          <Image src={user?.image} alt="user image" width={25} height={25} />
          {user?.username}
        </div>
      ) : (
        <Link href="/sign-in">
          <Button className="flex items-center gap-2 rounded-xl px-2 border border-[#E5E5E5]">
            <Image
              src="/assets/images/person.svg"
              alt="person"
              width={20}
              height={20}
            />
            <span className="text-xs font-medium">შესვლა</span>
          </Button>
        </Link>
      )}
    </>
  );
};

export default HeaderSignInInfo;
