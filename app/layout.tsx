import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/shared/layout/Header";
import Footer from "@/components/shared/layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Provider from "@/redux/provider";
// import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

import "./globals.css";
import RateUs from "@/components/shared/RateUs";

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
        <ToastContainer />
        <Provider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <RateUs />
        </Provider>
      </body>
    </html>
  );
}
