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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { useState } from "react";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command";
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

export function CourseEdit({course }:CourseCardProps) {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [updatedName, setupdatedName] = useState("");
  const [updatedLecturer, setupdatedLecturer] = useState("");
  const [updatedCourseCode, setupdatedCourseCode] = useState("");
  const [updatedYear, setupdatedYear] = useState("");
  const [updatedCredit, setupdatedCredit] = useState("");
  const [updatedSemester, setupdatedSemester] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      // year = year.charAt(0).toUpperCase() + year.slice(1);

      // Perform the update
      const updatedAttributes: { 
        name?: string; 
        lecturer?: string; 
        courseCode?: string; 
        semester?: string; 
        courseCredit?: string;
        year?: string;
        // Add other fields as needed
      } = {};

      const fieldsToUpdate = [
        { field: 'name', value: updatedName },
        { field: 'lecturer', value: updatedLecturer },
        { field: 'courseCode', value: updatedCourseCode },
        { field: 'semester', value: semester },
        { field: 'year', value: year },
        // Add other fields as needed
      ];

     
      await updateCourse(course.$id, updatedAttributes);

      // Reset form fields
      setupdatedName(course.name);
      setupdatedLecturer(course.lecturer);
      setupdatedCourseCode(course.courseCode);
      setSemester(course.semester);
      // Reset other fields as needed

      // Close the dialog
      setOpen(false);
    } catch (error) {
      console.error("Error updating slide:", error);
    }
  };

  const handleDeleteCourse = () => {
    deleteCourse(course.$id);
    setShowDeleteDialog(false);
    successMessage("Slide deleted successfully!");
  };

  const handleSemesterChange = (selectedValue: string) => {
    setSemester(selectedValue);
  };
  const handleYearChange = (selectedValue: string) => {
    setYear(selectedValue);
  };
  const [showDeleteDialog, setShowDeleteDialog] =useState(false)

  return (
    <>
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button className="border-none p-2 h-2  bg-transparent text-gray-700 dark:text-gray-100 hover:bg-transparent">
            <span className="sr-only ">Actions</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => setShowDialog(true)}>
      <Edit className="mr-2 h-4 w-4" />
      Edit 
    </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="!text-red-600 hover:!bg-red-200/10"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete Course
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showDialog} onOpenChange={setShowDialog} >
        <DialogContent className="sm:max-w-[480px] ">
          <DialogHeader>
            <DialogTitle>Change name </DialogTitle>
            <DialogDescription>
              Make changes to your slides here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 p-4">
            <form className="mt-8 mb-2 w-full" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col gap-3">
                <Label htmlFor="name" className="text-left block col-span-4">
                  Name
                </Label>
                <Input
                  id="name"
                  value={course.name}
                  onChange={(event) => setupdatedName(event.target.value)}
                />
              </div>

              {/* Credit hours */}
              <div className="mb-4 flex flex-col gap-3">
                <Label htmlFor="lecturer" className="text-left block col-span-4">
                  Lecturer
                </Label>
                <Input
                  id="lecturer"
                  value={course.lecturer}
                  onChange={(event) => setupdatedLecturer(event.target.value)}
                />
              </div>

              {/* Course code */}
              <div className="mb-4 flex flex-col gap-3">
                <Label htmlFor="courseCode" className="text-left block col-span-4">
                  Course Code
                </Label>
                <Input
                  id="courseCode"
                  value={course.courseCode}
                  onChange={(event) => setupdatedCourseCode(event.target.value)}
                />
              </div>


                {/* Year */}
                <div className="flex flex-col space-y-1.5 flex-1 w-full">
                <Label htmlFor="year">Year</Label>
                <Popover open={open2} onOpenChange={setOpen2}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open2}
                      className="w-full justify-between  overflow-hidden no-wrap"
                    >
                      {year
                        ? Years.find((level) => level.id === year)?.level
                        : "Select Level"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command onValueChange={handleYearChange}>
                      <CommandInput placeholder="Search ..." />
                      <CommandEmpty>No year found</CommandEmpty>
                      <CommandGroup>
                        {Years.map((level) => (
                          <CommandItem
                            key={level.id}
                            onSelect={(currentValue) => {
                              setYear(currentValue.toUpperCase() === year ? "" : currentValue);
                              setOpen2(false); // Updated from setOpen2(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                year === level.id ? "opacity-100" : "opacity-0"
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


               {/* Semester */}
                <div className="flex flex-col space-y-1.5 flex-1 w-full">
                <Label htmlFor="semester">Semester</Label>
                <Popover open={open3} onOpenChange={setOpen3}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open2}
                      className="w-full justify-between  overflow-hidden no-wrap"
                    >
                      {semester
                        ? Semesters.find((sem) => sem.id === semester)?.semester
                        : "Select Semester"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command onValueChange={handleSemesterChange} >
                      <CommandInput placeholder="Search ..." />
                      <CommandEmpty>No semester found</CommandEmpty>
                      <CommandGroup>
                        {Semesters.map((sem) => (
                          <CommandItem
                            key={sem.id}
                            onSelect={(currentValue) => {
                              setSemester(currentValue.toUpperCase() === semester ? "" : currentValue);
                              setOpen2(false); // Updated from setOpen2(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                semester === sem.id ? "opacity-100" : "opacity-0"
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

              

              {/* Add similar input fields for other properties */}
            
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