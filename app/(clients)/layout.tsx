'use client'
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";
import MobileNav from "./components/mobile-nav";
 const metadata: Metadata = {
  title: "Slideshub",
  description: "Advanced form example using react-hook-form and Zod.",
};

interface ClientLayoutProps {
  children: React.ReactNode;
}


function ClientLayout({ children }: ClientLayoutProps) {
 
  return (
    <>
    <Navbar />
    
            <div className="px-2">{children}</div>

            <Footer />
    </>
  );
}

export default ClientLayout;
