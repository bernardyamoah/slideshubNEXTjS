'use client'
import React, { useCallback, useEffect, useState } from 'react';
import CoursesCard from './allCourses';
import PaginationComponent from './PaginationComponent';
import { getAllCourses,  getTotalCourses } from '@/lib/functions';
import LoadingScreen from '@/app/dashboard/components/LoadingScreen';
interface Course {
  $id: string;
  name: string;
  semester: string;
  courseCode: string;
  credit: number;
  lecturer: string;
  programId: string;
  year: number;
  $createdAt: string;
  user_id: string;
}




const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    // Fetch total number of courses and calculate total pages
    const fetchTotalCourses = async () => {
      const totalCourses = await getTotalCourses(); // Implement getCourses function to fetch total courses
      const totalPages = Math.ceil(totalCourses / 10); // Assuming 10 courses per page
      setTotalPages(totalPages);
       // Assuming 10 courses per page
      setTotalPages(totalPages);
    };

    fetchTotalCourses();
  }, []);









  useEffect(() => {
    // Fetch courses for the current page
    const fetchCourses = async () => {
      
    
      const fetchedCourses = await getAllCourses(currentPage,setLoading); // Implement getCourses function to fetch courses with pagination
    
      // Update courses state with fetched courses
      setCourses(fetchedCourses);
    };

    fetchCourses();
  }, [currentPage]);

  const changePage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <>
    {loading && <LoadingScreen />}
    <aside className= 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  grid mx-auto py-6 gap-8 auto-rows-auto '>
      {courses.map((course) => (
       <CoursesCard key={course.$id} course={course} />
      ))}
      </aside>
      {courses.length > 0 && (
                  <PaginationComponent
                    pageCount={totalPages}
                    activePage={currentPage}
                    onPageChange={changePage}
                  />
                )}
    </>
  );
};

export default Courses;
// grid gap-8 mt-6 sm:grid-cols-2 md:grid-cols-3