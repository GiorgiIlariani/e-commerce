"use client";

import { ConfirmationModal } from "@/components/shared/modals/ConfirmationModal";
import { TransferConfirmationModalContent } from "@/components/shared/modals/content/TransferConfirmationModalContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { transferToSomeone } from "@/lib/actions/transactions";
import { fetchAllUser } from "@/lib/actions/user-actions";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TransactionsPage = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [amount, setAmount] = useState(0);
  const [userId, setUserId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);

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

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = Number(value);
    if (value === "" || (numberValue > 0 && !isNaN(numberValue))) {
      setAmount(numberValue);
    }
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = Number(value);
    if (value === "" || (numberValue > 0 && !isNaN(numberValue))) {
      setUserId(numberValue);
    }
  };

  const handleTransfer = async () => {
    if (!accessToken || !refreshToken) {
      console.log("Tokens are missing");
      return;
    }

    try {
      setIsLoading(true);
      const users = await fetchAllUser(accessToken, refreshToken);
      const usersId = users.results.map((user: UserDetailsTypes) => user.id);

      if (!usersId.includes(userId)) {
        toast.error("User does not exist");
        return;
      }

      const receiverUser = users.results.find(
        (user: UserDetailsTypes) => user.id === userId
      );

      const transfer = await transferToSomeone({
        accessToken,
        refreshToken,
        amount,
        receiver: receiverUser?.id,
      });

      if (transfer.status === 201) {
        toast.success("transaction completed successfully!");
      }

      refetch();
      setAmount(0);
      setUserId(0);
    } catch (error) {
      console.error("An error occurred", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onConfirmationCancel = () => {
    setShowAlertDialog(false);
  };

  return (
    <>
      <div className="w-full flex flex-col md:flex-row">
        <div className="flex flex-col items-center gap-4 px-6 md:px-10 py-10 xs:py-14 md:border-r md:border-[#dee2e6]">
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
              Fill balance
            </span>
          </Link>
        </div>
        <div className="flex flex-col items-start gap-10 px-6 md:px-10 py-10 xs:py-14 flex-1">
          <div className="flex items-center gap-6">
            <Image
              src="/assets/images/transactions/balance-icon.svg"
              alt="balance icon"
              width={40}
              height={40}
            />

            <strong className="font-bold text-2xl">{user?.balance} ₾</strong>
          </div>

          <div className="w-full flex flex-col items-start sm:flex-row sm:items-end gap-5">
            <div className="w-full sm:w-2/3 flex flex-col items-start gap-2">
              <div className="w-full flex flex-col sm:flex-row items-center gap-3">
                <div className="flex flex-col gap-2 w-full sm:w-2/3">
                  <label
                    htmlFor="amount"
                    className="text-[#b0b9c9] font-semibold text-sm">
                    user id
                  </label>
                  <Input
                    type="number"
                    value={userId === 0 ? "" : userId}
                    onChange={handleUserIdChange}
                    name="userId"
                    className="ring-none outline-none py-5 rounded-xl"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full sm:w-1/3">
                  <label
                    htmlFor="amount"
                    className="text-[#b0b9c9] font-semibold text-sm">
                    amount
                  </label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={amount === 0 ? "" : amount}
                    onChange={handleAmountChange}
                    name="amount"
                    className="ring-none outline-none py-5 rounded-xl"
                    min="1"
                  />
                </div>
              </div>
            </div>
            <Button
              className="w-full sm:w-1/3 text-white text-base font-bold px-10 bg-[#fec900] rounded- py-5"
              disabled={!amount || !userId}
              onClick={() => setShowAlertDialog(true)}>
              Transaction
            </Button>
          </div>
        </div>
      </div>
      <ConfirmationModal
        message={
          <TransferConfirmationModalContent user={user} amount={amount} />
        }
        title="Confirm Transaction"
        onConfirm={handleTransfer}
        open={showAlertDialog}
        onOpenChange={setShowAlertDialog}
        isLoading={isLoading}
        onCancel={onConfirmationCancel}
      />
    </>
  );
};

export default TransactionsPage;
