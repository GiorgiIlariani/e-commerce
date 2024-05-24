"use client";

import { ConfirmationModal } from "@/components/shared/modals/ConfirmationModal";
import { FillBalanceModalContent } from "@/components/shared/modals/content/FillBalanceContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fillBalance } from "@/lib/actions/transactions";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BalancePage = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const router = useRouter();

  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");
  const refreshToken =
    typeof window !== "undefined" && localStorage.getItem("refresh-token");

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

  const handleamountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = Number(value);
    if (value === "" || (numberValue > 0 && !isNaN(numberValue))) {
      setAmount(numberValue);
    }
  };

  const handleTransfer = async () => {
    if (!accessToken || !refreshToken) {
      console.log("Tokens are missing");
      return;
    }

    try {
      setIsLoading(true);
      const transactionDetails = await fillBalance({
        accessToken,
        refreshToken,
        amount: amount,
      });

      if (transactionDetails?.status === 200) {
        toast.success("transaction completed successfully");

        router.push(transactionDetails?.transactionUrl.payment_url);
      } else {
        toast.error("error while filling the balance");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onConfirmationCancel = () => {
    setShowAlertDialog(false);
  };

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row">
        <div className="md:border-r md:border-[#dee2e6] flex flex-col items-start gap-10 px-6 md:px-10 py-10 xs:py-14 flex-1">
          <div className="flex items-center gap-6">
            <Image
              src="/assets/images/transactions/balance-icon.svg"
              alt="balance icon"
              width={40}
              height={40}
            />

            <strong className="font-bold text-2xl">{user?.balance} ₾</strong>
          </div>
          <div className="w-full flex-col items-start flex xs:flex-row xs:items-end gap-5">
            <div className="w-full xs:w-1/2 flex flex-col items-start gap-2">
              <label
                htmlFor="amount"
                className="text-[#b0b9c9] font-semibold text-sm">
                amount
              </label>
              <Input
                type="number"
                placeholder="0"
                value={amount === 0 ? "" : amount}
                onChange={handleamountChange}
                name="amount"
                className="ring-none outline-none py-5 rounded-xl"
                min="1"
              />
            </div>
            <Button
              className="w-full xs:w-1/2 text-white text-base font-bold px-10 bg-[#fec900] rounded- py-5"
              disabled={!amount}
              onClick={() => setShowAlertDialog(true)}>
              Fill balance
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 py-10 xs:py-14 px-10 md:px-14">
          <Image
            src="/assets/images/transactions/transactions.svg"
            alt="transactions"
            width={84}
            height={73}
          />
          <Link
            className="flex items-center gap-5 px-7 py-[14px] bg-transparent border border-[#e4e7ed] rounded-xl"
            href="/finances/transactions">
            <Image
              src="/assets/images/transactions/arrow.svg"
              alt="arrow icon"
              width={15}
              height={10}
            />
            <span className="text-sm font-semibold text-[#8996ae]">
              Transfer
            </span>
          </Link>
        </div>
      </div>
      <ConfirmationModal
        message={<FillBalanceModalContent user={user} amount={amount} />}
        title="Confirm Payment"
        onConfirm={handleTransfer}
        open={showAlertDialog}
        onOpenChange={setShowAlertDialog}
        isLoading={isLoading}
        onCancel={onConfirmationCancel}
      />
    </>
  );
};

export default BalancePage;
