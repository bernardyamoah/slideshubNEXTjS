import Image from "next/image";
import Link from "next/link";

export function EmptySlides() {
	const content = (
		<>
			<section className="bg-white dark:bg-gray-900">
				<div className="  ">
					{/* an Emptystate page */}
					<Image src="/public/error.svg" width={300} height={300} alt="" className="object-cover object-center" />
					<div className="flex items-center justify-center bg-gray-100">
						<div className="text-center">
							<h1 className="text-3xl font-semibold text-gray-900 mb-2">Oops! Nothing here yet.</h1>
							<p className="text-gray-600 mb-6">There are no slides added here yet.</p>
							<button className="bg-emerald-500 hover:bg-emerald-600 border rounded-lg text-white font-semibold  py-2 px-4">
								<Link href={'/'}>

									Go Home
								</Link>
							</button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
	return content;
}

