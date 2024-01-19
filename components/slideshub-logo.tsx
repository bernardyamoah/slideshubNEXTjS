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
				className="logo_icon_dark"
				alt="logo"
			/>

			<Image
				width={140}
				height={140}
				src={lightlogo}
				className="logo_icon_light"
				alt="logo"
			/>
			<span className="logo_text">SlidesHub</span>
			<span className="hidden w-1 h-1 rounded-full bg-emerald-500 sm:flex"></span>
		</Link>
	);
}
