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
  authors: [{name:"Bernard Yamoah"},{name:'Joeseph Adofo'}],
  colorScheme:'dark',


  openGraph: {
    title:'Slideshub',
    type:'website',
    description:'Download your slides from Slideshub and more!',
    
    images: "https://slideshub.netlify.app/assets/favicon_io/thumbnail.jpg",  
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
          <body>
           

            <Navbar />
            <Breadcrumbs />
            <BackButtonNavigation />

            {children}
            <MobileMenu />
            <Footer />

            <Toaster expand={false}  position="bottom-center" richColors />
            <Analytics />
          </body>
        </MyContextProvider>
      </ThemeProvider>
    </html>
  );
}
