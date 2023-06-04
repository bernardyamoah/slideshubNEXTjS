import { databases } from '@/appwrite';

export const getCampus = async () => {
  try {
    const response = await databases.listDocuments(
      
      process.env.NEXT_PUBLIC_DATABASE_ID, // Replace with your database ID
      '647a94c632b8aeb6b530'
    ); // Replace with your collection ID
    console.log(response.documents);
    return response.documents;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
