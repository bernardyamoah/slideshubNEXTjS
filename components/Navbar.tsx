'use client'
import { ModeToggle } from "./ModeToggle";
import Logo from "./Logo";
import MobileNav from "@/app/(clients)/_components/mobile-nav";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link";
import { useUserContext } from "./UserContext";
import { UserProfile } from "./userProfile";
import { UserSidebarRoutes, sidebarRoutes } from "@/constants";
import { Card } from "./ui/card";


export default function Navbar() {
  const {user}=useUserContext();

  const pathname = usePathname();
 
  const router = useRouter();



  return (
    <header className="bg-white dark:bg-card/90  sticky top-0 md:top-4 z-[10] p-4  w-full sm:max-w-xl lg:top-0 lg:rounded-none lg:max-w-full md:rounded-xl xs:mx-auto  backdrop-blur-md border dark:border-zinc-800">
      <nav className="flex items-center justify-between w-full space-x-2 ">
        <Logo />

        <ul className="justify-between hidden   lg:flex">
         
  

{user ? (
  UserSidebarRoutes.map((link, index) => (
    <Button key={index} asChild 
    variant="ghost"
     className={`text-lg   ${pathname === link.link ? 
      "text-emerald-500 text-lg font-bold tracking-wide dark:hover:text-emerald-400 hover:text-emerald-400 hover:bg-transparent " 
     : 
     "dark:hover:text-emerald-500 text-gray-500 dark:text-gray-600 "}`}>
      <Link href={link.link} passHref>
        {link.name}
      </Link>
    </Button>
))):(
  sidebarRoutes.map((link, index) => (
    <Button key={index} asChild variant="ghost" className={`text-lg  ${pathname === link.link ? "text-emerald-500 text-lg font-bold tracking-wide dark:hover:text-emerald-400" : "hover:bg-transparent dark:hover:text-emerald-500 text-gray-600 dark:text-gray-400"}`}>
      <Link href={link.link} passHref>
        {link.name}
      </Link>
    </Button>
)))
}
        </ul>

        <div className="flex space-x-4 items-center">
        <div >
        <ModeToggle />
        </div>

          {user ? (
            <UserProfile  />
          ) : (
            <Button className="text-base font-medium" onClick={() => router.push("/login")}>
              Login
            </Button>
          )}

          <div className="flex items-center lg:hidden">
      
            <MobileNav />
          </div>
        </div>
      </nav>
    </header>
  );
}
