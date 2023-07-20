import React from "react";
import Link from "next/link";
import { UserNav } from "./user-nav";
import { ModeToggle } from "./ModeToggle";
import MobileNav from "@/app/dashboard/components/mobile-nav";
import Logo from "./Logo";
interface AuthNavProps {
  user: any;
  sidebarNavItems: { title: string; href: string, icon:JSX.Element }[]; // Add sidebarNavItems prop
}
const AuthNav: React.FC<AuthNavProps> = ({ user, sidebarNavItems }) => {
  return (
    <>
      <nav className="w-full px-8 py-4 border-b-[1px] flex items-center justify-between fixed top-0 bg-white z-40 dark:bg-gray-950">
        
        <Logo/>
      
        <div className="flex items-center space-x-5 capitalize">
        
        </div>
        <div className="flex items-center space-x-5 capitalize">
          <UserNav user={user} />
          
    {/* dark mode button for tablets and laptops */}
          <div className="xl:block hidden">
          <ModeToggle />
          </div>
            <div className="xl:hidden">
          <MobileNav  items={sidebarNavItems} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default AuthNav;
