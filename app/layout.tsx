import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/shared/layout/Header";
import Footer from "@/components/shared/layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Provider from "@/redux/provider";

import "./globals.css";
import RateUs from "@/components/shared/RateUs";
import BottomHeader from "@/components/shared/layout/BottomHeader";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/lib/theme";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "A platform for selling used and new items...",
  description: "A platform for selling used and new items...",
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
        <AppRouterCacheProvider options={{ key: "css" }}>
          <ThemeProvider theme={theme}>
            <Provider>
              <Header />
              <BottomHeader />

              <main className="flex-1">{children}</main>
              <Footer />
              <RateUs />
            </Provider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
