"use client"

import { title } from "process";
import React from "react";


const Features = () => {
  const features=[
	{
		title:'Quality content you trust',
		icon:(<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="white"
			viewBox="0 0 512 512"
		>
			<path
				d="M256 512C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256s-114.6 256-256 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
			/>
		</svg>),
		description:'All files are checked for viruses before they are uploaded to the website so you can be sure that you are downloading safe content'

	},

	{
		title:'Weekly Update',
		icon:(<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="white"
			viewBox="0 0 512 512"
		>
			<path
				d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"
			/>
		</svg>),
		description:'Books and lecture slides by lecturers will be uploaded here weekly.'

	},
	{
		title:'Organized Files',
		icon:(<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="white"
			viewBox="0 0 640 512"
		>
			<path
				d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM625 177L497 305c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L591 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
			/>
		</svg>),
		description:'All the needed books and lecture slides have been collated together, into programs and years of study.'

	},
	{
		title:'User friendly Interface',
		icon:(	<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="white"
			viewBox="0 0 640 512"
		>
			<path
				d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM625 177L497 305c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L591 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
			/>
		</svg>),
		description:'With just a few clicks you can find what you need on Slideshub - download it without hassle.'

	},
]
	return (
		<>
		<section className="pattern flex items-center justify-center">
		<div className="max-w-7xl">
			<div className=" space-y-10">
				<div className="sm:text-3xl md:text-4xl  mx-auto mb-20 text-center">
					<h1 >Here&apos;s what what you&apos;ll love about Slideshub</h1>
				</div>
				
				{/* <!-- Feature cards --> */}
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2  mx-auto">
				 
					
					{features.map((feature)=>(
	<aside key={feature.title} className="ani-card aside_card group transition-all">
	<div className="aside_icon bg-emerald-500 group-hover:scale-110">
{feature.icon}
	</div>
	<h2 className="feature_heading">{feature.title}</h2>

	<p className="feature_description">
		{feature.description}
	</p>
</aside>
					))}
				
				
				</div>
			</div>
		</div>
	</section>

		</>
	);
    }


export default Features;
