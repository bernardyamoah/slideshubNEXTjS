"use client";
import { useState, useEffect } from "react";
import Slides from "@/app/dashboard/_components/Slides";

import { Separator } from "@/components/ui/separator";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { useUserContext } from "@/components/UserContext";
import { useRouter } from "next/navigation";

import { motion, useAnimation } from "framer-motion";
import { tabTriggers } from "@/constants";
import Programs from "./_components/Program";

import Courses from "@/app/dashboard/_components/Courses";
import Books from "./_components/Books";

export default function Dashboard() {
  const router = useRouter();
  const { userInTeam, user } = useUserContext();
  const userLabel = user?.labels || [];

  const [activeTab, setActiveTab] = useState(() => {
    // Initialize the active tab from localStorage or use a default value.
    return localStorage.getItem("activeTab") || "slide";
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Save the active tab to localStorage.
    localStorage.setItem("activeTab", value);
  };

  const handleAddButtonClick = () => {
    let route = "/dashboard";

    if (activeTab === "slide") {
      route = route + "/add-slide";
    } else if (activeTab === "book") {
      route = route + "/add-book";
    } else if (activeTab === "program") {
      route = route + "/add-program";
    } else if (activeTab === "course") {
      route = route + "/add-course";
    }

    router.push(route);
  };
  // Create Framer Motion controls for animation
  const textAnimation = useAnimation();
  const titleAnimation = useAnimation();

  // Define animations
  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    // Start the animations within the useEffect hook
    textAnimation.start("visible");
    titleAnimation.start("visible");
  }, []);

  return (
    <>
      <header className=" items-center justify-center w-full ">
        <div className="max-w-screen-xl px-4 py-8 mx-auto">
          <div className="space-y-2">
            <motion.p
              className="max-w-[600px] text-emerald-600  text-xl font-medium dark:text-emerald-400 mx-auto text-center"
              initial="hidden"
              animate={textAnimation}
              variants={textVariants}
            >
              Welcome
            </motion.p>
            <motion.h1
              className="text-3xl font-bold tracking-tighter text-center text-transparent sm:text-4xl bg-clip-text dark:bg-gradient-to-r dark:from-zinc-200 dark:to-zinc-100 bg-gradient-to-r from-black to-zinc-600"
              initial="hidden"
              animate={titleAnimation}
              variants={titleVariants}
            >
              {user?.name || ""}
            </motion.h1>
          </div>
        </div>
      </header>

      <div className="relative col-span-3 lg:col-span-4">
        <div className="h-full px-4 py-6 lg:px-8 ">
          <Tabs defaultValue="slide" className="h-full space-y-6">
            <div className="flex items-center space-between">
              {/* Tab Triggers */}
              <TabsList>
                {tabTriggers.map((tabTrigger) => {
                  if (
                    (tabTrigger.value === "program" ||
                      tabTrigger.value === "course") &&
                    !userInTeam
                  ) {
                    return null; // Skip rendering the "Programs" tab if userInTeam is false
                  }
                  if (
                    (Array.isArray(userLabel as string[]) &&
                      (userLabel as string[]).includes("SuperAdmin")) ||
                    (userLabel as string[]).includes("admin")
                  ) {
                    // Render all options if user has "super_Admin" or "admin" label
                    return (
                      <TabsTrigger
                        key={tabTrigger.value}
                        onClick={() => handleTabChange(tabTrigger.value)}
                        value={tabTrigger.value}
                        className={tabTrigger.className}
                        disabled={tabTrigger.disabled}
                      >
                        {tabTrigger.label}
                      </TabsTrigger>
                    );
                  } else if (
                    tabTrigger.value === "slide" ||
                    tabTrigger.value === "book"
                  ) {
                    // Render only "Add Slide" and "Add Book" options if user doesn't have "super_Admin" or "admin" label
                    return (
                      <TabsTrigger
                        key={tabTrigger.value}
                        onClick={() => handleTabChange(tabTrigger.value)}
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
                  {activeTab === "slide"
                    ? "Add Slide"
                    : activeTab === "book"
                      ? "Add Book"
                      : activeTab === "program"
                        ? "Add Program"
                        : activeTab === "course"
                          ? "Add Course"
                          : ""}
                </Button>
              </div>
            </div>
            {/* Slides content */}
            <TabsContent value="slide" className="p-0 border-none outline-none">
              <div className="flex items-center justify-between ">
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

              <Slides user={user!} title="Slides" />
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
              <Books user={user!} title="Books" />
            </TabsContent>
            {userInTeam ? (
              <>
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
                    <Courses title="Courses" />
                  </div>
                </TabsContent>

                <TabsContent
                  value="program"
                  className="h-full flex-col border-none p-0 data-[state=active]:flex"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Programs
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Your favorite programs.
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="relative">
                    <Programs title="Programs" />
                  </div>
                </TabsContent>
              </>
            ) : null}
          </Tabs>
        </div>

        <div></div>
      </div>
    </>
  );
}
