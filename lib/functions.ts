
import {
	databases,
	ID,
	Query,
	account,
	storage,
	client,
	avatars,
	teams,
} from "@/appwrite";
import { UploadProgress } from "appwrite";
import { toast } from "sonner";

const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
// Success toast notification
export const successMessage = (message: string) => {
	toast.success(message);
};

// Error toast notification
export const errorMessage = (message: string) => {
	toast.error(message,);
};

// Create campus function
export const createCampus = async (campusData: CampusData) => {
	try {
		// Retrieve all documents from the collection
		const responseCampus = await databases.listDocuments(
			process.env.NEXT_PUBLIC_DATABASE_ID!, // Replace with your Database ID
			process.env.NEXT_PUBLIC_CAMPUSES_COLLECTION_ID! // Replace with your collection ID
		);
		const documents = responseCampus.documents;

		// Check if a document with the same name already exists
		const existingCampus = documents.find(
			(doc) =>
				doc.name === campusData.name && doc.location === campusData.location
		);

		if (existingCampus) {
			errorMessage("A campus with the same name already exists.");
			return;
		}

		const response = await toast.promise(
			databases.createDocument(
				process.env.NEXT_PUBLIC_DATABASE_ID!, // Replace with your Database ID
				process.env.NEXT_PUBLIC_CAMPUSES_COLLECTION_ID!, // Replace with your collection ID
				ID.unique(),
				campusData
			),
			{
				loading: "Creating campus...",
				success: "Campus created! 🎉",
				error: "Failed to create campus",
			}
		);
		return response;
	} catch (error) {
		throw error;
		
	}
};

// Create course function
export const createCourse = async (courseData: CourseData) => {
	try {
		// Retrieve all documents from the collection
		const responseCampus = await databases.listDocuments(
			process.env.NEXT_PUBLIC_DATABASE_ID!, // Replace with your Database ID
			process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID! // Replace with your collection ID
		);

		const documents = responseCampus.documents;

		// Check if a document with the same name already exists
		const existingCourse = documents.find(
			(doc) =>
				doc.name === courseData.name && doc.programId === courseData.programId
		);

		if (existingCourse) {
			errorMessage("This course  already exists.");
			return;
		}

		const data = await databases.createDocument(
			process.env.NEXT_PUBLIC_DATABASE_ID!,
			process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID!,
			ID.unique(),
			courseData
		);

		successMessage("Course was created successfully 🎉");
		return data;
	} catch (error) {
		errorMessage("Error creating course");
		throw error;
	}
};

// Create program function
export const createProgram = async (programData: ProgramData) => {
	try {
		// Retrieve all documents from the collection
		const responseProgram = await databases.listDocuments(
			process.env.NEXT_PUBLIC_DATABASE_ID!, // Replace with your Database ID
			process.env.NEXT_PUBLIC_PROGRAMMES_COLLECTION_ID! // Replace with your collection ID
		);
		const documents = responseProgram.documents;

		// Check if a document with the same name already exists
		const existingProgram = documents.find(
			(doc) =>
				doc.name === programData.name && doc.campusId === programData.campusId
		);

		if (existingProgram) {
			errorMessage("This program  already exists.");
			return;
		}

		const response = await await toast.promise(
			databases.createDocument(
				process.env.NEXT_PUBLIC_DATABASE_ID!, // Replace with your Database ID
				process.env.NEXT_PUBLIC_PROGRAMMES_COLLECTION_ID!, // Replace with your collection ID
				ID.unique(),
				programData
			),
			{
				loading: "Creating Program...",
				success: "Program created! 🎉",
				error: "Failed to create Program",
			}
		);
		return response;
	} catch (error) {
		errorMessage("Error creating program");
		throw error; // Optionally, you can rethrow the error to handle it in the caller function
	}
};

