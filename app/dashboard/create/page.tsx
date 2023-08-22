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
    icon: <Files className="w-10 h-10 mx-auto " />,
    component: <AddSlides />,
  },
  {
    key: "book",
    icon: <Book className="w-10 h-10 mx-auto " />,
    component: <AddBook />,
  },
  {
    key: "course",
    icon: <PiSquare className="w-10 h-10 mx-auto " />,
    component: <AddCourse />,
  },
  {
    key: "program",
    icon: <GraduationCap className="w-10 h-10 mx-auto " />,
    component: <AddProgram />,
  },
  {
    key: "campus",
    icon: <School className="w-10 h-10 mx-auto " />,
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
      <div className="m-10 mx-auto text-center sm:h-20">
        <h1>Create a Slide</h1>
        {/* Add subtext or description here if needed */}
      </div>
      <aside className="flex flex-wrap justify-center w-full gap-8 p-10 pb-10 mx-auto ">
        {/* Only render the components if the user is in the team */}
        {userInTeam ? (
          componentData.map((data) => {
            const { key, icon, component } = data;
            return (
              <div
                key={key}
                className="relative justify-start w-full max-w-xs cursor-pointer group h-44"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="relative w-full h-full overflow-hidden transition-transform transform rounded-lg hover:scale-105">
                      <div className="absolute inset-0 transition-opacity bg-gray-100 opacity-0 group-hover:opacity-5"></div>
                      <div className="absolute top-4 left-4 ">{icon}</div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Label className="text-lg ">
                          {`Add ${key.charAt(0).toUpperCase()}${key.slice(1)}`}
                        </Label>
                      </div>
                    </Card>
                  </DialogTrigger>
                  <DialogContent>
                    <Card className="w-full mx-auto border-none">
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
            <div className="relative justify-start w-full max-w-xs mx-auto cursor-pointer group h-44">
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="relative h-full overflow-hidden transition-transform transform rounded-lg hover:scale-105">
                    <div className="absolute inset-0 transition-opacity opacity-0 bg-gry-100 group-hover:opacity-100"></div>
                    <div className="absolute top-4 left-4 ">
                      <Files className="w-10 h-10 mx-auto " />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Label className="text-lg ">Add Slides</Label>
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <Card className="w-full mx-auto border-none">
                    <CardHeader className="grid mb-4 h-28 place-items-center">
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

            <div className="relative justify-start w-full max-w-xs mx-auto cursor-pointer group h-44">
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="relative h-full overflow-hidden transition-transform transform rounded-lg hover:scale-105">
                    <div className="absolute inset-0 transition-opacity bg-gray-100 opacity-0 group-hover:opacity-5"></div>
                    <div className="absolute top-4 left-4 ">
                      <Book className="w-10 h-10 mx-auto " />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Label className="text-lg ">Add Book</Label>
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <Card className="w-full mx-auto border-none">
                    <CardHeader className="grid mb-4 h-28 place-items-center">
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
