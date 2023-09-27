'use client'
import { useMyContext } from "@/components/MyContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import {tabRoutes} from "@/lib/navRoute";
const MobileMenu = () => {
    const {user}=useMyContext();
    const isAdmin = user?.labels?.includes("admin") || user?.labels?.includes("SuperAdmin");
   
    return (
  
    <Sheet>
    <SheetTrigger className="fixed h-12 w-12 bottom-8 right-10 lg:hidden">
      <Button className="w-full h-full p-2 rounded-full">
        <PlusCircleIcon className="w-8 h-8" />
      </Button>
    </SheetTrigger>
    <SheetContent className=" gap-4 text-left w-[250px] grid ">
    {isAdmin ? (
          tabRoutes.map((tabRoute, index) => (
            <Button key={index} variant="ghost" className="text-left border-l-2 hover:border-emerald-500">
              <Link href={`dashboard/${tabRoute.path}`}>
                Add {tabRoute.label}
              </Link>
            </Button>
          ))
        ) : (
          <>
            <Button variant="ghost" className="text-left border-l-2 hover:border-emerald-500">
              <Link href="dashboard/add-slide">Add Slide</Link>
            </Button>
            <Button variant="ghost" className="text-left border-l-2 hover:border-emerald-500">
              <Link href="dashboard/add-book">Add Book</Link>
            </Button>
          </>
        )}
    </SheetContent>
  </Sheet>
    );
  };

  export default MobileMenu;