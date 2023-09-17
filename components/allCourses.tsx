
import { Card, CardContent, CardTitle } from './ui/card';
import { CourseEdit } from './course-edit';
import React from 'react';




const CoursesCard = ({course}:CourseCardProps) => {
  // const formattedTime = formatTime(timePosted);

  return (

    <Card 

      className="relative block p-4 overflow-hidden border rounded-lg shadow-md  lg:p-6"
    >
      <span
        className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-emerald-600 to-emerald-700"
      ></span>

      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
        <CardTitle className=" leading-2 tracking-wider capitalize text-sm   ">
          {course.name.replace(/_/g, ' ').toLocaleLowerCase()}
        </CardTitle>
          <div className="absolute flex justify-end flex-1 gap-1 text-xs text-gray-500 right-1 top-2 dark:text-gray-500/90">
            <CourseEdit course={course} key={course.$id}/>
          </div>
          <p className="mt-1 text-xs font-medium text-gray-600">Posted by  <span className=" text-accent-foreground">{course.user_id}</span></p>
        </div>

      
      </div>


      <CardContent className='!p-0'>
        <dl className="grid grid-cols-2 gap-4 mt-6 text-[0.65rem]">

          <div className="flex flex-col justify-between">
            <dt className="text-xs font-medium text-foreground-accent">Semester</dt>
            <dd className="text-xs text-gray-500 capitalize">{course.semester}</dd>
          </div>
          <div className="flex flex-col justify-between">
            <dt className="text-xs font-medium text-foreground-accent">Course Code</dt>
            <dd className="text-xs text-gray-500">{course.courseCode}</dd>
          </div>
          <div className="flex flex-col justify-between">
            <dt className="text-xs font-medium text-foreground-accent">Lecturer</dt>
            <dd className="text-xs text-gray-500">{course.lecturer}</dd>
          </div>
          <div className="flex flex-col justify-between">
            <dt className="text-xs font-medium text-foreground-accent">Year</dt>
            <dd className="text-xs text-gray-500">{course.year}</dd>
          </div>
          <div className="flex flex-col justify-between">
            <dt className="text-xs font-medium text-foreground-accent">Credit </dt>
            <dd className="text-xs text-gray-500">{course.credit} {' '}Hour(s)</dd>
          </div>
        </dl>
      </CardContent>

    </Card>
  );
};

export default CoursesCard;
