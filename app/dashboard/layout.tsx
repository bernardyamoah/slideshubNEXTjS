
import { Metadata } from "next";

import { SidebarNav } from "./components/sidebar-nav";


import {  PlusCircle } from "lucide-react";
import { User } from "lucide-react";

import { MyContextProvider } from '../../components/MyContext'

const metadata: Metadata = {
  title: "Slideshub | Dashboard",
  description: "Slideshub is a platform for sharing slides and documents.",
};

const sidebarNavItems = [


  {
    title: "Create",
    href: "/dashboard/create",
    icon: <PlusCircle />,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: <User />,
  },


];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {

  return (
    <>
      <MyContextProvider>
    
  
        <div className=" lg:block pattern  ">
          <div className=" relative flex  !h-full ">
            <aside className="hidden xl:flex w-[13rem]  h-screen fixed ">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 w-full h-full mx-auto max-w-screen-3xl lg:p-2">

              <div className="rounded-md dark:bg-inherit dark:border-none lg:p-5">{children}</div>

            </div>
          </div>
        </div>
      </MyContextProvider>
    </>
  );
}

export default DashboardLayout;
