'use client'
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuthStatusDashboard} from "@/lib/functions";
import Loading from "@/components/ui/Cloading";
import NoEvent from "@/components/NoEvent";
import UserSlidesCard from "@/components/UserSlidesCard";
import { client } from "@/appwrite";


interface Slide {
  $id: string;
  name: string;
  fileUrl: string;
  previewUrl:URL;
  size:string;
  fileType:string;
  courseId:string;
  $createdAt: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [user, setUser] = useState<UserWithId | null>(null);

  const authenticateUser = useCallback(() => {
    checkAuthStatusDashboard(setUser, setLoading, setSlides, router);
  }, []);

  useEffect(() => {
    authenticateUser();
  }, []);






  if (loading) return <Loading />;

  return (
    <>
      <h1 className="text-5xl my-5 text-center font-bold">Dashboard</h1>
      <div className="max-w-screen">
        <main className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8 pb-10 p-6">
        <Suspense fallback={<Loading />}>
          {slides.length > 0 ? (
            slides.map((slide) => (
              <UserSlidesCard
                key={slide.$id}
                user_id={user?.id ?? ""}
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
      </div>
    </>
  );
}
