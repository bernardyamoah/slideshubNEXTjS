"use client";
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
  const { user } = useUserContext();
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin =
    user?.labels?.includes("admin") || user?.labels?.includes("SuperAdmin");
  const handleOnClick = (link: any) => {
    router.push(link.toString());
    setIsOpen(false);
  };

  return (
    <>
      {user && (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="fixed z-[100] bottom-10 right-10 lg:hidden">
            <Button className="relative w-fit p-3 h-auto rounded-full">
              <PlusCircle className="w-6 h-6" />
            </Button>
          </SheetTrigger>

          <SheetContent className="w-[250px] sm:w-[300px] pl-0  h-screen space-y-10">
            <div className="grid gap-8 py-20 ">
              {isAdmin ? (
                AdmintabRoutes.map((tabRoute, index) => (
                 
                    <Link
                      href={tabRoute.path}
                      key={index}
                    
                      className={cn(
                        pathname === tabRoute.path
                          ? "text-zinc-900 dark:text-white font-bold border-l-4  border-emerald-500  text-lg "
                          : " hover:border-l-2 hover:border-emerald-500 ",
                        "pl-4 flex gap-2 duration-150 text-muted-foreground py-3 pr-0"
                      )}
                      onClick={() => handleOnClick(tabRoute.path)}
                    >
                       {tabRoute.icon}

                      Add {tabRoute.label}
                    </Link>
           
                ))
              ) : (
                <>
                  {UsertabRoutes.map((tabRoute, index) => (
                   <Link
                   href={tabRoute.path}
                   key={index}
                   className={cn(
                     pathname === tabRoute.path
                       ? "text-zinc-900 dark:text-white font-bold border-l-4 bg-emerald-50/20 border-emerald-500  text-lg "
                       : " hover:border-l-2 hover:border-emerald-500 ",
                     "pl-4 flex gap-2 duration-150 text-muted-foreground py-3 pr-0"
                   )}
                   onClick={() => handleOnClick(tabRoute.path)}
                 >
                    {tabRoute.icon}

                   Add {tabRoute.label}
                 </Link>
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
