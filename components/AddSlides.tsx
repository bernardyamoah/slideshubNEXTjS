import * as React from "react";
import {useEffect,useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {bytesToSize, createSlide, getPrograms, getCoursesByProgramId,getCurrentUserAndSetUser } from "@/lib/functions";
import { storage, ID } from "@/appwrite";
import { Button } from "@/components/ui/button";
import DocumentUpload from "./document-upload";
import { Check, ChevronsUpDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import toast, { Toaster } from 'react-hot-toast';






export default function AddSlides() {
  const [open1, setOpen1] = React.useState(false)  
  const [open, setOpen] = React.useState(false);

  const [currentFile, setCurrentFile] = useState<File | null>(null);
const [courseId, setCourseId]=useState('')
const [user, setUser] = useState<UserWithId | null>(null); // Update the type of user state
const [programId, setProgramId] = React.useState("");

const [programs, setPrograms] = useState<any[]>([]); 
const [courses, setCourses] = useState<any[]>([]);

useEffect(() => {
  async function fetchCourses() {
    try {


      const userId = await getCurrentUserAndSetUser(); // Call the getCurrentUser function
      setUser(userId);
      const programResponse = await getPrograms();
      setPrograms(programResponse);
      const response = await getCoursesByProgramId(programId);
      
      setCourses(response);
    } catch (error) {
      console.log('Error fetching courses:', error);
    }

  }

fetchCourses()
}, [programId]);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Check if the file is chosen
    if (!currentFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    try {
      const handleFileUpload = async () => {
        try {
          const file = currentFile;
          const uploader = await toast.promise(storage.createFile(
            process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
            ID.unique(),
            file
          ),
          {
            loading: 'Uploading file...',
            success: 'File uploaded!',
            error: 'Upload failed',
          }
        );
          const fileId = uploader.$id;
  // Fetch file information from Appwrite
  const fileDetails = await 
    storage.getFile(
      process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
      fileId
    )
  
  ;
          const fileName = fileDetails.name || "";

          const fileUrlResponse = await storage.getFileDownload(
            process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
            fileId
          );
          const filePreviewResponse= await storage.getFilePreview(process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,   fileId);
          const uploadedFileUrl = fileUrlResponse.toString();

          return {uploadedFileUrl, filePreviewResponse};
        } catch (error) {
          throw new Error("Upload failed" + error);
        }
      };

      const result = await handleFileUpload();

      if (result.uploadedFileUrl !== "") {
        const { uploadedFileUrl, filePreviewResponse } = result;
        const fileExtension = currentFile.name.split(".").pop()?.toUpperCase();
        const fileName = currentFile.name;
        const slideData = {
          name: fileName.slice(0, fileName.lastIndexOf(".")),
          size: bytesToSize(currentFile.size),
          fileUrl: uploadedFileUrl,
          fileType:fileExtension ? fileExtension.toString() : "",
          courseId,
        
          previewUrl:filePreviewResponse,
          user_id: user?.id
        };

        const response = await createSlide(slideData);

        // Reset form fields
        setCurrentFile(null);
        setProgramId("");
        setCourseId("");
    
      }
    } catch (error) {
      console.error("Error handling form submission:", error);
      setCurrentFile(null);

  
    }
  };
  const handleSelectChange = (selectedValue: string) => {
    setCourseId(selectedValue);
  
  };
  const handleProgramChange = (selectedValue: string) => {
    setProgramId(selectedValue);
  };
  return (
    <>
      <div className="flex items-center mt-10">
        <div className="max-w-3xl mx-auto w-full">
          <Card className="lg:container">
            <CardHeader>
              <CardTitle>Add Slide</CardTitle>
              <CardDescription>Add a slide document in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-2 space-y-6">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="programme">Programme</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open1}
                          className="w-full justify-between"
                        >
                          {programId
                            ? programs.find(
                              (program) => program.$id === programId
                            )?.name
                            : "Select Programme"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" >
                        <Command onValueChange={handleProgramChange} >
                          <CommandInput required placeholder="Search program..." />
                          <CommandEmpty>No program found.</CommandEmpty>
                          <CommandGroup >
                            {programs.map((program) => (
                              <CommandItem 
                                key={program.$id}
                                onSelect={(currentValue) => {
                                  setProgramId(
                                    currentValue === programId
                                      ? ""
                                      : program.$id
                                  );
                                  setOpen(false);
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
              <Popover open={open1} onOpenChange={setOpen1}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open1}
          className="w-full justify-between"
        >
          {courseId
            ? courses.find((course) => course.$id === courseId)?.name
            : "Select Courses"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command onValueChange={handleSelectChange}>
          <CommandInput placeholder="Search course..." />
          <CommandEmpty>No course found.</CommandEmpty>
          <CommandGroup>
            {courses.map((course) => (
              <CommandItem className="capitalize"
                key={course.$id}
                onSelect={(currentValue) => {
                  setCourseId(currentValue === courseId ? "" : course.$id)
                  setOpen1(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    courseId === course.$id ? "opacity-100" : "opacity-0"
                  )}
                />
                {course.name.split(' ').map((word:string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}

              
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  
            </div>
                  <div className="grid w-full items-center gap-1.5">
                    <DocumentUpload currentFile={currentFile} setCurrentFile={setCurrentFile} />
                  </div>
                  <div className="mt-24 sm:flex sm:justify-end w-full">
                    <Button type="submit" className="w-full sm:w-fit px-6 py-4">
                      Add
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        <Toaster />
      </div>
    </>
  );
}
