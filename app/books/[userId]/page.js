import getUserPost from "@/lib/getData";
import getUser from "@/lib/getUserPost";
import { Suspense } from "react";
import Loading from "../loading";
import UserPosts from "./components/UserPosts";

export default async function UserPage({ params: { userId } }) {
	const userData = await getUser(userId);
	const userPostsData = getUserPost(userId);

	return (
		<>
			<section className="bg-white dark:bg-gray-900">
				<div className="max-w-6xl px-6 py-10 mx-auto">
					<p className="text-xl font-medium text-blue-500 ">Testimonials</p>

					<h1 className="mt-2 text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
						What clients saying
					</h1>
				</div>
				<Suspense fallback={<Loading />}>
					<UserPosts promise={userPostsData} />
				</Suspense>
			</section>
		</>
	);
}
