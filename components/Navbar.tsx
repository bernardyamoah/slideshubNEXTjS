'use client'
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { ModeToggle } from "./ModeToggle";
import Logo from "./Logo";
import MobileNav from "@/app/(clients)/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { BookCopy, Home, LayoutDashboard, School } from "lucide-react";


import { usePathname, useRouter } from "next/navigation"

import Link from "next/link";
import { useMyContext } from "./MyContext";
import { UserProfile } from "./userProfile";


export default function Navbar() {
  const {user}=useMyContext();
  const pathname = usePathname();
  
  const [showDashboard, setShowDashboard] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      
      setShowDashboard(user ? true : false);
    }
  }, [user]);


  return (
    <nav className="sticky top-0 z-20 nav-bar bg-currents">
      <div className="flex items-center justify-between w-full space-x-2">
        <Logo />

        <ul className="justify-between hidden text-slate-900 dark:text-white lg:flex">
          {[
            { name: "Home", link: "/", icon: <Home /> },
            ...(showDashboard
              ? [
                  { name: "Dashboard", link: "/dashboard", icon: <LayoutDashboard /> },
                 
                ]
              : []),
            { name: "Campus", link: "/campus", icon: <School /> },
            { name: "Books", link: "/books", icon: <BookCopy /> },
          ].map((link, index) => (
            <Button key={index} asChild variant="ghost" className="text-lg font-medium">
              <Link
                href={link.link}
                passHref
                className={cn(
                  pathname === link.link
                    ? "text-emerald-500 text-lg font-bold tracking-wide dark:hover:text-emerald-400"
                    : "hover:bg-transparent dark:hover:text-emerald-500 text-gray-600 dark:text-gray-400"
                )}
              >
                {link.name}
              </Link>
            </Button>
          ))}
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
            <MobileNav items={[
              { name: "Home", link: "/", icon: <Home /> },
              ...(showDashboard
                ? [
                    { name: "Dashboard", link: "/dashboard", icon: <LayoutDashboard /> },
                    
                  ]
                : []),
              { name: "Campus", link: "/campus", icon: <School /> },
              { name: "Books", link: "/books", icon: <BookCopy /> },
            ]} />
          </div>
        </div>
      </div>
    </nav>
  );
}
