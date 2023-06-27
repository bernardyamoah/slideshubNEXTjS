
import Logo from "./Logo";
import Link from "next/link";

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ModeToggle } from "./ModeToggle";
import MobileNav from "@/app/(clients)/components/mobile-nav";
import { usePathname } from "next/navigation"
interface NavLinks {


	items: { name: string; link: string }[];
  }
export default function Navbar() {
	const pathname = usePathname()
	
	  
	let Links: NavLinks[] = [
		{
			items: [
			  {
				name: "Home",
				link: "/",
			  },
			  {
				name: "Campus",
				link: "/campus",
			  },
			  {
				name: "Books",
				link: "/books",
			  },
			],
		  },
	];
	return (
		<>
			<nav className="nav-bar  ">
				<div className="flex w-full items-center justify-between">
					{/* <!-- Logo --> */}
					<Logo />


					{/* <!-- Nav List --> */}
					<ul className="nav-links hidden justify-between text-slate-900 dark:text-white md:flex">
					{Links[0].items.map((link, index) => (
            <li key={index}>
              <Link href={link.link} passHref
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    pathname === link.link
                      ? "text-emerald-500  font-bold tracking-wide hover:text-white "
                      : "hover:bg-transparent ",
                    "justify-start"
                  )}
                >
                  <span>{link.name}</span>
                
              </Link>
            </li>
          ))}

					</ul>
					<div className="space-x-4 flex">
					<ModeToggle />
					<div className="lg:hidden">
					<MobileNav  items={Links[0].items}/>
					</div>
					</div>
					
				</div>
			</nav>
		</>
	);
}
