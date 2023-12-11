'use server'

import {databases,storage,} from "@/appwrite";
import { errorMessage, successMessage } from "./functions";
import { revalidatePath } from "next/cache";


export const extractIdFromUrl = (url: string) => {
	const regex = /files\/([^/]+)\//;
	const match = url.match(regex);
	return match ? match[1] : null;
};
export async function deleteCourse  (id: string,name:string)  {
	try {
		const getDoc = await databases.getDocument(
			process.env.NEXT_PUBLIC_DATABASE_ID!,
			process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID!,
			id
		);

		if (getDoc.$id === id) {
			await databases.deleteDocument(
				process.env.NEXT_PUBLIC_DATABASE_ID!,
				process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID!,
				id
			);
            successMessage(`${name} deleted! 🎉`);
            revalidatePath('/dashboard')
		} else {
			errorMessage("Failed to delete Course ❌");
		}
		successMessage("Course deleted! 🎉");
	} catch (err) {
		errorMessage("Action declined ❌");
	}
};

//👇🏻 delete a Slide
export async function deleteSlide (id: string,name:string)  {
	try {
		const getDoc = await databases.getDocument(
			process.env.NEXT_PUBLIC_DATABASE_ID!,
			process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!,
			id
		);
		const fileID = extractIdFromUrl(getDoc.fileUrl);

		if (getDoc.$id === id && fileID !== null) {
			await storage.deleteFile(
				process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
				fileID
			);
			await databases.deleteDocument(
				process.env.NEXT_PUBLIC_DATABASE_ID!,
				process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!,
				id
			);

            successMessage(`${name} deleted! 🎉`);
            revalidatePath('/dashboard')
		} else {
			errorMessage("Failed to delete Slide ❌");
		}
	} catch (err) {
		errorMessage("Action declined ❌");
	}
};

// Delete Program
export async function deleteProgram  (id: string,name:string)  {
	try {
		const getDoc = await databases.getDocument(
			process.env.NEXT_PUBLIC_DATABASE_ID!,
			process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID!,
			id
		);

		if (getDoc.$id === id) {
			// Delete the program from the database
			await databases.deleteDocument(
				process.env.NEXT_PUBLIC_DATABASE_ID!,
				process.env.NEXT_PUBLIC_PROGRAMMES_COLLECTION_ID!,
				id
			);
		}
		successMessage(`${name} deleted! 🎉`);
		
	} catch (error) {
		console.error("Error deleting program:", error);
		errorMessage("Failed to delete program");
	}
};

// Delete Book
export async function deleteBook  (id: string,name:string){
	try {
		const getDoc = await databases.getDocument(
			process.env.NEXT_PUBLIC_DATABASE_ID!,
			process.env.NEXT_PUBLIC_BOOK_COLLECTION_ID!,
			id
		);

		if (getDoc.$id === id) {
			// Delete the book from the database
			await databases.deleteDocument(
				process.env.NEXT_PUBLIC_DATABASE_ID!,
				process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID!,
				id
			);
		}

		successMessage(`${name} deleted! 🎉`);
	} catch (error) {
		console.error("Error deleting book:", error);
		errorMessage("Failed to delete book");
	}
};

// Delete Campus
export async function deleteCampus  (id: string,name:string)  {
	try {
		const getDoc = await databases.getDocument(
			process.env.NEXT_PUBLIC_DATABASE_ID!,
			process.env.NEXT_PUBLIC_CAMPUSES_COLLECTION_ID!,
			id
		);

		if (getDoc.$id === id) {
			// Delete the campus from the database
			await databases.deleteDocument(
				process.env.NEXT_PUBLIC_DATABASE_ID!,
				process.env.NEXT_PUBLIC_CAMPUS_COLLECTION_ID!,
				id
			);
		}
		successMessage(`${name} deleted! 🎉`);
	} catch (error) {
		console.error("Error deleting campus:", error);
		errorMessage("Failed to delete campus");
	}
};
