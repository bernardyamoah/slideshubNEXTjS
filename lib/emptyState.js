'use client'



export default function EmptyState() {
	const content = (
		<>
			<section className="bg-white dark:bg-gray-900">
				<div className="container px-6 py-8 mx-auto ">
					{/* an Emptystate page */}
					
					<div className="min-h-screen flex items-center justify-center bg-gray-100">
        				<div className="text-center">
							<div className="w-48 h-48 bg-gray-300 rounded-full mx-auto flex items-center justify-center mb-6">
								
							</div>
							<h1 className="text-3xl font-semibold text-gray-900 mb-2">Oops! Nothing here yet.</h1>
							<p className="text-gray-600 mb-6">This page is currently empty.</p>
							<button className="bg-emerald-500 hover:bg-emerald-600 border rounded-lg text-white font-semibold  py-2 px-4 rounded">
								Go Home
							</button>
       				 </div>
   					</div>
                    
				</div>
			</section>
		</>
	);
	return content;
}


