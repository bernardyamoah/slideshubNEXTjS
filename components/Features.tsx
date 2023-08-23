
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

import { StackIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Clock, UserIcon } from "lucide-react";


const Features = () => {
	const features = [
		{
			title: 'Reliable',
			icon: (<Clock className='w-6 h-6' />),
			description: 'Uploaded files are virus-checked, ensuring safe downloads.'

		},

		{
			title: 'Brief',
			icon: (<UpdateIcon className='w-6 h-6' />),
			description: 'Books and lecture slides by lecturers will be uploaded here weekly.'

		},
		{
			title: 'Structured',
			icon: (<StackIcon className='w-6 h-6' />),
			description: 'Essential books and slides are organized by program and year of study.'

		},
		{
			title: 'Intuitive',
			icon: (<UserIcon className='w-6 h-6' />),
			description: 'Easily locate and download what you need hassle-free from Slideshub.'

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
						<div className="flex flex-wrap gap-8 justify-center lg:justify-start  mx-auto p-4">


							{features.map((feature) => (
								<Card key={feature.title} className="backdrop-blur-md bg-opacity-70  max-w-xs w-full" >


									<CardHeader className="space-y-4">
										<CardTitle className="flex items-center gap-2">
											<span >{feature.icon}</span>
											<span>{feature.title}</span>
										</CardTitle>
										<CardDescription>
											{feature.description}
										</CardDescription>
									</CardHeader>




								</Card>
							))}


						</div>
					</div>
				</div>
			</section>

		</>
	);
}


export default Features;
