'use client'
import { Metadata } from "next";

import { SidebarNav } from "./components/sidebar-nav";
import AuthNav from "@/components/AuthNav"; // Import the AuthNav component
import { getCurrentUserAndSetUser } from "@/lib/functions";
import { useState, useEffect } from "react";


type UserWithId = User<Preferences> & { id: string };
 const metadata: Metadata = {
  title: "Slideshub",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Add Book",
    href: "/dashboard/add-book",
  },
  {
    title: "Add Slides",
    href: "/dashboard/add-slide",
  },
  {
    title: "Add Course",
    href: "/dashboard/add-course",
  },
  {
    title: "Add Program",
    href: "/dashboard/add-program",
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

      <div className=" pb-16 md:block mt-[4.6rem]">
        <div className=" relative flex">
          <aside className="hidden lg:flex w-[20%] bg-white h-screen fixed dark:bg-gray-950">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="lg:pl-[20%] w-full flex-1 min-h-screen">

            <div className="">{children}</div>

          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
