'use client'
import Navbar from "@/components/Navbar";
import { Metadata } from "next";
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
    
            <div>{children}</div>

    
    </>
  );
}

export default ClientLayout;
