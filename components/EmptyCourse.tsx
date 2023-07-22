'use client'

import Image from "next/image";
import { Button } from "./ui/button";

import { useRouter } from "next/navigation";
import noCourse from '@/public/undraw_empty_re_opql.svg'

import { ChevronsLeftIcon } from "lucide-react";



export default function EmptyCourse() {
	const router = useRouter();
	return (


		<div className="dark:bg-inherit w-full">
			<div className="container  mx-auto grid place-content-center h-screen">
				{/* an Emptystate page */}
				<Image className="object-cover object-center" width={400} height={400} src={noCourse} alt="empty books" />
				<div className="flex items-center justify-center mt-16">
					<div className="text-center">
						<h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">Oops! There are no courses here!</h1>

						<Button

							onClick={() => router.back()}
						>
							<ChevronsLeftIcon className="w-4 h-4 mr-2" aria-hidden="true" />
							Go Back
						</Button>
					</div>
				</div>
			</div>
		</div>
	)

}