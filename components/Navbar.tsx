'use client'
import React, {} from "react";


import { ModeToggle } from "./ModeToggle";
import Logo from "./Logo";
import MobileNav from "@/app/(clients)/components/mobile-nav";
import { Button } from "@/components/ui/button";

import {UserSidebarRoutes, sidebarRoutes} from "@/lib/navRoute";

import { usePathname, useRouter } from "next/navigation"

import Link from "next/link";
import { useMyContext } from "./MyContext";
import { UserProfile } from "./userProfile";


export default function Navbar() {
  const {user}=useMyContext();
  const pathname = usePathname();
 
  const router = useRouter();



  return (
    <nav className="sticky top-0 z-20 nav-bar bg-currents">
      <div className="flex items-center justify-between w-full space-x-2">
        <Logo />

        <ul className="justify-between hidden text-slate-900 dark:text-white lg:flex">
         
  

{user ? (
  UserSidebarRoutes.map((link, index) => (
    <Button key={index} asChild variant="ghost" className={`text-lg font-medium ${pathname === link.link ? "text-emerald-500 text-lg font-bold tracking-wide dark:hover:text-emerald-400" : "hover:bg-transparent dark:hover:text-emerald-500 text-gray-600 dark:text-gray-400"}`}>
      <Link href={link.link} passHref>
        {link.name}
      </Link>
    </Button>
))):(
  sidebarRoutes.map((link, index) => (
    <Button key={index} asChild variant="ghost" className={`text-lg font-medium ${pathname === link.link ? "text-emerald-500 text-lg font-bold tracking-wide dark:hover:text-emerald-400" : "hover:bg-transparent dark:hover:text-emerald-500 text-gray-600 dark:text-gray-400"}`}>
      <Link href={link.link} passHref>
        {link.name}
      </Link>
    </Button>
)))
}
        </ul>

        <div className="flex space-x-4">
          <ModeToggle />

          {user ? (
            <UserProfile  />
          ) : (
            <Button className="text-lg font-medium" onClick={() => router.push("/login")}>
              Login
            </Button>
          )}

          <div className="flex items-center lg:hidden">
      
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
}
