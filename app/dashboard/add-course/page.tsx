'use client'
import React, { useEffect, useState } from "react";
import { useForm} from "react-hook-form";

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
  errorMessage,
  getCampus,
 
  getProgramsByCampusId,
  successMessage,
} from "@/lib/functions";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { CheckIcon } from "lucide-react";
import { useMyContext } from "@/components/MyContext";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";


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
    name: z.string({
        required_error: "Course name is required",
      }),
  programId: z.string({
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
  campusName: z.string(),
  user_id:z.string()
  
})
;



export default function AddCourse() {
    const [programs, setPrograms] = useState<any[]>([]); // Initialize as an empty array
    const [campuses, setCampuses] = useState<any[]>([]); 
    const {user } = useMyContext();
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: '',
        programId: '',
        year: '',
        credit: '',
        courseCode: '',
        semester: '',
        lecturer: '',
        campusName:'',
        user_id: user?.name, 
      },
    });
  
  const { errors } = form.formState;
  const { control,handleSubmit ,reset} = form;

 async function onSubmit(data: z.infer<typeof formSchema>) {
  const { campusName, ...formData } = data;
  formData.user_id = user.name;

    await createCourse(formData);
    reset();
 
  }


  useEffect(() => {
    async function fetchCampuses() {
      try {
        const response = await getCampus();
        setCampuses(response);
      } catch (error) {
        // Handle error
      }
    }
  
    fetchCampuses();
  }, []);
  useEffect(() => {
    async function fetchProgramsByCampusId(campusId:string) {
      try {
        const response = await getProgramsByCampusId(campusId);
        setPrograms(response);
      } catch (error) {
       errorMessage(`${error}`)
      }
    }
  
    if (form.watch("campusName")) {
      fetchProgramsByCampusId(form.watch("campusName"));
    }
  }, [form.watch("campusName")]);
  

  return (
    <Form {...form} >
      <Card className="max-w-md mx-auto" >
     <CardHeader>
        <CardTitle>
            Add Course 
        </CardTitle>
     </CardHeader>
     <CardContent>
     <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
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
  control={control}
  name="user_id"
  render={({ field }) => (
    <div className="hidden"> {/* Add the style to hide the component */}
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

        {/* Course Code */}

        <FormField
          control={form.control}
          name="courseCode"
          render={({ field }) => (
            <div>
              <FormLabel>Course Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter Course Code" {...field} />
              </FormControl>
              {errors.courseCode && (
                <FormMessage>{errors.courseCode.message}</FormMessage>
              )}
            </div>
          )}
        />
{/* Campus  */}
<FormField
  control={form.control}
  name="campusName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Campus</FormLabel>
      <Select onValueChange={field.onChange}  defaultValue={field.value} >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a campus" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {campuses.map((campus) => (
            <SelectItem key={campus.$id} value={campus.$id}>
              {campus.name}, <span className='text-sm font-medium text-right'>{campus.location}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormDescription>
        Choose the campus for the course.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
        
        {/* Program */}

        <FormField
  control={form.control}
  name="programId"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="block">Program</FormLabel>
      <Popover >
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-full justify-between",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value
                ? programs.find((program) => program.$id === field.value)?.name
                : "Select a program"}
              <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="!w-full p-2">
          <Command>
            <CommandInput
              placeholder="Search program..."
              className="h-9"
            />
            <CommandEmpty>No program found.</CommandEmpty>
            <CommandGroup>
              {programs.map((program) => (
                <CommandItem
                  value={program.name}
                  key={program.$id}
                  onSelect={() => {
                    form.setValue("programId", program.$id);
                  }}
                >
                  {program.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      program.$id === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <FormDescription>
        Choose the program for the course.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>

{/* Level */}

        <FormField
  control={form.control}
  name="year"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Year</FormLabel>
      <Select onValueChange={field.onChange}  defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select an academic year" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {Levels.map((level) => (
            <SelectItem key={level.id} value={level.id.charAt(0).toUpperCase() + level.id.slice(1)}>
              {level.label}
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
  name="credit"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Credit Hour</FormLabel>
      <Select onValueChange={field.onChange}  defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a credit hour " />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {creditHours.map((creditHour) => (
            <SelectItem key={creditHour.id} value={creditHour.id}>
              {creditHour.label} hour
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
      <Select onValueChange={field.onChange}  defaultValue={field.value}>
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
        <Button type="submit" >Submit</Button>
      </form>
     </CardContent>
      </Card>
    </Form>
  );
}
