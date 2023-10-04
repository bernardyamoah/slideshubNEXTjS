"use client";
import React, { useState, useCallback } from "react";

import {toast} from 'sonner'

import {
  bytesToSize,
  createSlide,
  
} from "@/lib/functions";
import { storage, ID } from "@/appwrite";
import { Button } from "@/components/ui/button";

import {
  Check,
  ChevronsUpDown,
} from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { UploadProgress } from "appwrite";

import { useCampuses } from "@/customHooks/useCampuses";
import { usePrograms } from "@/customHooks/usePrograms";
import { useCourses } from "@/customHooks/useCourse";
import FileUpload from "@/components/fileUpload";
import { Progress } from "@/components/ui/progress";

import { Separator } from "@/components/ui/separator";
import { useMyContext } from "@/components/MyContext";


function isStepValid(

  campusId: string,
  programId: string,
  courseId: string,
  currentFiles: File[]
) {
  if ( !campusId) {
    return "Please select a campus before proceeding.";
  } else if ( !programId) {
    return "Please select a program before proceeding.";
  } else if ( !courseId) {
    return "Please select a course before proceeding.";
  } else if ( currentFiles.length === 0) {
    return "Please upload a document before proceeding.";
  }

  return "";
}


export default function AddSlides() {
  const [currentFiles, setCurrentFiles] = useState([]);
  const [courseId, setCourseId] = useState<string>("");
const{user}=useMyContext();
  const [programId, setProgramId] = useState<string>("");
  const [campusId, setCampusId] = useState<string>(""); // Renamed from 'campusId' to 'campusId'
  const campuses: Campus[] = useCampuses(); // Use the custom hook for campuses

  const programs: Program[] = usePrograms(campusId); // Use the custom hook for programs
  const courses: Course[] = useCourses(programId); // Use the custom hook for courses
  const [uploadProgress, setUploadProgress] = useState<number>(0);


  const [uploadCounter, setUploadCounter] = useState<number>(0);
  
  const [isProgramPopoverOpen, setIsProgramPopoverOpen] = useState(false); // Renamed from 'open' to 'isProgramPopoverOpen'
  const [isCoursePopoverOpen, setIsCoursePopoverOpen] = useState(false); // Renamed from 'open1' to 'isCoursePopoverOpen'
  const [isCampusPopoverOpen, setIsCampusPopoverOpen] = useState(false);


// Update FileUpload component
  const handleSubmit = async (event: React.FormEvent) => {
   
    event.preventDefault();

    const errorMessage = isStepValid(
    
      campusId,
      programId,
      courseId,
      currentFiles
    );
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }
   
  
    async function handleFileUpload(file: File) {
      
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
    
        const fileDetails = await storage.getFile(
          process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
          fileId
        );
        const fileName = fileDetails.name || "";
    
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
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("File upload failed");
        throw error; // Rethrow the error to be caught in the calling function
      }
    }

    if (currentFiles.length > 0) {
      const toastId = toast.loading("Uploading files..."); // Show a loading toast
      let successfulUploads = 0;
     
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
  size:  bytesToSize(currentFile.size),
  fileUrl: uploadedFileUrl,
  fileType: fileExtension ? fileExtension.toString() : "",
  courseId,
  previewUrl: filePreviewResponse,
  user_id: user?.$id,

  programme: programs.find((program) => program.$id === programId)?.name,
            };
      
       await createSlide(slideData);
       successfulUploads++;
            
          }


            
           
            

        } catch (error) {
          // Handle upload error
          console.error("Upload failed:", error);
        }
      }
      // Update the state after the loop
  setUploadCounter(successfulUploads);
      if (successfulUploads === currentFiles.length) {
        toast.success('All files have been uploaded successfully',{
          id:toastId
        });
  
        // Clear the fields after successful upload
        setCurrentFiles([]);
        setProgramId("");
        setCourseId("");
        setCampusId("");
        handleProgramChange("");
        handleCampusChange("");
        handleSelectCourseChange("");
        setUploadProgress(0);
        setUploadCounter(0); // Reset the upload counter
        
      }
   
  
    }
   
  }
  

  const handleSelectCourseChange = useCallback((selectedValue: string) => {
    setCourseId(selectedValue);
  }, []);

  const handleProgramChange = useCallback(async (selectedValue: string) => {
    setProgramId(selectedValue);
  }, []);

  const handleCampusChange = useCallback(async (selectedValue: string) => {
    setCampusId(selectedValue);
  }, []);




 

  return (
    <>
     
     <h2 className="p-5 mb-4 text-2xl font-bold">
  Upload Slides
</h2>
        
     
      <Separator className="mb-4"/>
      
        <div className="w-full max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="pb-10 mx-auto ">
            <div className="grid items-center w-full gap-2 space-y-6">
           
                <div className="grid md:grid-cols-2">

                <div className="flex flex-col space-y-1.5 p-4 ">
                  <Label htmlFor="Campus">Campuses</Label>
                  <Popover
                    open={isCampusPopoverOpen}
                    onOpenChange={setIsCampusPopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isCampusPopoverOpen}
                        className="justify-between w-full"
                      >
                        {campusId
                          ? campuses.find((campus) => campus.$id === campusId)
                              ?.name
                          : "Select Campus"}
                        <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command onValueChange={handleCampusChange}>
                        <CommandInput
                          required
                          placeholder="Search University campus..."
                        />
                        <CommandEmpty>No Campus found.</CommandEmpty>
                        <CommandGroup>
                          {campuses.map((campus) => (
                            <CommandItem
                              key={campus.$id}
                              onSelect={(currentValue) => {
                                setCampusId(
                                  currentValue === campusId ? "" : campus.$id
                                );
                                setIsCampusPopoverOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  campusId === campus.$id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {campus.name},{campus.location}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
          

           
                <div className="flex flex-col space-y-1.5 p-4">
                  <Label htmlFor="programme">Programme</Label>
                  <Popover
                    open={isProgramPopoverOpen}
                    onOpenChange={setIsProgramPopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isProgramPopoverOpen}
                        className="justify-between w-full"
                      >
                        {programId
                          ? programs.find(
                              (program) => program.$id === programId
                            )?.name
                          : "Select Programme"}
                        <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command onValueChange={handleProgramChange}>
                        <CommandInput
                          required
                          placeholder="Search program..."
                        />
                        <CommandEmpty>No program found.</CommandEmpty>
                        <CommandGroup>
                          {programs.map((program) => (
                            <CommandItem
                              key={program.$id}
                              onSelect={(currentValue) => {
                                setProgramId(
                                  currentValue === programId ? "" : program.$id
                                );
                                setIsProgramPopoverOpen(false);
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
                </div>
             

            <div className="grid md:grid-cols-2">
              
            <div className="flex flex-col space-y-1.5 p-4 md:max-w-lg">
                  <Label htmlFor="course">Courses</Label>
                  <Popover
                    open={isCoursePopoverOpen}
                    onOpenChange={setIsCoursePopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isCoursePopoverOpen}
                        className="justify-between w-full"
                      >
                        {courseId
                          ? courses.find((course) => course.$id === courseId)
                              ?.name
                          : "Select Courses"}
                        <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command onValueChange={handleSelectCourseChange}>
                        <CommandInput placeholder="Search course..." />
                        <CommandEmpty>No course found.</CommandEmpty>
                        <CommandGroup>
                          {courses.map((course) => (
                            <CommandItem
                              className="capitalize"
                              key={course.$id}
                              onSelect={(currentValue) => {
                                setCourseId(
                                  currentValue === courseId ? "" : course.$id
                                );
                                setIsCoursePopoverOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  courseId === course.$id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {course.name
                                .split(" ")
                                .map(
                                  (word: string) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
            </div>
            


                <div className="grid w-full items-center gap-1.5 p-4">
              
                  <FileUpload
        currentFiles={currentFiles}
        setCurrentFiles={setCurrentFiles}
      />
                </div>
         

              {/* Render the progress bar */}
              {uploadProgress > 0 && <Progress value={uploadProgress} />}
              {/* Render the navigation buttons */}
              <div className="grid w-full items-center gap-1.5 p-4 md:flex md:justify-end">
         
               
               
  <Button type="submit">Submit</Button>

              </div>
            </div>
          </form>
        </div>
 
     
    </>
  );
}
