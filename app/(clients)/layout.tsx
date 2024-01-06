'use client'
import Blob from "@/components/ui/blob";
import { Metadata } from "next";
const metadata: Metadata = {
  title: "Slideshub",

};

interface ClientLayoutProps {
  children: React.ReactNode;
}


function ClientLayout({ children }: ClientLayoutProps) {

  return (
    <>


      <div className=" px-4  items-center justify-center   h-full min-h-screen w-full">

        <Blob />
        {children}

      </div>

    </>
  );
}

export default ClientLayout;
