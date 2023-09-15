// components/Courses.tsx
import React from 'react';
import { useCourses } from '@/customHooks/useCourses';
import CoursesCard from './allCourses';
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

  return (
    <>
      {courses.map((course) => (
       <CoursesCard key={course.$id} course={course} />
      ))}
    </>
  );
};

export default Courses;