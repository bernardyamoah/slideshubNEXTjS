"use client";

import * as React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { ChevronRightIcon } from "lucide-react";
import { Icons } from "../shared/icons";
import Link from "next/link";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
	book: Book;
}

export function BookCard({ book, className, ...props }: ProductCardProps) {
	return (
		<Card className=" duration-300 dark:border-zinc-600 hover:bg-neutral-100/90 dark:hover:bg-neutral-900/90 ">
			<Link href={"/books/" + book.$id}>
				<CardHeader className=" p-0 overflow-hidden rounded-xl">
					<AspectRatio ratio={4 / 3}>
						{book?.thumbnail ? (
							<Image
								src={book.thumbnail ?? "assets/images/hero-image.png"}
								alt={book.title}
								className="object-cover"
								sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
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
				</CardHeader>
				<CardContent className="grid   py-2 pb-4">
					<CardTitle className="line-clamp-2 text-lg ">{book.title}</CardTitle>
					<div className="flex  gap-2 flex-col mt-2">
						<CardDescription className="line-clamp-2 p-0 text-sm text-gray-500">
							{book.description}
						</CardDescription>
						<span className="flex items-center text-sm font-normal underline cursor-pointer hover:opacity-80 group">
							Read More{" "}
							<ChevronRightIcon className="w-5 h-5 group-hover:opacity-80" />
						</span>
					</div>
				</CardContent>
			</Link>
		</Card>
	);
}