export const createBook = async (bookData: BooksData, toastId:any) => {
	try {
		// // Retrieve all documents from the collection
		// const response = await databases.listDocuments(
		// 	process.env.NEXT_PUBLIC_DATABASE_ID!, // Replace with your Database ID
		// 	process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID! // Replace with your collection ID
		// );

		// const documents = response.documents;

		// // Check if a document with the same name already exists
		// const existingBook = documents.find((doc) => doc.name === bookData.name);

		// if (existingBook) {
		// 	errorMessage("This book  already exists.");
		// 	return;
		// }

		toast.promise(
			databases.createDocument(
				process.env.NEXT_PUBLIC_DATABASE_ID!,
				process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID!,
				ID.unique(),
				bookData
			),
			{
				loading: "Creating book...",
				success: "Book created! 🎉",
				error: "Failed to create book",
			
			}
			
		);
		toast.dismiss(toastId)
	} catch (error) {
		console.log(error);
		errorMessage("Error adding book");
		// throw error;
	}
};

export const createSlide = async (slideData: SlidesData) => {
	try {
		// Retrieve all documents from the collection
		// const responseSlides = await databases.listDocuments(
		// process.env.NEXT_PUBLIC_DATABASE_ID!, // Replace with your Database ID
		// process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID! // Replace with your collection ID
		// );

		// const documents = responseSlides.documents;

		// // Check if a document with the same name already exists
		// const existingSlides = documents.find(
		// (doc) => doc.name === slideData.name

		// );

		// if (existingSlides ) {
		// warnMessage('This slide  already exists.');
		// return;
		// }

		const data = await toast.promise(
			databases.createDocument(
				process.env.NEXT_PUBLIC_DATABASE_ID!,
				process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!,
				ID.unique(),
				slideData
			),
			{
				loading: `Uploading ${slideData.name} to database...`,
				success: `${slideData.name} successfully uploaded! 🎉`,
				error: `Failed to upload ${slideData.name}`,
			}
		);

		return data;
	} catch (error) {
		errorMessage("Error adding slide");
		throw error;
	}
};

//    Update Functions

export const updateSlide = async (id: string, updatedAttributes: any, setRefresh:any) => {
	try {
		await databases.updateDocument(
			databaseId!,
			process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!,
			id,
			updatedAttributes
		);

		successMessage("Successfully updated slide");
setRefresh(true)
	} catch (error) {
		// Handle any errors that occur during the update process
		errorMessage("Failed to update slide:" + error);
	}
};

export const updateCourse = async (id: string, updatedAttributes: any) => {
	try {
		// // Retrieve the document from the Appwrite database
		const getDoc = await databases.getDocument(
			databaseId!, // Replace with your database ID
			process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID!, // Replace with your collection ID
			id
		);
		// Check if the retrieved document matches the provided ID
		if (getDoc.$id === id) {
			// Update the document with the merged attributes
			await databases.updateDocument(
				databaseId!, // Replace with your database ID
				process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID!, // Replace with your collection ID
				id,
				updatedAttributes
			);

			successMessage("Successfully updated Course");
		} else {
			// Handle the case when the document is not found with the provided ID
			errorMessage("Course not found");
		}
	} catch (error) {
		// Handle any errors that occur during the update process
		errorMessage("Failed to update Course:" + error);
	}
};

// Update Book
export const updateBook = async (id: string, updatedAttributes: any) => {
	try {
		// Update the book in the database
		await databases.updateDocument(
			databaseId!,
			process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID!,
			id,
			updatedAttributes
		);

		successMessage("Book updated successfully");
	} catch (error) {
		console.error("Error updating book:", error);
		errorMessage("Failed to update book");
	}
};
// Update Program
export const updateProgram = async (id: string, updatedAttributes: any) => {
	try {
		// Update the program in the database
		await databases.updateDocument(
			databaseId!,
			process.env.NEXT_PUBLIC_PROGRAMMES_COLLECTION_ID!,
			id,
			updatedAttributes
		);

		successMessage("Program updated successfully");
	} catch (error) {
		console.error("Error updating program:", error);
		errorMessage("Failed to update program");
	}
};

