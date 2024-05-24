"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import Spinner from "@/components/shared/loader/Spinner";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (isAuthenticated === undefined) {
        // Assume that isAuthenticated will be undefined initially until authentication status is determined
        setLoading(true);
      } else {
        setLoading(false);
        if (!isAuthenticated) {
          redirect("/sign-in");
        }
      }
    }, [isAuthenticated]);

    if (loading) {
      return (
        <div className="min-h-[70vh] flex-center">
          <Spinner lg />
        </div>
      );
    }

    if (!isAuthenticated) {
      return null; // or some fallback UI if redirect doesn't work
    }

    return <Component {...props} />;
  };
}
