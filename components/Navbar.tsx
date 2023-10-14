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


export default function Navbar() {
  const {user}=useUserContext();

  const pathname = usePathname();
 
  const router = useRouter();



  return (
    <header className="bg-background/80 sticky top-4 z-[1000] backdrop-blur-2xl  px-4 py-4 border max-w-xl lg:max-w-5xl rounded-2xl mx-auto">
      <nav className="flex items-center justify-between w-full space-x-2 ">
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
        <div className="hidden lg:block">
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
