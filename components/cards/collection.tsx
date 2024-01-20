import React, { Suspense } from "react";
import Loading from "../ui/Cloading";
import { BookCard } from "./book-card";

type CollectionProps = {
	data: any[];
	emptyTitle: string;
	emptyStateSubtext: string;
	urlParamName?: string;
	collectionType?: "Related books" | "My_Tickets" | "All_Books";
	loading: boolean;
};

const Collection = ({
	data,
	emptyTitle,
	emptyStateSubtext,
	loading,
	urlParamName,
}: CollectionProps) => {
	return (
		<>
			{loading ? (
				<div className="flex flex-col items-center gap-10">
					<ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
						{Array.from({ length: 6 }).map((_, i) => (
							<Loading key={i} />
						))}
					</ul>
				</div>
			) : (
				<>
					{data.length > 0 ? (
						<div className="flex flex-col items-center gap-10">
							<ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
								{data.map((book) => {
									return (
										<li key={book.$id} className="flex justify-center">
											<BookCard book={book} />
										</li>
									);
								})}{" "}
							</ul>
						</div>
					) : (
						<div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
							<h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
							<p className="p-regular-14">{emptyStateSubtext}</p>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default Collection;
