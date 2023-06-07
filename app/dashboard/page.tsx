'use client'
import SelectProgram from "@/components/SelectCampus";
import {
  Card,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from 'next/link'
export default function Dashboard() {
	let Buttons = [
		{
			name: "Add course",
			link: "/dashboard/AddCourse",
		},
		{
			name: "Add Campus",
			link: "/dashboard/AddCampus",
		},
		{
			name: "Add Program",
			link: "/dashboard/AddProgram",
		},
		
		{
			name: "Add file",
			link: "add-file",
		},
	
	];

	return (
		<>
			<h1 className='text-5xl my-5 text-center font-bold '>Dashboard</h1>
			<div className=' flex items-center mt-10'>
<SelectProgram/>
			<div className='max-w-2xl grid grid-cols-2 gap-8 container '>
			{Buttons.map((button, index) => (
						<Link href={button.link} key={index}>
						<Card>
			  <CardHeader>
				<CardTitle>{button.name}</CardTitle>
				
			  </CardHeader>
			  
			  
			</Card>
			
				</Link>
						))}
			
			
			</div>

			
			</div>
			
		</>
	);
}
