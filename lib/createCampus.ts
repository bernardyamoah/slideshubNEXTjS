import { databases, ID } from '@/appwrite';



export const createCampus = async (campusData: CampusData) => {
  try {
    const response = await databases.createDocument(
      '647a94b5010907ee0223', // Replace with your Database ID
      '647a94c632b8aeb6b530', // Replace with your collection ID
      ID.unique(),
       campusData 
    );
    alert('Campus Created :'+ response);
    return response;
  } catch (error) {
    console.log(error);
    throw error; // Optionally, you can rethrow the error to handle it in the caller function
  }
};