// Update Campus
export const updateCampus = async (id: string, updatedAttributes: any) => {
	try {
		// Update the campus in the database
		await databases.updateDocument(
			databaseId!,
			process.env.NEXT_PUBLIC_CAMPUS_COLLECTION_ID!,
			id,
			updatedAttributes
		);

		successMessage("Campus updated successfully");
	} catch (error) {
		console.error("Error updating campus:", error);
		errorMessage("Failed to update campus");
	}
};
// Function to update user data
export const updateUserData = async (updatedUserData: ProfileData) => {
	try {
		// Get the current user's information
		const response = await account.get();

		// Merge the updated user data with the existing user data
		const userData = { ...response, ...updatedUserData };

		// Destructure the userData object to get the individual properties
		const { prefs } = userData;

		// Update the user's preferences if prefs exist
		if (prefs) {
			// Make sure to handle each preference property (bio, avatarUrl, coverPhotoUrl, phoneNumber, country) individually
			const updatedPrefs: Partial<ProfileData["prefs"]> = {};

			if (prefs.bio) {
				// Update the bio
				updatedPrefs.bio = prefs.bio;
			}

			if (prefs.avatarUrl) {
				// Update the avatarUrl
				updatedPrefs.avatarUrl = prefs.avatarUrl;
			}

			if (prefs.coverPhotoUrl) {
				updatedPrefs.coverPhotoUrl = prefs.coverPhotoUrl;
			}

			if (prefs.phoneNumber) {
				updatedPrefs.phoneNumber = prefs.phoneNumber;
			}

			if (prefs.country) {
				// Update the country
				updatedPrefs.country = prefs.country;
			}

			if (prefs.profileImage) {
				// Update the Profile Image
				updatedPrefs.profileImage = prefs.profileImage;
			}

			if (prefs.profileImageId) {
				// Update the country
				updatedPrefs.profileImageId = prefs.profileImageId;
			}

			await toast.promise(account.updatePrefs(updatedPrefs), {
				loading: "updating..",
				success: "Done! 🎉",
				error: "Failed! Try again",
			});
		}
	} catch (error) {
		// Handle any errors that occurred during the update process
		console.error("Error updating user data:", error);
		throw error;
	}
};

export async function handleFileUpload(
	file: File,
	id: string,
	setUploadProgress: (progress: number) => void
) {
	const toastId = toast.loading("Uploading file..."); // Display a loading toast

	try {
		const getDoc = await databases.getDocument(
			process.env.NEXT_PUBLIC_DATABASE_ID!,
			process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!,
			id
		);
		const oldFileID = extractIdFromUrl(getDoc.fileUrl);

		//  Delete file from storage
		if (getDoc.$id === id && oldFileID !== null) {
			await storage.deleteFile(
				process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
				oldFileID
			);
		}

		// Create a new Appwrite file
		const response = await storage.createFile(
			process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
			ID.unique(),
			file,
			undefined,
			(progress: UploadProgress) => {
				const uploadProgress = Math.round(
					(progress.chunksUploaded * 100) / progress.chunksTotal
				);

				setUploadProgress(uploadProgress);
			}
		);

		const newFileId = response.$id;

		const fileUrlResponse = storage.getFileDownload(
			process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
			newFileId
		);

		const filePreviewResponse = storage.getFilePreview(
			process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
			newFileId
		);

		const uploadedFileUrl = fileUrlResponse.toString();
		toast.dismiss(toastId); // Update the toast to a success toast
		return { uploadedFileUrl, filePreviewResponse };
	} catch (error) {
		console.error("Upload failed:", error);
		toast.error("File upload failed", { id: toastId }); // Update the toast to an error toast
		throw error; // Rethrow the error to be caught in the calling function
	}
}

//  Delete Functions

export const deleteCourse = async (id: string, setRefresh:any) => {
	try {
		const getDoc = await databases.getDocument(
			databaseId!,
			process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID!,
			id
		);

		if (getDoc.$id === id) {
			await databases.deleteDocument(
				databaseId!,
				process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID!,
				id
			);
			successMessage(`${name} deleted! 🎉`);
		} else {
			errorMessage("Failed to delete Course ❌");
		}
		successMessage("Course deleted! 🎉");
	} catch (err) {
		errorMessage("Action declined ❌");
	}
};

//👇🏻 delete a Slide
export const deleteSlide = async (id: string, setRefresh:any) => {
	try {
		const getDoc = await databases.getDocument(
			databaseId!,
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
				databaseId!,
				process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!,
				id
			);
		}
		setRefresh(true);
	} catch (err) {
		errorMessage("Action declined ❌");
	}
};

