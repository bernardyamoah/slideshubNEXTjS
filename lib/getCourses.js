import { databases } from '@/appwrite';

export const getCourses = async () => {
  try {
    const response = await databases.listDocuments('647aa17f066dff9cad24'); // Replace with your collection ID
    console.log(response);
    return response.documents;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
