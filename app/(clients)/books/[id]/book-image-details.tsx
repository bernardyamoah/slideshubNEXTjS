"use client";
import { Icons } from "@/components/shared/icons";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";


import Image from "next/image";

import React from "react";

export default function BookImageDetails({
	image,

	categories,
	title,

	pages,
	
}) {
	return (
		<div className="space-y-3">
			<AspectRatio ratio={4 / 3} className="relative">
				{image ? (
					<Image
						src={image ?? "assets/images/hero-image.png"}
						alt={title}
						className="object-cover rounded-xl"
						sizes="
		(min-width: 1024px) 20vw,
		(min-width: 768px) 25vw,
		(min-width: 640px) 33vw,
		(min-width: 475px) 50vw,
		100vw
	"
						fill
						quality={100}
						loading="lazy"
					/>
				) : (
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
				)}
				
				
			</AspectRatio>
			<div className="flex justify-between items-center ">
				<div className="flex gap-3">
					
					{pages ? (
						<Badge variant="outline" className="rounded-3xl">
							{pages} pages
						</Badge>
					) : null}

					{categories.map((category) => (
						<Badge
							key={category}
							variant="outline"
							className="rounded-3xl gap-2"
						>
							{category}
						</Badge>
					))}
				</div>
			</div>
		</div>
	);
}
