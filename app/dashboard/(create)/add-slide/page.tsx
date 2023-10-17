"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useCampuses } from "@/customHooks/useCampuses";
import { toast } from "sonner";
import { usePrograms } from "@/customHooks/usePrograms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCourses } from "@/customHooks/useCourse";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CheckIcon } from "lucide-react";
import FileUpload from "@/components/fileUpload";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ID, storage } from "@/appwrite";

import { bytesToSize, createSlide } from "@/lib/functions";
import { useUserContext } from "@/components/UserContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UploadProgress } from "appwrite";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define constants
const MIN_SELECTION_MESSAGE = `You have to select an option.`;
const MIN_FILE_SELECTION_MESSAGE = "You have to select at least one file.";

// Update the schema
const FormSchema = z.object({
  campus: z.string().min(1, MIN_SELECTION_MESSAGE),
  programs: z.string().min(1, MIN_SELECTION_MESSAGE),
  courses: z.string().min(1, MIN_SELECTION_MESSAGE),
  currentFiles: z.array(z.string().min(1, MIN_FILE_SELECTION_MESSAGE)),
});

// Extract file upload logic into a separate function
async function uploadFile(file: File,storage:any, user: any, programs:Program[], form: any, newData: any, setUploadProgress: (value: number) => void) {
  try {
    // Create a new Appwrite file
    const response = await storage.createFile(
      process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
      ID.unique(),
      file,
    undefined,
      (progress: UploadProgress) => {
        const uploadProgress = Math.round(
          (progress.chunksUploaded * 100) / progress.chunksTotal
        );
       
        setUploadProgress(uploadProgress);
      }
    );
    const fileId = response.$id;

    const fileUrlResponse = storage.getFileDownload(
      process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
      fileId
    );

    const filePreviewResponse = storage.getFileView(
      process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
      fileId
    );

    const uploadedFileUrl = fileUrlResponse.toString();
    const fileExtension = file.name.split(".").pop()?.toUpperCase();
    const fileName = file.name.replace(/_/g, " ");
    const slideData = {
      name: fileName.slice(0, fileName.lastIndexOf(".")),
      size: bytesToSize(file.size),
      fileUrl: uploadedFileUrl,
      fileType: fileExtension ? fileExtension.toString() : "",
      courseId: newData.courses,
      previewUrl: filePreviewResponse,
      user_id: user?.$id,
      programme: programs.find(
        (program) => program.$id === form.watch("programs")
      )?.name,
    };

    await createSlide(slideData);


    return true;
  } catch (error) {
    toast.error("File upload failed");
    throw error; // Rethrow the error to be caught in the calling function
  }
}
export default function CheckboxReactHookFormMultiple() {
  const { user } = useUserContext();

  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      
      currentFiles: [],

    },
  });

  const [currentFiles, setCurrentFiles] = useState([]);
  const campuses: Campus[] = useCampuses();
  const programs: Program[] = usePrograms(form.watch("campus"));
  const courses: Course[] = useCourses(form.watch("programs"));
  async function onSubmit(data: z.infer<typeof FormSchema>) {
   // Adding the current files
   const newData = { ...data, currentFiles: currentFiles };

   if (currentFiles.length > 0) {
     const toastId = toast.loading("Uploading files..."); 

     // Use Promise.all for concurrent uploads
     const uploadPromises = currentFiles.map((file: File) => uploadFile(file, storage, user, programs, form, newData,setUploadProgress));
     const results = await Promise.all(uploadPromises);

     const successfulUploads = results.filter(result => result).length;
     if (successfulUploads === currentFiles.length) {
       toast.dismiss(toastId);
        toast.message('Task Completed',
       { description: `Successfully uploaded ${successfulUploads} files.`});

       // Clear the fields after successful upload
       form.reset();
       setCurrentFiles([]);
       form.setValue("campus", "");
       setUploadProgress(0);

     }
   }
 }
  

  return (
    <Form {...form} >
      <Card className="max-w-xl mx-auto">
      <CardHeader  className="mb-6">
        <CardTitle>
            Add Slides
        </CardTitle>
     </CardHeader>
        <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="campus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campus</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={useWatch({ name: 'campus' })}>
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
                Choose the campus for the slides.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="programs"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block">Program</FormLabel>
              <Popover>
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
                        ? programs.find(
                            (program) => program.$id === field.value
                          )?.name
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
                            form.setValue("programs", program.$id);
                          }}
                        >
                          {program.name}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              program.$id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Choose the program for the slides.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="courses"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block">Course</FormLabel>
              <Popover>
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
                        ? courses.find((course) => course.$id === field.value)
                            ?.name
                        : "Select a program"}
                      <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="!w-full p-2">
                  <Command>
                    <CommandInput
                      placeholder="Search course..."
                      className="h-9"
                    />
                <ScrollArea className="h-[150px] w-full " >
                    <CommandEmpty>No program found.</CommandEmpty>
                    <CommandGroup >
                      {courses.map((course) => (
                        <CommandItem
                          value={course.name}
                          key={course.$id}
                          onSelect={() => {
                            form.setValue("courses", course.$id);
                          }}
                          className="capitalize"
                        >
                          {course.name}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              course.$id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </ScrollArea>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
          
                Choose the course for the slides.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currentFiles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Files</FormLabel>

              <FileUpload
                currentFiles={currentFiles}
                setCurrentFiles={setCurrentFiles}
              />

              <FormDescription>
            Select the files to upload.

              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         {uploadProgress >  0 &&
        <CardFooter>
        <Progress value={uploadProgress} />
        </CardFooter>
      }
        <Button type="submit" disabled={form.formState.isSubmitting}>Submit</Button>
      </form>
        </CardContent>
      </Card>
    </Form>
  );
}
  