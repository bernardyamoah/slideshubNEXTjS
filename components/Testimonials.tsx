"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export default function Testimonials() {


	return (
		<>
			<section className="bg-pattern py-10   mx-auto w-full">
				<div className="w-full">
					<p className="text-sm md:text-base font-medium text-emerald-500 md:text-center">Testimonials</p>

					<h1 className="mt-2 text-3xl font-semibold capitalize text-gray-800 dark:text-white lg:text-4xl md:text-center">
						What users are saying
					</h1>

					<main className="relative z-[2] mt-8 w-full md:flex md:items-center xl:mt-12 mx-auto">
						<div className="absolute -z-10 w-full rounded-2xl  md:h-72"></div>
						<div className=" mySwiper w-full rounded-2xl  p-6 shadow-lg md:flex md:items-center md:justify-evenly md:bg-none md:p-0 md:shadow-none lg:px-12 ">
							<div  >


								{/* First slide*/}
								<aside>
									<div className="md:p-6 md:flex md:items-center md:space-x-10">
										<div className="md:w-1/2">
											<Image
												className="aspect-square h-2/6 w-2/6 rounded-full object-cover shadow-md md:!h-[32rem] md:!w-full md:rounded-2xl lg:h-[36rem] lg:w-[26rem]"
												src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
												alt="client photo"
												width={300} height={300}
											/>
										</div>

										<Card className="mt-3 p-4">
											<CardDescription>
											<CardTitle className="mb-2 text-2xl" >
												Bernard
											</CardTitle>
											<Badge variant='secondary' className=" ">
												BSc Materials Engineering, KNUST
											</Badge>
											</CardDescription>

											<div className="mt-2">

												“Lorem ipsum dolor sit amet, consectetur adipisicing
												elit. Tempore quibusdam ducimus libero ad tempora
												doloribus expedita laborum saepe voluptas perferendis
												delectus assumenda”.
											</div>
										</Card>
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
