"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Metadata } from "next";
import { Book, Files, GraduationCap, PiSquare, School } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Typography } from "@material-tailwind/react";

import AddSlides from "@/components/AddSlides";
import AddBook from "@/components/AddBook";
import AddProgram from "@/components/AddProgram";
import AddCourse from "@/components/AddCourse";
import { checkUserInTeam } from "@/lib/functions";
import AddCampus from "@/components/AddCampus";
import { Label } from "@/components/ui/label";

const metadata: Metadata = {
  title: "Create",
  description: "Add Slides to database",
};

const componentData = [
  {
    key: "slides",
    icon: <Files className="mx-auto w-10 h-10 " />,
    component: <AddSlides />,
  },
  {
    key: "book",
    icon: <Book className="mx-auto w-10 h-10 " />,
    component: <AddBook />,
  },
  {
    key: "course",
    icon: <PiSquare className="mx-auto w-10 h-10 " />,
    component: <AddCourse />,
  },
  {
    key: "program",
    icon: <GraduationCap className="mx-auto w-10 h-10 " />,
    component: <AddProgram />,
  },
  {
    key: "campus",
    icon: <School className="mx-auto w-10 h-10 " />,
    component: <AddCampus />,
  },
];
export default function Page() {
  const [userInTeam, setUserInTeam] = useState<boolean | null>(null);

  // Memoize the checkTeamMembership function using useCallback
  const checkTeamMembership = useCallback(async () => {
    const userIsInTeam = await checkUserInTeam();
    setUserInTeam(userIsInTeam);
  }, []);

  useEffect(() => {
    // Call the memoized checkTeamMembership function
    checkTeamMembership();
  }, [checkTeamMembership]); // Pass checkTeamMembership as a dependency to useEffect

  return (
    <>
      <div className=" mx-auto m-10 sm:h-20 text-center">
        <h1>Create a Slide</h1>
        {/* Add subtext or description here if needed */}
      </div>
      <aside className="grid container sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center pb-10">
        {/* Only render the components if the user is in the team */}
        {userInTeam ? (
          componentData.map((data) => {
            const { key, icon, component } = data;
            return (
              <div
                key={key}
                className="group relative block h-72   w-full mx-auto cursor-pointer"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="relative h-full w-full overflow-hidden rounded-lg  transition-transform transform hover:scale-105">
                      <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-5 transition-opacity"></div>
                      <div className="absolute top-4 left-4 ">{icon}</div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Label className=" text-lg ">
                          {`Add ${key.charAt(0).toUpperCase()}${key.slice(1)}`}
                        </Label>
                      </div>
                    </Card>
                  </DialogTrigger>
                  <DialogContent>
                    <Card className="mx-auto w-full border-none">
                      <CardHeader>
                        <CardTitle>
                          {`Add ${key.charAt(0).toUpperCase()}${key.slice(1)}`}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-4">
                        {component}
                      </CardContent>
                    </Card>
                  </DialogContent>
                </Dialog>
              </div>
            );
          })
        ) : (
          <>
            {/* Render only AddSlides and AddBook if the user is not in the team */}
            <div className="group relative block h-52 w-full aspect-square cursor-pointer">
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="relative h-full overflow-hidden rounded-lg  transition-transform transform hover:scale-105">
                    <div className="absolute inset-0 bg-gry-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute top-4 left-4 ">
                      <Files className="mx-auto w-10 h-10 " />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Label className=" text-lg ">Add Slides</Label>
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <Card className="mx-auto w-full border-none">
                    <CardHeader className="mb-4 grid h-28 place-items-center">
                      <Typography variant="h3" color="white">
                        Add Slides
                      </Typography>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <AddSlides />
                    </CardContent>
                  </Card>
                </DialogContent>
              </Dialog>
            </div>

            <div className="group relative block h-52 w-full aspect-square cursor-pointer">
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="relative h-full overflow-hidden rounded-lg  transition-transform transform hover:scale-105">
                    <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-5 transition-opacity"></div>
                    <div className="absolute top-4 left-4 ">
                      <Book className="mx-auto w-10 h-10 " />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Label className=" text-lg ">Add Book</Label>
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <Card className="mx-auto w-full border-none">
                    <CardHeader className="mb-4 grid h-28 place-items-center">
                      <CardTitle color="white">Add Book</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <AddBook />
                    </CardContent>
                  </Card>
                </DialogContent>
              </Dialog>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
