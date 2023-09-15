// app/dashboard/dashboard.tsx
'use client'
import React, { Suspense, useCallback, useEffect, useState } from "react";

import { checkAuthStatusDashboard, checkUserInTeam } from "@/lib/functions";

import Slides from "@/components/Slides";

import Courses from "@/components/Courses";

import { Separator } from "@/components/ui/separator";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import LoadingScreen from "./components/LoadingScreen";
import EmptyBooks from "@/components/EmptyBooks";


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
  const [loading, setLoading] = useState(true);
  
  const [user, setUser] = useState<UserWithId | null>(null);
 
  const [isUserInTeam, setIsUserInTeam] = useState(false);

  



  const checkUserMembership = useCallback(async () => {
    try {
      const isInTeam = await checkUserInTeam();
      setIsUserInTeam(isInTeam);
    } catch (error) {
      setIsUserInTeam(false);
    }
  }, [user])
  const verifyUser = useCallback(async () => {
    // Fetch user data and slides
    checkAuthStatusDashboard(setUser, setLoading);
    checkUserMembership();
  }, [user]);

;

  useEffect(() => {
    verifyUser();
   
  }, [checkUserInTeam]);

  if (loading) return <LoadingScreen />;
  

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
                <TabsTrigger  value="books" className="relative">
               Books
                </TabsTrigger>
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
                    My Slides
                  </h2>
                  <p className="text-sm text-muted-foreground">
                  Slides Uploaded
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="relative">
               
                  <Suspense fallback={<LoadingScreen />}>
                  {user && <Slides userId={user.$id} />}
                     
                   
                  </Suspense>
              
                
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
                    My Books
                  </h2>
                  <p className="text-sm text-muted-foreground">
                   Books uploaded.
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <EmptyBooks/>
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
                      <Courses  />
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