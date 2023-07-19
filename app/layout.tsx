import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// import { Inter } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from '@tanstack/react-query'
// const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";
export const metadata = {
	title: "Slideshub",
	description: "Download your slides from Slideshub and more!",
	charset: "utf-8",
	type: "website",
	url: "https://slideshub.vercel.app",
	site_name: "Slideshub",
	author: "Slideshub",
	// twitter_username: '@slideshub',
	
	og: {
		title: "Slideshub",
		type: "website",
		url: "https://slideshub.vercel.app",
		description: "Download your slides from Slideshub and more!",
		site_name: "Slideshub",
		images: [
			{
				url: "https://slideshub.netlify.app/assets/favicon_io/thumbnail.jpg",
				width: 1200,
				height: 630,
				alt: "Slideshub",
			},
		],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const queryClient = new QueryClient()
	return (
		<html lang="en" suppressHydrationWarning>
			<body >
				<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
					<main className="">
						<QueryClientProvider client={queryClient}>
							{children}
							<Toaster />
						</QueryClientProvider>
					</main>
					<Analytics />
				</ThemeProvider>

			</body>
		</html>
	);
}
