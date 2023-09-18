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


      <div className="relative min-h-screen dark:bg-gradient-to-tl dark:from-zinc-900 dark:via-zinc-400/10 dark:to-zinc-900 ">{children}</div>

    </>
  );
}

export default ClientLayout;
