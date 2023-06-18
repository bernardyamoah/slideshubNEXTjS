'use client'
import { useEffect, useState } from 'react';
import { getCourses,getProgramDetails,getProgramName} from '@/lib/functions';
import Link from 'next/link';
import Loading from '../../../../../components/ui/Cloading';
import { Suspense } from 'react';
import toast, {Toaster} from 'react-hot-toast';
import { useSearchParams } from 'next/navigation'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

interface Course {
  $id: string;
  campusId: string;
  image: string;
  name: string;
  courseCode: string;
  credit: number;
  programId: string; // Added programId property
  year: string;
  semester: string; // Added semester property
  
}

interface Props {
  params: {
    programId: string;
    campusId: string;
    name:string;
  };
}

export default function CourseList() {
  const searchParams = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Sta
 const programId = searchParams?.get('programId') ?? '';
  const programName = searchParams?.get('name'); 
  let campusId = searchParams?.get('campusId');
  //  const campusId = searchParams?.get('campusId');

  
  useEffect(() => {
    async function fetchCourses() {
      try {
        const programName = await getProgramName(programId);
        const programDetails = await getProgramDetails(programId); // Fetch program details
        const campusId  = programDetails?.campusId;
    
        const response = await toast.promise(getCourses(),
        {
          loading: `fetctching courses from ${programName} database...`,
          success: <b>Successfully fetched courses</b>,
          error: <b>Failed to fetch courses ${programName}.</b>,
        });
  
    
        setCourses(response);
        setIsLoading(false); // Set loading state to false when data is fetched
      } catch (error) {
  
        setIsLoading(false); // Set loading state to false if there's an error

      }
    }

    fetchCourses()
  }, [programId, programName]);

  const filteredCourses = courses.filter((course) => course.programId === programId);
  
  const data = [
    {
      label: "Level 100",
      value: "level 100",
    
    },
    {
      label: " Level 200",
      value: "Level 200",
      
    },
    {
      label: "Level 300",
      value: "Level 300",
    
    },
    {
      label: "Level 400",
      value: "Level 400",
    
    },
      
  ];
  return (
    <>
      <main className="card_container">
        <section className="heading-link">
        <h2 className='text-center'>{programName}</h2>
          <p>
            <Link href="/">home</Link> / <Link href={`/campus`}>campus</Link> /<Link href={`/campus/${campusId}/programs`}>programs</Link> / courses
          </p>
        
        </section>

        

        
        
        
        
        
        
        
        
        
        <section className="md:container relative mx-auto flex flex-col items-center pb-10">
          <div id="myUL">
          <Tabs >
<TabsHeader className='max-w-2xl mx-auto mb-10'>
    {data.map(({ label, value }) => (
      <Tab key={value} value={value} className='text-sm font-title sm:text-base font-medium'>
        {label}
      </Tab>
    ))}
  </TabsHeader>
  <TabsBody>
  
      {/* Render course list for year 1 */}
      {data.map(({ value }) => (
  <TabPanel key={value} value={value}>
    <ul className="md:container max-w-4xl grid sm:grid-cols-2 md:grid-cols-3 gap-8 pb-10">
      <Suspense fallback={<Loading />}>
        {filteredCourses.filter((course) => course.year === value).length > 0 ? (
          filteredCourses
            .filter((course) => course.year === value)
            .map((course) => (
              <aside
                key={course.$id}
                className="relative block shadow-xl backdrop-blur-md transition-all hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-emerald-500/10 overflow-hidden duration-300 ease-in-out border-4 border-gray-200 hover:shadow-xl cursor-pointer dark:border-gray-600 rounded-3xl w-full bg-white dark:bg-transparent"
              >
                <Link
                  href={{
                    pathname: `/campus/${campusId}/programs/${programId}/course/${course.$id}`,
                    query: { courseId: course.$id, name: course.name }
                  }}
                  shallow
                  passHref
                  className="card_link group"
                >
                  <div className="card_image_wrapper">
                    <img
                      className="card_image group-hover:scale-105"
                      src={course.image}
                      alt={course.name}
                    />
                  </div>
                  <div className="text_container">
                    <h3 className="card_heading">{course.name}</h3>
                    <p className="course-code">
                      <span className="text-gray-400 mr-2 sm:hidden">{course.courseCode}</span>
                      <span className="text-gray-400 mr-2 sm:hidden">credit: {course.credit}</span>
                    </p>
                  </div>
                </Link>
              </aside>
            ))
        ) : (
          <p>No courses available for this level.</p>
        )}
      </Suspense>
    </ul>
  </TabPanel>
))}

  
  
    
  </TabsBody>
</Tabs>

      
          </div>
        </section>
        <Toaster />
      </main>
    </>
  );
}