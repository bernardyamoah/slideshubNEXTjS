'use client'
import { useState } from "react";
import {
  getCoursesByProgramId,
  getProgramDetails,
  getProgramName,
} from "@/lib/functions";
import { useSearchParams } from "next/navigation";

import EmptyCourse from "@/components/EmptyCourse";

import LoadingScreen from "@/app/dashboard/components/LoadingScreen";

import Head from "next/head";
import { toast } from "react-hot-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CourseCard from "@/components/CourseCard";
import { Separator } from "@/components/ui/separator";


const data = [
  {
    label: "Level 100",
    value: "Level 100",
  },
  {
    label: "Level 200",
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
export default function CourseList() {
  const searchParams = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [programName, setProgramName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const programId = searchParams?.get("programId") ?? "";
  const [selectedTab, setSelectedTab] = useState(data[0].value);

  const pageTitle = `${programName} Courses`;
  const pageDescription = `Browse courses for ${programName} at your campus.`;

  const fetchCourses = async () => {
    try {
      const fetchedProgramName = await getProgramName(programId);
     
      const response = await toast.promise(getCoursesByProgramId(programId), {
        loading: `Fetching courses from ${fetchedProgramName} database..`,
        success: <b>Successfully fetched courses</b>,
        error: <b>Failed to fetch courses {fetchedProgramName}.</b>,
      });

      setProgramName(fetchedProgramName);
      setCourses(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  // Fetch courses when the component is mounted
  if (isLoading) {
    fetchCourses();
  }

 

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <div >
       
        {/* <header className="items-center w-full bg-black h-44 lg:flex justify-cener ">
        <div className="max-w-screen-xl px-4 py-8 mx-auto ">
        <div className="space-y-2 bg-pattern" >
              <h1
                className="text-3xl font-bold tracking-tighter text-center text-transparent sm:text-5xl xl:text-6xl/none bg-clip-text dark:bg-gradient-to-r dark:from-zinc-300 dark:to-zinc-600 bg-gradient-to-r from-white to-zinc-200"
              >
                           {programName}   
              </h1>
              
            </div>
        </div>
      </header> */}
      <div className=" max-w-2xl mx-auto lg:mx-0 ">
        <h2 className="text-3xl font-bold tracking-tight text-transparent dark:text-zinc-100 sm:text-4xl xl:text-6xl/none bg-clip-text dark:bg-gradient-to-r dark:from-zinc-300 dark:to-zinc-600 bg-gradient-to-r from-zinc-950 to-zinc-700 ">  {programName}  
        </h2>
        <p className="mt-4 text-zinc-400">
        Select a level to explore the offered courses.

        </p>
      </div>
      <Separator/>
        <section className="relative flex flex-col items-center mx-auto md:container ">
          <div>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <>
                
                  <Tabs value={selectedTab}>
                  <TabsList className="max-w-2xl mx-auto mb-10">
          {data.map(({ label, value }) => (
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
        {data.map(({ value }) => (
          <TabsContent key={value} value={value}>
            {courses.filter((course) => course.year === value).length > 0 ? (
              <div className="px-4 grid grid-cols-1 gap-10 pb-10 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                {courses
                  .filter((course) => course.year === value)
                  .map((course) => (
                    <CourseCard key={course.$id} course={course} />
                  ))}
              </div>
            ) : (
              <div className="flex justify-center w-full">
                <EmptyCourse />
              </div>
            )}
          </TabsContent>
        ))}
                </Tabs>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const programId = context.query.programId as string;

//   // Fetch data on server-side
//   const fetchedProgramName = await getProgramName(programId);
//   const programDetails = await getProgramDetails(programId);
//   const campusId = programDetails?.campusId;
//   const response = await getCoursesByProgramId(programId);

//   // Return fetched data as props
//   return {
//     props: {
//       courses: response,
//       programName: fetchedProgramName,
//     },
//   };
// };