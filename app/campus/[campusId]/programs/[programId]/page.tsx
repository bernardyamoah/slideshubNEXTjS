'use client'
import { useEffect, useState } from 'react';
import { getCourses, successMessage, errorMessage } from '@/lib/functions';
import Link from 'next/link';
import Loading from '../../../../../components/ui/Cloading';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Course {
  $id: string;
  campusId: string;
  image: string;
  name: string;
  courseCode: string;
  credit: number;
  programId: string; // Added programId property
}

interface Props {
  params: {
    programId: string;
    campusId: string;
  };
}

export default function CourseList({ params }: Props) {
  const { programId, campusId } = params;
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Sta
  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await getCourses();
        successMessage('Successfully fetched courses');
        setCourses(response);
        setIsLoading(false); // Set loading state to false when data is fetched
      } catch (error) {
        console.log('Error fetching courses:', error);
        errorMessage('Failed to fetch courses');
        setIsLoading(false); // Set loading state to false if there's an error

      }
    }

    fetchCourses()
  }, [programId]);

  const filteredCourses = courses.filter((course) => course.programId === programId);

  return (
    <>
      <main className="card_container">
        <section className="heading-link">
          <h3>Courses</h3>
          <p>
            <Link href="/">home</Link> / <Link href={`/campus/${campusId}/programs`}>programs</Link> / courses
          </p>
        </section>

        <section className="container relative mx-auto flex flex-col items-center pb-10">
          <div id="myUL">
          {isLoading ? (
              <Loading /> // Render the loading UI when data is loading
            ) : (
            <ul className="md:container max-w-4xl grid sm:grid-cols-2 md:grid-cols-3 gap-8 pb-10">
              <Suspense fallback={<Loading />}>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <aside
                      key={course.$id}
                      className="relative block shadow-xl backdrop-blur-md transition-all hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-emerald-500/10 overflow-hidden duration-300 ease-in-out border-4 border-gray-200 hover:shadow-xl cursor-pointer dark:border-gray-600 rounded-3xl w-full bg-white dark:bg-transparent"
                    >
                      <Link
                        href={`/campus/${campusId}/programs/${programId}/course/${course.$id}`}
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
                  <p>No courses available for this program.</p>
                )}
              </Suspense>
            </ul>
                )}
          </div>
        </section>
        <ToastContainer />
      </main>
    </>
  );
}