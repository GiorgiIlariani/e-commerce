import LeftSidebar from "@/components/shared/layout/LeftSidebar";

export default function UserActivityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f1f3f6]">
      <div className="wrapper mt-10">
        <div className="flex flex-row items-start gap-8">
          <LeftSidebar />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </main>
  );
}
