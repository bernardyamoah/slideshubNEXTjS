import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet";
import { TerminalWindow } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/ModeToggle";
interface MobileNavProps {


  items: { title: string; href: string }[];
}

const MobileNav: React.FC<MobileNavProps> = ({  items }) => {
  const pathname = usePathname()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="p-2">
          <TerminalWindow size={32} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="grid gap-4 py-4">
        {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
        </div>

        <SheetFooter className="space-x-2 flex items-center !justify-start absolute bottom-6">  <p>Theme toggle</p> <ModeToggle /></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
