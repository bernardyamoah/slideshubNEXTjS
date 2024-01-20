import darklogo from "/assets/logo-icon-dark.png";
import lightlogo from "/assets/logo-icon-light.png";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
	return (
		<Link className="flex items-center space-x-2" href="/">
			<Image
				width={144}
				height={144}
				src={darklogo}
				className="hidden object-cover w-8 h-8 dark:block md:h-10 md:w-10"
				alt="logo"
			/>

			<Image
				width={140}
				height={140}
				src={lightlogo}
				className="object-cover w-8 h-8 dark:hidden md:h-10 md:w-10"
				alt="logo"
			/>
			<span className="hidden text-sm font-bold text-zinc-900 sm:flex dark:text-white md:text-xl font-title">
				SlidesHub
			</span>
			<span className="hidden w-1 h-1 rounded-full bg-emerald-500 sm:flex"></span>
		</Link>
	);
}
