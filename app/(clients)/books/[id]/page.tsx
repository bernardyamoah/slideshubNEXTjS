import { Badge } from "@/components/ui/badge";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getBooksById } from "@/hooks/get-books";

import React from "react";
import BookImageDetails from "./book-image-details";
import BookDetailLoader from "./book-detail-loader";
import { Download, Link2, Link2Off, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
type Props = {
	params: { id: string };
};
export default async function Page({ params: { id } }: Props) {
	const { book, loading } = (await getBooksById(id)) as {
		book: Book | null;
		loading: boolean;
	};

	return (
		<>
			{loading ? (
				<BookDetailLoader />
			) : (
				<div>
					{book && (
						<section className="flex justify-center ">
							<div className="grid grid-cols-1 md:grid-cols-3 2xl:max-w-7xl grid-rows-auto gap-5 md:border rounded-2xl dark:border-zinc-700 lg:p-7">
								<BookImageDetails
									categories={book.categories}
									pages={book.pageCount}
									title={book.title}
									image={book.thumbnail}
								/>
								<div className="flex w-full flex-col gap-8   col-span-2 bg-card/70">
									<div className="flex flex-col gap-6">
										<div className="space-y-4">
											<h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">
												{book?.title}{" "}
												<Badge className="rounded-3xl">
													{book.fileType}
												</Badge>
											</h2>

											<div className=" flex items-center flex-wrap gap-3">
												{book.authors.map((author) => (
													<Badge
														key={author}
														variant="outline"
														className="rounded-3xl gap-2"
													>
														<User className="w-4 h-4" />
														{author}
													</Badge>
												))}
											</div>
										</div>
										<Separator />
									</div>

									<Card className="flex flex-col gap-2 p-4 dark:border-zinc-600">
										<CardContent className="space-y-3 p-0">
											<CardDescription className="flex item-center justify-between">
												<dl className=" flex gap-4 sm:gap-6">
													<div className="flex flex-col-reverse">
														<dt className="text-sm font-medium text-gray-600">
															Published
														</dt>
														<p className="text-xs ">{book.publishedDate}</p>
													</div>
													<div className="flex flex-col-reverse">
														<dt className="text-sm font-medium text-gray-600">
															Published by
														</dt>
														<dd className="text-xs ">{book.publisher}</dd>
													</div>
												</dl>
											</CardDescription>
											<CardTitle className="font-bold text-lg text-grey-600">
												Book Description
											</CardTitle>
											<p className="text-muted-foreground text-sm md:text-base ">
												{book?.description}
											</p>
										</CardContent>
										<CardFooter className="flex items-center justify-between mt-4 gap-4 flex-wrap p-0">
											<div>
												{" "}
												<Link
													target="_blank"
													className="flex items-center gap-1 text-muted-foreground hover:underline hover:dark:text-gray-300 hover:text-gray-600 "
													href={book.previewLink}
												>
													<Link2 className="w-4 h-4" />
													Preview
												</Link>
											</div>
											{book.downloadLink && (
												<Button>
													<Link
														target="_blank"
														className="w-full flex items-center gap-1   "
														href={book.downloadLink}
													>
														<Download className="w-4 h-4" />
														Download ({book.size})
													</Link>
												</Button>
											)}
										</CardFooter>
									</Card>
								</div>
							</div>
						</section>
					)}
				</div>
			)}
		</>
	);
}
