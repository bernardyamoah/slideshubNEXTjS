import Navbar from "@/components/Navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next"
import BackButtonNavigation from "@/components/ui/back";
import { UserContextProvider } from "@/components/UserContext";
import MobileMenu from "../components/mobile-menu";
import Footer from "@/components/Footer";

import { Metadata } from "next";


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
  manifest: '/manifest.json',
  openGraph: {
    title: "Slideshub",
    type: "website",
    description: "Download your slides from Slideshub and more!",
    url: "https://slideshub.vercel.app",
    images: [{ url: "/thumbnail.jpg" }],
  },
  icons: {
    apple: "https://slideshub.vercel.app/apple-touch-icon.png",
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


      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <body className="relative min-h-screen">
          <UserContextProvider>
            <Navbar />

            <main className="relative pb-20 bg-white dark:bg-zinc-950/40"> {/* dark:bg-background/70 */}
              <BackButtonNavigation />


              {children}
            </main>

            <MobileMenu />
            <Footer />

            <Toaster expand={false} position="top-center" richColors closeButton={true} />
            <Analytics />
            <SpeedInsights />
          </UserContextProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
