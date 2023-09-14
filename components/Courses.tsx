// components/Courses.tsx
import React from 'react';
import CoursesCard from './allCourses';

interface CoursesProps {
  courses: Course[];
}

const Courses: React.FC<CoursesProps> = ({ courses }) => (
  <>
    {courses.map((course) => (
      <CoursesCard key={course.$id} id={course.$id} {...course} timePosted={course.$createdAt} />
    ))}
  </>
);

export default Courses;