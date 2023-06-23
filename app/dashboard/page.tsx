'use client'
import React, { Suspense, useCallback, useEffect, useState } from "react";
import SideBar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { checkAuthStatusDashboard } from "@/lib/functions";
import Loading from "@/components/ui/Cloading";
import AuthNav from "@/components/AuthNav";
import NoEvent from "@/components/NoEvent";
import SlidesCard from "@/components/SlidesCard";


interface Slide {
  $id: string;
  name: string;
  fileUrl: string;
  $createdAt: string; // Added semester property
}

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [user, setUser] = useState<User | null>(null);
  
  const authenticateUser = useCallback(() => {
    checkAuthStatusDashboard(setUser, setLoading, setSlides, router);
  }, []);

  useEffect(() => {
    authenticateUser();
  }, []);
console.log(user)
  if (loading) return <Loading />;

  return (
    <>
      <h1 className="text-5xl my-5 text-center font-bold">Dashboard</h1>
      <div className="max-w-screen">
        <main>
          <AuthNav user={user} />
          <div className="w-full flex items-center">
            <div className="md:w-[20%] md:block hidden">
              <SideBar />
            </div>
            <div className="md:w-[80%] w-full min-h-[90vh] py-10 px-4">
              <Suspense fallback={<Loading />}>
                {slides.length > 0 ? (
                  slides.map((slide) => (
                    <SlidesCard
                      key={slide.$id}
                      user_id={user?.id ?? ''} // Assigning the logged-in user's ID to user_id prop
                      {...slide}
                      timePosted={slide.$createdAt}
                    />
                  ))
                ) : (
                  <NoEvent />
                )}
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
