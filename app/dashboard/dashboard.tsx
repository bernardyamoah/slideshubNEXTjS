'use client'
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { checkAuthStatusDashboard } from "@/lib/functions";
import Loading from "@/components/ui/Cloading";
import NoEvent from "@/components/NoEvent";
import UserSlidesCard from "@/components/UserSlidesCard";
import { PaginationButton } from "@/components/pagination-button";
import { Button } from "@/components/ui/button";

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
}

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [user, setUser] = useState<UserWithId | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();


 // Pagination handlers
 const goToPreviousPage = () => {
  setCurrentPage((prevPage) => prevPage - 1);
};

const goToNextPage = () => {
  setCurrentPage((prevPage) => prevPage + 1);
};

  const authenticateUser = useCallback(() => {
    checkAuthStatusDashboard(setUser, setLoading, setSlides, router,currentPage);
  }, [router,currentPage]);

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  if (loading) return <Loading />;

  return (
    <>
      <h1 className="text-5xl my-5 text-center font-bold">Dashboard</h1>
      <div className="max-w-screen">
        <main className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-10 p-6">
          <Suspense fallback={<Loading />}>
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
            {slides.length ? (
             <div className="gap-4 flex items-center justify-center mx-auto absolute bottom-0 left-1/2 -translate-1/2 ">
             <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
               Previous
             </Button>
             <span>{currentPage}</span>
             <Button onClick={goToNextPage} disabled={currentPage === totalPages}>
               Next
             </Button>
           </div>   
            ) : null}
          </Suspense>
        </main>
      </div>
    </>
  );
}
