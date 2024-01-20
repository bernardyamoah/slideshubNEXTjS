import { Query, databases } from "@/appwrite";
import { databaseId } from "@/lib/functions";

export async function getBooks() {
	let loading = true;

	if (!databaseId) {
		throw new Error("Database ID is not defined");
	}

	try {
		const response = await databases.listDocuments(
			databaseId,
			process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID!, // Replace with your collection ID
			[Query.limit(99), Query.orderDesc("$createdAt")]
		);

		const books: Book[] = response.documents as any[];
		loading = false;

		return { books, loading };
	} catch (error) {
		console.error("Error fetching books:", error);
		loading = false;
		throw new Error("Failed to fetch books. Please try again later.");
	}
}
export async function getBooksById(id: string) {
	let loading = true;

	if (!databaseId) {
		throw new Error("Database ID is not defined");
	}

	try {
		const response = await databases.listDocuments(
			databaseId,
			process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID!, // Replace with your collection ID
			[Query.limit(99), Query.equal("$id", id), Query.orderDesc("$createdAt")]
		);
		loading = false;
		const book = response.documents.length > 0 ? response.documents[0] : null;
		return { book, loading };
	} catch (error) {
		console.error("Error fetching books:", error);
		loading = false;
		throw new Error("Failed to fetch books. Please try again later.");
	}
}
