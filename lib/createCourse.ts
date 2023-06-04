import {databases,ID} from '@/appwrite'
export const createCourse=async (courseData: CourseData) => {
    try{const data= await databases.createDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_COURSE_COLLECTION_ID!,ID.unique(),
        courseData
    );
    console.log('Course Created:', data.$id)
    return data}
    catch(error){
        console.error('Erir creating course:',error)
        throw error
    }
}