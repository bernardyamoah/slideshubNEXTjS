'use client'
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Hero from "@/components/Hero";

export default function Home() {
	return (
		<>
			<Navbar />
			<Head>
				<meta
					property="twitter:image"
					content="https://slideshub.netlify.app/assets/favicon_io/thumbnail.jpg"
				/>



				<title>SlidesHub</title>
			</Head>

			<main className="dark:backdrop-blur-sm">
				{/* <!-- Hero section --> */}
				<Hero />

				{/* <!-- Features Section --> */}
				<Features />

				{/*Testimonial Section */}
				<Testimonials />
			</main>
		</>
	);
}
