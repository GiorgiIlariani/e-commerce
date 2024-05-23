import Spinner from "@/components/shared/loader/Spinner";
import { Suspense } from "react";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full min-h-screen wrapper flex flex-col bg-[#f1f3f6] relative">
      <Suspense
        fallback={
          <div className="min-h-[70vh] flex-center">
            <Spinner lg />
          </div>
        }>
        {children}
      </Suspense>
    </main>
  );
}
