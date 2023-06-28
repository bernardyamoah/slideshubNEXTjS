'use client'
import { Metadata } from "next";

import { SidebarNav } from "./components/sidebar-nav";
import AuthNav from "@/components/AuthNav"; // Import the AuthNav component
import { getCurrentUserAndSetUser } from "@/lib/functions";
import { useState, useEffect } from "react";

import { Book, FileBarChart, GraduationCap, LayoutDashboard, PiSquare,Home, School } from "lucide-react";




type UserWithId = User<Preferences> & { id: string };
 const metadata: Metadata = {
  title: "Slideshub",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Home",
    href: "/",
    icon:<Home />
    ,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon:<LayoutDashboard />,
  },
  {
    title: "Add Book",
    href: "/dashboard/add-book",
    icon:<Book />,
  },
  {
    title: "Add Slides",
    href: "/dashboard/add-slide",
    icon: <FileBarChart />,
  },
  {
    title: "Add Course",
    href: "/dashboard/add-course",
    icon: <PiSquare />,
  },
  {
    title: "Add Program",
    href: "/dashboard/add-program",
    icon:<GraduationCap />,
  },

];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const [user, setUser] = useState<UserWithId | null>(null); // Update the type of user state
  useEffect(() => {
    // Fetch the current user from Appwrite
    const fetchUser = async () => {
      try {
        const request = await getCurrentUserAndSetUser();
        setUser(request)
        // Call the getCurrentUser function
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <AuthNav user={user} sidebarNavItems={sidebarNavItems} /> {/* Include the AuthNav component */}

      <div className=" md:block mt-[4.6rem] bg-gray-50 dark:bg-inherit ">
        <div className=" relative flex min-h-screen items-center ">
          <aside className="hidden lg:flex w-[15%]  h-screen fixed dark:bg-gray-950">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="lg:ml-[15%] w-full flex-1  max-w-screen-3xl mx-auto  h-full lg:p-2">

            <div className="  h-full rounded-md  dark:bg-inherit dark:border-none lg:p-5">{children}</div>

          </div>
        </div>
      </div>
    
    </>
  );
}

export default DashboardLayout;
