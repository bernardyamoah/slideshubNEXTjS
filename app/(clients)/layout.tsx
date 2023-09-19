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


      <div className="relative min-h-screen dark:bg-gradient-to-tl dark:from-zinc-900 dark:via-zinc-400/10 dark:to-zinc-900 ">
      <main className='px-6 pt-8 mx-auto space-y-4 max-w-7xl lg:px-8 '>
        {children}
        </main>
        </div>

    </>
  );
}

export default ClientLayout;
