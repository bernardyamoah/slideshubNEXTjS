'use client'
import React, { Suspense, useCallback, useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import { checkAuthStatusDashboard } from "@/lib/functions";

import NoEvent from "@/components/NoEvent";
import UserSlidesCard from "@/components/UserSlidesCard";
import Pagination from "@/components/pagination-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
  name:string;
}

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [user, setUser] = useState<UserWithId | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);



  

const handlePageChange = (page: number) => {
  setCurrentPage(page);
};

  const authenticateUser = useCallback(() => {
    checkAuthStatusDashboard(setUser, setLoading, setSlides, setTotalPages, router, currentPage); // Update function signature

  }, [router,currentPage]);

  useEffect(() => {
    authenticateUser( );
  }, [authenticateUser]);

  if (loading) return <LoadingScreen />;

  return (
    <>
  
<header className="">
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">

    <div className="mt-8">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        Welcome Back, {user?.name}!
      </h1>

      <p className="mt-1.5 text-sm text-gray-500">
          Let's upload a new slide! 🎉
        </p>
    </div>
    <div className="mt-4 flex flex-col gap-4 sm:flex-row ">
    

        <Button
          >
          <Link href={'dashboard/create'}>Create a Slide</Link>
        </Button>
      </div>
  </div>
</header>
      <div className="max-w-screen ">
        <main className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-10 p-6  min-h-screen auto-rows-max">
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
              <NoEvent user={user} />
            )}
        
          </Suspense>
          
        </main>
        <Pagination 
          pageCount={totalPages}
          activePage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
