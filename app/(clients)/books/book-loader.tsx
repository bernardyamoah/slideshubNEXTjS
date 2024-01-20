import { Icons } from "@/components/shared/icons";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function BookLoader() {
	return (
		<Card className=" duration-300 dark:border-zinc-600 hover:bg-neutral-100/90 dark:hover:bg-neutral-900/90 ">
			<CardHeader className=" p-0 overflow-hidden rounded-xl">
				<AspectRatio ratio={16 / 9}>
					<div
						aria-label="Placeholder"
						role="img"
						aria-roledescription="placeholder"
						className="flex h-full w-full items-center justify-center rounded-lg bg-secondary"
					>
						<Icons.placeholder
							className="h-9 w-9 text-muted-foreground animate-pulse duration-1000"
							aria-hidden="true"
						/>
					</div>
				</AspectRatio>
			</CardHeader>
			<CardContent className="grid   py-2 pb-4">
				<Skeleton className="w-16 h-3"></Skeleton>
				<div className="flex  gap-2 flex-col mt-2">
					<Skeleton className="w-full h-3"></Skeleton>
					<span className="flex gap-1">
						<Skeleton className="w-8 h-5 " />
						<Skeleton className="w-5 h-5 " />
					</span>
				</div>
			</CardContent>
		</Card>
	);
}
