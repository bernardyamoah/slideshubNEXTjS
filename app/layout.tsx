import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";
export const metadata = {
	title: "Slideshub",
	description: "Generated by create next app",
	charset: "utf-8",
	type: "website",
	url: "https://slideshub.netlify.app",
	site_name: "Slideshub",
	author: "Slideshub",
	// twitter_username: '@slideshub',
	image: "/images/icon.png",
	favicon: "/images/favicon.png",
	og: {
		title: "Slideshub",
		type: "website",
		url: "https://slideshub.netlify.app/",
		description: "Generated by create next app",
		image: "/public/thumbnail.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
				<body className={inter.className}>
					<main className=" min-h-screen">
						{children}
						<Toaster />
					</main>
					
					<Analytics />
				</body>
			</ThemeProvider>
		</html>
	);
}
