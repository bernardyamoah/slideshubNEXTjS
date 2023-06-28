
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet";

import Link from "next/link";
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/ModeToggle";
import { PanelTopCloseIcon } from "lucide-react";
interface MobileNavProps {


  items: { title: string; href: string; icon:JSX.Element }[];
}

const MobileNav: React.FC<MobileNavProps> = ({  items }) => {
  const pathname = usePathname()
  return (
    <Sheet>
      <SheetTrigger asChild>

        <PanelTopCloseIcon />
      
    
      </SheetTrigger>
      <SheetContent  side="left">
        <div className="grid gap-4 py-16">
        {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-emerald-600  hover:bg-none font-bold tracking-wide hover:text-white text-white hover:bg-emerald-500"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          <span className="flex items-center space-x-3 ">
      {item.icon}
        <span className="text-base">  {item.title}</span>
      </span>
        </Link>
      ))}
        </div>

        <SheetFooter className="space-x-2 flex flex-row items-center !justify-start absolute bottom-6">  <p>Theme</p> <ModeToggle /></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
