'use client'
import Image from 'next/image'
import heroimage1 from '/assets/img/hero-image-2.png'
import heroimage2 from '/assets/img/details-1.png'
import Link from 'next/link'

const Hero = () => {
    return (
        <>
        <section className=" mt-20 flex items-center  justify-center py-10">
				<div className="mx-auto max-w-7xl text-center">
					<h1 className="ani-card font-bold dark:text-white md:text-5xl xl:text-6xl">
						What is Slideshub ?
					</h1>
					<p
						className="ani-card mx-auto mt-5 mb-10 max-w-3xl text-lg font-medium text-slate-600 dark:text-slate-400 lg:text-2xl"
					>
						Slideshub is an online solution to downloading and printing lecture
						slides and books. You get easy-to-use and free access to a variety
						of high-quality content in just a few seconds
					</p>
					<Image
							className="skew w-full h-full object-cover object-center rounded-3xl"
							src={heroimage1}
							alt="Slideshub image"
							 
							width={300} height={300}
						/>
					<div className="text-center">
						
						<Link
							data-splitbee-event="Get Started"
							href="/campus"
							className="hero_btn"
						>
							Get Started
						</Link>
					</div>
				</div>
		</section>

			<div className=" relative max-w-7xl mx-auto mt-20 px-5 pb-20 ">
				<div className="relative w-full">
					<div className="w-full text-black dark:text-white">
						<div
							className="mx-auto flex flex-col pt-10 md:grid md:grid-cols-2 md:gap-x-10 md:pt-20 lg:gap-x-20"
						>
							{/* <!-- Hero Text --> */}
							<div
								className="ani-card order-1 mx-auto mt-10 w-full text-center md:text-left"
							>
								<div className="text-center md:text-left">
									<h1
										className="text-4xl md:text-5xl  font-bold  mx-auto "
									>
										Your Ultimate Resource for Educational Materials
									</h1>
									<p className="mt-4 text-slate-600 sm:text-base md:text-lg dark:text-slate-400 lg:text-2xl">
										SlidesHub is an education website that provides students
										with a wide range of high-quality study materials, including
										slides, presentations, e-books, and more.
									</p>
								</div>

								<div>
									<Link
										data-splitbee-event="Get Started"
										href="/campus"
										className="hero_btn"
									>
										Get Started
									</Link>
								</div>
							</div>

							{/* <!-- Hero Image --> */}
							<div className="ani-card order-0 w-full md:order-1">
								<Image
									className="w-full object-contain object-center sm:scale-105"
									src={heroimage2}
									alt="Online Learning"
									width={300}
									height={300}
								/>
							</div>
						</div>
					</div>
					{/* <!-- End of Carousel Images --> */}
				</div>
			</div>
        </>
    )
}

export default Hero

