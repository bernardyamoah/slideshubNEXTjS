import { databases } from '@/appwrite';

export const getCourses = async () => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      '647aa17f066dff9cad24'); // Replace with your collection ID
  
    return response.documents;
  } catch (error) {
    errorMessage(error);
    throw error;
  }
};
