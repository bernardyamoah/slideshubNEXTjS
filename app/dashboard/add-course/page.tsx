'use client'
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
  FormDescription,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  createCourse,
  getCurrentUserAndSetUser,
  getPrograms,
} from "@/lib/functions";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { CheckIcon } from "lucide-react";
import { useMyContext } from "@/components/MyContext";
import { toast } from "@/components/ui/use-toast";


// Credit Hours object
const creditHours = [
  { id: "1", label: "1" },
  { id: "2", label: "2" },
  { id: "3", label: "3" },
  { id: "4", label: "4" },
] as const;

const Levels = [
  { id: "level 100", label: "Level 100" },
  { id: "level 200", label: "Level 200" },
  { id: "level 300", label: "Level 300" },
  { id: "level 400", label: "Level 400" },
] as const;

const Semesters = [
  { id: "first semester", label: "First Semester" },
  { id: "second semester", label: "Second Semester" },
] as const;

const formSchema = z.object({
  name: z.string().min(6, {
    message: "Name must be at least 2 characters.",
  }),
  program: z.string({
    required_error: "Please select a program",
  }),
  year: z.string({
    required_error: "Please select a level",
  }),
  credit: z.string({
    required_error: "Credit is required.",
  }),
  courseCode: z.string({
    required_error: "Course code is required",
  }),
  semester: z.string({
    required_error: "Please select a semester",
  }),
  lecturer: z.string().optional(),
});



export default function AddCourse() {
    const [programId, setProgramId] = useState("");
    const {user } = useMyContext();
  const {
    control,
    formState: { errors },
    reset,
  } = useForm<CourseData>({
    resolver: zodResolver(formSchema),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

 async function onSubmit(data: z.infer<typeof formSchema>) {
    let formData: CourseData = { ...data, user_id: user.name,lecturer: data.lecturer || ""  };
    console.log(data);
    await createCourse(formData);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    reset();
  }




  const handleSelectChange = (selectedValue: string) => {
    setProgramId(selectedValue);
  };

  // Define the programs variable
  const programs = getPrograms();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <div>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="lecturer"
          render={({ field }) => (
            <div>
              <FormLabel>Lecturer</FormLabel>
              <FormControl>
                <Input placeholder="Enter lecturer" {...field} />
              </FormControl>
              {errors.lecturer && (
                <FormMessage>{errors.lecturer.message}</FormMessage>
              )}
            </div>
          )}
        />

        
        {/* Program */}



{/* Level */}

        <FormField
  control={form.control}
  name="year"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Year</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select an academic year" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {Levels.map((yearOption) => (
            <SelectItem key={yearOption.id} value={yearOption.id}>
              {yearOption.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormDescription>
        Choose the academic year for the course.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>

        {/* Credit Hours */}


        <FormField
  control={form.control}
  name="year"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Year</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select an academic year" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {creditHours.map((creditHour) => (
            <SelectItem key={creditHour.id} value={creditHour.id}>
              {creditHour.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormDescription>
        Choose the credit hour for the course.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>

        {/* Semester */}
        <FormField
  control={form.control}
  name="semester"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Semester</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a semester" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {Semesters.map((semesterOption) => (
            <SelectItem key={semesterOption.id} value={semesterOption.id}>
              {semesterOption.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormDescription>
        Choose the semester course.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
