import Bottombar from "@/components/shared/Bottombar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col">
      {children}
      {/* <Bottombar /> */}
    </main>
  );
}
