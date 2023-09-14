// app/dashboard/dashboard.tsx
'use client'
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuthStatusDashboard, checkUserInTeam } from "@/lib/functions";

import NoEvent from "@/components/NoEvent";
import Slides from "@/components/Slides";
import PaginationComponent from "@/components/PaginationComponent";
import Courses from "@/components/Courses";

import { Separator } from "@/components/ui/separator";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import LoadingScreen from "./components/LoadingScreen";

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
  const [isUserInTeam, setIsUserInTeam] = useState(false);
  console.log("🚀 ~ file: dashboard.tsx:43 ~ Dashboard ~ isUserInTeam:", isUserInTeam)
  const [courses, setCourses] = useState<Course[]>([]);

  const changePage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const verifyUser = useCallback(async () => {
    // Fetch user data and slides

    checkAuthStatusDashboard(setUser, setLoading, setSlides, setTotalPages, setCourses, currentPage);
  }, []);


  const checkUserMembership = useCallback(async () => {
    try {
      const isInTeam = await checkUserInTeam();
      console.log("🚀 ~ file: dashboard.tsx:60 ~ checkUserMembership ~ isInTeam:", isInTeam)
      setIsUserInTeam(isInTeam);
    } catch (error) {
      console.error(error);
      setIsUserInTeam(false);
    }
  }, [user]);

  useEffect(() => {
    verifyUser();
    if (user) {
      checkUserMembership();
    }
  }, [verifyUser]);

  if (loading) return <LoadingScreen />;
  const mainClassName = slides.length > 0 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 " : "grid-cols-1 ";

  return (
    <>
      <header>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
          <div className="mt-8 text-center">
            <h1 className="text-4xl font-bold ">
              Welcome, {user?.name}!
            </h1>
          </div>
        </div>
      </header>
      <div className="col-span-3 lg:col-span-4 lg:border-l">
        <div className="h-full px-4 py-6 lg:px-8">
          <Tabs defaultValue="slides" className="h-full space-y-6">
            <div className="space-between flex items-center">
              {/* Tab Triggers */}
              <TabsList>
                <TabsTrigger  value="slides" className="relative">
                  Slides
                </TabsTrigger>
                <TabsTrigger value="books">Books</TabsTrigger>
                {isUserInTeam ? (
                  <TabsTrigger value="courses">
                    All Courses
                  </TabsTrigger>)
                  : null}
              </TabsList>
              <div className="ml-auto mr-4">
                <Button>
                  <PlusCircledIcon className="mr-2 h-4 w-4" />
                  Add Slide
                </Button>
              </div>
            </div>
            {/* Slides content */}
            <TabsContent
              value="slides"
              className="border-none p-0 outline-none"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Slides Uploaded
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Top picks for you. Updated daily.
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="relative">
                <main className={`mx-auto max-w-5xl grid gap-8  p-6  auto-rows-max ${mainClassName}`}>
                  <Suspense fallback={<LoadingScreen />}>
                    {slides.length > 0 ? (
                      <Slides slides={slides} userId={user?.$id ?? ""} />
                    ) : (
                      <NoEvent />
                    )}
                  </Suspense>
                </main>
                {slides.length > 0 && (
                  <PaginationComponent
                    pageCount={totalPages}
                    activePage={currentPage}
                    onPageChange={changePage}
                  />
                )}
              </div>
            
            
            </TabsContent>
            {/* Books */}
            <TabsContent
              value="books"
              className="h-full flex-col border-none p-0 data-[state=active]:flex"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    New Episodes
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Your favorite podcasts. Updated daily.
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
            </TabsContent>
            {/* All Courses */}
            {isUserInTeam ? (
              <TabsContent
                value="courses"
                className="h-full flex-col border-none p-0 data-[state=active]:flex"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-semiboldtracking-tight">
                      All Courses
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Your favorite courses. Updated daily.
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="relative">
                  <section className="px-4 py-8 mx-auto max-w-screen sm:px-6 lg:px-8">
                    <div className="grid gap-8 mt-6 sm:grid-cols-2 md:grid-cols-3 ">
                      <Courses courses={courses} />
                    </div>
                  </section>
                </div>
              </TabsContent>
            ) : null
            }
          </Tabs>
        </div>
      </div>
    </>
  );
}