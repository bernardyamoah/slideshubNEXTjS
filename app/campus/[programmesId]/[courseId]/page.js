'use client'
import { useEffect, useState } from 'react';
import { getCoursesByProgramId, successMessage, errorMessage } from '@/lib/functions';
import Link from 'next/link';
import Loading from './loading';
import { Suspense } from 'react';

export default function CourseList({ programId }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await getCoursesByProgramId(programId);
        successMessage('Successfully fetched courses');
        setCourses(response);
      } catch (error) {
        console.log('Error fetching courses:', error);
        errorMessage('Failed to fetch courses');
      }
    }

    setTimeout(fetchCourses, 6000);
  }, [programId]);

  return (
    <>
      <main className="card_container">
        <section className="heading-link">
          <h3>Courses</h3>
          <p>
            <Link href="/">home</Link> / courses
          </p>
        </section>

        <section className="container relative mx-auto flex flex-col items-center pb-10">
          <div id="myUL">
            <ul className="md:container max-w-4xl grid sm:grid-cols-2 md:grid-cols-3 gap-8 pb-10">
              <Suspense fallback={<Loading />}>
                {courses.map((course) => (
                  <aside
                    key={course.$id}
                    className="relative block shadow-xl backdrop-blur-md transition-all hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-emerald-500/10 overflow-hidden duration-300 ease-in-out border-4 border-gray-200 hover:shadow-xl cursor-pointer dark:border-gray-600 rounded-3xl w-full bg-white dark:bg-transparent"
                  >
                    <Link
                      className="card_link group"
                      href={`/campus/${program.campusId}/${program.$id}/${course.$id}`}
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
                ))}
              </Suspense>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
