import ProfileTabs from "@/components/shared/ProfileTabs";
import Sidebar from "@/components/shared/Sidebar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FaGreaterThan } from "react-icons/fa";

export default function ProductFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f1f3f6]">
      <div className="wrapper mt-10">
        <div className="flex flex-row items-start gap-8">
          <Sidebar />
          <div className="flex flex-1 max-w-[768px] flex-col gap-5">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Link href="/" className="text-base text-[#8996ae]">
                  მთავარი
                </Link>
                <FaGreaterThan className="text-sm" color="#8996ae" />
                <span className="text-[#8996ae] text-sm">
                  ანგარიშის რედაქტირება
                </span>
              </div>
              <h1 className="text-[24px] font-bold">პირადი ინფორმაცია</h1>
            </div>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
