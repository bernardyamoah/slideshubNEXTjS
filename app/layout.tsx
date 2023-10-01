import Navbar from "@/components/Navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// import { Inter } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";

import { Toaster } from "react-hot-toast";

import BackButtonNavigation from "@/components/ui/back";
import { MyContextProvider, useMyContext } from "@/components/MyContext";
import MobileMenu from "../components/mobile-menu";
import Footer from "@/components/Footer";
import Loading from "@/components/ui/Cloading";

export const metadata = {
  title: "Slideshub",
  description: "Download your slides from Slideshub and more!",
  charset: "utf-8",
  type: "website",
  url: "https://slideshub.vercel.app",
  site_name: "Slideshub",
  author: "Slideshub",
  // twitter_username: '@slideshub',

  og: {
    title: "Slideshub",
    type: "website",
    url: "https://slideshub.vercel.app",
    description: "Download your slides from Slideshub and more!",
    site_name: "Slideshub",
    images: [
      {
        url: "https://slideshub.netlify.app/assets/favicon_io/thumbnail.jpg",
        width: 1200,
        height: 630,
        alt: "Slideshub",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <html lang="en" suppressHydrationWarning>
      {/* <ThemeProvider attribute="class" defaultTheme="dark" enableSystem> */}
      <ThemeProvider attribute="class" defaultTheme="dark">
        <MyContextProvider>
          <body>
           

            <Navbar />
            <BackButtonNavigation />

            {children}
            <MobileMenu />
            <Footer />

            <Toaster />
            <Analytics />
          </body>
        </MyContextProvider>
      </ThemeProvider>
    </html>
  );
}
