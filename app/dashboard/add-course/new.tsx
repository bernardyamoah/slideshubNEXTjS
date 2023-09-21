"use client";
import React from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues
} from "react-hook-form";
import { createCourse } from "@/lib/functions";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { LucideTable2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// Define your schema using Zod
const courseSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  programId: z.string().nonempty('Program is required'),
  year: z.string().nonempty('Year is required'),
  credit: z.string().nonempty('Credit is required'),
  courseCode: z.string().nonempty('Course Code is required'),
  semester: z.string().nonempty('Semester is required'),
});


interface CourseData {
  name: string;
  semester: string;
  courseCode: string;
  credit: string;
  lecturer: string;
  fileId: string;
  image: string;
  year: string;
  user_id: string;
  programId: string;
}

function AddCourse() {
  const {
    handleSubmit,
    control,
    formState: { errors },reset
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData: CourseData = data as CourseData;
      // Call the Appwrite API to create a new document
      await createCourse(formData);
// Reset the form after successful submission
  reset();
      // Handle the response as needed
      console.log("Document created");
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error("Error creating document:", error);
    }
  };

  return (
   <Card className="max-w-2xl mx-auto p-3">
     <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>Name:</Label>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} />}
        />
        {/* {errors.name?.message && <span>{errors.name.message}</span>} */}
      </div>

      <div>
        <Label>Semester:</Label>
        <Controller
          name="semester"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} />}
        />
      </div>

      <div>
        <Label>Course Code:</Label>
        <Controller
          name="courseCode"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} />}
        />
      </div>

      <div>
        <Label>Credit:</Label>
        <Controller
          name="credit"
          control={control}
          defaultValue=""
          
          render={({ field }) => <Input {...field} />}
        />
      </div>

      <div>
        <Label>Lecturer:</Label>
        <Controller
          name="lecturer"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} />}
        />
      </div>

      <div>
        <Label>Year:</Label>
        <Controller
          name="year"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} />}
        />
        {/* {errors.year?.message && <span>{errors.year.message}</span>} */}
      </div>

      <div>
        <Label>User ID:</Label>
        <Controller
          name="user_id"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} />}
        />
      </div>

      <div>
        <Label>Program ID:</Label>
        <Controller
          name="programId"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} />}
        />
      </div>

      <div>
        <Button type="submit">Submit</Button>
      </div>
    </form>
    
    </Card>
  );
}

export default AddCourse;