// Delete Program
export const deleteProgram = async (id: string, setRefresh:any) => {
	try {
		const getDoc = await databases.getDocument(
			databaseId!,
			process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID!,
			id
		);

		if (getDoc.$id === id) {
			// Delete the program from the database
			await databases.deleteDocument(
				databaseId!,
				process.env.NEXT_PUBLIC_PROGRAMMES_COLLECTION_ID!,
				id
			);
		}
	
		setRefresh(true);
	} catch (error) {
		console.error("Error deleting program:", error);
		errorMessage("Failed to delete program");
	}
};

// Delete Book
export const deleteBook = async (id: string, setRefresh:any) => {
	try {
		const getDoc = await databases.getDocument(
			databaseId!,
			process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID!,
			id
		);
		

		const fileID = extractIdFromUrl(getDoc.downloadLink);
		
	

		if (getDoc.$id === id && fileID !== null) {
			await storage.deleteFile(
				process.env.NEXT_PUBLIC_BOOKS_STORAGE_ID!,
				fileID
			);
			await databases.deleteDocument(
				databaseId!,
				process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID!,
				id
			);
		}
		
		successMessage(`${getDoc.title} deleted! 🎉`);
		setRefresh(true);
	} catch (error) {
		console.error("Error deleting book:", error);
		errorMessage("Failed to delete book");
		setRefresh(true);
	}
};

// Delete Campus
export const deleteCampus = async (id: string, setRefresh:any) => {
	try {
		const getDoc = await databases.getDocument(
			databaseId!,
			process.env.NEXT_PUBLIC_CAMPUSES_COLLECTION_ID!,
			id
		);

		if (getDoc.$id === id) {
			// Delete the campus from the database
			await databases.deleteDocument(
				databaseId!,
				process.env.NEXT_PUBLIC_CAMPUS_COLLECTION_ID!,
				id
			);
		}
		
		setRefresh(true);
	} catch (error) {
		console.error("Error deleting campus:", error);
		errorMessage("Failed to delete campus");
	}
};

//===========  FETCH DATA =========================================

// Get Campuses
export const getCampus = async (): Promise<any[]> => {
	if (!databaseId) {
		throw new Error("Database ID is not defined");
	}

	try {
		const response = await databases.listDocuments(
			databaseId,
			process.env.NEXT_PUBLIC_CAMPUSES_COLLECTION_ID! // Replace with your collection ID
		);

		return response.documents;
	} catch (error) {
		throw error;
	}
};

