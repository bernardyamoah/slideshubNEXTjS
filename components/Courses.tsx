'use client'
import React, { useCallback, useState } from 'react';
import { useCourses } from '@/customHooks/useCourses';
import CoursesCard from './allCourses';
import PaginationComponent from './PaginationComponent';
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
  const courses:Course[] = useCourses();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const changePage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);
  return (
    <>
      {courses.map((course) => (
       <CoursesCard key={course.$id} course={course} />
      ))}
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