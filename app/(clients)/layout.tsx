'use client'
import Blob from "@/components/ui/blob";
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


      <div className=" px-4 ">
        {/* Blob */}
        <Blob />
        {children}

      </div>

    </>
  );
}

export default ClientLayout;
