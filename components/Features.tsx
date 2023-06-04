"use client"

import React from "react";


const Features = () => {
  
	return (
		<>
		<section className="pattern flex items-center justify-center py-10">
		<div className="max-w-screen py-10">
			<div className="mt-32 space-y-10">
				<div className="ani-card writeup mx-auto mb-20">
					<h2>Here's what what you'll love about Slideshub</h2>
				</div>
				{/* <!-- Feature cards --> */}
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{/* <!-- free Download--> */}
					<aside className="ani-card aside_card group transition-all">
						<div className="aside_icon bg-emerald-500 group-hover:scale-110">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="white"
								viewBox="0 0 512 512"
							>
								<path
									d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zM432 456c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24z"
								/>
							</svg>
						</div>

						<h2 className="feature_heading">Free and Unlimited download</h2>

						<p className="feature_description">
							You can search through our database of slides and books,
							download them for free to read offline.
						</p>
					</aside>
{/* 
					<!-- Save time --> */}
					<aside className="ani-card aside_card group transition-all">
						<div className="aside_icon bg-emerald-500 group-hover:scale-110">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="white"
								viewBox="0 0 512 512"
							>
								<path
									d="M256 512C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256s-114.6 256-256 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
								/>
							</svg>
						</div>
						<h2 className="feature_heading">Quality content you trust</h2>

						<p className="feature_description">
							All files are checked for viruses before they are uploaded to
							the website, so you can be sure that you are downloading safe
							content.
						</p>
					</aside>
					{/* <!-- Weekly Update --> */}
					<aside className="ani-card aside_card group transition-all">
						<div className="aside_icon bg-emerald-500 group-hover:scale-110">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="white"
								viewBox="0 0 512 512"
							>
								<path
									d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"
								/>
							</svg>
						</div>
						<h2 className="feature_heading">Weekly Update</h2>

						<p className="feature_description">
							Books and lecture slides by lecturers will be uploaded here
							weekly.
						</p>
					</aside>

					{/* <!-- organized files --> */}
					<aside className="ani-card aside_card group transition-all">
						<div className="aside_icon bg-emerald-500 group-hover:scale-110">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="white"
								viewBox="0 0 576 512"
							>
								
								<path
									d="M88.7 223.8L0 375.8V96C0 60.7 28.7 32 64 32H181.5c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7H416c35.3 0 64 28.7 64 64v32H144c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224H544c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480H32c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z"
								/>
							</svg>
						</div>
						<h2 className="feature_heading">Organized Files</h2>

						<p className="feature_description">
							All the needed books and lecture slides have been collated
							together, into programs and years of study.
						</p>
					</aside>
				
					<aside className="ani-card aside_card group transition-all">
						<div className="aside_icon bg-emerald-500 group-hover:scale-110">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="white"
								viewBox="0 0 640 512"
							>
								<path
									d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM625 177L497 305c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L591 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
								/>
							</svg>
						</div>

						<h2 className="feature_heading">User friendly Interface</h2>

						<p className="feature_description">
							With just a few clicks you can find what you need on Slideshub
							- download it without hassle.
						</p>
					</aside>
				</div>
			</div>
		</div>
	</section>

		</>
	);
    }


export default Features;
