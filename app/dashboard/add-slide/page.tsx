'use client'
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createSlide,
  getCampus,
  getProgramsByCampusId,
  getCoursesByProgramId,
 
  bytesToSize,
} from "@/lib/functions";

import { useMyContext } from "@/components/MyContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import FileUpload from "@/components/fileUpload";
import { storage } from "@/appwrite";
import { ID, UploadProgress } from "appwrite";
import { Progress } from "@/components/ui/progress";
import { toast } from "react-hot-toast";

// Slide object
const slideSchema = z.object({
  name: z.string({
    required_error: "Slide name is required",
  }),
  file: z.array(z.any()).nonempty({
    message: "Please upload a file",
  }),
  programId: z.string({
    required_error: "Please select a program",
  }),
  courseId: z.string({
    required_error: "Please select a course",
  }),
  user_id: z.string(),
  campusName: z.string(),
});

export default function AddSlides() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [campuses, setCampuses] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [currentFiles, setCurrentFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadCounter, setUploadCounter] = useState(0);
  const { user } = useMyContext();

  const form = useForm<z.infer<typeof slideSchema>>({
    resolver: zodResolver(slideSchema),
    defaultValues: {
      name: "",
      programId: "",
      courseId: "",
      file: [],
      user_id: user?.name,
    },
  });

  const { errors } = form.formState;
  const { control, register, handleSubmit, reset } = form;

  async function onSubmit(data: z.infer<typeof slideSchema>) {
    //   const { file, ...rest } = data; // Destructure the file from the form data
    // const fileData = file[0]; // Access the file data from the array

    const handleFileUpload = async (file: File) => {
      try {
        
        // Create a new Appwrite file
        const response = await storage.createFile(process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!, ID.unique(), file,undefined,
        (progress: UploadProgress) => {
          // Update the progress bar with the progress value (0-100)
          const uploadProgress = Math.round(
            (progress.chunksUploaded * 100) / progress.chunksTotal
          );
          console.log("Upload progress:", uploadProgress);
          setUploadProgress(uploadProgress);
        });
    
        // Get the file ID from the response
        const fileId = response.$id;
   
        // Retrieve file details, download URL, and preview URL
        const fileDetails = await storage.getFile(
          process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
          fileId );
      const fileName = fileDetails.name || "";
      
      
        // Wait for the file to finish uploading
        const fileUrlResponse = await storage.getFileDownload(
          process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
          fileId
        );
   
        const filePreviewResponse = await storage.getFilePreview(
          process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
          fileId
        );
        const uploadedFileUrl = fileUrlResponse.toString();
        return { uploadedFileUrl, filePreviewResponse };

      } 
      
      catch (error) {
        // Handle upload error
        console.error("Upload failed:", error);
        toast.error("File upload failed");
      }
    };


    
    // Loop through the files and upload them one by one
    if (currentFiles.length > 0) {
      for (let i = 0; i < currentFiles.length; i++) {
        const currentFile = currentFiles[i] as File;
        try {
          const result= await handleFileUpload(currentFile);
         

          if (result && result.uploadedFileUrl !== "") {
            const { uploadedFileUrl, filePreviewResponse } = result;
            const fileExtension = currentFile.name.split(".")
            .pop()
            ?.toUpperCase();
             
        
            const fileName = currentFile.name.replace(/_/g, " ");
            const slideData = {
              name: fileName.slice(0, fileName.lastIndexOf(".")),
  size: bytesToSize(currentFile.size),
  fileUrl: uploadedFileUrl,
  fileType: fileExtension ? fileExtension.toString() : "",
  courseId: form.watch("courseId"), // Add this line
  previewUrl: filePreviewResponse,
  user_id: user?.id,
            };
      
            const response = await createSlide(slideData);
            if (response) {
              setUploadCounter(prevCount => prevCount + 1); // Increment the counter when a file is uploaded
            }
          }



        } catch (error) {
          // Handle upload error
          console.error("Upload failed:", error);
        }
      }
    }

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
    async function fetchProgramsByCampusId(campusId: string) {
      try {
        const response = await getProgramsByCampusId(campusId);
        setPrograms(response);
      } catch (error) {
        // Handle error
      }
    }

    if (form.watch("campusName")) {
      fetchProgramsByCampusId(form.watch("campusName"));
    }
  }, [form.watch("campusName"), campuses]);

  useEffect(() => {
    async function fetchCoursesByProgramId(programId: string) {
      try {
        const response = await getCoursesByProgramId(programId);
        setCourses(response);
      } catch (error) {
        // Handle error
      }
    }

    if (form.watch("programId")) {
      fetchCoursesByProgramId(form.watch("programId"));
    }
  }, [form.watch("programId")]);

  return (
    // <Form {...form}>
    //   <div>
    //   <Card className="max-w-md mx-auto">
    //     <CardHeader>
    //       <CardTitle>Add Slide</CardTitle>
    //     </CardHeader>
    //     <CardContent>
    //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
    //         <FormField
    //           control={form.control}
    //           name="campusName"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Campus</FormLabel>
    //               <Select
    //                 onValueChange={field.onChange}
    //                 defaultValue={field.value}
    //               >
    //                 <FormControl>
    //                   <SelectTrigger>
    //                     <SelectValue placeholder="Select a campus" />
    //                   </SelectTrigger>
    //                 </FormControl>
    //                 <SelectContent>
    //                   {campuses.map((campus) => (
    //                     <SelectItem key={campus.$id} value={campus.$id}>
    //                       {campus.name},{" "}
    //                       <span className="text-sm font-medium text-right">
    //                         {campus.location}
    //                       </span>
    //                     </SelectItem>
    //                   ))}
    //                 </SelectContent>
    //               </Select>
    //               <FormDescription>
    //                 Choose the campus for the course.
    //               </FormDescription>
    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />

    //         <FormField
    //           control={form.control}
    //           name="programId"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Program</FormLabel>
    //               <Select
    //                 onValueChange={field.onChange}
    //                 defaultValue={field.value}
    //               >
    //                 <FormControl>
    //                   <SelectTrigger>
    //                     <SelectValue placeholder="Select program" />
    //                   </SelectTrigger>
    //                 </FormControl>
    //                 <SelectContent>
    //                   {programs.map((program) => (
    //                     <SelectItem key={program.$id} value={program.$id}>
    //                       {program.name}
    //                     </SelectItem>
    //                   ))}
    //                 </SelectContent>
    //               </Select>
    //               <FormDescription>
    //                 Choose the campus for the course.
    //               </FormDescription>
    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />

    //         <FormField
    //           control={form.control}
    //           name="courseId"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Course</FormLabel>
    //               <Select
    //                 onValueChange={field.onChange}
    //                 defaultValue={field.value}
    //               >
    //                 <FormControl>
    //                   <SelectTrigger>
    //                     <SelectValue placeholder="Select a campus" />
    //                   </SelectTrigger>
    //                 </FormControl>
    //                 <SelectContent>
    //                   {courses.map((course) => (
    //                     <SelectItem key={course.$id} value={course.$id}>
    //                       {course.name}
    //                     </SelectItem>
    //                   ))}
    //                 </SelectContent>
    //               </Select>
    //               <FormDescription>
    //                 Select a Course for the slide.
    //               </FormDescription>
    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />
    //         <div>
    //           <FormLabel>File</FormLabel>
    //           <FormControl>
    //             <FileUpload
    //               currentFiles={currentFiles}
    //               setCurrentFiles={setCurrentFiles}
    //               {...register("file")}
    //             />{" "}
               
    //           </FormControl>
    //           {errors.file && <FormMessage>{errors.file.message}</FormMessage>}

              
    //         </div>
          
    //       </form>
    //     </CardContent>
    //     <CardFooter>
    //     {uploadProgress > 0 && <Progress value={uploadProgress} />}
    //     </CardFooter>
    //   </Card>


    //   </div>
     
    // </Form>
    <Form {...form}>
    <div>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Add Slide</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
            <FormField
              control={form.control}
              name="campusName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campus</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a campus" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {campuses.map((campus) => (
                        <SelectItem key={campus.$id} value={campus.$id}>
                          {campus.name},{" "}
                          <span className="text-sm font-medium text-right">
                            {campus.location}
                          </span>
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

            <FormField
              control={form.control}
              name="programId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {programs.map((program) => (
                        <SelectItem key={program.$id} value={program.$id}>
                          {program.name}
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

          

              <FormField
                control={form.control}
                name="courseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.$id} value={course.$id}>
                            {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the course to add the slide to.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FileUpload
                  currentFiles={currentFiles}
                  setCurrentFiles={setCurrentFiles}
                  {...register("file")}
                />{" "}
                    <FormDescription>
                      Select the file(s) to upload.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Upload</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Form>
  );
}
  