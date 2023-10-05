'use client'

import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Hero from "@/components/Hero";

export default function Home() {
	return (
		<>


				

			<main >
			
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
