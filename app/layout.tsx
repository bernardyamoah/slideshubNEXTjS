import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { ToastProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";

import { SpeedInsights } from "@vercel/speed-insights/next";
import BackButtonNavigation from "@/components/ui/back";

import MobileMenu from "../components/mobile-menu";

import { Metadata } from "next";
import { UserProvider } from "@/components/providers/user-provider";
import Background from "./background";
// import Footer from "@/components/footer";
import Navbar from "@/components/nav-bar";
import { Breadcrumbs } from "@/components/breadcrumbs";


export const metadata: Metadata = {
	title: {
		default: "Slideshub",
		template: "%s | Slideshub",
	},
	description: "Download your slides from Slideshub and more!",

	metadataBase: new URL("https://slideshub.vercel.app"),
	applicationName: "Slideshub",
	authors: [{ name: "Slideshub Team", url: "https://slideshub.vercel.app" }],
	colorScheme: "dark",
	manifest: "/manifest.json",
	openGraph: {
		title: "Slideshub",
		type: "website",
		description: "Download your slides from Slideshub and more!",
		url: "https://slideshub.vercel.app",
		images: [{ url: "/thumbnail.jpg" }],
	},
	icons: {
		apple: "https://slideshub.vercel.app/apple-touch-icon.png",
	},

	twitter: {
		title: "SlidesHub",
		creator: "@byayamoah",
		card: "summary_large_image",
		site: "https://slideshub.vercel.app",

		images: [
			{
				url: "https://slideshub.vercel.app/thumbnail.jpg",
				width: 800,
				height: 600,
				alt: "Slideshub",
			},
			{
				url: "https://slideshub.vercel.app/thumbnail.jpg",
				width: 900,
				height: 800,
				alt: "Slideshub Image Alt",
			},

			{ url: "https://slideshub.vercel.app/thumbnail.jpg" },
		],
	},
};
// "https://slideshub.netlify.app/assets/favicon_io/thumbnail.jpg"

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="relative min-h-screen flex flex-col">
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
					<UserProvider>
						<Background>
							<Navbar />
							<Breadcrumbs />
							<main className="relative  bg-white/20 dark:bg-zinc-950/40 flex-1  items-center justify-center">
								<BackButtonNavigation />
								{children}
							</main>

							<MobileMenu />
							{/* <Footer /> */}

							<ConfettiProvider />
							<ToastProvider />
							<Analytics />
							<SpeedInsights />
						</Background>
					</UserProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
