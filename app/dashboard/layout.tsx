
import { Metadata } from "next";

import { SidebarNav } from "./_components/sidebar-nav";



import { User } from "lucide-react";


const metadata: Metadata = {
  title: "Slideshub | Dashboard",
  description: "Slideshub is a platform for sharing slides and documents.",
};

const sidebarNavItems = [


 
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
    
   
        <div className=" lg:block pattern">
          <div className=" relative flex  !h-full ">
            
            <aside className="hidden xl:flex w-[13rem]  h-screen fixed ">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 w-full h-full mx-auto max-w-screen-3xl lg:p-2">
            {/* <Breadcrumbs /> */}
              <div className=" ">{children}</div>

            </div>
          </div>
        </div>
   
    </>
  );
}

export default DashboardLayout;
