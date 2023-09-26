'use client'
import { useMyContext } from "@/components/MyContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

const MobileMenu = ({tabTriggers}) => {
    const {user}=useMyContext();
    user?.labels || [];
    console.log("🚀 ~ file: mobile-menu.tsx:12 ~ MobileMenu ~ user?.labels:", user?.labels)
    return (
    //   <Dialog>
    //     <DialogTrigger className="fixed h-10 w-10 bottom-8 right-10 lg:hidden">
    //       <Button className="w-full h-full p-2 rounded-full">
    //         <PlusCircleIcon className="w-6 h-6" />
    //       </Button>
    //     </DialogTrigger>
    //     <DialogContent className="max-w-xs w-full pt-16 px-4 pb-4">
    //       {tabTriggers.map((trigger: any, index: any) => (
    //         <Button key={index} variant='ghost' className="w-full mb-2">
    //         <Link href={`dashboard/add-${trigger.value}`}>
              
    //             Add {trigger.label}
          
    //         </Link>
    //         </Button>   
    //       ))}
    //     </DialogContent>
    //   </Dialog>
    <Sheet>
    <SheetTrigger className="fixed h-12 w-12 bottom-8 right-10 lg:hidden">
      <Button className="w-full h-full p-2 rounded-full">
        <PlusCircleIcon className="w-8 h-8" />
      </Button>
    </SheetTrigger>
    <SheetContent className="">
      {tabTriggers.map((trigger, index) => (
        <Button key={index} variant='ghost' className="w-full mb-2">
            <Link href={`dashboard/add-${trigger.value}`}>
              
                Add {trigger.label}
              
                 </Link>
                 </Button>   
      ))}
    </SheetContent>
  </Sheet>
    );
  };

  export default MobileMenu;