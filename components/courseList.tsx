'use client'
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LevelTabItems } from '@/lib/navRoute';
import CourseCard from './CourseCard';
import EmptyCourse from './EmptyCourse';

import { errorMessage, getCoursesByProgramId, successMessage } from '@/lib/functions';
import Loading from './ui/Cloading';

const CourseList = ({ programId, campusId}) => {
const [courses, setCourses] = useState<Course[]>([]);
  const [selectedTab, setSelectedTab] = useState(LevelTabItems[0].value);
const [loading, setLoading]=useState(true)
  useEffect(() => {
    // Fetch courses based on the programId
    const fetchCourses = async () => {
      try {
        const response = await getCoursesByProgramId(programId)
        setCourses(response);
        setLoading(false);
        successMessage('Courses fetched successfully')  
      } catch (error) {
        
        errorMessage('Error fetching courses')
      }
    };

    fetchCourses();
  }, [programId]);

  if(loading){
    return <Loading/>}
  return (
    <div>
      {/* <h2>Course List of : {programId}</h2> */}

      <Tabs value={selectedTab} className='relative flex flex-col w-full'>
                  <TabsList className="relative mx-auto mb-16 min-w-fit">
          {LevelTabItems.map(({ label, value }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="relative text-xs font-medium sm:text-sm text-zinc-500 hover:text-zinc-800 dark:text-zinc-200 dark:hover:text-zinc-100"
              onClick={() => setSelectedTab(value)}
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
    
        {LevelTabItems.map(({ value }) => (
          <TabsContent key={value} value={value}>
            {courses.filter((course) => course.year === value).length > 0 ? (
              <div className="grid grid-cols-1 gap-10 px-4 pb-10 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                {courses
                   .filter((course) => course.year === value)
                   .map((course) => (
                      <CourseCard key={course.$id} course={course} campusId={campusId} />
                   ))}               </div>
             ) : (
              <div className="flex justify-center w-full">
                 <EmptyCourse />
               </div>
             )}
           </TabsContent>
        ))}
                
       
                </Tabs>
    </div>
  );
};

export default CourseList;
