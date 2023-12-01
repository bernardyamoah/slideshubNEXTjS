"use client";
// import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'
import Image from "next/image";
import { Card, CardTitle } from "./ui/card";

import { TestimonialsData } from '@/constants';
export default function Testimonials() {


	return (
		<>


			<section className=" pb-10 mx-auto w-full ">
				<div className="w-full">
					<p className="text-lg font-medium text-emerald-500 text-center">Testimonials</p>

					<h4 className="mt-2 bold-40 lg:bold-54 text-center capitalize text-gray-950 dark:text-white ">
						What users are saying
					</h4>

					<main className=" relative z-[2] mt-8 w-full md:flex md:items-center xl:mt-12 mx-auto">
						<div className="absolute -z-10 w-full   md:h-72"></div>
						<div className=" max-w-xl mx-auto ">


							<Swiper
								slidesPerView={1}
								spaceBetween={100}
								centeredSlides={true}
								loop={true}
								autoplay={{
									delay: 3000,

									disableOnInteraction: false,
								}}

								modules={[Autoplay]}

							>
								{
									TestimonialsData.map(({ image, name, testimonial }) => <SwiperSlide className=' mx-auto   w-full'><Card className="gap-5 p-6 w-fit mx-auto  flex items-center justify-center dark:border-zinc-800 dark:bg-opacity-0 dark:bg-zinc-950/50 rounded-3xl">

										<Image
											className=" aspect-square h-full  object-cover rounded-full shadow-md ring-4 p-0.5 ring-emerald-500  relative  w-24  "
											src={image}
											alt={name}
											height={700}
											width={700}
										/>


										<div className="  ">
											<CardTitle className="">{name}</CardTitle>
											<small className="mt-4 block italic text-zinc-500 dark:text-zinc-400">{testimonial}</small>
										</div>
									</Card>
									</SwiperSlide>
									)
								}



							</Swiper>



						</div>

					</main >
				</div >
			</section >
		</>
	);
};
