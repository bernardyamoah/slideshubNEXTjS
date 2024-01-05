"use client";

import {
  Check,
  ChevronsUpDown,
  Edit,
  MoreHorizontal,
  Trash,
} from "lucide-react";

import { successMessage, deleteCourse, updateCourse } from "@/lib/functions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { useState } from "react";
import { Label } from "../../../components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../../components/ui/command";
import { cn } from "@/lib/utils";
import { Semesters, Years, creditHours } from "@/constants";

export function CourseEdit({ data, setRefresh, setShowDialog }) {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  // State for dialogs and course details

  const [courseDetails, setCourseDetails] = useState({ ...data });

  // Handle course update
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateCourse(data.$id, courseDetails);
      successMessage("Course updated successfully");
      setShowDialog(false);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    setCourseDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Dialog for editing course details
  const renderDialog = () => (
    <>
      <div className="grid gap-4 p-4">
        <form className="w-full  mb-2 space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 mb-4">
            <Label htmlFor="name" className="block col-span-4 text-left">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={courseDetails.name}
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
              value={courseDetails.lecturer}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-4 mb-1.5 md:grid-cols-2">
            {/* Course code */}
            <div className="flex flex-col space-y-1.5 flex-1 w-full ">
              <Label
                htmlFor="courseCode"
                className="block col-span-4 text-left"
              >
                Course Code
              </Label>
              <Input
                id="courseCode"
                name="courseCode"
                value={""}
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
                    {courseDetails.year
                      ? Years.find((level) => level.id === courseDetails.year)
                          ?.level
                      : "Select Level"}
                    <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command onValueChange={handleChange}>
                    <CommandInput placeholder="Search ..." />
                    <CommandEmpty>No year found</CommandEmpty>
                    <CommandGroup>
                      {Years.map((level) => (
                        <CommandItem
                          key={level.id}
                          onSelect={(currentValue) => {
                            if (currentValue !== courseDetails.year) {
                              setCourseDetails((prevData) => ({
                                ...prevData,
                                year: currentValue,
                              }));
                            }
                            setOpen2(false); // Updated from setOpen2(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              courseDetails.year === level.id
                                ? "opacity-100"
                                : "opacity-0",
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
                    {courseDetails.year
                      ? creditHours.find(
                          (credit) => credit.id === courseDetails.year,
                        )?.hour
                      : "Select Level"}
                    <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command onValueChange={handleChange}>
                    <CommandInput placeholder="Search ..." />
                    <CommandEmpty>No year found</CommandEmpty>
                    <CommandGroup>
                      {creditHours.map((credit) => (
                        <CommandItem
                          key={credit.id}
                          onSelect={(currentValue) => {
                            if (currentValue !== courseDetails.credit) {
                              setCourseDetails((prevData) => ({
                                ...prevData,
                                credit: currentValue,
                              }));
                            }
                            setOpen2(false); // Updated from setOpen2(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              courseDetails.credit === credit.id
                                ? "opacity-100"
                                : "opacity-0",
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
                    {courseDetails.semester
                      ? Semesters.find(
                          (sem) => sem.id === courseDetails.semester,
                        )?.semester
                      : "Select Semester"}
                    <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command onValueChange={handleChange}>
                    <CommandInput placeholder="Search ..." />
                    <CommandEmpty>No semester found</CommandEmpty>
                    <CommandGroup>
                      {Semesters.map((sem) => (
                        <CommandItem
                          key={sem.id}
                          onSelect={(currentValue) => {
                            if (currentValue !== courseDetails.semester) {
                              setCourseDetails((prevData) => ({
                                ...prevData,
                                semester: currentValue,
                              }));
                            }
                            setOpen2(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              courseDetails.semester === sem.id
                                ? "opacity-100"
                                : "opacity-0",
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

        <DialogFooter className="flex gap-4 mt-8">
          <Button variant="secondary" onClick={() => setShowDialog(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </div>
    </>
  );

  return (
    <>
      <ScrollArea className=" overflow-auto">{renderDialog()}</ScrollArea>
    </>
  );
}
