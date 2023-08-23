'use client'
import Head from "next/head";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Hero from "@/components/Hero";

export default function Home() {
	return (
		<>

			<Head>
				<meta
					property="twitter:image"
					content="https://slideshub.netlify.app/assets/favicon_io/thumbnail.jpg"
				/>

				<meta name="description" content="" />
				{/* <!--Your description--> */}
				<meta name="author" content="Bernard Yamoah" />

				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="twitter:title" content="Your Page Title" />
				<meta name="twitter:description" content="Description of your page" />

				<title>SlidesHub</title>
			</Head>

			<main className=" max-w-6xl mx-auto">
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
