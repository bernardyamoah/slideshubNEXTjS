import Navbar from "@/components/Navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";

// import { Toaster } from "react-hot-toast";
import { Toaster } from 'sonner';

import BackButtonNavigation from "@/components/ui/back";
import { MyContextProvider } from "@/components/MyContext";
import MobileMenu from "../components/mobile-menu";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/breadcrumbs";
import { Metadata } from "next";
export const metadata:Metadata = {
  title:{
    default:"Slideshub",
    template:'%s | Slideshub',
  },
  description: "Download your slides from Slideshub and more!",
 
 metadataBase:new URL ("https://slideshub.vercel.app"),
  applicationName: "Slideshub",
  authors: [{name:"Bernard Yamoah"}],
  colorScheme:'dark',
  


  openGraph: {
    title:'Slideshub',
    type:'website',
    description:'Download your slides from Slideshub and more!',
    // images: "/favicon.ico",  
    // images: "https://slideshub.netlify.app/assets/favicon_io/thumbnail.jpg", 
    images: "/thumbnail.jpg", 
  },
  icons:{
    icon:'/favicon.ico',
    apple:'/apple-touch-icon.png',
   

  },
  viewport:{
    width:'device-width',
    initialScale:1,
    maximumScale:1,
  }
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
          <body className="
          dark:bg-gradient-to-tl dark:from-zinc-900 dark:via-zinc-800/50 dark:to-zinc-950 px-2">
           

            <Navbar />
            <Breadcrumbs />
            <BackButtonNavigation />
            <div className="inset-0 bg-fixed absolute bg-pattern opacity-10 dark:opacity-40 w-full h-full  bg-repeat bg-center  -z-10"></div>
            {children}
            <MobileMenu />
            <Footer />

            <Toaster expand={false}  position="top-center" richColors />
            <Analytics />
          </body>
        </MyContextProvider>
      </ThemeProvider>
    </html>
  );
}
