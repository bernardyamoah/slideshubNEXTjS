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
    <NavigationMenu className="left-4 my-5">
      <NavigationMenuLink>
       <Button variant='ghost'onClick={handleNavigation}>
        <ChevronLeftIcon className="w-5 h-5 mr-2" />
        Back
       </Button>
      </NavigationMenuLink>
    </NavigationMenu>
  );
};

export default BackButtonNavigation;