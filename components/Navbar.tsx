'use client';
import Logo from "./Logo";
import Link from "next/link";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./ModeToggle";
import MobileNav from "@/app/(clients)/components/mobile-nav";
import { usePathname, useRouter } from "next/navigation"
import { BookCopy, Home, LayoutDashboard, School } from "lucide-react";

import { getCurrentUserAndSetUser } from "@/lib/functions";
import { useEffect, useState } from "react";
import { UserNav } from "./userProfile";
import { PlusCircle } from "lucide-react";

interface NavLinks {


	items: { name: string; link: string, icon: JSX.Element }[];
}


export default function Navbar() {
	const [showDashboard, setShowDashboard] = useState(false);
	const pathname = usePathname();
	const [user, setUser] = useState<UserWithId | null>(null); // Fix the useState hook here
	const router = useRouter();
	useEffect(() => {
		// Fetch the current user from Appwrite
		const fetchUser = async () => {
			try {
				// Call the getCurrentUser function
				const request = await getCurrentUserAndSetUser();
				setUser(request);

				// Check if user is logged in and set showDashboard state
				setShowDashboard(user !== null);
			} catch (error) {
				console.error("Error fetching user:", error);
			}
		};

		fetchUser();
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
						{
							name: "Create",
							link: "/dashboard/create",
							icon: <PlusCircle />,
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
			<nav className="sticky top-0 z-20 nav-bar bg-currents ">
				<div className="flex items-center justify-between w-full space-x-2">
					{/* <!-- Logo --> */}
					<Logo />


					{/* <!-- Nav List --> */}
					<ul className="justify-between hidden text-slate-900 dark:text-white lg:flex">
						{Links[0].items.map((link, index) => (

							<Button key={index} asChild variant='ghost' className="text-lg font-medium">
								<Link href={link.link} passHref
									className={cn(

										pathname === link.link
											? "text-emerald-500 text-lg font-bold tracking-wide  dark:hover:text-emerald-400 "
											: "hover:bg-transparent dark:hover:text-emerald-500 text-gray-600 dark:text-gray-400"

									)}
								>

									{link.name}


								</Link>
							</Button>
						))}

					</ul>
					<div className="flex space-x-4">

						<ModeToggle />

						{/* Conditionally render UserNav component based on authentication */}
						{/* Conditionally render UserNav component or Login button */}
						{user ? (
							<UserNav user={user} />
						) : (
							<Button
								className="text-lg font-medium"
								onClick={() => router.push("/login")}
							>
								Login
							</Button>
						)}
						<div className="flex items-center lg:hidden">
							<MobileNav items={Links[0].items} />

						</div>
					</div>

				</div>
			</nav>
		</>
	);
}
