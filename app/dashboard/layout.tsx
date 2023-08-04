'use client'
import { Metadata } from "next";

import { SidebarNav } from "./components/sidebar-nav";
import AuthNav from "@/components/AuthNav"; // Import the AuthNav component
import { getCurrentUserAndSetUser } from "@/lib/functions";
import { useState, useEffect } from "react";

import { LayoutDashboard, Home, PlusCircle } from "lucide-react";
import { User } from "lucide-react";

import { MyContextProvider } from '../../components/MyContext'


type UserWithId = User<Preferences> & { id: string };
const metadata: Metadata = {
  title: "Slideshub | Dashboard",
  description: "Slideshub is a platform for sharing slides and documents.",
};

const sidebarNavItems = [
  {
    title: "Home",
    href: "/",
    icon: <Home />
    ,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard />,
  },
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
  const [user, setUser] = useState<UserWithId | null>(null); // Update the type of user state

  const [userInTeam, setUserInTeam] = useState<boolean | null>(null);

  useEffect(() => {
    // Fetch the current user from Appwrite
    const fetchUser = async () => {
      try {
        const request = await getCurrentUserAndSetUser();
        setUser(request);
        // Call the getCurrentUser function
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [user]);
  return (
    <>
      <MyContextProvider>
        <AuthNav user={user} sidebarNavItems={sidebarNavItems} /> {/* Include the AuthNav component */}

        <div className=" lg:block mt-[4.6rem] bg-gray-50 dark:bg-black ">
          <div className=" relative flex  !h-full ">
            <aside className="hidden xl:flex w-[13rem]  h-screen fixed dark:bg-black">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="xl:ml-[13rem] w-full flex-1  max-w-screen-3xl mx-auto  h-full lg:p-2">

              <div className=" rounded-md  dark:bg-inherit dark:border-none lg:p-5">{children}</div>

            </div>
          </div>
        </div>
      </MyContextProvider>
    </>
  );
}

export default DashboardLayout;
