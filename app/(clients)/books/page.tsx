import { BookCard } from "@/components/cards/book-card";
import Collection from "@/components/cards/collection";
import Pagination from "@/components/pagers/pagination-button";
import { Banner } from "@/components/shared/banner";

import { getBooks } from "@/hooks/get-books";
import { Metadata } from "next";
import BookLoader from "./book-loader";
export const metadata: Metadata = {
	title: "Books",
};

export default async function Page() {
	const { books, loading } = await getBooks();
	return (
		<>
			<h2 className="text-3xl font-bold mt-10 ">Books</h2>
			{loading ? (
				<section className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-10">
					{Array.from({ length: 6 }).map((_, i) => (
						<BookLoader key={i} />
					))}
				</section>
			) : (
				<section className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-10">
					{books.map((book) => (
						<BookCard book={book} key={book.$id} />
					))}
					{/* <Pagination pageCount={} activePage={} onPageChange={} /> */}
				</section>
			)}

			{/* <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
				<h2 className="text-3xl bold ">Related Books</h2>
				<Collection
					data={books}
					emptyTitle="No Books Found"
					emptyStateSubtext="Come back later"
					collectionType="Related books"
					loading={loading}
				/>
			</section> */}
		</>
	);
}
