import Bottombar from "@/components/shared/layout/Bottombar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col bg-[#f1f3f6]">
      {children}
      <Bottombar />
    </main>
  );
}
