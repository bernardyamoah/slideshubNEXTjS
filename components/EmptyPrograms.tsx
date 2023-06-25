'use client'
import Link from "next/link";
import Image from "next/image";
import errorImage from '@/public/error.svg'


export default function EmptyProgram() {
	const content = (
		<>

			<div className="grid h-screen px-4 bg-white dark:bg-inherit place-content-center">
				<div className="text-center">

					<Image src={errorImage} width={300} height={300} className='object-center object-cover w-full' alt='Not found' />
					<div className="text-center">
						<h1
							className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-emerald-400"
						>
							Oops! Nothing here yet.
						</h1>

						<p className="text-gray-600 mb-6">Campuses have not added here yet.</p>
						<button className="bg-emerald-500 hover:bg-emerald-600 border rounded-lg text-white font-semibold  py-2 px-4">
							<Link href={'/'}>
								Go Home
							</Link>
						</button>

					</div>

				</div>
			</div>

		</>
	);
	return content;
}