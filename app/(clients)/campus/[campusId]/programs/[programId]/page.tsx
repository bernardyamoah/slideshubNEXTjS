'use client'
import { useState } from "react";
import {
  getCoursesByProgramId,
  getProgramDetails,
  getProgramName,
} from "@/lib/functions";
import { useSearchParams } from "next/navigation";

import CourseCard from "@/components/CourseCard";
import EmptyCourse from "@/components/EmptyCourse";

import LoadingScreen from "@/app/dashboard/components/LoadingScreen";

import Head from "next/head";
import { toast } from "react-hot-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Course {
  $id: string;
  campusId: string;
  image: string;
  name: string;
  courseCode: string;
  credit: string;
  programId: string; // Added programId property
  year: string;
  semester: string;
  $createdAt: string; // Added semester property
}

export default function CourseList() {
  const searchParams = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [programName, setProgramName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const programId = searchParams?.get("programId") ?? "";

  const pageTitle = `${programName} Courses`;
  const pageDescription = `Browse courses for ${programName} at your campus.`;

  const fetchCourses = async () => {
    try {
      const fetchedProgramName = await getProgramName(programId);
      const programDetails = await getProgramDetails(programId);
      const campusId = programDetails?.campusId;

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

  const filteredCourses = courses.filter(
    (course) => course.programId === programId
  );

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

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <main className="card_container">
        <div className="h-64 overflow-hidden flex items-center justify-center ">
          <h2 className="text-2xl font-bold text-center sm:text-3xl md:text-5xl">
            {programName}
          </h2>
        </div>

        <section className="md:container relative mx-auto flex flex-col items-center pb-10">
          <div id="myUL">
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <>
                
                  <Tabs value={data[0].value}>
                  <TabsList className="max-w-2xl mx-auto mb-10">
                    {data.map(({ label, value }) => (
                    
                        <TabsTrigger key={value} value={value} className="relative">
                              {label}    
                        </TabsTrigger>
                    ))}
                  </TabsList>
                    {data.map(({ value }) => (
                  <TabsContent key={value} value={value}>
                  
                        {filteredCourses.filter(
                          (course) => course.year === value
                        ).length > 0 ? (
                          <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-10 lg:gap-12 pb-10">
                            {filteredCourses
                              .filter((course) => course.year === value)
                              .map((course) => (
                                <CourseCard
                                  key={course.$id}
                                  courseId={course.$id}
                                  {...course}
                                  timePosted={course.$createdAt}
                                />
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
      </main>
    </>
  );
}
