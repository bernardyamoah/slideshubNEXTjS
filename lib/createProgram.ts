import { databases, ID } from '@/appwrite';



export const createProgram = async (programData: ProgramData) => {
  try {
    const response = await databases.createDocument(
      '647a94b5010907ee0223', // Replace with your Database ID
      '647a9a04835e4b8b9fc2', // Replace with your collection ID
      ID.unique(),
       programData 
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error; // Optionally, you can rethrow the error to handle it in the caller function
  }
};
