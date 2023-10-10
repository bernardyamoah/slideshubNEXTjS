'use client'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Button } from "./button";
import { ChevronLeftIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const BackButtonNavigation = () => {
    const router = useRouter();
    const pathname=usePathname();
    const handleNavigation = () => {
        router.back();
      };
    // Get the current pathname
  const isHomePage = pathname === '/';

  // Render the navigation only if the route is not '/'
  if (isHomePage) {
    return null;
  }
  return (
  
  

       <Button size='sm' className="relative block my-4 left-10" onClick={handleNavigation}>
        <ChevronLeftIcon className="w-4 h-4 text-foreground-muted" />
      
       </Button>
    
  
  );
};

export default BackButtonNavigation;