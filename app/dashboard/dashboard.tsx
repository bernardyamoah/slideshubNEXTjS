
'use client'
import React, { Suspense, useEffect, useState } from "react";
import Slides from "@/app/dashboard/_components/Slides";

import Courses from "@/components/Courses";

import { Separator } from "@/components/ui/separator";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import EmptyBooks from "@/components/EmptyBooks";
import { useMyContext } from "@/components/MyContext";
import { useRouter } from "next/navigation";

import Loading from "@/components/ui/Cloading";
import LoadingSkeleton from "@/components/LoadingSkeleton";

import { tabTriggers } from "@/lib/navRoute";





export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('slide');
  const {userInTeam,user } = useMyContext(); 
  const userLabel = user?.labels || [];

  useEffect(() => {
    setLoading(true);
    // Simulating an asynchronous user data fetch
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);
  // if (loading) return <Loading />;
  const handleAddButtonClick = () => {
    let route = '/dashboard';

    if (activeTab === 'slide') {
      route = route + '/add-slide';
    } else if (activeTab === 'book') {
      route = route +'/add-book';
    } else if (activeTab === 'program') {
      route = route +'/add-program';
    } else if (activeTab === 'course') {
      route = route +'/add-course';
    }

    router.push(route);
  };

  return (
   <>
      {loading ? (
      <LoadingSkeleton/>
      ) : (
      <>
      <div className="relative col-span-3 lg:col-span-4 lg:border-l">
        <div className="h-full px-4 py-6 lg:px-8">
          <Tabs defaultValue="slide" className="h-full space-y-6">
            <div className="flex items-center space-between">
              {/* Tab Triggers */}
              <TabsList>
              {tabTriggers.map((tabTrigger) => {
    if (
      (tabTrigger.value === "program" || tabTrigger.value === "course") &&
      !userInTeam
    ) {
      return null; // Skip rendering the "Programs" tab if userInTeam is false
    }
    if (
      Array.isArray(userLabel as string[]) &&
      (userLabel as string[]).includes("SuperAdmin") ||
      (userLabel as string[]).includes("admin")
    ){
      // Render all options if user has "super_Admin" or "admin" label
      return (
        <TabsTrigger
          key={tabTrigger.value}
          onClick={() => setActiveTab(tabTrigger.value)}
          value={tabTrigger.value}
          className={tabTrigger.className}
          disabled={tabTrigger.disabled}
        >
          {tabTrigger.label}
        </TabsTrigger>
      );
    } else if (tabTrigger.value === "slide" || tabTrigger.value === "book") {
      // Render only "Add Slide" and "Add Book" options if user doesn't have "super_Admin" or "admin" label
      return (
        <TabsTrigger
          key={tabTrigger.value}
          onClick={() => setActiveTab(tabTrigger.value)}
          value={tabTrigger.value}
          className={tabTrigger.className}
          disabled={tabTrigger.disabled}
        >
          {tabTrigger.label}
        </TabsTrigger>
      );
    }
    return null; // Skip rendering other options
  })}
              </TabsList>
              <div className="hidden ml-auto mr-4 lg:block ">
                <Button onClick={handleAddButtonClick}>
                  <PlusCircledIcon className="w-4 h-4 mr-2" />
                  {activeTab === 'slide'
            ? 'Add Slide'
            : activeTab === 'book'
            ? 'Add Book'
            : activeTab === 'program'
            ? 'Add Program'
            : activeTab === 'course'
            ? 'Add Course'
            : ''}
                </Button>
              </div>
            </div>
            {/* Slides content */}
            <TabsContent
              value="slide"
              className="p-0 border-none outline-none"
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
               
                  <Suspense fallback={<Loading/>}>
                  {user ?(
                   <Slides user={user}/>
                  ):
                <>
                <p>
                  No user
                </p>

                </>

                  }
                     
                   
                  </Suspense>
              
                
              </div>
            
            
            </TabsContent>
            {/* Books */}
            <TabsContent
              value="book"
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
            {userInTeam ? (
              <TabsContent
                value="course"
                className="h-full flex-col border-none p-0 data-[state=active]:flex"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      All Courses
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Your favorite courses. Updated daily.
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="relative">
                 

                      <Courses />
                   
                 
                </div>
              </TabsContent>
            ) : null
            }
          </Tabs>
        </div>
        
     <div>
   
     </div>
  
      </div>
      </>
      
   
  )}
  </>
)}