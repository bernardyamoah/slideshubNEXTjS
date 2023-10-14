import Navbar from "@/components/Navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";

// import { Toaster } from "react-hot-toast";
import { Toaster } from "sonner";

import BackButtonNavigation from "@/components/ui/back";
import { UserContextProvider } from "@/components/UserContext";
import MobileMenu from "../components/mobile-menu";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/breadcrumbs";
import { Metadata } from "next";

import { url } from "inspector";
export const metadata: Metadata = {
  title: {
    default: "Slideshub",
    template: "%s | Slideshub",
  },
  description: "Download your slides from Slideshub and more!",

  metadataBase: new URL("https://slideshub.vercel.app"),
  applicationName: "Slideshub",
  authors: [{ name: "Slideshub Team", url: "https://slideshub.vercel.app" }],
  colorScheme: "dark",
  openGraph: {
    title: "Slideshub",
    type: "website",
    description: "Download your slides from Slideshub and more!",
    url: "https://slideshub.vercel.app",
    images: [{ url: "/thumbnail.jpg" }],
  },
  icons: {
    // icon:'https://slideshub.vercel.app/favicon.ico',
    apple: "https://slideshub.vercel.app/apple-touch-icon.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },

  twitter: {
    title: "SlidesHub",
    creator: "@byayamoah",
    card: "summary_large_image",
    site: "https://slideshub.vercel.app",

    images: [
      {
        url: "https://slideshub.vercel.app/thumbnail.jpg",
        width: 800,
        height: 600,
        alt: "Slideshub",
      },
      {
        url: "https://slideshub.vercel.app/thumbnail.jpg",
        width: 900,
        height: 800,
        alt: "Slideshub Image Alt",
      },
      { url: "https://slideshub.vercel.app/thumbnail.jpg" },
      { url: "https://slideshub.vercel.app/thumbnail.jpg" },
    ],
  },
};
// "https://slideshub.netlify.app/assets/favicon_io/thumbnail.jpg"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <ThemeProvider attribute="class" defaultTheme="dark" enableSystem> */}
      <ThemeProvider attribute="class" defaultTheme="dark">
        <UserContextProvider>
          <body className="relative">
            <Navbar />
            <BackButtonNavigation />
            <Breadcrumbs />
            <div className="fixed inset-0 bg-pattern-1 opacity-5 dark:opacity-40 w-full h-full  bg-repeat bg-center  -z-10"></div>
            <main className="px-2 "> {children}</main>

            <MobileMenu />
            <Footer />

            <Toaster expand={false} position="top-center" richColors />
            <Analytics />
          </body>
        </UserContextProvider>
      </ThemeProvider>
    </html>
  );
}
