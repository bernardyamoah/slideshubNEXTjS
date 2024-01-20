import { Badge } from "@/components/ui/badge";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getBooksById } from "@/hooks/get-books";

import React from "react";
import BookImageDetails from "./book-image-details";
import BookDetailLoader from "./book-detail-loader";
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
									size={book.size}
									pages={book.pageCount}
									fileType={book.fileType}
									title={book.title}
									image={book.thumbnail}
									downloadUrl={book.downloadLink}
								/>
								<div className="flex w-full flex-col gap-8   col-span-2 bg-card/70">
									<div className="flex flex-col gap-6">
										<div className="space-y-4">
											<h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">
												{book?.title}
											</h2>

											<div className=" flex items-center flex-wrap gap-3">
												{book.categories.map((category) => (
													<Badge
														key={category}
														variant="outline"
														className="rounded-3xl"
													>
														{category}
													</Badge>
												))}
											</div>
										</div>
										<Separator />

										<div className="flex gap-6 flex-wrap">
											<Card className="flex flex-col gap-2 p-4  min-w-[9rem] dark:border-zinc-600">
												<CardContent className="space-y-3 p-0">
													<CardTitle className="font-bold text-lg text-grey-600">
														Authors
													</CardTitle>
													<div className=" flex items-center gap-3 flex-wrap ">
														{book.authors.map((author) => (
															<Badge
																key={author}
																variant="outline"
																className="rounded-3xl"
															>
																{author}
															</Badge>
														))}
													</div>
												</CardContent>
											</Card>
										</div>
									</div>
									<Separator />
									<Card className="flex flex-col gap-2 p-4 dark:border-zinc-600">
										<CardContent className="space-y-3 p-0">
											<CardTitle className="font-bold text-lg text-grey-600">
												Book Description
											</CardTitle>
											<p className="text-muted-foreground text-sm md:text-base ">
												{book?.description}
											</p>
										</CardContent>
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
