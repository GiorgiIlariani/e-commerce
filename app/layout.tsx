import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import "./globals.css";
import Bottombar from "@/components/shared/Bottombar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "E-commerce",
  description: "E-commerce platform",
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
        {/* <Footer /> */}
        <Bottombar />
      </body>
    </html>
  );
}
