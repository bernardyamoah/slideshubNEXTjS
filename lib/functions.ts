
import toast, { Toaster } from 'react-hot-toast';

import { databases, ID,Query,account, storage, client } from "@/appwrite";
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
  (doc) => doc.name === campusData.name && doc.location === campusData.location
);

if (existingCampus) {
  errorMessage('A campus with the same name already exists.');
  return;
}

    const response = await toast.promise(databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!, // Replace with your Database ID
      process.env.NEXT_PUBLIC_CAMPUSES_COLLECTION_ID!, // Replace with your collection ID
      ID.unique(),
      campusData
    ),
    {
      loading: 'Creating campus...',
      success: 'Campus created! 🎉',
      error: 'Failed to create campus',
    }
  );
    return response;
  } catch (error) {
    throw error;
    errorMessage("Error: " + error);
  }
};

// Create course function
export const createCourse=async (courseData: CourseData) => {
    try{
      // Retrieve all documents from the collection
const responseCampus = await databases.listDocuments(
  process.env.NEXT_PUBLIC_DATABASE_ID!, // Replace with your Database ID
  process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID! // Replace with your collection ID
);

const documents = responseCampus.documents;

// Check if a document with the same name already exists
const existingCourse = documents.find(
  (doc) => doc.name === courseData.name && doc.programId === courseData.programId

);

if (existingCourse ) {
errorMessage('This course  already exists.');
  return;
}
      
      
      
      
      const data= await databases.createDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID!,ID.unique(),
        courseData
    );
  
    successMessage('Course created! 🎉')
    return data}
    catch(error){
      errorMessage('Error creating course')
        throw error
    }
}

// Create program function
export const createProgram = async (programData: ProgramData) => {
  try {

      // Retrieve all documents from the collection
      const responseProgram = await  databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!, // Replace with your Database ID
        process.env.NEXT_PUBLIC_PROGRAMMES_COLLECTION_ID! // Replace with your collection ID
      
    );
      const documents = responseProgram.documents;
      
      // Check if a document with the same name already exists
      const existingProgram = documents.find(
        (doc) => doc.name === programData.name  && doc.campusId === programData.campusId
      );
      
      if (existingProgram ) {
        errorMessage('This program  already exists.');
        return;
      }



    const response = await await toast.promise(databases.createDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!, // Replace with your Database ID
    process.env.NEXT_PUBLIC_PROGRAMMES_COLLECTION_ID!, // Replace with your collection ID
      ID.unique(),
       programData 
    ),
    {
      loading: 'Creating Program...',
      success: 'Program created! 🎉',
      error: 'Failed to create Program',
    }
  );
    return response;
  } catch (error) {
    errorMessage('Error creating program')
    throw error; // Optionally, you can rethrow the error to handle it in the caller function
  }
};




export const createBook=async (bookData: BooksData) => {
  try{
    // Retrieve all documents from the collection
const responseCampus = await toast.promise(databases.listDocuments(
process.env.NEXT_PUBLIC_DATABASE_ID!, // Replace with your Database ID
process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID! // Replace with your collection ID
),
{
  loading: 'Retrieving documents...',
  success: '',
  error: 'Failed to retrieve documents',
}
);

const documents = responseCampus.documents;

// Check if a document with the same name already exists
const existingBook = documents.find(
(doc) => doc.name === bookData.name 

);

if (existingBook ) {
errorMessage('This book  already exists.');
return;
}
    
    
    
    
    const data= await toast.promise(databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID!,ID.unique(),
      bookData
  ),
  {
    loading: 'Creating book...',
    success: 'Book created! 🎉',
    error: 'Failed to create book',
  }
);

  return data}
  catch(error){
    errorMessage('Error adding book')
      throw error
  }
}


export const createSlide=async (slideData: SlidesData) => {
  try{
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
    
    
    
    
    const data= await toast.promise(databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!,ID.unique(),
      slideData
  ),
  {
    loading: 'Creating slide...',
    success: 'Slides uploaded! 🎉',
    error: 'Failed to upload slides',
  }
);
  return data}
  catch(error){
    errorMessage('Error adding slide')
      throw error
  }
}

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
    const response = await  databases.listDocuments(
      databaseId,
      process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID! // Replace with your collection ID
    );
    console.log("🚀 getCourses ~ response:", response)

    return response.documents;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// export const getCoursesById = async (id): Promise<any[]> => {

//   if (!databaseId) {
//     throw new Error("Database ID is not defined");
//   }

//   try {
//     const response = await  databases.listDocuments(
//       databaseId,
//       process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID! // Replace with your collection ID
//     );

//     return response.documents;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

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
      process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID! // Replace with your collection ID
    )

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
      [Query.equal("programId", programId),
      Query.limit(100)]);
    console.log("🚀 ~ file: functions.ts:366 ~ getCoursesByProgramId ~ response:", response)

    // Return the courses data
    return response.documents;
  } catch (error) {
    throw new Error('Failed to fetch courses by programId: ' + error);
  }
}


export const getProgramsByCampusId = async (id: string) => {
  try {
    
    // Fetch the courses by programId
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_PROGRAMMES_COLLECTION_ID!,
      [Query.equal("campusId", id)], // Filter documents by the campus ID
    );


    // Return the courses data
    return response.documents;
  } catch (error) {
    throw new Error('Failed to fetch courses by programId: ' + error);
  }
}


