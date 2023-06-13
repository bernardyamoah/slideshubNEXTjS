import { toast } from "react-toastify";
import { databases, ID,Query } from "@/appwrite";
const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
// Success toast notification
export const successMessage = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  });
};

// Error toast notification
export const errorMessage = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  });
};
// Error toast notification
export const warnMessage = (message: string) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  });
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
  (doc) => doc.name === campusData.name && doc.location === campusData.location
);

if (existingCampus) {
  warnMessage('A campus with the same name already exists.');
  return;
}

    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!, // Replace with your Database ID
      "647a94c632b8aeb6b530", // Replace with your collection ID
      ID.unique(),
      campusData
    );
    successMessage("Campus created! 🎉");
    return response;
  } catch (error) {
    errorMessage("Error: " + error);
    throw error;
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
  warnMessage('This course  already exists.');
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
      const responseCampus = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!, // Replace with your Database ID
        process.env.NEXT_PUBLIC_PROGRAMMES_COLLECTION_ID! // Replace with your collection ID
      );
      
      const documents = responseCampus.documents;
      
      // Check if a document with the same name already exists
      const existingCourse = documents.find(
        (doc) => doc.name === programData.name  && doc.campusId === programData.campusId
      );
      
      if (existingCourse ) {
        warnMessage('This program  already exists.');
        return;
      }






    const response = await databases.createDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!, // Replace with your Database ID
    process.env.NEXT_PUBLIC_PROGRAMMES_COLLECTION_ID!, // Replace with your collection ID
      ID.unique(),
       programData 
    );
    successMessage('Program created Successfully')
    return response;
  } catch (error) {
    errorMessage('Error creating program')
    throw error; // Optionally, you can rethrow the error to handle it in the caller function
  }
};

export const createBook=async (bookData: BooksData) => {
  try{
    // Retrieve all documents from the collection
const responseCampus = await databases.listDocuments(
process.env.NEXT_PUBLIC_DATABASE_ID!, // Replace with your Database ID
process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID! // Replace with your collection ID
);

const documents = responseCampus.documents;

// Check if a document with the same name already exists
const existingBook = documents.find(
(doc) => doc.name === bookData.name 

);

if (existingBook ) {
warnMessage('This book  already exists.');
return;
}
    
    
    
    
    const data= await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID!,ID.unique(),
      bookData
  );

  successMessage('Book created! 🎉')
  return data}
  catch(error){
    errorMessage('Error adding book')
      throw error
  }
}


export const createSlide=async (slideData: SlidesData) => {
  try{
    // Retrieve all documents from the collection
const responseCampus = await databases.listDocuments(
process.env.NEXT_PUBLIC_DATABASE_ID!, // Replace with your Database ID
process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID! // Replace with your collection ID
);

const documents = responseCampus.documents;

// Check if a document with the same name already exists
const existingSlides = documents.find(
(doc) => doc.name === slideData.name && doc.programId === slideData.programId

);

if (existingSlides ) {
warnMessage('This slide  already exists.');
return;
}
    
    
    
    
    const data= await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID!,ID.unique(),
      slideData
  );

  successMessage('Slides uploaded 🎉')
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
    console.log(error);
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
      process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID! // Replace with your collection ID
    );

    return response.documents;
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
export async function getCoursesByProgramId(programId: string): Promise<any[]> {
  try {
    
    // Fetch the courses by programId
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_PROGRAMMES_COLLECTION_ID!,
       [Query.equal('programId',[programId])
        ]);

    // Return the courses data
    return response.documents;
  } catch (error) {
    throw new Error('Failed to fetch courses by programId: ' + error);
  }
}



















// Sign-up function
// export const signUp = async (name: string, email: string, password: string, router: any) => {
//   try {
//     await account.create(ID.unique(), email, password, name);
//     successMessage("Account created! 🎉");
//     router.push("/login");
//   } catch (error) {
//     errorMessage("Check your network / User already exists ❌");
//     router.push("/login");
//   }
// };

// Login function
// export const logIn = async (email: string, setEmail: (email: string) => void, password: string, setPassword: (password: string) => void, router: any) => {
//   try {
//     await account.createEmailSession(email, password);
//     successMessage("Welcome back! 🎉");
//     setEmail("");
//     setPassword("");
//     router.push("/dashboard");
//   } catch (error) {
//     console.error(error);
//     errorMessage("Invalid credentials ❌");
//   }
// };

// Logout function
// export const logOut = async (router: any) => {
//   try {
//     await account.deleteSession("current");
//     router.push("/");
//     successMessage("See you later! 🎉");
//   } catch (error) {
//     console.error(error);
//     errorMessage("Encountered an error 😪");
//   }
// };

// Check authentication status function
// export const checkAuthStatus = async (setUser: (user: any) => void, setLoading: (loading: boolean) => void, router: any) => {
//   try {
//     const request = await account.get();
//     setUser(request);
//     setLoading(false);
//   } catch (error) {
//     router.push("/");
//   }
// };
