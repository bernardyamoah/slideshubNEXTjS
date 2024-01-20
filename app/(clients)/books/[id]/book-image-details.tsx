"use client";
import { Icons } from "@/components/shared/icons";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DownloadBtn from "@/components/ui/downloadBtn";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BookImageDetails({
	image,
	downloadUrl,
	title,
	size,
	pages,
	fileType,
}) {
	return (
		<div className="space-y-3">
			<AspectRatio ratio={4 / 3} className="relative">
				{image ? (
					<Image
						src={image ?? "assets/images/hero-image.png"}
						alt={title}
						className="object-cover"
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
				<Badge className="rounded-3xl absolute top-0">{size} </Badge>
			</AspectRatio>
			<div className="flex gap-3 ">
				<Badge variant="outline" className="rounded-3xl">
					{fileType}
				</Badge>
				<Badge variant="outline" className="rounded-3xl">
					{pages} pages
				</Badge>
			</div>

			<DownloadBtn filename={title} Fileurl={downloadUrl} />
		</div>
	);
}
