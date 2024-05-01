"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    useEffect(() => {
      if (!isAuthenticated) {
        redirect("/sign-in");
      }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}
