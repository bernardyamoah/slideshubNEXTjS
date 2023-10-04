'use client'

import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Hero from "@/components/Hero";

export default function Home() {
	return (
		<>


				

			<main >
			<div className="bg-pattern opacity-10 dark:opacity-40 w-full h-full absolute bg-repeat bg-center  -z-10"></div>
				{/* <-- Hero section --> */}
				<Hero />

				{/* <-- Features Section --> */}
				<Features />

				{/*Testimonial Section */}
				<Testimonials />
			</main>
		</>
	);
}
