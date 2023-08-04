'use client'
import { useEffect, useState } from "react";
import {
  getCoursesByProgramId,
  getProgramDetails,
  getProgramName,
} from "@/lib/functions";
import { useSearchParams } from "next/navigation";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import CourseCard from "@/components/CourseCard";
import EmptyCourse from "@/components/EmptyCourse";

import LoadingScreen from "@/app/dashboard/components/LoadingScreen";

import Head from "next/head";
import { toast } from "react-hot-toast";

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

  useEffect(() => {
    async function fetchCourses() {
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
    }

    fetchCourses();
    console.count("fetched courses");
  }, [programId]);

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
        <div className="h-64 overflow-hidden bg-[url('https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80')] bg-cover bg-top bg-no-repeat">
          <div className="bg-black/60 h-full flex items-center justify-center p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="text-center ltr:sm:text-left rtl:sm:text-right">
              <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
                {programName}
              </h2>
            </div>
          </div>
        </div>

        <section className="md:container relative mx-auto flex flex-col items-center pb-10">
          <div id="myUL">
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <>
                <Tabs value={data[0].value}>
                  <TabsHeader className="max-w-2xl mx-auto mb-10">
                    {data.map(({ label, value }) => (
                      <Tab
                        key={value}
                        value={value}
                        className="text-sm font-title sm:text-base font-medium"
                      >
                        {label}
                      </Tab>
                    ))}
                  </TabsHeader>
                  <TabsBody>
                    {data.map(({ value }) => (
                      <TabPanel key={value} value={value}>
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
                      </TabPanel>
                    ))}
                  </TabsBody>
                </Tabs>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
