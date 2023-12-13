import Link from "next/link";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
interface Book {
	id: string;
	title: string;
	authors: string[];
	publishedDate: string;
	description: string;
	pageCount: number;
	categories: string[];
	previewLink: string;
	thumbnail: string;
	searchInfo: string;
}
const BookItem = ({ book }) => {
	return (<>
		<Card

			className="overflow-hidden rounded-lg   p-4 sm:p-6 lg:p-8 max-w-xl"
		>
			<span
				className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
			></span>

			<div className="sm:flex sm:justify-between sm:gap-4">
				<div>
					<Badge variant='outline' className="mb-3 dark:border-zinc-700 rounded-3xl py-1.5">{book.categories}</Badge>
					<h3 className="text-lg font-bold sm:text-xl">
						{book.title}
					</h3>

					<p className="mt-1 text-xs font-medium text-gray-600">By {book.authors.join(', ')}</p>
				</div>

				<div className="block sm:shrink-0 mt-2 sm:mt-0">
					<img
						alt="Paul Clapton"
						src={book.thumbnail}
						className=" w-20  aspect-auto rounded-lg object-cover shadow-sm"
					/>
				</div>
			</div>

			<div className="mt-4">
				<p className="max-w-[60ch] text-sm text-gray-500">
					{book.description}
				</p>
				<Link target="_blank" className="mt-3 " href={book.previewLink}>Preview Here</Link>
			</div>

			<dl className="mt-6 flex gap-4 sm:gap-6">
				<div className="flex flex-col-reverse">
					<dt className="text-sm font-medium text-gray-600">Published</dt>
					<p className="text-xs ">{book.publishedDate}</p>
				</div>
				<div className="flex flex-col-reverse">
					<dt className="text-sm font-medium text-gray-600">Published by</dt>
					<dd className="text-xs ">{book.publisher}</dd>
				</div>

				<div className="flex flex-col-reverse">
					<dt className="text-sm font-medium text-gray-600">Page Count</dt>
					<dd className="text-xs ">{book.pageCount}</dd>
				</div>
			</dl>
		</Card>



	</>
	);
};

export default BookItem;
