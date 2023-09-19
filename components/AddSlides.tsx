'use client'
import React, { useEffect, useState, useCallback } from "react";


import { GraduationCap } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { bytesToSize, createSlide, getCampus, getProgramsByCampusId, getCoursesByProgramId, getCurrentUserAndSetUser } from "@/lib/functions";
import { storage, ID } from "@/appwrite";
import { Button } from "@/components/ui/button";
import DocumentUpload from "./document-upload";
import { BookOpen, Building, Check, CheckCircle, ChevronsUpDown } from "lucide-react";
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


// Replace this with the actual UserWithId interface or type
interface UserWithId {
  id: string;
  // Add other properties if required
}
function isStepValid(activeStep: number, campusId: string, programId: string, courseId: string, currentFile: File | null) {
  if (activeStep === 0 && !campusId) {
    return "Please select a campus before proceeding.";
  } else if (activeStep === 1 && !programId) {
    return "Please select a program before proceeding.";
  } else if (activeStep === 2 && !courseId) {
    return "Please select a course before proceeding.";
  } else if (activeStep === 3 && !currentFile) {
    return "Please upload a document before proceeding.";
  }

  return "";
}

export default function AddSlides() {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [courseId, setCourseId] = useState<string>('');
  const [user, setUser] = useState<UserWithId | null>(null);
  const [programId, setProgramId] = useState<string>("");
  const [campusId, setCampusId] = useState<string>(""); // Renamed from 'campusId' to 'campusId'
  const campuses: Campus[] = useCampuses(); // Use the custom hook for campuses

  const programs: Program[] = usePrograms(campusId); // Use the custom hook for programs
  const courses: Course[] = useCourses(programId); // Use the custom hook for courses
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = 3; // Define the total number of steps

  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [isProgramPopoverOpen, setIsProgramPopoverOpen] = useState(false); // Renamed from 'open' to 'isProgramPopoverOpen'
  const [isCoursePopoverOpen, setIsCoursePopoverOpen] = useState(false); // Renamed from 'open1' to 'isCoursePopoverOpen'
  const [isCampusPopoverOpen, setIsCampusPopoverOpen] = useState(false);
 

  useEffect(() => {
    async function fetchData() {
      try {

        const userId = await getCurrentUserAndSetUser();
        setUser(userId);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const errorMessage = isStepValid(activeStep, campusId, programId, courseId, currentFile);
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }
    if (currentFile) {
      try {
        const handleFileUpload = async () => {
          try {
            const file = currentFile;
            const uploader = await toast.promise(storage.createFile(
              process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
              ID.unique(),
              file,
              undefined,
              (progress: UploadProgress) => {
                // Update the progress bar with the progress value (0-100)
                const uploadprogress = Math.round((progress.chunksUploaded * 100) / progress.chunksTotal);
                console.log('Upload progress:', uploadprogress);
                setUploadProgress(uploadprogress);
              }

            ), {
              loading: 'Uploading file...',
              success: 'File uploaded!',
              error: 'Upload failed',
            });

            const fileId = uploader.$id;
            const fileDetails = await storage.getFile(
              process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
              fileId
            );
            const fileName = fileDetails.name || "";
            const fileUrlResponse = await storage.getFileDownload(
              process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
              fileId
            );
            const filePreviewResponse = await storage.getFilePreview(process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!, fileId);
            const uploadedFileUrl = fileUrlResponse.toString();

            return { uploadedFileUrl, filePreviewResponse };
          } catch (error) {
            throw new Error("Upload failed" + error);
          }
        };

        const result = await handleFileUpload();

        if (result.uploadedFileUrl !== "") {
          const { uploadedFileUrl, filePreviewResponse } = result;
          const fileExtension = currentFile.name.split(".").pop()?.toUpperCase();
          const fileName = currentFile.name.replace(/_/g, ' ');
          const slideData = {
            name: fileName.slice(0, fileName.lastIndexOf(".")),
            size: bytesToSize(currentFile.size),
            fileUrl: uploadedFileUrl,
            fileType: fileExtension ? fileExtension.toString() : "",
            courseId,
            previewUrl: filePreviewResponse,
            user_id: user?.id
          };

          const response = await createSlide(slideData);
          setCurrentFile(null);
          setProgramId("");
          setCourseId("");
          setActiveStep(0);
          setIsLastStep(false);
          setIsFirstStep(false);
          setUploadProgress(0);

          uploadProgress > 0 && setUploadProgress(0);


        }
      } catch (error) {
        // File upload failed, handle the error
        console.error("Upload failed", error);
        toast.error("Upload failed. Please try again later.");
        setCurrentFile(null);
      }
    };
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

  const handleNextStep = (event:React.FormEvent) => {
    event.preventDefault();
    const errorMessage = isStepValid(activeStep, campusId, programId, courseId, currentFile);
    if (errorMessage) {
        toast.error(errorMessage);
    } else {
      if (activeStep === (totalSteps-1)) {
        setIsLastStep(true);
      }
        setActiveStep((prevStep) => prevStep + 1);
    }
};

const handlePreviousStep = (event:React.FormEvent) => {
  event.preventDefault();
  if (activeStep > 0) {
    setActiveStep((prevStep) => prevStep - 1);
  }
};


  return (
    <>
      <div >
        <Badge className="flex items-center justify-center  w-fit   mx-auto" variant='secondary'>
        {activeStep} / out of {totalSteps}

        </Badge>
        <div className="max-w-3xl mx-auto w-full">
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-2 space-y-6">
              {activeStep === 0 && (

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="Campus">Campuses</Label>
                  <Popover open={isCampusPopoverOpen} onOpenChange={setIsCampusPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isCampusPopoverOpen}
                        className="w-full justify-between"
                      >
                        {campusId
                          ? campuses.find((campus) => campus.$id === campusId)?.name
                          : "Select Campus"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command onValueChange={handleCampusChange}>
                        <CommandInput required placeholder="Search University campus..." />
                        <CommandEmpty>No Campus found.</CommandEmpty>
                        <CommandGroup>
                          {campuses.map((campus) => (
                            <CommandItem
                              key={campus.$id}
                              onSelect={(currentValue) => {
                                setCampusId(
                                  currentValue === campusId
                                    ? ""
                                    : campus.$id
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
              )}

              {activeStep === 1 && (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="programme">Programme</Label>
                  <Popover open={isProgramPopoverOpen} onOpenChange={setIsProgramPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isProgramPopoverOpen}
                        className="w-full justify-between"
                      >
                        {programId
                          ? programs.find((program) => program.$id === programId)?.name
                          : "Select Programme"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command onValueChange={handleProgramChange}>
                        <CommandInput required placeholder="Search program..." />
                        <CommandEmpty>No program found.</CommandEmpty>
                        <CommandGroup>
                          {programs.map((program) => (
                            <CommandItem
                              key={program.$id}
                              onSelect={(currentValue) => {
                                setProgramId(
                                  currentValue === programId
                                    ? ""
                                    : program.$id
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
              )}

              {activeStep === 2 && (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="course">Courses</Label>
                  <Popover open={isCoursePopoverOpen} onOpenChange={setIsCoursePopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isCoursePopoverOpen}
                        className="w-full justify-between"
                      >
                        {courseId
                          ? courses.find((course) => course.$id === courseId)?.name
                          : "Select Courses"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command onValueChange={handleSelectCourseChange}>
                        <CommandInput placeholder="Search course..." />
                        <CommandEmpty>No course found.</CommandEmpty>
                        <CommandGroup>
                          {courses.map((course) => (
                            <CommandItem className="capitalize"
                              key={course.$id}
                              onSelect={(currentValue) => {
                                setCourseId(currentValue === courseId ? "" : course.$id);
                                setIsCoursePopoverOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  courseId === course.$id ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {course.name.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              {activeStep === 3 && (
                <div className="grid w-full items-center gap-1.5">
                  <DocumentUpload currentFile={currentFile} setCurrentFile={setCurrentFile} />
                </div>
              )}

            {/* Render the progress bar */}
           {uploadProgress > 0 &&(
            <Progress value={uploadProgress} />
           )
           }
                {/* Render the navigation buttons */}
                <div className="mt-10 flex justify-between">
                {activeStep === 0 ? (
  <Button onClick={handlePreviousStep} disabled>
    Previous
  </Button>
) : (
  <Button onClick={handlePreviousStep}>Previous</Button>
)}
            {!isLastStep ? (
                <Button onClick={handleNextStep}>Next</Button>
            ):(
                <Button type="submit">Submit</Button>
              )}
            </div>
                {/* <div className="mt-10 flex justify-between">

                  <Button type="button" onClick={handlePrev} disabled={isFirstStep}
                    className={isFirstStep ? "hidden" : "flex"}
                  >
                    Prev
                  </Button>
                  {isLastStep ? (
                    <Button type="submit">
                      Submit
                    </Button>
                  ) : (
                    <Button type="button" onClick={handleNext}>
                      Next
                    </Button>
                  )}
                
              </div> */}
            </div>
          </form>
         


        </div>
        <Toaster />
      </div>
    </>
  );
}
