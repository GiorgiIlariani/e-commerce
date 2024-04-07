import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/shared/layout/Header";
import Footer from "@/components/shared/layout/Footer";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "მეორადი და ახალი ნივთების გაყიდვის პლათფორმა...",
  description: "მეორადი და ახალი ნივთების გაყიდვის პლათფორმა...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} flex h-screen flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
