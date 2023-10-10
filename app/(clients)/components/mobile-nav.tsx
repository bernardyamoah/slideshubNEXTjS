'use client'
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"
import {UserSidebarRoutes} from "@/lib/navRoute";  
import {  PanelLeftOpen } from "lucide-react";
import { sidebarRoutes } from "@/lib/navRoute";
import { useUserContext } from "@/components/UserContext";
import { useState } from "react";


const MobileNav = ()=>{
  const [isOpen, setIsOpen] = useState(false);
  const {user}=useUserContext()
  const router =useRouter()
  const pathname = usePathname();
  const handleOnClick = (link:any) => {
    router.push(link.toString());
    setIsOpen(false);
  }
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex items-center" asChild >

        <PanelLeftOpen />

      </SheetTrigger>
      <SheetContent side="left" className=" w-[250px] sm:w-[300px] pr-0">
        <div className="grid gap-4 py-16 ">
        {user ? (
  <>
    {UserSidebarRoutes.map((item) => (
      <Link
        key={item.link}
        href={item.link}
        onClick={() => handleOnClick(item.link)}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          pathname === item.link
            ? "bg-emerald-600  hover:bg-none font-bold tracking-wide hover:text-white text-white hover:bg-emerald-500"
            : "hover:bg-transparent hover:underline",
          "justify-start"
        )}
      >
        <span className="flex items-center space-x-3 ">
          {item.icon}
          <span className="text-base"> {item.name}</span>
        </span>
      </Link>
    ))}
  </>
) : (
  <>
    {sidebarRoutes.map((item) => (
      <Link
        key={item.link}
        href={item.link}
        onClick={() => handleOnClick(item.link)}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          pathname === item.link
            ? "bg-emerald-600  hover:bg-none font-bold tracking-wide hover:text-white text-white hover:bg-emerald-500"
            : "hover:bg-transparent hover:underline",
          "justify-start"
        )}
      >
        <span className="flex items-center space-x-3 ">
          {item.icon}
          <span className="text-base"> {item.name}</span>
        </span>
      </Link>
    ))}
  </>
)} 
        </div>

        <SheetFooter className="space-x-2 flex flex-row items-center !justify-start absolute bottom-6"></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
