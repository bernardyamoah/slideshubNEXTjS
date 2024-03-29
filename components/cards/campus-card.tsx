"use client";
import { formatUserTime } from "@/lib/functions";

import Link from "next/link";

import { Locate } from "lucide-react";
import { Card, CardTitle } from "../ui/card";
import { useCampuses } from "@/hooks/useCampuses";

interface Campus {
	$id: string;
	name: string;
	location: string;
	$createdAt: string;
}

const CampusCard = () => {
	const campuses: Campus[] = useCampuses();
	return (
		<>
			{campuses.map((campus) => (
				<Card
					key={campus.$id}
					className="relative h-full overflow-hidden duration-500 border rounded-xl dark:bg-zinc-900/70 group md:gap-8 hover:border-zinc-400 dark:hover:border-zinc-300 dark:border-zinc-800"
				>
					<div className="pointer-events-none">
						<div className="absolute inset-0 z-0  transition duration-1000 [mask-image:linear-gradient(black,transparent)]"></div>
						<div className="absolute inset-0 z-10 transition duration-1000 opacity-100 bg-gradient-to-br via-zinc-100/10 group-hover:opacity-50 card_style"></div>
						<div className="absolute inset-0 z-10 transition duration-1000 opacity-0 mix-blend-overlay group-hover:opacity-100 card_style"></div>
					</div>
					<Link href={`/campus/${campus.$id}`}>
						<article className="p-4 md:p-8">
							<div className="flex items-center justify-between gap-2">
								<span className="text-xs duration-1000 text-zinc-500   ">
									<time dateTime={campus.$createdAt}>
										{formatUserTime(campus.$createdAt)}
									</time>
								</span>
								<span className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
									<Locate className="w-5 h-5 dark:stroke" />
									{campus.location}
								</span>
							</div>
							<CardTitle className="bold-32 mt-4 font-medium capitalize duration-300  group-hover:text-zinc-800 dark:text-zinc-200 dark:group-hover:text-white font-display">
								{campus.name.toLocaleLowerCase()}
							</CardTitle>
						</article>
					</Link>
				</Card>
			))}
		</>
	);
};
export default CampusCard;
