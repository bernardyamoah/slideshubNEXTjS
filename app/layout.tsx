import Navbar from "@/components/Navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";

// import { Toaster } from "react-hot-toast";
import { Toaster } from 'sonner';

import BackButtonNavigation from "@/components/ui/back";
import { UserContextProvider } from "@/components/UserContext";
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
        <UserContextProvider>
          <body className="
         ">
           
<Navbar/>
            <BackButtonNavigation />
            <Breadcrumbs />
            <div className="inset-0  absolute bg-pattern opacity-10 dark:opacity-40 w-full h-full  bg-repeat bg-center  -z-10"></div>
          <div className="px-2">  {children}</div>
            <MobileMenu />
            <Footer />

            <Toaster expand={false}  position="top-center" richColors />
            <Analytics />
          </body>
        </UserContextProvider>
      </ThemeProvider>
    </html>
  );
}
