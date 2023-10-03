'use client'
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LevelTabItems } from '@/lib/navRoute';
import CourseCard from './CourseCard';
import EmptyCourse from './EmptyCourse';

import { getCoursesByProgramId } from '@/lib/functions';

const CourseList = ({ programId }) => {
const [courses, setCourses] = useState<Course[]>([]);
  const [selectedTab, setSelectedTab] = useState(LevelTabItems[0].value);

  useEffect(() => {
    // Fetch courses based on the programId
    const fetchCourses = async () => {
      try {
        const response = await getCoursesByProgramId(programId)
            
        setCourses(response);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [programId]);

  return (
    <div>
      {/* <h2>Course List of : {programId}</h2> */}

      <Tabs value={selectedTab}>
                  <TabsList className="max-w-2xl mx-auto mb-10">
          {LevelTabItems.map(({ label, value }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="relative"
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
                      <CourseCard key={course.$id} course={course} courses={courses} setCourses={setCourses} />
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
