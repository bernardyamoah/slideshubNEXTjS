"use client";


import {  experimental_useOptimistic as useOptimistic, useCallback, useState } from "react";
import { Badge, Edit, MoreHorizontal, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  updateSlide,
  bytesToSize,
  extractIdFromUrl,
  handleFileUpload,
  successMessage,
  errorMessage,
} from "@/lib/functions";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DocumentUpload from "@/components/document-upload";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {  databases, storage } from "@/appwrite";
import { UploadProgress } from "appwrite";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface PresetActionsProps {
  name: string;
  id: string;
  slides: Slides[];
  setSlides: React.Dispatch<React.SetStateAction<Slides[]>>;
}

export function PresetActions({
  name,
  id,
  slides,
  setSlides,
}: PresetActionsProps) {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [updatedName, setUpdatedName] = useState(name);
  const [showDialog, setShowDialog] = useState(false);
  const [optimisticSlides, setOptimisticSlides] = useOptimistic<Slides[]>(slides);

  const deleteSlideHandler = useCallback(async (id: string) => {
    try {
      // Optimistically remove the slide from the state
      setOptimisticSlides(slides.filter((slide) => slide.$id !== id)
    );
    
   

      const getDoc = await databases.getDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!,
        id
      );
      const fileID = extractIdFromUrl(getDoc.fileUrl);

      if (getDoc.$id === id && fileID !== null) {
       toast.promise(databases.deleteDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID!,
          process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!,
          id
        ),{
          loading: "Deleting slide...",
          success: ` ${name} deleted! 🎉`,
          error: "Failed to delete slide ❌",
        });
        setSlides(optimisticSlides)
        setShowDeleteDialog(false);
     
        await storage.deleteFile(
          process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
          fileID
        );
      } else {
        // If an error occurs, revert the state back to the original
        setOptimisticSlides(slides);
      errorMessage("Failed to delete Slide ❌");
       
      }
    } catch (err) {
      errorMessage("Action declined ❌");
    }
  }, [slides, setOptimisticSlides]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      try {
        const fileExtension = currentFile?.name.split(".").pop()?.toUpperCase();
        const updatedAttributes: {
          name?: string;
          fileUrl?: string;
          previewUrl?: URL;
          size?: string;
          fileType?: string;
        } = {};
        if (updatedName !== name) {
          updatedAttributes.name = updatedName;
        }

        if (currentFile !== null) {
          const result = await handleFileUpload(
            currentFile,
            id,
            setUploadProgress
          );
          if (result) {
            const fileName = currentFile.name.replace(/_/g, " ");
            updatedAttributes.name = fileName.slice(0, fileName.lastIndexOf("."));
            updatedAttributes.fileUrl = result.uploadedFileUrl;
            updatedAttributes.size = bytesToSize(currentFile.size);
            updatedAttributes.fileUrl = result.uploadedFileUrl;
            updatedAttributes.fileType = fileExtension ? fileExtension.toString() : "";
            updatedAttributes.previewUrl = result.filePreviewResponse;
          }
        }

        await updateSlide(id, updatedAttributes);

        setCurrentFile(null);
        setUpdatedName(updatedName);
        setSlides((prevSlides) =>
          prevSlides.map((slide) => {
            if (slide.$id === id) {
              return {
                ...slide,
                ...updatedAttributes,
              };
            }
            return slide;
          })
        );
        setShowDialog(false);
        successMessage("Slide updated! 🎉");
      } catch (error) {
        errorMessage("Failed to update slide ❌");
        setCurrentFile(null);
      }
    },
    [currentFile, id, name, setSlides, updatedName]
  );

 
  const handleDeleteSlide = useCallback(async () => {
    try {
      await deleteSlideHandler(id);

      const updatedSlides = slides.filter((slide) => slide.$id !== id);
      setSlides(updatedSlides);
      setShowDeleteDialog(false);
    } catch (error) {
      // Handle error
    }
  }, [deleteSlideHandler, id, setSlides, optimisticSlides]);
 
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-2 p-2 text-gray-700 bg-transparent border-none dark:text-gray-100 hover:bg-transparent">
            <span className="sr-only ">Menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setShowDialog(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="!text-red-700 hover:!bg-red-200/10"
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete File
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Change name slide </DialogTitle>
            <DialogDescription>
              Make changes to your slides here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 p-4">
            {/* update the file name */}
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name" className="block col-span-4 text-left">
                Name
              </Label>
              <Input
                id="name"
                value={updatedName}
                onChange={(event) => setUpdatedName(event.target.value)}
                className="block col-span-4"
              />
            </div>

            <Separator />
            {/* Update the file */}
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="file" className="col-span-4 text-left">
                Update file
              </Label>
              <DocumentUpload
                currentFile={currentFile}
                setCurrentFile={setCurrentFile}
              />
            </div>

{uploadProgress > 0 && (
 <>
  <Progress value={uploadProgress} max={100} className="mt-3" />
  <Badge >{uploadProgress} %</Badge>
 </>
)}
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              {/* <span className="text-gray-700 dark:text-gray-200">{name}</span>. */}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 mt-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="destructive" onClick={handleDeleteSlide}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
