import React from "react";

export default async function UserPosts({ promise }) {
	const posts = await promise;
	const content = posts.map((post) => {
		return (
			<main
				key={post.id}
				className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12"
			>
				<div className="absolute w-full bg-blue-600 -z-10 md:h-96 rounded-2xl"></div>

				<div className="w-full p-6 bg-blue-600 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
					<img
						className="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl"
						src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
						alt="client photo"
					/>

					<div className="mt-2 md:mx-6">
						<div>
							<p className="text-xl font-medium tracking-tight text-white"></p>
							<p className="text-blue-200 ">Marketing Manager at Stech</p>
						</div>

						<p className="mt-4 text-lg leading-relaxed text-white md:text-xl line-clamp-3">
							{" "}
							{post.body}
						</p>
					</div>
				</div>
			</main>
		);
	});
	return content;
}
