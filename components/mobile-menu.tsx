'use client'
import { useUserContext } from "@/components/UserContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { PlusCircle } from "lucide-react";
import Link from "next/link";
// import {AdmintabRoutes, UsertabRoutes} from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AdmintabRoutes, UsertabRoutes } from "@/constants";
const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
    const {user}=useUserContext();
    const pathname = usePathname()
    const router=useRouter();
    const isAdmin = user?.labels?.includes("admin") || user?.labels?.includes("SuperAdmin");
    const handleOnClick = (link:any) => {
      router.push(link.toString());
      setIsOpen(false);
    }
  
    return (
      <>
 {user && (
  <Sheet open={isOpen} onOpenChange={setIsOpen}  >
  <SheetTrigger className="fixed z-50 bottom-8 right-10 lg:hidden" >
    <Button className="relative w-fit p-3 h-auto rounded-full">
      <PlusCircle className="w-7 h-7" />
    </Button>
  </SheetTrigger>
  <SheetContent className="w-[250px] sm:w-[300px] pl-0  h-screen top-[10%] space-y-10">

  <div className="grid gap-8 py-24 ">
  {isAdmin ? (
        AdmintabRoutes.map((tabRoute, index) => (
          <span key={index}  className={cn(
            pathname === tabRoute.path
            ? 'text-zinc-900 font-bold border-l-4 bg-emerald-50/20 border-emerald-500  text-lg '
             :'text-left hover:border-l-2 hover:border-emerald-500  hover:text-lg','pl-4 flex gap-2 duration-150 text-zinc-700' )}>
              {tabRoute.icon}

            <Link href={tabRoute.path} className="" onClick={()=> handleOnClick(tabRoute.path)}>
              Add {tabRoute.label}
            </Link>
          </span>
        ))
      ) : (
        <>
      {UsertabRoutes.map((tabRoute, index) => (
<span
  key={index}
  
  className={cn(
    pathname === tabRoute.path
    ? 'text-zinc-900 font-bold border-l-4 bg-emerald-50/20 border-emerald-500  text-lg '
             :'text-left hover:border-l-2 hover:border-emerald-500  hover:text-lg','pl-4 flex gap-2 duration-150 text-zinc-700' )}>
              {tabRoute.icon}
  <Link href={tabRoute.path} className="duration-150 hover:font-bold" onClick={()=> handleOnClick(tabRoute.path)}>
    Add {tabRoute.label}
  </Link>
</span>
))}
      
      </>
      )}
  </div>
  </SheetContent>
</Sheet>

 )}
    </>
    );
  };

  export default MobileMenu;