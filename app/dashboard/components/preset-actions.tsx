"use client"

import * as React from "react"

import { Check, ChevronsUpDown, Edit, MoreHorizontal, Trash } from "lucide-react"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
// import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { updateSlide, getPrograms, getCoursesByProgramId } from "@/lib/functions";
import { storage, ID } from "@/appwrite";

import { toast } from "@/components/ui/use-toast"
import { bytesToSize, deleteSlide } from "@/lib/functions"

import { Card } from "@/components/ui/card"

import { CardBody, Dialog, CardFooter, Typography, Input } from "@material-tailwind/react"


import { Button } from "@/components/ui/button"
import DocumentUpload from "@/components/document-upload"
interface PresetActionsProps {
  name: string;
  id: string;
  filetype: string;
}

export function PresetActions({ name, id, filetype }: PresetActionsProps) {


  const [programId, setProgramId] = React.useState("");

  const [currentFile, setCurrentFile] = React.useState<File | null>(null);
  const [courseId, setCourseId] = React.useState('')
  const [programs, setPrograms] = React.useState<any[]>([]);
  const [courses, setCourses] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function fetchCourses() {
      try {



        // const programResponse = await getPrograms();
        // setPrograms(programResponse);


        // setCourses(response);
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
      toast({
        description: "Please Select a file ",
      });
      return;
    }

    try {
      const handleFileUpload = async () => {
        try {
          const file = currentFile;
          const uploader = await storage.createFile(
            process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
            ID.unique(),
            file

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
        const fileName = currentFile.name;
        const slideData = {
          name: fileName.slice(0, fileName.lastIndexOf(".")),
          size: bytesToSize(currentFile.size),
          fileUrl: uploadedFileUrl,
          fileType: fileExtension ? fileExtension.toString() : "",
          courseId,

          previewUrl: filePreviewResponse,

        };



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

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  // const [open, setIsOpen] = React.useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [showUpdateDialog, setShowUpdateDialog] = React.useState(false)
  return (
    <>
      <DropdownMenu > 
        <DropdownMenuTrigger asChild>
          <Button className="border-none p-2 h-2  bg-transparent text-gray-700 dark:text-gray-100 hover:bg-transparent">
            <span className="sr-only ">Actions</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={handleOpen}
          >
            <Edit className="mr-2 h-4 w-4" />
            Update File
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="!text-red-600 hover:!bg-red-200/10"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete File
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog

        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-full max-w-4xl lg:w-full p-2"
      >
        <Card className="mx-auto w-full lg:w-2/3">
        
          <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
    
      <form className="mt-8 mb-2 w-full ">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Name" />
        <DocumentUpload currentFile={currentFile} setCurrentFile={setCurrentFile} />
        </div>
      
        <Button className="mt-6 w-full sm:w-auto mr-0" >
        Update 
        </Button>
      
      </form>
          </CardBody>
          <CardFooter className="pt-0">


          </CardFooter>
        </Card>
      </Dialog>



      <AlertDialog  open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This file <span className="font-bold text-emerald-600">({name}.{filetype.toLocaleLowerCase()})</span> will no longer be
              accessible by you or others you&apos;ve shared it with.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 mt-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button

              onClick={() => {
                setShowDeleteDialog(false)
                deleteSlide(id)
                toast({
                  description: "This file has been deleted.",
                })
              }}
            >


              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}