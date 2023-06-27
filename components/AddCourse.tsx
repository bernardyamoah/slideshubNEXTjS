"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  createCourse,
  getCurrentUserAndSetUser,
  getPrograms,
} from "@/lib/functions";
import { Check, ChevronsUpDown } from "lucide-react";
import { storage, ID } from "@/appwrite";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import DocumentUpload from "./document-upload";


export default function AddCourse() {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [name, setName] = useState("");
  const [semester, setSemester] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [credit, setCredit] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [year, setYear] = useState("");
  const [fileId, setFileId] = useState("");
  const [programId, setprogramId] = React.useState("");
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [programs, setPrograms] = useState<any[]>([]); // Initialize as an empty array
  const [user, setUser] = useState<UserWithId | null>(null); // Update the type of user state

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const response = await getPrograms();
        const userId = await getCurrentUserAndSetUser(); // Call the getCurrentUser function
        setUser(userId);

        setPrograms(response);
      } catch (error) {
        console.log("Error fetching programs:", error);
      }
    }

    fetchPrograms();
  }, []);

  const creditHours = [
    {
      id: "1",
      hour: "1",
    },
    {
      id: "2",
      hour: "2",
    },
    {
      id: "3",
      hour: "3",
    },
    {
      id: "4",
      hour: "4",
    },
  ];
  // handle upload progress

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const handleImageUpload = async () => {
        try {
          if (!currentFile) {
            throw new Error("No file selected");
          }
      
          const file = currentFile as File;
          const uploader = await toast.promise(storage.createFile(
            process.env.NEXT_PUBLIC_COURSE_IMAGES_ID!,
            ID.unique(),
            file
          ),
          {
            loading: 'Uploading file...',
            success: 'File uploaded!',
            error: 'Upload failed',
          }
        );
        const fileId = uploader.$id;
        const fileResponse = await storage.getFileView(
          process.env.NEXT_PUBLIC_COURSE_IMAGES_ID!,
          fileId
        );
        const imageUrl = fileResponse.toString();

        return imageUrl;


        } catch (error) {
          throw new Error("Upload failed");
        }
      };



      const imageUrl = await handleImageUpload();
    
      const courseData = {
        name,
        semester,
        courseCode,
        credit,
        lecturer,
        fileId,
        image: imageUrl,
        year,
        user_id: user?.id,
        programId: programId,
      };
      await createCourse(courseData);
  
 // Reset form fields
 setName("");
 setSemester("");
 setYear("");
 setCourseCode("");
 setCredit("");
 setCurrentFile(null);
 setLecturer("");
 setFileId("");
 setprogramId("");
            
            
    } catch (error) {
      throw error;
    }
  };

  const handleYearChange = (selectedValue: string) => {
    setYear(selectedValue);
  };
  const handleCreditHourChange = (selectedValue: string) => {
    setCredit(selectedValue);
  };
  const handleSelectChange = (selectedValue: string) => {
    setprogramId(selectedValue);
  };
  const handleSemesterChange = (selectedValue: string) => {
    setSemester(selectedValue);
  };

  return (
    <>
      <div className="relative flex items-center mt-10">
        <div className=" w-full max-w-3xl mx-auto">
      
          <Card className="w-full  ">
            <CardHeader>
              <CardTitle>Add course</CardTitle>
              <CardDescription>
                Deploy your new project in one-click.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-2 space-y-6">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Course Name</Label>
                    <Input
                      id="name"
                      placeholder="Algebra"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="programme">Programme</Label>
                    <Popover open={open1} onOpenChange={setOpen1}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open1}
                          className="w-full justify-between"
                        >
                          {programId
                            ? programs.find(
                              (program) => program.$id === programId
                            )?.name
                            : "Select Programme"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command onValueChange={handleSelectChange}>
                          <CommandInput placeholder="Search program..." />
                          <CommandEmpty>No program found.</CommandEmpty>
                          <CommandGroup>
                            {programs.map((program) => (
                              <CommandItem
                                key={program.$id}
                                onSelect={(currentValue) => {
                                  setprogramId(
                                    currentValue === programId
                                      ? ""
                                      : program.$id
                                  );
                                  setOpen1(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    programId === program.$id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {program.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Image selection */}

                  <div className="grid  w-full items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                  
                    <DocumentUpload currentFile={currentFile} setCurrentFile={setCurrentFile}  />
                  
                  </div>












                  {/* Lecturer Name */}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="lecturer">Lecturer Name</Label>
                    <Input
                      id="lecturer"
                      placeholder="Dr. Martinson"
                      value={lecturer}
                      onChange={(e) => setLecturer(e.target.value)}
                    />
                  </div>
                  <div className="gap-4 md:gap-8 grid grid-cols-2">
                    {/* Course code */}
                    <div className="flex flex-col space-y-1.5 w-full ">
                      <Label htmlFor="coursecode">Course Code</Label>
                      <Input
                        id="coursecode"
                        placeholder="MSE 4324"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                      />
                    </div>
                    {/* Year */}
                    <div className="flex flex-col space-y-1.5 flex-1 w-full">
                      <Label htmlFor="year">Year</Label>
                      <Select onValueChange={handleYearChange}>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select Level/Year"
                            className="text-xs"
                          />
                          <SelectContent position="popper">
                            <SelectItem value="Level 100">Level 100</SelectItem>
                            <SelectItem value="Level 200">Level 200</SelectItem>
                            <SelectItem value="Level 300">Level 300</SelectItem>
                            <SelectItem value="Level 400">Level 400</SelectItem>
                          </SelectContent>
                        </SelectTrigger>
                      </Select>
                    </div>

                    {/* Credit Hours */}

                    <div className="flex flex-col space-y-1.5 w-full flex-1 ">
                      <Label htmlFor="credit">Credit Hours</Label>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between  overflow-hidden no-wrap"
                          >
                            {credit
                              ? creditHours.find(
                                (creditHour) => creditHour.id === credit
                              )?.hour
                              : "Select credit hour"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command onValueChange={handleCreditHourChange}>
                            <CommandInput placeholder="Search ..." />
                            <CommandEmpty>No credit hour found.</CommandEmpty>
                            <CommandGroup>
                              {creditHours.map((creditHour) => (
                                <CommandItem
                                  key={creditHour.id}
                                  onSelect={(currentValue) => {
                                    setCredit(
                                      currentValue === credit
                                        ? ""
                                        : currentValue
                                    );
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      credit === creditHour.id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {creditHour.hour}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    {/* Semester */}
                    <div className="flex flex-col space-y-1.5 flex-1 w-full">
                      <Label htmlFor="name">Semester</Label>
                      <Select onValueChange={handleSemesterChange}>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select Semester"
                            className="text-xs"
                          />
                          <SelectContent position="item-aligned">
                            <SelectItem value="first semester">
                              First Semester
                            </SelectItem>
                            <SelectItem value="second semester">
                              Second Semester
                            </SelectItem>
                          </SelectContent>
                        </SelectTrigger>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-24 sm:flex sm:justify-end w-full">
                    {" "}
                    <Button type="submit" className="w-full lg:px-6 lg:w-fit font-normal py-4">
                      Add
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <Toaster />
      </div>
    </>
  );
}
