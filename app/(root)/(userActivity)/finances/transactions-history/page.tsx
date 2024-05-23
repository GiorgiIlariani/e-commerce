"use client";

import Spinner from "@/components/shared/loader/Spinner";
import { getTransactionsList } from "@/lib/actions/transactions";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { useAppSelector } from "@/redux/hooks";
import { calculateTotals } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

const TransactionsHistoryPage = () => {
  const [transactionHistory, setTransactionHistory] = useState<
    TransactionHistoryType[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

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

  useEffect(() => {
    const fetchTransactionHistoryList = async () => {
      try {
        if (!accessToken || !refreshToken) {
          console.log("Tokens are missing");
          return;
        }
        setIsLoading(true);

        const transactionList = await getTransactionsList({
          accessToken,
          refreshToken,
        });

        setTransactionHistory(transactionList);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactionHistoryList();
  }, []);

  const { income, expence } = calculateTotals({ transactionHistory, user });

  if (isLoading) {
    return (
      <div className="min-h-[50vh] w-full flex-center">
        <Spinner lg />
      </div>
    );
  }

  return (
    <>
      {transactionHistory.length === 0 ? (
        <div className="w-full flex flex-col justify-center items-center py-[140px] text-center">
          <div className="flex h-12 w-12 items-center justify-center text-xl duration-300 ease-out rounded-full bg-gray-300">
            <Image
              src="/assets/images/transactions/history.svg"
              alt="history icon"
              width={48}
              height={48}
            />
          </div>
          <p className="text-lg font-bold mt-4">Transaction History Is Empty</p>
          <p className="text-[#8996ae] text-base mt-4">
            You are not currently permitted to offer paid services on the
            platform.
          </p>
        </div>
      ) : (
        <section className="w-full">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="w-1/4 py-3">Sender</th>

                <th className="w-1/4 py-3">Receiver</th>
                <th className="w-1/4 py-3">Date</th>
                <th className="w-1/4 py-3">Amount</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {transactionHistory.map((item, index) => (
                <tr
                  key={index}
                  className="border-b"
                  style={{ boxSizing: "border-box" }}>
                  <td className="w-1/4 py-3 text-center">{item.sender}</td>

                  <td className="w-1/4 py-3 text-center">{item.receiver}</td>
                  <td className="w-1/4 py-3 text-center">
                    {item.date.slice(0, 10)}
                  </td>
                  <td
                    className={`w-1/4 py-3 text-center ${
                      item.receiver === user?.id
                        ? "text-green-500"
                        : "text-red-500"
                    }`}>
                    {item.amount} ₾
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full flex justify-center mt-6">
            <div className="bg-white p-6 w-full text-center">
              <p className="text-lg font-bold mb-2">
                Income: <span className="text-green-500">{income} ₾</span>
              </p>
              <p className="text-lg font-bold">
                Expence: <span className="text-red-500">{expence} ₾</span>
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default TransactionsHistoryPage;
