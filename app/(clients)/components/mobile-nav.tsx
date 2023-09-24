'use client'
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation"

import { PanelLeftOpen } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
interface MobileNavProps {


  items: { name: string; link: string; icon: JSX.Element }[];
}

const MobileNav: React.FC<MobileNavProps> = ({ items }) => {
  const pathname = usePathname()
  return (
    <Sheet >
      <SheetTrigger className="flex items-center" asChild>

        <PanelLeftOpen />

      </SheetTrigger>
      <SheetContent side="left" className=" w-[300px] sm:w-[400px] ">
       
        <NavigationMenu className="grid gap-4 py-16 ">
            {items.map((item) => (
              <NavigationMenuItem key={item.link} className="block w-full">
          
                  <NavigationMenuLink
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      pathname === item.link
                        ? "bg-emerald-600 hover:bg-none font-bold tracking-wide hover:text-white text-white hover:bg-emerald-500"
                        : "hover:bg-transparent hover:underline",
                      "justify-start w-full  "
                    )}
                  >
                    <span className="flex items-center space-x-3">
                      {item.icon}
                      <span className="text-base">{item.name}</span>
                    </span>
                  </NavigationMenuLink>
                
              </NavigationMenuItem>
            ))}
          </NavigationMenu>
         
       

        <SheetFooter className="space-x-2 flex flex-row items-center !justify-start absolute bottom-6"></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
