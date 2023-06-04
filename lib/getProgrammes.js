import { databases } from '@/appwrite';

export const getPrograms = async () => {
  try {
    const response = await databases.listDocuments('647a9a04835e4b8b9fc2'); // Replace with your collection ID
    console.log(response);
    return response.documents;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
