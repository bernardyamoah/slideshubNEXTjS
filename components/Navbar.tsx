
import Logo from "./Logo";
import Link from "next/link";

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ModeToggle } from "./ModeToggle";
import MobileNav from "@/app/(clients)/components/mobile-nav";
import { usePathname, useRouter } from "next/navigation"
import { BookCopy, Home, LayoutDashboard, School } from "lucide-react";

import { getCurrentUserAndSetUser } from "@/lib/functions";
import { useEffect, useState } from "react";
import { UserNav } from "./user-nav";
interface NavLinks {


	items: { name: string; link: string, icon: JSX.Element }[];
}
export default function Navbar() {
	const [showDashboard, setShowDashboard] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	const [user, setUser] = useState<UserWithId | null>(null); // Update the type of user state
	useEffect(() => {
		// Fetch the current user from Appwrite
		const fetchUser = async () => {
			try {
				const request = await getCurrentUserAndSetUser();
				setUser(request)
				// Call the getCurrentUser function
			} catch (error) {
				console.error("Error fetching user:", error);
			}
		};

		fetchUser();
	}, []);
	useEffect(() => {
		// Check if user is logged in and set showDashboard state
		setShowDashboard(user !== null);
	}, [user]);

	let Links: NavLinks[] = [
		{
			items: [
				{
					name: "Home",
					link: "/",
					icon: <Home />
				},
				// Conditionally show Dashboard link and icon for logged-in users
				...(showDashboard
					? [
						{
							name: "Dashboard",
							link: "/dashboard",
							icon: <LayoutDashboard />,
						},
					]
					: []),
				{
					name: "Campus",
					link: "/campus",
					icon: <School />
				},

				{
					name: "Books",
					link: "/books",
					icon: <BookCopy />
				},
			],
		},
	];
	return (
		<>
			<nav className="nav-bar sticky top-0 z-[100]  ">
				<div className="flex w-full items-center justify-between space-x-4">
					{/* <!-- Logo --> */}
					<Logo />


					{/* <!-- Nav List --> */}
					<ul className=" hidden justify-between text-slate-900 dark:text-white lg:flex">
						{Links[0].items.map((link, index) => (
							<li key={index}>
								<Link href={link.link} passHref
									className={cn(
										buttonVariants({ variant: "ghost" }),
										pathname === link.link
											? "text-emerald-500  font-bold tracking-wide  dark:hover:text-emerald-500"
											: "hover:bg-transparent dark:hover:text-emerald-500",
										"justify-start"
									)}
								>
									<span className="flex items-center space-x-3 ">
										{link.icon}
										<span className="text-base">  {link.name}</span>
									</span>

								</Link>
							</li>
						))}

					</ul>
					<div className="space-x-4 flex">
						<div className="hidden lg:flex">
							<ModeToggle />
						</div>
						{/* Conditionally render UserNav component based on authentication */}
						{user && <UserNav user={user} />}
						<div className="lg:hidden flex items-center">
							<MobileNav items={Links[0].items} />

						</div>
					</div>

				</div>
			</nav>
		</>
	);
}
