'use client'
import { useMyContext } from "@/components/MyContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { PlusCircleIcon, X } from "lucide-react";
import Link from "next/link";
import {AdmintabRoutes, UsertabRoutes} from "@/lib/navRoute";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
    const {user}=useMyContext();
    const pathname = usePathname()
    const router=useRouter();
    const isAdmin = user?.labels?.includes("admin") || user?.labels?.includes("SuperAdmin");
    const handleOnClick = (link:any) => {
      router.push(link.toString());
      setIsOpen(false);
    }
  
    return (
  
    <Sheet open={isOpen} onOpenChange={setIsOpen}  >
    <SheetTrigger className="fixed h-12 w-12 bottom-8 right-10 lg:hidden" >
      <Button className=" p-2 rounded-full">
        <PlusCircleIcon className="w-8 h-8" />
      </Button>
    </SheetTrigger>
    <SheetContent className="  text-left w-[250px] grid py-16 px-0 gap-0">
 
    <div className="grid w-full gap-1">
    {isAdmin ? (
          AdmintabRoutes.map((tabRoute, index) => (
            <Button key={index} variant="ghost" className={cn(
              pathname === tabRoute.path
              ? 'border-l-4 bg-emerald-50/20 border-emerald-500  text-lg '
               :'text-left hover:border-l-2 hover:border-emerald-500  hover:text-lg' )}>

              <Link href={tabRoute.path} className="hover:font-bold duration-150" onClick={()=> handleOnClick(tabRoute.path)}>
                Add {tabRoute.label}
              </Link>
            </Button>
          ))
        ) : (
          <>
        {UsertabRoutes.map((tabRoute, index) => (
  <Button
    key={index}
    variant="ghost"
    className={cn(
      pathname === tabRoute.path
        ? "border-l-2 border-emerald-500 text-lg"
        : "h-full text-left hover:border-l-2 hover:border-emerald-500 hover:text-lg"
    )}
  
  >
    <Link href={tabRoute.path} className="hover:font-bold duration-150" onClick={()=> handleOnClick(tabRoute.path)}>
      Add {tabRoute.label}
    </Link>
  </Button>
))}
        
        </>
        )}
    </div>
    </SheetContent>
  </Sheet>
    );
  };

  export default MobileMenu;