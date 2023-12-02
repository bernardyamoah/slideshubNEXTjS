"use client"

import { Check, ChevronsUpDown, Edit, MoreHorizontal, Trash } from "lucide-react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { successMessage, deleteCourse, updateCourse } from "@/lib/functions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { useState } from "react";
import { Label } from "../../../components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../../../components/ui/command";
import { cn } from "@/lib/utils";

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
const Years = [
  {
    id: "level 100",
    level: "Level 100",
  },
  {
    id: "level 200",
    level: "Level 200",
  },
  {
    id: "level 300",
    level: "Level 300",
  },
  {
    id: "level 400",
    level: "Level 400",
  },
];

const Semesters = [
  {
    id: "first semester",
    semester: "First Semester",
  },
  {
    id: "second semester",
    semester: "Second Semester",
  }
];

export function CourseEdit({data}) {

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const [courseData, setCourseData] = useState({
    name: data.name,
    lecturer: data.lecturer,
    courseCode: data.courseCode,
    year: data.year,
    credit: data.credit,
    semester: data.semester,
  
  });
  const [updateCourseData, setUpdatedCourseData] = useState({
    name: data.name,
    lecturer: data.lecturer,
    courseCode: data.courseCode,
    year: data.year,
    credit: data.credit,
    semester: data.semester,
  
  });
  
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      const updatedAttributes: { 
        name?: string; 
        lecturer?: string; 
        courseCode?: string; 
        semester?: string; 
        credit?: string;
        year?: string;
      } = {
        name: courseData.name,
        lecturer: courseData.lecturer,
        courseCode: courseData.courseCode,
        semester: courseData.semester,
        credit: courseData.credit,
        year: courseData.year,
      };
  
      await updateCourse(data.$id, updatedAttributes);
  
      setCourseData({
        name: '',
    lecturer: '',
    courseCode: '',
    year: '',
    credit: '',
    semester:'',
    })
  
      setOpen(false);
  
      const updatedCourses = data.map((c) => {
        if (c.$id === data.$id) {
          return { ...c, ...updatedAttributes };
        }
        return c;
      });
      setCourseData(updatedCourses);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };
  const handleDeleteCourse = () => {
    deleteCourse(data.$id);
    setShowDeleteDialog(false);
    
  };
  const handleChange = (e:any) => {
  
    setCourseData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const [showDeleteDialog, setShowDeleteDialog] =useState(false)

  return (
    <>
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button className="h-2 p-2 text-gray-700 bg-transparent border-none dark:text-gray-100 hover:bg-transparent">
            <span className="sr-only ">Actions</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => setShowDialog(true)}>
      <Edit className="w-4 h-4 mr-2" />
      Edit 
    </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="!text-red-600 hover:!bg-red-200/10"
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete Course
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

          <ScrollArea className="h-[500px] overflow-auto">
      <Dialog open={showDialog} onOpenChange={setShowDialog}  >
        <DialogContent className="sm:max-w-[500px] overflow-auto">
          
          <div className="grid gap-4 p-4">
            <form className="w-full mt-8 mb-2 space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 mb-4">
                <Label htmlFor="name" className="block col-span-4 text-left">
                  Name
                </Label>
                <Input
                    id="name"
                    name="name"
                  value={courseData.name}
                  onChange={handleChange}
                />
              </div>

              {/* Lecturer */}
              <div className="flex flex-col gap-3 mb-4">
                <Label htmlFor="lecturer" className="block col-span-4 text-left">
                  Lecturer
                </Label>
                <Input
                    id="lecturer"
                    name="lecturer"
                  value={courseData.lecturer}
                  onChange={handleChange}
                />
              </div>

        <div className="grid gap-4 mb-1.5 md:grid-cols-2">
                {/* Course code */}
                <div className="flex flex-col space-y-1.5 flex-1 w-full ">
                <Label htmlFor="courseCode" className="block col-span-4 text-left">
                  Course Code
                </Label>
                <Input
                      id="courseCode"
                      name="courseCode"
                  value={''}
                  onChange={handleChange}
                />
              </div>


                {/* Year */}
                <div className="flex flex-col space-y-1.5 flex-1 w-full ">
                <Label htmlFor="year">Year</Label>
                <Popover open={open2} onOpenChange={setOpen2}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open2}
                      className="justify-between w-full overflow-hidden no-wrap"
                    >
                          {courseData.year
                            
                        ? Years.find((level) => level.id === courseData.year)?.level
                        : "Select Level"}
                      <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command onValueChange={handleChange} >
                      <CommandInput placeholder="Search ..." />
                      <CommandEmpty>No year found</CommandEmpty>
                      <CommandGroup>
                        {Years.map((level) => (
                          <CommandItem
                            key={level.id}
                            onSelect={(currentValue) => {  if (currentValue !== courseData.year) {
                              setCourseData(prevData => ({
                                ...prevData,
                                year: currentValue
                              }));
                            }
                              setOpen2(false); // Updated from setOpen2(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                courseData.year === level.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {level.level}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                </div>

        </div>

                <div className="grid gap-4 mb-1.5 md:grid-cols-2">
                {/* Credit Hours */}

                <div className="flex flex-col space-y-1.5 flex-1 w-full">
                <Label htmlFor="credit">Credit</Label>
                <Popover open={open1} onOpenChange={setOpen1}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open1}
                      className="justify-between w-full overflow-hidden no-wrap"
                    >
                      {courseData.year
                        ? creditHours.find((credit) => credit.id === courseData.year)?.hour
                        : "Select Level"}
                      <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command onValueChange={handleChange} >
                      <CommandInput placeholder="Search ..." />
                      <CommandEmpty>No year found</CommandEmpty>
                      <CommandGroup>
                        {creditHours.map((credit) => (
                          <CommandItem
                            key={credit.id}
                            onSelect={(currentValue) => {
                              if (currentValue !== courseData.credit) {
                                setCourseData(prevData => ({
                                  ...prevData,
                                  credit: currentValue
                                }));
                              }
                              setOpen2(false); // Updated from setOpen2(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                courseData.credit === credit.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {credit.hour}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                </div>


               {/* Semester */}
                <div className="flex flex-col space-y-1.5 flex-1 w-full">
                <Label htmlFor="semester">Semester</Label>
                <Popover open={open3} onOpenChange={setOpen3}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open2}
                      className="justify-between w-full overflow-hidden no-wrap"
                    >
                      {courseData.semester
                        ? Semesters.find((sem) => sem.id === courseData.semester)?.semester
                        : "Select Semester"}
                      <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command onValueChange={handleChange} >
                      <CommandInput placeholder="Search ..." />
                      <CommandEmpty>No semester found</CommandEmpty>
                      <CommandGroup>
                        {Semesters.map((sem) => (
                          <CommandItem
                            key={sem.id}
                            onSelect={(currentValue) => {
                              if (currentValue !== courseData.semester) {
                                setCourseData(prevData => ({
                                  ...prevData,
                                  semester: currentValue
                                }));
                              }
                              setOpen2(false); 
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                courseData.semester === sem.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {sem.semester}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
               </div>
                </div>
               

              

              
            
            </form>
          </div>
         
          <DialogFooter>
            <div className="hidden sm:block">
              <Button variant="secondary" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
            </div>
            <div className="hidden sm:block">
              <Button onClick={handleSubmit}>Save</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
          </ScrollArea>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Course</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Are you sure you want to delete this course? This action cannot be
            undone.
          </AlertDialogDescription>
          <AlertDialogFooter className="gap-4 mt-6">
        
           
            <Button onClick={handleDeleteCourse}>Delete</Button>
            <Button variant="secondary" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}