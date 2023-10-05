
import { Card, CardContent, CardTitle } from './ui/card';
import { CourseEdit } from '../app/dashboard/_components/course-edit';
import React from 'react';




const CoursesCard = ({course, courses, setCourses}:CourseCardProps) => {
  
  return (

    <Card 
      className="relative block p-4 overflow-hidden border rounded-lg shadow-md  lg:p-6"
    >
      <span
        className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-emerald-600 to-emerald-700"
      ></span>

      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
        <CardTitle className=" leading-2 tracking-wider capitalize text-2xl [text-wrap:balance] mt-4 ">
          {course.name.replace(/_/g, ' ').toLocaleLowerCase()}
        </CardTitle>
          <div className="absolute flex justify-end flex-1 gap-1 text-xs text-gray-500 right-1 top-2 dark:text-gray-500/90">
            <CourseEdit course={course} key={course.$id} courses={courses} setCourses={setCourses}/>
          </div>
          <p className="mt-1  text-zinc-700 text-xs">Posted by  </p><span className=" text-muted-foreground text-xs font-medium">{course.user_id}</span>
        </div>

      
      </div>


      <CardContent className='!p-0'>
        <dl className="flex justify-between flex-wrap gap-4 mt-6 text-[0.65rem]">

          <div className="flex flex-col max-w-fit justify-between">
            <dt className="text-xs font-medium text-zinc-700">Semester</dt>
            <dd className="text-xs text-muted-foreground capitalize">{course.semester}</dd>
          </div>
          <div className="flex flex-col max-w-fit justify-between">
            <dt className="text-xs font-medium text-zinc-700">Course Code</dt>
            <dd className="text-xs text-muted-foreground">{course.courseCode}</dd>
          </div>
          <div className="flex flex-col max-w-fit justify-between">
            <dt className="text-xs font-medium text-zinc-700">Lecturer</dt>
            <dd className="text-xs text-muted-foreground">{course.lecturer}</dd>
          </div>
          <div className="flex flex-col max-w-fit justify-between">
            <dt className="text-xs font-medium text-zinc-700">Year</dt>
            <dd className="text-xs text-muted-foreground">{course.year}</dd>
          </div>
          <div className="flex flex-col max-w-fit justify-between">
            <dt className="text-xs font-medium text-zinc-700">Credit </dt>
            <dd className="text-xs text-muted-foreground">{course.credit} {' '}Hour(s)</dd>
          </div>
        </dl>
      </CardContent>

    </Card>
  );
};

export default CoursesCard;
