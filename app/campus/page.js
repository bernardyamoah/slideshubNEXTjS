"use client";
import { useState, useEffect } from 'react';
import {getCampus} from '@/lib/getCampus'
import Suspense from 'react'

import Link from 'next/link'
export default function Campus() {
	const [campuses, setCampuses] = useState([]);
	useEffect(() => {
		async function fetchCampuses() {
		  try {
			const response = await getCampus();
			setCampuses(response);
		  } catch (error) {
			console.error('Error fetching campuses:', error);
		  }
		}
	
		fetchCampuses();
	  }, []);
	
	return (
		<>
			<main className="card_container">
			<h1 className="text-2xl font-bold mb-4">Campuses</h1>
				<section
					className="container relative mx-auto flex flex-col items-center pb-10"
					id=""
					> 
					<div id="w-full max-w-screen-2xl">
					<ul className="lg:px-10 mx-auto max-w-6xl sm:w-[100%] relative mb-60 sm:grid gap-8   sm:grid-cols-2 md:pt-12 lg:grid-cols-3 lg:gap-8  p-1">
					{campuses.map((campus) => (
							<li key={campus.$id} className="mb-10 sm:mb-0 relative block shadow-xl backdrop-blur-md transition-all hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-emerald-500/10 overflow-hidden
        duration-300 ease-in-out  border-4 border-gray-200  hover:shadow-xl cursor-pointer   dark:border-gray-600 rounded-3xl  bg-white dark:bg-transparent">
								
								<Link className='flex flex-col overflow-hidden transition  group' href={`campus/${campus.id}`}>
								
								<div className="relative overflow-hidden rounded-t-3xl pt-[50%]  px-2">
							
								<img
								className='absolute top-0 left-0 h-full w-full rounded-t-3xl object-cover transition-transform duration-500 ease-in-out 
								group-hover:scale-105'
								src={campus.image}
								alt={campus.name}
								
							  />
								</div>
								<div className="p-4 md:p-5 flex items-center justify-between  overflow-hidden
								">
								<h3 className="lg:text-lg font-bold  text-base  text-gray-800 dark:text-white capitalize font-title text-left w-5/6 align-middle
								">{campus.name}</h3>
								<p className="text-gray-500">{campus.location}</p>

								</div>
							
								</Link>
							</li>
							))}

							
						</ul>
	</div>
				</section>
			</main>
		</>
	);
}
