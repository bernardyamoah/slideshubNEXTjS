"use client";

export default function Testimonials() {

	
	return (
		<>
			<section className="pattern bg-white py-10 dark:bg-slate-900/5">
				<div className="mx-auto max-w-6xl py-10">
					<p className="text-xl font-medium text-emerald-500">Testimonials</p>

					<h1 className="mt-2 text-3xl font-semibold capitalize text-gray-800 dark:text-white lg:text-4xl">
						What users are saying
					</h1>

					<main className="relative z-20 mt-8 w-full md:flex md:items-center xl:mt-12">
						<div className="absolute -z-10 w-full rounded-2xl bg-emerald-600 md:h-96"></div>
						<div className=" mySwiper w-full rounded-2xl bg-gradient-to-bl from-red-500 via-red-600 to-red-700 p-6 shadow-lg md:flex md:items-center md:justify-evenly md:bg-none md:p-0 md:shadow-none lg:px-12">
						<section  >
							
								<aside>
									<div className="p-6 md:flex md:items-center md:space-x-10">
										<div className="md:w-1/2">
											<img
												className="aspect-square h-2/6 w-2/6 rounded-full object-cover shadow-md md:!h-[32rem] md:!w-full md:rounded-2xl lg:h-[36rem] lg:w-[26rem]"
												src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
												alt="client photo"
											/>
										</div>

										<div className="mt-2 md:w-1/2">
											<p className="font-title text-xl font-bold tracking-wide text-white lg:text-3xl">
												Bernard
											</p>
											<span className="mt-2 inline-block rounded-md bg-red-800 px-2 py-1 text-xs text-white shadow-xl backdrop-blur-lg md:bg-emerald-800">
												BSc Materials Engineering, KNUST
											</span>

											<p className="font-body mt-4 text-sm leading-relaxed text-white sm:text-base md:text-lg lg:text-xl">
												“Lorem ipsum dolor sit amet, consectetur adipisicing
												elit. Tempore quibusdam ducimus libero ad tempora
												doloribus expedita laborum saepe voluptas perferendis
												delectus assumenda”.
											</p>
										</div>
									</div>
								</aside>

							{/* Second slide*/ }
								<aside>
									<div className="p-6 md:flex md:items-center md:space-x-10">
										<div className="md:w-1/2">
											<img
												className="aspect-square h-2/6 w-2/6 rounded-full object-cover shadow-md md:!h-[32rem] md:!w-full md:rounded-2xl lg:h-[36rem] lg:w-[26rem]"
												src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
												alt="client photo"
											/>
										</div>

										<div className="mt-2 md:w-1/2">
											<p className="font-title text-xl font-bold tracking-wide text-white lg:text-3xl">
												Bernard
											</p>
											<span className="mt-2 inline-block rounded-md bg-red-800 px-2 py-1 text-xs text-white shadow-xl backdrop-blur-lg md:bg-emerald-800">
												BSc Materials Engineering, KNUST
											</span>

											<p className="font-body mt-4 text-sm leading-relaxed text-white sm:text-base md:text-lg lg:text-xl">
												“Lorem ipsum dolor sit amet, consectetur adipisicing
												elit. Tempore quibusdam ducimus libero ad tempora
												doloribus expedita laborum saepe voluptas perferendis
												delectus assumenda”.
											</p>
										</div>
									</div>
								</aside>
								</section>
								</div>
							
					</main>
				</div>
			</section>
		</>
	);
};
