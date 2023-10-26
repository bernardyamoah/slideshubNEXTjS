'use client'
export default function LoadingSkeleton() {
	return (
		<>
			<div className="container flex flex-col justify-center h-screen max-w-2xl ">
				<div className="flex animate-pulse ">
					<div className="flex-shrink-0">
						<span className="block w-12 h-12 bg-gray-200 rounded-full dark:bg-gray-700"></span>
					</div>

					<div className="w-full mt-2 ml-4">
					 <h3
							className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-[40%]"

						></h3>

						<ul className="mt-5 space-y-3">
							<li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
							<li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
							<li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
							<li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
