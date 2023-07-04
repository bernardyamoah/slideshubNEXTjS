'use client'
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { checkAuthStatusDashboard } from "@/lib/functions";
import Loading from "@/components/ui/Cloading";
import NoEvent from "@/components/NoEvent";
import UserSlidesCard from "@/components/UserSlidesCard";
import { PaginationButton } from "@/components/pagination-button";

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

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();

  // Search params
  const page = searchParams?.get("page") ?? "1";
  const per_page = searchParams?.get("per_page") ?? "8";
  const sort = searchParams?.get("sort") ?? "createdAt.desc";
  const store_ids = searchParams?.get("store_ids");
  const store_page = searchParams?.get("store_page") ?? "1";


  const pageCount = Math.ceil(slides.length / parseInt(per_page));

const createQueryString = (): string => {
  const params = new URLSearchParams();
  params.set("page", page);
  params.set("per_page", per_page);
  params.set("sort", sort);
  if (store_ids) {
    params.set("store_ids", store_ids);
  }
  params.set("store_page", store_page);
  return params.toString();
};
  const authenticateUser = useCallback(() => {
    checkAuthStatusDashboard(setUser, setLoading, setSlides, router);
  }, [router]);

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
              <PaginationButton
                pageCount={pageCount}
                page={page}
                per_page={per_page}
                sort={sort}
                createQueryString={createQueryString}
                router={router}
                pathname={pathname}
                isPending={isPending}
                startTransition={startTransition}
              />
            ) : null}
          </Suspense>
        </main>
      </div>
    </>
  );
}
