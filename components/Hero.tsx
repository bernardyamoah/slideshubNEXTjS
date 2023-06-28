'use client'
import Image from 'next/image'
import heroimage1 from '/assets/img/hero-image-2.png'
import heroimage2 from '/assets/img/details-1.png'
import Link from 'next/link'

const Hero = () => {
	return (
		<>
			<section className="  flex items-center  justify-center py-10">
				<div className="mx-auto max-w-7xl text-center space-y-4">
					<h1 className="  sm:text-3xl md:text-4xl">
						What is Slideshub ?
					</h1>
					<p
						className="ani-card mx-auto mt-5 mb-10 max-w-5xl text-sm md:text-base font-medium text-gray-600  lg:text-2xl dark:text-gray-400"
					>
						Slideshub is an online solution to downloading and printing lecture
						slides and books. You get easy-to-use and free access to a variety
						of high-quality content in just a few seconds
					</p>
					<Image
						className=" sm:mx-auto w-full  h-full object-cover object-center "
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

