"use client";
import Logo from "./Logo";
import Link from "next/link";
import BottomNav from "./BottomNav";
import { ModeToggle } from "./ModeToggle";


export default function Navbar() {
	let Links = [
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
		}
	];
	return (
		<>
			<nav className="nav-bar  ">
				<div className="flex w-full items-center justify-between">
					{/* <!-- Logo --> */}
					<Logo />


					{/* <!-- Nav List --> */}
					<ul className="nav-links hidden justify-between text-slate-900 dark:text-white md:flex">
						{Links.map((link, index) => (
							<li key={index}>
								<Link href={link.link} key={index}>
									<span>{link.name}</span>
								</Link>
							</li>
						))}
					</ul>
					<ModeToggle />

					<BottomNav />
				</div>
			</nav>
		</>
	);
}
