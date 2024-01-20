import { formatUserTime } from "@/lib/functions";

import Link from "next/link";

import { Calendar, Clock2 } from "lucide-react";
import { Card, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

export default function CourseCard({ course, campusId }) {
	let {
		name,
		courseCode,
		credit,
		programId,
		semester,
		$id: courseId,
		$createdAt,
	} = course;

	return (
		<>
			<Card className="relative h-full overflow-hidden duration-500 border rounded-xl dark:bg-zinc-900/70 group md:gap-8 hover:border-zinc-400 dark:hover:border-zinc-600 dark:border-zinc-800">
				<div className="pointer-events-none">
					<div className="absolute inset-0 z-0  transition duration-1000 [mask-image:linear-gradient(black,transparent)]"></div>
					<div className="absolute inset-0 z-10 transition duration-1000 opacity-100 bg-gradient-to-br via-zinc-100/10 group-hover:opacity-50 card_style"></div>
					<div className="absolute inset-0 z-10 transition duration-1000 opacity-0 mix-blend-overlay group-hover:opacity-100 card_style"></div>
				</div>
				<Link href={`/campus/${campusId}/${programId}/${courseId}`}>
					<article className="p-4 md:p-8">
						<div className="flex items-center justify-between gap-2">
							<span className="text-xs duration-1000 text-zinc-500 dark:text-zinc-200 dark:group-hover:text-white dark:group-hover:border-zinc-200 ">
								<Badge className="flex items-center gap-1 text-xs text-white uppercase duration-700 rounded-2xl bg-emerald-500">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-4 h-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
										/>
									</svg>
									{courseCode}
								</Badge>
							</span>

							<span className="flex items-center gap-2 text-sm capitalize duration-1000  text-zinc-400 dark:text-zinc-500 dark:group-hover:text-zinc-300 ">
								<Calendar className="w-4 h-4" />
								{semester}
							</span>
						</div>
						<CardTitle className="z-20 mt-4 text-xl font-medium capitalize duration-1000 lg:text-2xl group-hover:text-zinc-800 dark:text-zinc-200 dark:group-hover:text-white font-display">
							{name.toLocaleLowerCase()}
						</CardTitle>
						<div className="z-20 flex items-center gap-4 mt-2 ">
							<span className="flex items-center gap-1 text-xs text-zinc-500">
								<Clock2 className="w-4 h-4 dark:stroke" />
								{credit} credit hours
							</span>

							<span className="justify-end flex-1 text-xs text-right duration-700 dark:text-zinc-500 dark:group-hover:text-zinc-400 text-zinc-400">
								<time dateTime={$createdAt}>{formatUserTime($createdAt)}</time>
							</span>
						</div>
					</article>
				</Link>
			</Card>
		</>
	);
}
