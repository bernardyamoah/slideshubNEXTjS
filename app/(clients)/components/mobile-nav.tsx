import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet";
import { TerminalWindow } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/ModeToggle";
interface MobileNavProps {


  items: { name: string; link: string }[];
}

const MobileNav: React.FC<MobileNavProps> = ({  items }) => {
  const pathname = usePathname()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="p-2">
          <TerminalWindow size={26} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="grid gap-4 py-4">
        {items.map((item) => (
        <Link
          key={item.link}
          href={item.link}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.link
              ? "bg-emerald-600  hover:bg-none font-bold tracking-wide hover:text-white text-white hover:bg-emerald-500"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.name}
        </Link>
      ))}
        </div>

        <SheetFooter className="space-x-2 flex flex-row items-center !justify-start absolute bottom-6">  <p>Theme</p> <ModeToggle /></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
