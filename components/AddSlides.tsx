'use client'
import React, { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { Step, Stepper } from "@material-tailwind/react";
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { cn } from "@/lib/utils";

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
  const currentTime = new Date();
  const [campuses, setCampuses] = useState<any[]>([]);
  console.log(currentTime);

  console.log("🚀 ~ file: AddSlides.tsx:40 ~ AddSlides ~ campuses:", campuses)
  const [campusId, setCampusId] = useState<string>(""); // Renamed from 'campusId' to 'campusId'
  const [programs, setPrograms] = useState<any[]>([]);

  const [courses, setCourses] = useState<any[]>([]);

  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [isProgramPopoverOpen, setIsProgramPopoverOpen] = useState(false); // Renamed from 'open' to 'isProgramPopoverOpen'
  const [isCoursePopoverOpen, setIsCoursePopoverOpen] = useState(false); // Renamed from 'open1' to 'isCoursePopoverOpen'
  const [isCampusPopoverOpen, setIsCampusPopoverOpen] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const campusList = await getCampus();
        setCampuses(campusList);

        const userId = await getCurrentUserAndSetUser();
        setUser(userId);

      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }

    fetchData();
  }, [campusId, programId]); // Added campusId and programId as dependencies

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
              file
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
        }
      } catch (error) {
        console.error("Error handling form submission:", error);
        setCurrentFile(null);
      }
    };
  }

  const handleSelectCourseChange = (selectedValue: string) => {
    setCourseId(selectedValue);
  };


  const handleProgramChange = async (selectedValue: string) => {
    setProgramId(selectedValue);
    // Fetch courses for the selected program
    const response = await getCoursesByProgramId(selectedValue);
    setCourses(response);
  };
  const handleCampusChange = async (selectedValue: string) => {
    console.log(selectedValue)

    // Fetch courses for the selected program
    const response = await getProgramsByCampusId(selectedValue);
    setPrograms(response);
  };

  const handleNext = (event: React.FormEvent) => {
    event.preventDefault();
    const errorMessage = isStepValid(activeStep, campusId, programId, courseId, currentFile);
    if (errorMessage) {
      toast.error(errorMessage);
    } else {
      setActiveStep((currentStep) => currentStep + 1);
      setIsFirstStep(false);
    }
  };

  const handlePrev = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFirstStep) {
      setActiveStep((currentStep) => currentStep - 1);
      setIsLastStep(false);
    }
  };

  return (
    <>
      <div className="my-10">
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

              <div className="w-full py-4 px-8">
                <div className="mt-16 flex justify-between">
                  <Button type="button" onClick={handlePrev} disabled={isFirstStep}>
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
                </div>
              </div>
            </div>
          </form>

          <div className="w-full mx-auto py-4 relative bottom-4 mt-10">
            <Stepper
              activeStep={activeStep}
              isLastStep={(value) => setIsLastStep(value)}
              isFirstStep={(value) => setIsFirstStep(value)}
            >
              <Step onClick={() => setActiveStep(0)}>
                <Building className="h-5 w-5" />
                <div className="absolute -bottom-[2.5rem] w-max text-center text-sm">
                  <p className={activeStep === 0 ? "text-blue-500" : "text-gray-500"}>
                    Campus
                  </p>
                </div>
              </Step>
              <Step onClick={() => setActiveStep(1)}>
                <BookOpen className="h-5 w-5" />
                <div className="absolute -bottom-[2.5rem] w-max text-center text-sm">
                  <p className={activeStep === 1 ? "text-blue-500" : "text-gray-500"}>
                    Programme
                  </p>
                </div>
              </Step>
              <Step onClick={() => setActiveStep(2)}>
                <GraduationCap className="h-5 w-5" />
                <div className="absolute -bottom-[2.5rem] w-max text-center text-sm">
                  <p className={activeStep === 2 ? "text-blue-500" : "text-gray-500"}>
                    Course
                  </p>
                </div>
              </Step>
              <Step onClick={() => setActiveStep(3)}>
                <CheckCircle className="h-5 w-5" />
                <div className="absolute -bottom-[2.5rem] w-max text-center text-sm">
                  <p className={activeStep === 3 ? "text-blue-500" : "text-gray-500"}>
                    Finish
                  </p>
                </div>
              </Step>
            </Stepper>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
}
