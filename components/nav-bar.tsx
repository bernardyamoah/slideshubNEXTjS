"use client";
import { ModeToggle } from "./mode-toggle";

import MobileNav from "@/app/(clients)/_components/mobile-nav";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { UserProfile } from "./user-profile";
import { UserSidebarRoutes, sidebarRoutes } from "@/constants";
import { useStore } from "@/hooks/use-user";
import Logo from "./slideshub-logo";

export default function Navbar() {
	const user = useStore((state) => state.user);

	const pathname = usePathname();

	const router = useRouter();

	return (
		<header className="bg-white dark:bg-card border  sticky top-0  z-[10] p-4  w-full      dark:border-zinc-800">
			<nav className="flex items-center justify-between w-full space-x-2 ">
				<Logo />

				<ul className="justify-between hidden   lg:flex">
					{user
						? UserSidebarRoutes.map((link, index) => (
								<Button
									key={index}
									asChild
									variant="ghost"
									className={`text-lg   ${
										pathname === link.link
											? "text-emerald-500 text-lg font-bold tracking-wide dark:hover:text-emerald-400 hover:text-emerald-400 hover:bg-transparent "
											: "dark:hover:text-emerald-500 text-gray-500 dark:text-gray-300 font-normal"
									}`}
								>
									<Link href={link.link} passHref>
										{link.name}
									</Link>
								</Button>
						  ))
						: sidebarRoutes.map((link, index) => (
								<Button
									key={index}
									asChild
									variant="ghost"
									className={`text-lg  ${
										pathname === link.link
											? "text-emerald-500 text-lg font-bold tracking-wide dark:hover:text-emerald-400"
											: "hover:bg-transparent dark:hover:text-emerald-500 text-gray-600 dark:text-gray-400"
									}`}
								>
									<Link href={link.link} passHref>
										{link.name}
									</Link>
								</Button>
						  ))}
				</ul>

				<div className="flex space-x-4 items-center">
					<div>
						<ModeToggle />
					</div>

					{user && <UserProfile />}
					{/* ) : (
             <Button
              className="text-base font-medium"
               onClick={() => router.push("/login")}
             >
              Login
             </Button>
           )} */}

					<div className="flex items-center lg:hidden">
						<MobileNav />
					</div>
				</div>
			</nav>
		</header>
	);
}
