"use client";

import TabsComponent from "@/components/shared/TabsComponent";
import UserActivityHeader from "@/components/shared/UserActivityHeader";
import Spinner from "@/components/shared/loader/Spinner";
import { Separator } from "@/components/ui/separator";
import { financesTabs } from "@/constants";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

export default function FinancesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const {
    data: user,
    isFetching,
    refetch,
  } = useRetrieveUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated]);

  if (!user)
    return (
      <div className="min-h-[70vh] flex-center">
        <Spinner />
      </div>
    );

  return (
    <main className="min-h-screen bg-[#f1f3f6]">
      <div className="wrapper">
        <div className="flex flex-1 flex-col gap-5">
          <UserActivityHeader route="My Finances" />
          <TabsComponent tabs={financesTabs} />
          <Separator className="w-full my-2 bg-[#e4e7ed]" />
          <div className="w-full bg-white rounded-3xl mt-7 mb-10 border border-[#e4e7ed]">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
