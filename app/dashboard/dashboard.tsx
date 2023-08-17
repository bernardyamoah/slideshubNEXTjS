'use client'
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuthStatusDashboard } from "@/lib/functions";

import NoEvent from "@/components/NoEvent";
import UserSlidesCard from "@/components/UserSlidesCard";
import Pagination from "@/components/pagination-button";


import LoadingScreen from "./components/LoadingScreen";
import { Separator } from "@/components/ui/separator";
import CourseCard from "@/components/CourseCard";
import CoursesCard from "@/components/allCourses";



interface Slide {
  $id: string;
  name: string;
  fileUrl: string;
  previewUrl: URL;
  size: string;
  fileType: string;
  courseId: string;
  $createdAt: string;
}

interface UserWithId {
  $id: string;
  name: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [user, setUser] = useState<UserWithId | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isUserInTeam, setIsUserInTeam] = useState<boolean | null>(null);
  const [courses, setCourses] = useState<Course[]>([])
  console.log("🚀 ~ file: dashboard.tsx:43 ~ Dashboard ~ courses:", courses)



  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const authenticateUser = useCallback(async () => {
    // Fetch user data and slides
    checkAuthStatusDashboard(setUser, setLoading, setSlides, setTotalPages, setCourses, router, currentPage);


  }, [router, currentPage]);



  useEffect(() => {
    authenticateUser();

  },

    [authenticateUser]);

  if (loading) return <LoadingScreen />;
  const mainClassName = slides.length > 0 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 " : "grid-cols-1 "; // Determine the number of columns
  return (
    <>

      <header className="">
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">

          <div className="mt-8">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl md:text-5xl">
              Welcome, {user?.name}!
            </h1>

            <p className="text-sm text-gray-500 sm:text-base lg:text-lg">
              Let&apos;s upload a new slide! 🎉
            </p>
          </div>

        </div>
      </header>
      <div className="max-w-screen ">
        <main className={`mx-auto max-w-7xl grid gap-8  p-6  auto-rows-max ${mainClassName}`}>
          <Suspense fallback={<LoadingScreen />}>
            {slides.length > 0 ? (
              slides.map((slide) => (
                <UserSlidesCard
                  key={slide.$id}
                  user_id={user?.$id ?? ""}
                  {...slide}
                  timePosted={slide.$createdAt}
                  id={slide.$id}
                />
              ))
            ) : (
              <NoEvent />
            )}

          </Suspense>

        </main>
        {slides.length > 0 && (
          <Pagination
            pageCount={totalPages}
            activePage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <Separator />
      {/* Courses section */}
      {/* {isUserInTeam && ( */}
      <section className="px-4 py-8 mx-auto max-w-screen sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold sm:text-2xl">
          All Courses
        </h1>
        <div className="grid gap-8 mt-6 sm:grid-cols-2 md:grid-cols-3 ">
          {courses.map((course) => (

            <CoursesCard key={course.$id} id={course.$id}  {...course} timePosted={course.$createdAt} />
          ))}
        </div>
      </section>
      {/* )} */}
    </>
  );
}
