import toast, { Toaster } from "react-hot-toast";

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
import { users } from "./AppwiteNodeJs";
const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
// Success toast notification
export const successMessage = (message: string) => {
	toast.success(message, {
		position: "top-right",
	});
};

// Error toast notification
export const errorMessage = (message: string) => {
	toast.error(message, {
		position: "top-right",
	});
};
// Error toast notification
export const warnMessage = (message: string) => {
	toast.custom(message, {
		position: "top-right",
	});
};

// Error toast notification

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
		errorMessage("Error: " + error);
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

export const createBook = async (bookData: BooksData) => {
	try {
		// Retrieve all documents from the collection
		const responseCampus = await toast.promise(
			databases.listDocuments(
				process.env.NEXT_PUBLIC_DATABASE_ID!, // Replace with your Database ID
				process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID! // Replace with your collection ID
			),
			{
				loading: "Retrieving documents...",
				success: "",
				error: "Failed to retrieve documents",
			}
		);

		const documents = responseCampus.documents;

		// Check if a document with the same name already exists
		const existingBook = documents.find((doc) => doc.name === bookData.name);

		if (existingBook) {
			errorMessage("This book  already exists.");
			return;
		}

		const data = await toast.promise(
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

		return data;
	} catch (error) {
		errorMessage("Error adding book");
		throw error;
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

		const data = await 
			databases.createDocument(
				process.env.NEXT_PUBLIC_DATABASE_ID!,
				process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!,
				ID.unique(),
				slideData
			)
		return data;
	} catch (error) {
		errorMessage("Error adding slide");
		throw error;
	}
};

// =====================================================================

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
export const getAllCourses = async (currentPage: number,setLoading: (loading: boolean) => void): Promise<any[]> => {
	const limit = 9; // Set your desired number of courses per page
	
	if (!databaseId) {
		throw new Error("Database ID is not defined");
	}
	setLoading(true);
	try {
		const response = await databases.listDocuments(
			databaseId,
			process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID!,
			[Query.limit(limit), Query.offset((currentPage - 1) * limit), Query.orderDesc("$createdAt")]
		);
		

		
		setLoading(false);
		return response.documents;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const getTotalCourses = async (): Promise<number> => {
	if (!databaseId) {
		throw new Error("Database ID is not defined");
	}

	try {
		const response = await databases.listDocuments(
			databaseId,
			process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID!,
			[ Query.orderDesc("$createdAt")]
		);
		
		return response.total;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
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

// Get Programs
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

export const getSlidesByCourseId = async (courseId:string): Promise<any[]> => {
	console.log("🚀 ~ file: functions.ts:367 ~ getSlidesByCourseId ~ courseId:", courseId)
	if (!databaseId) {
		throw new Error("Database ID is not defined");
	}

	try {
		const response = await databases.listDocuments(
			databaseId,
			process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!, // Replace with your collection ID
			[Query.limit(99), Query.equal("courseId", courseId)]
		);
		console.log("🚀 ~ file: functions.ts:379 ~ getSlidesByCourseId ~ response.documents:", response.documents)

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
			[Query.equal("programId", programId), Query.limit(99)]
		);

		// Return the courses data
		return response.documents;
	} catch (error) {
		throw new Error("Failed to fetch courses by programId: " + error);
	}
}

export const getProgramsByCampusId = async (id: string) => {
	try {
		// Fetch the courses by programId
		const response = await databases.listDocuments(
			process.env.NEXT_PUBLIC_DATABASE_ID!,
			process.env.NEXT_PUBLIC_PROGRAMMES_COLLECTION_ID!,
			[Query.equal("campusId", id)] // Filter documents by the campus ID
		);

		// Return the courses data
		return response.documents;
	} catch (error) {
		throw new Error("Failed to fetch courses by programId: " + error);
	}
};

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
		return `${daysDiff} ${daysDiff === 1 ? "day" : "d"} ago`;
	} else if (hoursDiff > 0) {
		return `${hoursDiff} ${hoursDiff === 1 ? "hour" : "hrs"} ago`;
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

// Sign-up function
export const signUp = async (
	name: string,
	email: string,
	password: string,
	router: any
) => {
	try {
		await account.create(ID.unique(), email, password, name);
		// await account.createVerification(email);
		await account.createEmailSession(email, password);

		successMessage("Account created! 🎉");
		router.push("/dashboard");
	} catch (error) {
		errorMessage("Check your network / User already exists ❌");
		router.push("/register");
	}
};

// Login function
export const logIn = async (
	email: string,
	setEmail: (email: string) => void,
	password: string,
	setPassword: (password: string) => void,
	router: any
) => {
	try {
		await account.createEmailSession(email, password);
		
	
		
		successMessage("Welcome back! 🎉");
		router.push("/dashboard");

	
	
	} catch (error) {
		errorMessage("Invalid credentials ❌");
	}
};

// Logout function
export const logOut = async (router: any) => {
	try {
		const sessID = (await account.getSession("current")).$id;

		await account.deleteSession(sessID);
		router.push("/");
		successMessage("See you later! 🎉");
	} catch (error) {
		console.error(error);
		errorMessage("Encountered an error 😪");
	}
};

export const getCurrentUser = async () => {
	try {
		const UserId = await account.get();
		return UserId;
	} catch (error) {}
};

export const getCurrentUserAndSetUser =
	async (): Promise<UserWithId | null> => {
		try {
			const userdata = await getCurrentUser(); // Call the getCurrentUser function
			const userWithId: UserWithId | null = userdata
				? { ...userdata, id: userdata.$id }
				: null;

			return userWithId;
		} catch (error) {
			// Handle the error
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

//👇🏻 Appwrite authenticate and get user's slides
// export const checkAuthStatusDashboard = async (
// 	setUser: (user: any) => void,
// 	setLoading: (loading: boolean) => void,
// 	setSlides: (slides: any[]) => void,
// 	setTotalPages: (totalPages: number) => void, // Add setTotalPages function
// 	setCourses: (courses: Course[]) => void, // Add setCourses function
	
// 	page: number // Dynamically set page number
// ) => {
// 	try {
// 		const request = await account.get();
// 		const userId = request.$id;

// 		const perPage = 12; // Number of slides per page

// 		const totalPages = await getTotalPages(userId, perPage); // Get the total number of pages

// 		getUserSlides(userId, page, perPage, setSlides, setLoading);
// 		const courses = await getCourses();
// 		setUser(request);
// 		setCourses(courses); // Set user courses
// 		setTotalPages(totalPages); // Set the total number of pages
// 	} catch (err) {
// 		throw new Error('error')
// 	}
// };
export const checkAuthStatusDashboard = async (
	setUser: (user: any) => void,
	setLoading: (loading: boolean) => void,
	
	
	
) => {
	try {
		const request = await account.get();
		
		setUser(request);
		setLoading(false)
		
	} catch (err) {
		throw new Error('error')
	}
};
const getTotalPages = async (
	userId: string,
	perPage: number
): Promise<number> => {
	if (!databaseId) {
		throw new Error("Database ID is not defined");
	}

	try {
		const response = await databases.listDocuments(
			databaseId!,
			process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!,
			[Query.equal("user_id", userId)]
		);

		const totalSlides = response.total;

		const totalPages = Math.ceil(totalSlides / perPage);

		return totalPages;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const getUserSlides = async (
	userId: string,
	page: number,
	setTotalPages: (totalPages: number) => void,

	setSlides: (slides: any[]) => void,
	setLoading: (loading: boolean) => void
): Promise<any[]> => {
	if (!databaseId) {
		throw new Error("Database ID is not defined");
	}
	try {
		setLoading(true);
		const perPage = 12; 
		const totalPages = await getTotalPages(userId, perPage);
		try {
			const response = await databases.listDocuments(
				databaseId!,
				process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!,
				[
					Query.equal("user_id", userId),
					Query.orderDesc("$createdAt"),
					Query.limit(perPage),
					Query.offset((page - 1) * perPage),
				]
			);

			setSlides(response.documents);
			setTotalPages(totalPages)
			setLoading(false);
			return response.documents; // Add this return statement
		} catch (error) {
			console.error(error);
			throw error;
			setLoading(false);
		}

		return []; // Fallback return statement (empty array)
	} catch (error) {
		console.error(error);
		throw error;
	}
};
//👇🏻 extract file ID from the document
export const extractIdFromUrl = (url: string) => {
	const regex = /files\/([^/]+)\//;
	const match = url.match(regex);
	return match ? match[1] : null;
};

//👇🏻 delete a Slide
export const deleteSlide = async (id: string) => {
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
			
			 successMessage("Slide deleted! 🎉");
		} else {
			errorMessage("Failed to delete Slide ❌");
		}
		
	} catch (err) {
		errorMessage("Action declined ❌");
	}
};
export const deleteCourse = async (id: string) => {
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
			
		} else {
			errorMessage("Failed to delete Course ❌");
		}
		successMessage("Course deleted! 🎉");
	} catch (err) {
		errorMessage("Action declined ❌");
	}
};

// export const updateSlide = async (id: string, updatedAttributes: any) => {
//   try {
//     // Retrieve the document from the Appwrite database
//     const getDoc = await databases.getDocument(
//       databaseId!, // Replace with your database ID
//       process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!, // Replace with your collection ID
//       id
//     );

//     // Check if the retrieved document matches the provided ID
//     if (getDoc.$id === id) {
//       // Merge the updated attributes with the existing document attributes
//       const updatedDoc = { ...getDoc, ...updatedAttributes };

//       // Update the document with the merged attributes
//       await databases.updateDocument(
//         databaseId!, // Replace with your database ID
//         process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!, // Replace with your collection ID
//         id,
//         updatedDoc
//       );
//     } else {
//       throw new Error("Slide document not found");
//     }
//   } catch (error) {
//     // Handle any errors that occur during the update process
//     console.error('Failed to update slide:', error);
//     throw error;
//   }
// };

export const updateSlide = async (id: string, updatedAttributes: any) => {
	try {
		// // Retrieve the document from the Appwrite database
		const getDoc = await databases.getDocument(
			databaseId!, // Replace with your database ID
			process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!, // Replace with your collection ID
			id
		);
		// Check if the retrieved document matches the provided ID
		if (getDoc.$id === id) {
			// Update the document with the merged attributes
			await databases.updateDocument(
				databaseId!, // Replace with your database ID
				process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!, // Replace with your collection ID
				id,
				updatedAttributes
			);

			successMessage("Successfully updated slide");
		} else {
			// Handle the case when the document is not found with the provided ID
			errorMessage("Slide not found");
		}
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

// OAuth functions
export const handleGoogleSignIn = async () => {
	try {
		// Define the redirect URL based on the environment
		const redirectUrl =
			process.env.NODE_ENV === "production"
				? "https://slideshub.vercel.app/dashboard"
				: "http://localhost:3000/dashboard";

		// Go to OAuth provider login page (Google)
		await account.createOAuth2Session("google", redirectUrl);
	} catch (error) {
		errorMessage("Error initiating Google OAuth:" + error);
	}
};

export const handleFacebookSignIn = async () => {
	try {
		// Define the redirect URL based on the environment
		const redirectUrl =
			process.env.NODE_ENV === "production"
				? "https://slideshub.vercel.app/dashboard"
				: "http://localhost:3000/dashboard";

		// Go to OAuth provider login page (Facebook)
		await account.createOAuth2Session("facebook", redirectUrl);
	} catch (error) {
		errorMessage("Error initiating Facebook OAuth:" + error);
	}
};

export const handleGithubSignIn = async () => {
	try {
		// Define the redirect URL based on the environment
		const redirectUrl =
			process.env.NODE_ENV === "production"
				? "https://slideshub.vercel.app/dashboard"
				: "http://localhost:3000/dashboard";

		// Go to OAuth provider login page (Github)
		await account.createOAuth2Session("github", redirectUrl);
	} catch (error) {
		errorMessage("Error initiating Github OAuth:" + error);
	}
};

export const handleAppleSignIn = async () => {
	try {
		// Define the redirect URL based on the environment
		const redirectUrl =
			process.env.NODE_ENV === "production"
				? "https://slideshub.vercel.app/dashboard"
				: "http://localhost:3000/dashboard";

		// Go to OAuth provider login page (Apple)
		await account.createOAuth2Session("apple", redirectUrl);
	} catch (error) {
		errorMessage("Error initiating Apple OAuth:" + error);
	}
};

export const handleMicrosoftSignIn = async () => {
	try {
		// Define the redirect URL based on the environment
		const redirectUrl =
			process.env.NODE_ENV === "production"
				? "https://slideshub.vercel.app/dashboard"
				: "http://localhost:3000/dashboard";

		// Go to OAuth provider login page (Microsoft)
		await account.createOAuth2Session("microsoft", redirectUrl);
	} catch (error) {
		errorMessage("Error initiating Microsoft OAuth:" + error);
	}
};

// Get Avatars
// Function to get the user's initials avatar URL
export const getUserInitials = async (name: string) => {
	try {
		const result = await avatars.getInitials(name);

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
		// Get the current user's information

		const response = await account.get();

		const logistics = await account.getSession("current");
		const { countryName, countryCode, ...userSessionData } = logistics;
		const country_icon = await avatars.getFlag(countryCode).href.toString();

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

// Function to update user data
export const updateUserData = async (updatedUserData: ProfileData) => {
	try {
		// Get the current user's information
		const response = await account.get();
		console.log(
			"🚀 ~ file: functions.ts:968 ~ updateUserData ~ response:",
			response
		);

		// Merge the updated user data with the existing user data
		const userData = { ...response, ...updatedUserData };

		// Destructure the userData object to get the individual properties
		const { prefs } = userData;

		// Update the user's preferences if prefs exist
		if (prefs) {
			// Make sure to handle each preference property (bio, avatarUrl, coverPhotoUrl, phoneNumber, country) individually
			const updatedPrefs: Partial<ProfileData["prefs"]> = {};
			console.log(
				"🚀 ~ file: functions.ts:960 ~ updateUserData ~ updatedPrefs:",
				updatedPrefs
			);

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
const generateBreadcrumbs = () => {
	// Get the current page or route
	const currentPage = 'Home' // Replace with your logic to get the current page
  
	// Define the breadcrumb items based on the current page
	let breadcrumbs: { label: string; url: string; }[] = [];
  
	if (currentPage === "Home") {
	  breadcrumbs = [
		{ label: "Home", url: "/" },
	  ];
	} else if (currentPage === "Products") {
	  breadcrumbs = [
		{ label: "Home", url: "/" },
		{ label: "Products", url: "/products" },
	  ];
	} else if (currentPage === "Product Details") {
	  breadcrumbs = [
		{ label: "Home", url: "/" },
		{ label: "Products", url: "/products" },
		{ label: "Product Details", url: "/products/:id" },
	  ];
	}
  
	return breadcrumbs;
  };