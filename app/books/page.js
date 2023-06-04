
import { Suspense } from "react";
import Loading from "../contact/loading";
import Link from "next/link";

async function Page() {
	
	const content = (
		<>
			<section className="bg-white dark:bg-gray-900">
				<div className="container px-6 py-8 mx-auto">
					<h2 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
						Our Team
					</h2>

					<div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						<Suspense fallback={<Loading />}>
							
						</Suspense>
					</div>
				</div>
			</section>
		</>
	);

	return content;
}

export default Page;
