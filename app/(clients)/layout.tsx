'use client'
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


      <div className=" md:py-10 space-y-8  ">

        {children}
        
        </div>

    </>
  );
}

export default ClientLayout;
