'use client'

import { useCallback, useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { bytesToSize, errorMessage, handleFileUpload, successMessage, updateSlide } from "@/lib/functions";
import { databases } from "@/appwrite";
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
import {  storage } from "@/appwrite";
import { Progress } from "@/components/ui/progress";



interface PresetActionsProps {
  name: string;
  id: string;
}

export function PresetActions({ name, id }: PresetActionsProps) {
  // ...state declarations...
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [updatedName, setUpdatedName] = useState(name);
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);


  // Simplified delete handler specific to one slide
  const deleteSlideHandler = useCallback(async () => {
    try {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_SLIDES_COLLECTION_ID!,
        id
      );
      
      successMessage(`Slide deleted successfully!`);
      setShowDeleteDialog(false);
    } catch (error) {
      errorMessage("Failed to delete slide. Please try again.");
    }
  }, [id]);


  // Simplified edit handler specific to one slide
  const handleEdit = useCallback(async () => {
    try {
      const updatedAttributes = {
        name: updatedName,
        // Include other attributes as necessary
      };

      await updateSlide(id, updatedAttributes);

      successMessage("Slide updated successfully!");
      setShowDialog(false);
    } catch (error) {
      errorMessage("Failed to update slide. Please try again.");
    }
  }, [id, updatedName]);


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
    
        setShowDialog(false);
        successMessage("Slide updated! 🎉");
      } catch (error) {
        errorMessage("Failed to update slide ❌");
        setCurrentFile(null);
      }
    },
    [currentFile, id, name, updatedName]
  );


  // ...rest of the component...

  return (
    <>
      {/* Dropdown menu for actions */}
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
      
      {/* Dialog for editing slide */}
      
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

      {/* AlertDialog for confirming deletion */}
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
            <Button variant="destructive" onClick={deleteSlideHandler}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