export async function getProgramName(programId:string) {
  try {
    // Fetch the program document from Appwrite database
    const program = await databases.getDocument(process.env.NEXT_PUBLIC_DATABASE_ID!,

      process.env.NEXT_PUBLIC_PROGRAMMES_COLLECTION_ID!,programId);
  
    // Extract and return the program name
    return program.name;
  } catch (error) {
    console.error('Failed to fetch program name:', error);
    throw error;
  }
}
export async function getProgramDetails(programId:string) {
  try {
    // Fetch the program document from Appwrite database

    const response = await databases.getDocument(process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_PROGRAMMES_COLLECTION_ID!,programId);
    
      if (response.$id) {
        const campusId = response.campusId;
        const name=response.name;
        return {campusId, name};
      } else {
        return null;
      }
  } catch (error) {
    console.error('Failed to fetch program name:', error);
    throw error;
  }
}


export async function getCourseDetails(courseId:string) {
  try {
    // Fetch the program document from Appwrite database
  
    const response = await databases.getDocument(process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID!,courseId);
    
      if (response.$id) {
        const programId = response.programId;
        const name=response.name;
        return {programId, name};
      } else {
        return null;
      }
  } catch (error) {
    console.error('Failed to fetch program name:', error);
    throw error;
  }
}







export const formatTime = (timePosted: string) => {
  return new Date(timePosted).toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
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
export const signUp = async (name: string, email: string, password: string, router: any) => {
  try {
    await account.create(ID.unique(), email, password, name);
    successMessage("Account created! 🎉");
    router.push("/login");
  } catch (error) {
    errorMessage("Check your network / User already exists ❌");
    router.push("/login");
  }
};

// Login function
export const logIn = async (email: string, setEmail: (email: string) => void, password: string, setPassword: (password: string) => void, router: any) => {
  try {
    await account.createEmailSession(email, password);
    successMessage("Welcome back! 🎉");
    setEmail("");
    setPassword("");
    router.push("/dashboard");
  } catch (error) {
    console.error(error);
    errorMessage("Invalid credentials ❌");
  }
};

// Logout function
export const logOut = async (router: any) => {
  try {
    await account.deleteSession("current");
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
 return UserId
  
  } catch (error) {
  
  }
};

export const getCurrentUserAndSetUser = async (): Promise<UserWithId | null> => {
  try {
    const userdata = await getCurrentUser(); // Call the getCurrentUser function
    const userWithId: UserWithId | null = userdata ? { ...userdata, id: userdata.$id } : null;
    return userWithId;
  } catch (error) {
    // Handle the error
    return null;
  }
};






// Check authentication status function
export const checkAuthStatus = async (setUser: (user: any) => void, setLoading: (loading: boolean) => void, router: any) => {
  try {
    const request = await account.get();
    setUser(request);
    setLoading(false);
  } catch (error) {
    router.push("/");
  }
};
//👇🏻 Appwrite authenticate and get user's tickets
export const checkAuthStatusDashboard = async (
  setUser: (user: any) => void,
  setLoading: (loading: boolean) => void,
  setSlides: (slides: any[]) => void,
  router: any
) => {
  try {
    const request = await account.get();
    getUserSlides(request.$id, setSlides, setLoading);
    setUser(request)
  } catch (err) {
    router.push("/");
  }
};



const getUserSlides = async (
  id: string,
  setSlides: (slides: any[]) => void,
  setLoading: (loading: boolean) => void
): Promise<any[]> => {
  if (!databaseId) {
    throw new Error("Database ID is not defined");
  }

  try {
    setLoading(true);

  
        // Fetch the updated slides and update the state
        try {
          const response = await databases.listDocuments(
            databaseId!,
            process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!,
            [Query.equal("user_id", id),
            Query.limit(100)]
          );
          setSlides(response.documents);
          setLoading(false);
        } catch (error) {
          console.error(error);
          throw error;
        }
  
    

    // Fetch the initial slides
    const response = await databases.listDocuments(
      databaseId!,
      process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!,
      [Query.equal("user_id", id)]
    );
    setSlides(response.documents);
    setLoading(false);

    return response.documents;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
//👇🏻 extract file ID from the document
const extractIdFromUrl = (url:string) => {
	const regex = /files\/([^/]+)\//;
	const match = url.match(regex);
	return match ? match[1] : null;
};
//👇🏻 delete a ticket
export const deleteSlide = async (id:string) => {
	try {
		const getDoc = await databases.getDocument(
			databaseId!,
			process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!,
			id
		);
    const fileID = extractIdFromUrl(getDoc.fileUrl);
  
    
		if (getDoc.$id === id && fileID !== null) {
      await storage.deleteFile(process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!, fileID);
			await databases.deleteDocument(
        databaseId!,
				process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!,
				id
			);
// Page refresh after successful deletion
window.location.reload();
		} else {
			
		errorMessage('Failed to delete Slide ❌')
		}
		successMessage("Ticket deleted! 🎉");
	} catch (err) {

		errorMessage("Action declined ❌");
	}
};

export const updateSlide = async (id: string, updatedAttributes: any) => {
  try {
    // Retrieve the document from the Appwrite database
    const getDoc = await databases.getDocument(
      databaseId!, // Replace with your database ID
      process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!, // Replace with your collection ID
      id
    );

    // Check if the retrieved document matches the provided ID
    if (getDoc.$id === id) {
      // Extract the file ID from the document's URL
      const fileID = extractIdFromUrl(getDoc.fileUrl);


      // Merge the updated attributes with the existing document attributes
      const updatedDoc = { ...getDoc, ...updatedAttributes };

      // Update the document with the merged attributes
      await databases.updateDocument(
        databaseId!, // Replace with your database ID
        process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!, // Replace with your collection ID
        id,
        updatedDoc
      );
    }
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error('Failed to update slide:', error);
  }
};

