"use client";
import React, { useEffect, useState, useCallback } from "react";


import {toast} from "sonner";
import {
  bytesToSize,
  createSlide,
  getCurrentUserAndSetUser,
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
import { Progress } from "./ui/progress";
import { useCampuses } from "@/customHooks/useCampuses";
import { usePrograms } from "@/customHooks/usePrograms";
import { useCourses } from "@/customHooks/useCourse";
import { Badge } from "./ui/badge";
import FileUpload from "./fileUpload";
import { useUserContext } from "./UserContext";


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
  const {user}=useUserContext();
  const [currentFiles, setCurrentFiles] = useState([]);
  const [courseId, setCourseId] = useState<string>("");

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
    let uploadCounter = 0; 
    const toastId = toast.loading("Uploading files..."); // Show a loading toast
  
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
            console.log("Upload progress:", uploadProgress);
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
       
        toast.error('Event has not been created')
        throw error; // Rethrow the error to be caught in the calling function
      }
    }

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
  courseId,
  previewUrl: filePreviewResponse,
  user_id: user?.$id,
            };
      
            const response = await createSlide(slideData);
            if (response) {
              setUploadCounter(prevCount => prevCount + 1); 
            }
          }



        } catch (error) {
          // Handle upload error
          console.error("Upload failed:", error);
        }
      }
    }

//   // Loop through the files and upload them one by one
//     if (currentFiles.length>0) {
//       for (let i = 0; i < currentFiles.length; i++) {
//         const currentFile = currentFiles[i] as File;
//       try {
//         const handleFileUpload = async () => {
//           try {
//             const file = currentFile;
//             const uploader = await 
//               storage.createFile(
//                 process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
//                 ID.unique(),
//                 file,
//                 undefined,
//                 (progress: UploadProgress) => {
//                   // Update the progress bar with the progress value (0-100)
//                   const uploadprogress = Math.round(
//                     (progress.chunksUploaded * 100) / progress.chunksTotal
//                   );
//                   console.log("Upload progress:", uploadprogress);
//                   setUploadProgress(uploadprogress);
//                 }
            
//             );

//             const fileId = uploader.$id;
//             const fileDetails = await storage.getFile(
//               process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
//               fileId
//             );
//             const fileName = fileDetails.name || "";
//             const fileUrlResponse = await storage.getFileDownload(
//               process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
//               fileId
//             );
//             const filePreviewResponse = await storage.getFilePreview(
//               process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
//               fileId
//             );
//             const uploadedFileUrl = fileUrlResponse.toString();

//             return { uploadedFileUrl, filePreviewResponse };
//           } catch (error) {
//             throw new Error("Upload failed" + error);
//           }
//         };

//         const result = await handleFileUpload();

//         if (result.uploadedFileUrl !== "") {
//           const { uploadedFileUrl, filePreviewResponse } = result;
//           const fileExtension = currentFile.name
//             .split(".")
//             .pop()
//             ?.toUpperCase();
//           const fileName = currentFile.name.replace(/_/g, " ");
//           const slideData = {
//             name: fileName.slice(0, fileName.lastIndexOf(".")),
//             size: bytesToSize(currentFile.size),
//             fileUrl: uploadedFileUrl,
//             fileType: fileExtension ? fileExtension.toString() : "",
//             courseId,
//             previewUrl: filePreviewResponse,
//             user_id: user?.id,
//           };

//           const response = await createSlide(slideData);
//           if (response) {
//             uploadCounter++; // Increment the counter when a file is uploaded
//           }
//         }
//       } catch (error) {
//         // File upload failed, handle the error
//         console.error("Upload failed", error);
        
//         toast.error("Upload failed. Please try again later.");
//       }
//     }
// // Update the loading toast to a success toast when all files have been uploaded      
//   if (uploadCounter === currentFiles.length) {
//     toast.success("All files have been uploaded successfully!", { id: toastId });
//   }


//     // Clear the array of files, reset programId, courseId and progress after all uploads
//     setCurrentFiles([]);
//     setProgramId("");
//     setCourseId("");
//     setActiveStep(0);
//     setIsLastStep(false);
//     setIsFirstStep(false);
//     setUploadProgress(0);
//     uploadProgress > 0 && setUploadProgress(0);
//   }

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
      <div>
        <Badge
          className="flex items-center justify-center mx-auto w-fit"
          variant="secondary"
        >
         
        </Badge>
        <div className="w-full max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="grid items-center w-full gap-2 space-y-6">
           
                <div className="flex flex-col space-y-1.5">
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
          

           
                <div className="flex flex-col space-y-1.5">
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
             

            
                <div className="flex flex-col space-y-1.5">
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
            


                <div className="grid w-full items-center gap-1.5">
              
                  <FileUpload
        currentFiles={currentFiles}
        setCurrentFiles={setCurrentFiles}
      />
                </div>
         

              {/* Render the progress bar */}
              {uploadProgress > 0 && <Progress value={uploadProgress} />}
              {/* Render the navigation buttons */}
              <div className="flex justify-between mt-10">
         
               
               
  <Button type="submit">Submit</Button>

              </div>
            </div>
          </form>
        </div>
    
      </div>
    </>
  );
}