// Get Courses
export const getCourses = async (): Promise<any[]> => {
	if (!databaseId) {
		throw new Error("Database ID is not defined");
	}

	try {
		const response = await databases.listDocuments(
			databaseId,
			process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID!,
			[Query.limit(99), Query.orderDesc("$createdAt")]
		);

		return response.documents;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const getAllCourses = async ({
	currentPage,
	setLoading,
	perPage,
}: {
	currentPage: number;
	perPage: number;
	setLoading: (loading: boolean) => void;
}): Promise<{ data: any[]; total_pages: number }> => {
	if (!databaseId) {
		throw new Error("Database ID is not defined");
	}
	setLoading(true);
	try {
		const response = await databases.listDocuments(
			databaseId,
			process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID!,
			[Query.limit(perPage), Query.offset((currentPage - 1) * perPage)]
		);
		const pages = Math.ceil(response.total / perPage);

		setLoading(false);
		return { data: response.documents, total_pages: pages };
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// Get Programs
export const getPrograms = async (): Promise<any[]> => {
	if (!databaseId) {
		throw new Error("Database ID is not defined");
	}

	try {
		const response = await databases.listDocuments(
			databaseId,
			process.env.NEXT_PUBLIC_PROGRAMMES_COLLECTION_ID! // Replace with your collection ID
		);

		return response.documents;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const getAllPrograms = async ({
	currentPage,
	setLoading,
	perPage,
}: {
	currentPage: number;
	perPage: number;
	setLoading: (loading: boolean) => void;
}): Promise<{ data: any[]; total_pages: number }> => {
	if (!databaseId) {
		throw new Error("Database ID is not defined");
	}
	setLoading(true);
	try {
		const response = await databases.listDocuments(
			databaseId,
			process.env.NEXT_PUBLIC_PROGRAMMES_COLLECTION_ID!,
			[Query.limit(perPage), Query.offset((currentPage - 1) * perPage)]
		);
		const pages = response.total / perPage;
		setLoading(false);
		return { data: response.documents, total_pages: pages };
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const getAllBooks = async ({
	currentPage,
	setLoading,
	perPage,
}: {
	currentPage: number;
	perPage: number;
	setLoading: (loading: boolean) => void;
}): Promise<{ data: any[]; total_pages: number }> => {
	if (!databaseId) {
		throw new Error("Database ID is not defined");
	}
	setLoading(true);
	try {
		const response = await databases.listDocuments(
			databaseId,
			process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID!,
			[Query.limit(perPage), Query.offset((currentPage - 1) * perPage)]
		);
		const pages = Math.ceil(response.total / perPage);
		setLoading(false);
		return { data: response.documents, total_pages: pages };
	} catch (error) {
		console.error(error);
		throw error;
	}
};
// export const getTotalProgrammesPages = async (
// 	perPage: number
// ): Promise<number> => {
// 	if (!databaseId) {
// 		throw new Error("Database ID is not defined");
// 	}
// 	try {
// 		const response = await databases.listDocuments(
// 			databaseId,
// 			process.env.NEXT_PUBLIC_PROGRAMMES_COLLECTION_ID!
// 		);
// 		const totalProgram = response.total;
// 		const totalPages = Math.ceil(totalProgram / perPage);
// 		return totalPages;
// 	} catch (error) {
// 		console.error(error);
// 		throw error;
// 	}
// };

export const getSlides = async (): Promise<any[]> => {
	if (!databaseId) {
		throw new Error("Database ID is not defined");
	}

	try {
		const response = await databases.listDocuments(
			databaseId,
			process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!, // Replace with your collection ID
			[Query.limit(99), Query.orderDesc("$createdAt")]
		);

		return response.documents;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getSlidesByCourseId = async (courseId: string): Promise<any[]> => {
	if (!databaseId) {
		throw new Error("Database ID is not defined");
	}

	try {
		const response = await databases.listDocuments(
			databaseId,
			process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!, // Replace with your collection ID
			[Query.limit(99), Query.equal("courseId", courseId)]
		);

		return response.documents;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export async function getCoursesByProgramId(programId: string): Promise<any[]> {
	try {
		// Fetch the courses by programId
		const response = await databases.listDocuments(
			process.env.NEXT_PUBLIC_DATABASE_ID!,
			process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID!,
			[
				Query.equal("programId", programId),
				Query.limit(99),
				Query.orderAsc("semester"),
			]
		);

		// Return the courses data
		return response.documents;
	} catch (error) {
		throw new Error("Failed to fetch courses by programId: " + error);
	}
}

export async function getProgramsByCampusId(campusId: string): Promise<any[]> {
	try {
		// Fetch the courses by programId
		const response = await databases.listDocuments(
			process.env.NEXT_PUBLIC_DATABASE_ID!,
			process.env.NEXT_PUBLIC_PROGRAMMES_COLLECTION_ID!,
			[Query.equal("campusId", campusId)] // Filter documents by the campus ID
		);

		// Return the courses data
		return response.documents;
	} catch (error) {
		throw new Error("Failed to fetch courses by programId: " + error);
	}
}

export async function getProgramName(programId: string) {
	try {
		// Fetch the program document from Appwrite database
		const program = await databases.getDocument(
			process.env.NEXT_PUBLIC_DATABASE_ID!,

			process.env.NEXT_PUBLIC_PROGRAMMES_COLLECTION_ID!,
			programId
		);

		// Extract and return the program name
		return program.name;
	} catch (error) {
		console.error("Failed to fetch program name:", error);
		throw error;
	}
}

export async function getCourseName(CourseId: string) {
	try {
		// Fetch the program document from Appwrite database
		const Course = await databases.getDocument(
			process.env.NEXT_PUBLIC_DATABASE_ID!,

			process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID!,
			CourseId
		);

		// Extract and return the program name
		return Course.name;
	} catch (error) {
		console.error("Failed to fetch course name:", error);
		throw error;
	}
}
export async function getCampusDetails(campusId: string) {
	try {
		// Fetch the program document from Appwrite database

		const response = await databases.getDocument(
			process.env.NEXT_PUBLIC_DATABASE_ID!,
			process.env.NEXT_PUBLIC_CAMPUSES_COLLECTION_ID!,
			campusId
		);

		if (response.$id) {
			const location = response.location;
			const name = response.name;
			return { location, name };
		} else {
			return null;
		}
	} catch (error) {
		console.error("Failed to fetch program name:", error);
		throw error;
	}
}

export async function getProgramDetails(programId: string) {
	try {
		// Fetch the program document from Appwrite database

		const response = await databases.getDocument(
			process.env.NEXT_PUBLIC_DATABASE_ID!,
			process.env.NEXT_PUBLIC_PROGRAMMES_COLLECTION_ID!,
			programId
		);

		if (response.$id) {
			const campusId = response.campusId;
			const name = response.name;
			return { campusId, name };
		} else {
			return null;
		}
	} catch (error) {
		console.error("Failed to fetch program name:", error);
		throw error;
	}
}

export async function getCourseDetails(courseId: string) {
	try {
		// Fetch the program document from Appwrite database

		const response = await databases.getDocument(
			process.env.NEXT_PUBLIC_DATABASE_ID!,
			process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID!,
			courseId
		);

		if (response.$id) {
			const programId = response.programId;

			const name = response.name;
			return { programId, name };
		} else {
			return null;
		}
	} catch (error) {
		console.error("Failed to fetch program name:", error);
		throw error;
	}
}

export const formatTime = (timePosted: string) => {
	const postedDate = new Date(timePosted);
	const currentDate = new Date();

	const timeDiff = currentDate.getTime() - postedDate.getTime();
	const secondsDiff = Math.floor(timeDiff / 1000);
	const minutesDiff = Math.floor(secondsDiff / 60);
	const hoursDiff = Math.floor(minutesDiff / 60);
	const daysDiff = Math.floor(hoursDiff / 24);
	const monthsDiff = Math.floor(daysDiff / 30);
	const yearsDiff = Math.floor(monthsDiff / 12);

	if (yearsDiff > 0) {
		return `${yearsDiff} ${yearsDiff === 1 ? "year" : "years"} ago`;
	} else if (monthsDiff > 0) {
		return `${monthsDiff} ${monthsDiff === 1 ? "month" : "months"} ago`;
	} else if (daysDiff > 0) {
		return `${daysDiff} ${daysDiff === 1 ? "day" : "days"} ago`;
	} else if (hoursDiff > 0) {
		return `${hoursDiff} ${hoursDiff === 1 ? "hour" : "hours"} ago`;
	} else if (minutesDiff > 0) {
		return `${minutesDiff} ${minutesDiff === 1 ? "min" : "mins"} ago`;
	} else {
		return `${secondsDiff} ${secondsDiff === 1 ? "sec" : "secs"} ago`;
	}
};

export const formatUserTime = (timePosted: string) => {
	return new Date(timePosted).toLocaleString("en-US", {
		dateStyle: "medium",
		// timeStyle: "short",
	});
};

// 	userId: string,
// 	perPage: number
// ): Promise<number> => {
// 	if (!databaseId) {
// 		throw new Error("Database ID is not defined");
// 	}

// 	try {
// 		const response = await databases.listDocuments(
// 			databaseId!,
// 			process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!,
// 			[Query.equal("user_id", userId)]
// 		);

// 		const totalSlides = response.total;

// 		const totalPages = Math.ceil(totalSlides / perPage);

// 		return totalPages;
// 	} catch (error) {
// 		console.error(error);
// 		throw error;
// 	}
// };
export const getUserSlides = async ({
	userId,
	currentPage,
	setLoading,
	perPage,
}: {
	userId: string;
	currentPage: number;
	perPage: number;
	setLoading: (loading: boolean) => void;
}): Promise<{ data: any[]; total_pages: number }> => {
	if (!databaseId) {
		throw new Error("Database ID is not defined");
	}
	try {
		setLoading(true);
		// const totalPages = await getTotalPages(userId, perPage);
		try {
			const response = await databases.listDocuments(
				databaseId!,
				process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!,
				[
					Query.equal("user_id", userId),
					Query.orderDesc("$createdAt"),
					Query.limit(perPage),
					Query.offset((currentPage - 1) * perPage),
				]
			);
			const pages = Math.ceil(response.total / perPage);
			setLoading(false);

			return { data: response.documents, total_pages: pages };
		} catch (error) {
			console.error(error);
			setLoading(false);
			throw error;
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const getUserBooks = async ({
	userId,
	currentPage,
	setLoading,
	perPage,
}: {
	userId: string;
	currentPage: number;
	perPage: number;
	setLoading: (loading: boolean) => void;
}): Promise<{ data: any[]; total_pages: number }> => {
	if (!databaseId) {
		throw new Error("Database ID is not defined");
	}
	try {
		setLoading(true);
		// const totalPages = await getTotalPages(userId, perPage);
		try {
			const response = await databases.listDocuments(
				databaseId!,
				process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID!,
				[
					Query.equal("user_id", userId),
					Query.orderDesc("$createdAt"),
					Query.limit(perPage),
					Query.offset((currentPage - 1) * perPage),
				]
			);
			const pages = Math.ceil(response.total / perPage);
			setLoading(false);

			return { data: response.documents, total_pages: pages };
		} catch (error) {
			console.error(error);
			setLoading(false);
			throw error;
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export function bytesToSize(bytes: number) {
	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
	if (bytes === 0) return "n/a";
	const i = Math.floor(Math.log(bytes) / Math.log(1000));
	if (i === 0) return `${bytes} ${sizes[i]}`;
	const sizeInCurrentUnit = bytes / Math.pow(1000, i);
	if (sizeInCurrentUnit >= 1000 && i < sizes.length - 1) {
		return `1 ${sizes[i + 1]}`;
	}
	return `${Math.round(sizeInCurrentUnit)} ${sizes[i]}`;
}

//  AUTHENTICATION FUNCTIONS

// Sign-up function
export const signUp = async (name: string, email: string, password: string) => {
	try {
		await account.create(ID.unique(), email, password, name);
		await account.createEmailSession(email, password);

		successMessage("Account created! 🎉");
	} catch (error) {
		errorMessage("Check your network / User already exists ❌");
	}
};

// Login function
export const logIn = async (email: string, password: string) => {
	try {
		await account.createEmailSession(email, password);
		successMessage("Welcome back! 🎉");
	} catch (error) {}
};

// Logout function
export const logOut = async () => {
	try {
		const sessID = (await account.getSession("current")).$id;
		await account.deleteSession(sessID);
		successMessage("See you later! 🎉");
	} catch (error) {
		errorMessage("Encountered an error 😪");
	}
};

export const getCurrentUser = async (): Promise<string | null> => {
	try {
		const request = await account.get();

		return request.$id;
	} catch (error) {
		console.error("Error fetching user ID:", error);
		return null;
	}
};

export const getCurrentUserAndSetUser = async () => {
	try {
		const response = await account.get();
		return response;
	} catch (error) {
		console.error("Error fetching user:", error);
		return null;
	}
};
// Check authentication status function
export const checkAuthStatus = async (
	setUser: (user: any) => void,
	setLoading: (loading: boolean) => void,
	router: any
) => {
	try {
		const request = await account.get();
		setUser(request);
		setLoading(false);
	} catch (error) {
		router.push("/");
	}
};

export const checkAuthStatusDashboard = async (
	setUser: (user: any) => void,
	setLoading: (loading: boolean) => void
) => {
	try {
		const request = await account.get();

		setUser(request);
		setLoading(false);
	} catch (err) {
		throw new Error("error");
	}
};

//👇🏻 extract file ID from the document
export const extractIdFromUrl = (url: string) => {
	const regex = /files\/([^/]+)\//;
	const match = url.match(regex);
	return match ? match[1] : null;
};

// OAuth functions
// export const handleGoogleSignIn = async () => {
// 	try {
// 		// Define the redirect URL based on the environment
// 		const redirectUrl =
// 			process.env.NODE_ENV === "production"
// 				? "https://slideshub.vercel.app/dashboard"
// 				: "http://localhost:3000/dashboard";

// 		// Go to OAuth provider login page (Google)
// 		 account.createOAuth2Session("google", redirectUrl);
// 	} catch (error) {
// 		errorMessage("Error initiating Google OAuth:" + error);
// 	}
// };
export const handleGoogleSignIn = async () => {
	try {
		// Define the redirect URL based on the environment
		const redirectUrl =
			process.env.NODE_ENV === "production"
				? "https://slideshub.vercel.app/dashboard"
				: "http://localhost:3000/dashboard";

		// Go to OAuth provider login page (Google)
		const result = await account.createOAuth2Session("google", redirectUrl);
		return result;
	} catch (error) {
		console.error("Error initiating Google OAuth:", error);
		throw new Error("Error initiating Google OAuth");
	}
};

// Get Avatars

export const getUserInitials = async (name: string) => {
	try {
		const result = avatars.getInitials(name);

		return result.href.toString();
	} catch (error) {
		return null;
	}
};

const getUserID = async (): Promise<string> => {
	try {
		const request = await account.get();
		return request.$id;
	} catch (error) {
		throw new Error("Error fetching user ID: " + error);
	}
};

export const checkUserInTeam = async () => {
	try {
		const response = await teams.listMemberships(
			process.env.NEXT_PUBLIC_TEAM_ID!
		);
		const userId = await getUserID();

		// Check if the user's ID exists in the list of team members
		const userIds = response.memberships.map(
			(membership: any) => membership.userId
		);
		const isUserInTeam = userIds.includes(userId);
		// console.log("Is user in team:", isUserInTeam);
		return isUserInTeam;
	} catch (error) {
		console.error("Error checking team membership:", error);
		return false;
	}
};

export const getUserData = async () => {
	try {
		const response = await account.get();
		const logistics = await account.getSession("current");

		const { countryName, countryCode, ...userSessionData } = logistics;
		const country_icon = avatars.getFlag(countryCode).href.toString();

		// Extract the user data from the response and return it
		const userData: UserData = {
			id: response.$id,
			name: response.name,
			email: response.email,

			prefs: {
				bio: response.prefs?.bio || "",
				avatarUrl: response.prefs?.avatarUrl || "",
				coverPhotoUrl: response.prefs?.coverPhotoUrl || "",
				phoneNumber: response.prefs?.phoneNumber || "",
				country: countryName || "",
				countryFlagEmoji: country_icon || "",
				profileImage: response.prefs?.profileImage || "",
				profileImageId: response.prefs?.profileImageId || "",
				// Pass the countryIcon to the prefs object
			},
			status: response.status,
			registration: response.registration,
			emailVerification: response.emailVerification,

			// Add more fields as needed
		};

		return userData;
	} catch (error) {
		// Handle any errors that occurred during the data retrieval
		console.error("Error fetching user data:", error);
		throw error;
	}
};

export const fetchBookDetails = async (title:String) => {
	if (!title) {
	  // Handle the case where the title is empty
	  return null;
	}
  
	const API_ENDPOINT = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOK_API_KEY}`;
	
  
	try {
	  const bookDataResponse = await fetch(API_ENDPOINT);
  
	  if (bookDataResponse.ok) {
		const bookData = await bookDataResponse.json();
		
  
		const { id, volumeInfo } = bookData.items[0];
		const { title, authors, publishedDate, publisher, description, pageCount, categories, previewLink, imageLinks } = volumeInfo;
		const thumbnail = imageLinks?.thumbnail 
  
		const book = {
	
		  title,
		  authors,
		  publishedDate,
		  description,
		  pageCount,
		  publisher,
		  categories,
		  previewLink,
		  thumbnail,
		
		};
  
		return book;
	  } else {
		console.error('Failed to fetch book data');
		return null;
	  }
	} catch (error) {
	  console.error('Error:', error);
	  return null;
	} finally {
	//   setLoading(false);
	}
  };
  