"use client";
import Logo from "./Logo";
import Link from "next/link";
import BottomNav from "./BottomNav";


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
		},
		
		{
			name: "About Us",
			link: "/about",
		},
		{
			name: "Contact Us",
			link: "/contact",
		},
	];
	return (
		<>
			<nav className="nav-bar fixed top-0 left-0 z-50 flex bg-white dark:bg-slate-900/90 dark:backdrop-blur-xl lg:space-x-6">
				<div className="flex w-full items-center justify-center md:justify-between">
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
			

					<BottomNav />
				</div>
			</nav>
		</>
	);
}
