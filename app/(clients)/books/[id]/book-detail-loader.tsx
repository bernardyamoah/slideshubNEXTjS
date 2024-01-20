import { Icons } from "@/components/shared/icons";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import React from "react";

export default function BookDetailLoader() {
	return (
		<section className="flex justify-center w-full ">
			<div className="grid grid-cols-1 md:grid-cols-3 2xl:max-w-7xl grid-rows-auto gap-5 md:border rounded-2xl dark:border-zinc-700 lg:p-7">
				<div
					aria-label="Placeholder"
					role="img"
					aria-roledescription="placeholder"
					className="flex h-full w-full items-center justify-center bg-secondary"
				>
					<Icons.placeholder
						className="h-9 w-9 text-muted-foreground"
						aria-hidden="true"
					/>
				</div>
				<div className="flex w-full flex-col gap-8   col-span-2 bg-card/70">
					<div className="flex flex-col gap-6">
						<div className="space-y-4">
							<Skeleton className="w-96 h-3"></Skeleton>

							<div className=" flex items-center flex-wrap gap-3">
								<Skeleton className="w-20 h-3"></Skeleton>
							</div>
						</div>
						<Separator />

						<div className="flex gap-6 flex-wrap">
							<Card className="flex flex-col gap-2 p-4  min-w-[9rem] dark:border-zinc-600">
								<div className="space-y-3 p-0">
									<Skeleton className="w-44 h-3"></Skeleton>
									<div className=" flex items-center gap-3 flex-wrap ">
										<Skeleton className="w-20 h-3"></Skeleton>
									</div>
								</div>
							</Card>
						</div>
					</div>
					<Separator />
					<Card className="flex flex-col gap-2 p-4 dark:border-zinc-600">
						<div className="space-y-3 p-0">
							<Skeleton className="w-20 h-3"></Skeleton>
							<Skeleton className="w-44 h-3"></Skeleton>
							<Skeleton className="w-16 h-3"></Skeleton>
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
