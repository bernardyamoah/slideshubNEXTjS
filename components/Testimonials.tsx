"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export default function Testimonials() {


	return (
		<>
			<section className=" py-10   mx-auto w-full">
				<div className="w-full">
					<p className="text-lg font-medium text-emerald-500 text-center">Testimonials</p>

					<h1 className="mt-2 text-3xl font-semibold capitalize text-gray-800 dark:text-white lg:text-4xl text-center">
						What users are saying
					</h1>

					<main className="relative z-[2] mt-8 w-full md:flex md:items-center xl:mt-12 mx-auto">
						<div className="absolute -z-10 w-full rounded-2xl  md:h-72"></div>
						<div className=" mySwiper w-full rounded-2xl   md:flex md:items-center md:justify-evenly md:bg-none md:p-0 md:shadow-none lg:px-12 ">
							<div className="">


								{/* First slide*/}
								<aside className=" ">
									<div className="md:flex  md:space-x-10 ">
										<div className="w-1/2 ">
											<Image
												className=" h-24 w-24 rounded-full object-cover shadow-md md:!h-[22rem] md:!w-full md:rounded-2xl  lg:w-[26rem]"
												src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
												alt="client photo"
												width={500} height={500}
											/>
										</div>

										<blockquote className="md:border rounded-lg bg-card mt-3 p-4 md:max-w-sm self-start">
											
											<CardTitle className="mb-2 text-2xl" >
												Vicentia Agyei
											</CardTitle>
											<Badge variant='outline' className="rounded-3xl text-emerald-500 ">
												BSc Materials Engineering, KNUST
											</Badge>
										

											<figcaption className="mt-3 text-xs md:text-sm">

												“Lorem ipsum dolor sit amet, consectetur adipisicing
												elit. Tempore quibusdam ducimus libero ad tempora
												doloribus expedita laborum saepe voluptas perferendis
												delectus assumenda”.
											</figcaption>
										</blockquote>
									</div>
								</aside>
							</div>
						</div>

					</main>
				</div>
			</section>
		</>
	);
};
