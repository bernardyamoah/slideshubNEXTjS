'use client'
import { useEffect, useState } from 'react';
import { getCourses, getProgramDetails, getProgramName } from '@/lib/functions';
import Link from 'next/link';
import Loading from '../../../../../components/ui/Cloading';
import { Suspense } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import CourseCard from '@/components/CourseCard';

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
  $createdAt:string // Added semester property
}


export default function CourseList() {
  const searchParams = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const programId = searchParams?.get('programId') ?? '';
  const programName = searchParams?.get('name');
  let campusId = searchParams?.get('campusId');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const programName = await getProgramName(programId);
        const programDetails = await getProgramDetails(programId);
        const campusId = programDetails?.campusId;

        const response = await toast.promise(getCourses(), {
          loading: <b>Fetching courses from {programName} database...</b>,
          success: <b>Successfully fetched courses</b>,
          error: <b>Failed to fetch courses {programName}.</b>,
        });

        setCourses(response);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }

    fetchCourses();
  }, [programId, programName]);

  const filteredCourses = courses.filter((course) => course.programId === programId);

  const data = [
    {
      label: "Level 100",
      value: "level 100",
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
      <main className="card_container">
        <section className="heading-link">
          <h2 className="text-center">{programName}</h2>
          <p>
            <Link href="/">Home</Link> / <Link href={`/campus`}>Campus</Link> /{" "}
            <Link href={`/campus/${campusId}/programs`}>Programs</Link> / Courses
          </p>
        </section>

        <section className="md:container relative mx-auto flex flex-col items-center pb-10">
          <div id="myUL">
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
                    <ul className="md:container max-w-4xl grid sm:grid-cols-2 md:grid-cols-3 gap-8 pb-10">
                      <Suspense fallback={<Loading />}>
                        {filteredCourses.filter((course) => course.year === value).length > 0 ? (
                          filteredCourses
                            .filter((course) => course.year === value)
                            .map((course) => (
                              <CourseCard key={course.$id} courseId={course.$id} {...course} timePosted={course.$createdAt} />
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
