'use client'
import Image from 'next/image'
import heroimage1 from '/assets/hero-image-2.png'
import heroimage2 from '/assets/details-1.png'
import Link from 'next/link'

const Hero = () => {
	return (
		<>
			<section className="flex items-center justify-center py-10 ">
				<div className="mx-auto space-y-4 text-center max-w-7xl">
					<h1 className=" sm:text-3xl md:text-4xl">
						What is Slideshub ?
					</h1>
					<p
						className="max-w-5xl mx-auto mt-5 mb-10 text-sm font-medium text-gray-600 ani-card md:text-base lg:text-2xl dark:text-gray-400"
					>
						Slideshub is an online solution to downloading and printing lecture
						slides and books. You get easy-to-use and free access to a variety
						of high-quality content in just a few seconds
					</p>
					<Image
						className="object-cover object-center w-full h-full max-w-md sm:mx-auto"
						src={heroimage2}
						alt="Online Learning"
						width={300}
						height={300}
					/>

				</div>
			</section>


		</>
	)
}

export default Hero

