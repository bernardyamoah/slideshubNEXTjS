
'use client'
import React, { Suspense, useEffect, useState } from "react";

import { checkAuthStatusDashboard, checkUserInTeam } from "@/lib/functions";
import Slides from "@/components/Slides";

import Courses from "@/components/Courses";

import { Separator } from "@/components/ui/separator";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import LoadingScreen from "./components/LoadingScreen";
import EmptyBooks from "@/components/EmptyBooks";
import { useMyContext } from "@/components/MyContext";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TabsTriggerProps } from "@radix-ui/react-tabs";
import Loading from "@/components/ui/Cloading";


interface DashboardProps {
  tabTriggers: {
    value: string;
    className: string;
    label: string;
    disabled?: boolean;
  }[];
}

export default function Dashboard({ tabTriggers }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('slide');
  const { checkUserMembership,userInTeam,user,setUser } = useMyContext(); // Import checkUserMembership from context

  useEffect(() => {
    async function verifyUser() {
      // Fetch user data and slides
      checkAuthStatusDashboard(setUser, setLoading);
      await checkUserMembership(); // Call checkUserMembership
    }

    verifyUser();
  }, [user, setUser]); // Add checkUserMembership as a dependency


  if (loading) return <Loading />;
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
    
      
      <div className="relative col-span-3 lg:col-span-4 lg:border-l">
        <div className="h-full px-4 py-6 lg:px-8">
          <Tabs defaultValue="slide" className="h-full space-y-6">
            <div className="space-between flex items-center">
              {/* Tab Triggers */}
              <TabsList>
          
                   {tabTriggers.map((tabTrigger:any) => {
    if ((tabTrigger.value === 'program' || tabTrigger.value === 'course')  && !userInTeam) {
      return null; // Skip rendering the "Programs" tab if userInTeam is false
    }
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
  })}
              </TabsList>
              <div className="ml-auto mr-4 hidden lg:block ">
                <Button onClick={handleAddButtonClick}>
                  <PlusCircledIcon className="mr-2 h-4 w-4" />
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
               
                  <Suspense fallback={<Loading/>}>
                  {user ?(
                   <Slides user={user} key={user.$id}/>
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
                 

                      <Courses />
                   
                 
                </div>
              </TabsContent>
            ) : null
            }
          </Tabs>
        </div>
        
     <div>
         <DropdownMenu >
  <DropdownMenuTrigger className="fixed bottom-8 right-10 lg:hidden">
    <Button
      className="rounded-full p-2 w-10 h-10 "
    >
      <PlusCircledIcon className="h-8 w-8" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className=" right-10">
  {tabTriggers.map((trigger:any, index:any) => (
     <DropdownMenuItem key={index}  onClick={() => router.push(`dashboard/add-${trigger.value}  `)}>
    
       Add {trigger.label}
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>
     </div>
      
      </div>
    </>
  );
}