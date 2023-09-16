"use client"

import React, { useCallback, useState } from 'react';
import { Edit, MoreHorizontal, Trash } from "lucide-react"
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

import { updateSlide, deleteSlide, successMessage } from "@/lib/functions";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import DocumentUpload from '@/components/document-upload';
import { Separator } from '@radix-ui/react-dropdown-menu';
// import DocumentUpload from "@/components/document-upload";


interface PresetActionsProps {
  name: string;
  id: string;

}

export function PresetActions({ name, id }: PresetActionsProps) {

  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const [updatedName, setUpdatedName] = useState(name);
  const [showDialog, setShowDialog] = useState(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Perform the update
      const updatedAttributes: { name?: string; file?: File } = {};
      if (updatedName !== name) {
        updatedAttributes.name = updatedName;
      }

      if (currentFile !== null) { // Check if currentFile is not null or undefined
        updatedAttributes.file = currentFile;
      }

      await updateSlide(id, updatedAttributes);

      // Reset form fields
      setCurrentFile(null);
      setUpdatedName(updatedName);

    
    } catch (error) {
      console.error("Error updating slide:", error);
      setCurrentFile(null);
    }
  };



  const handleDeleteSlide = useCallback(() => {
    deleteSlide(id);
    setShowDeleteDialog(false);
    successMessage('Slide deleted successfully!');
  }, [id]);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <>
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button className="h-2 p-2 text-gray-700 bg-transparent border-none dark:text-gray-100 hover:bg-transparent">
            <span className="sr-only ">Menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => setShowDialog(true)}>
      <Edit className="w-4 h-4 mr-2" />
      Edit Name
    </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="!text-red-600 hover:!bg-red-200/10"
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete File
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

   
      <Dialog open={showDialog} onOpenChange={setShowDialog}>

            

<DialogContent className="sm:max-w-[480px]">
  <DialogHeader>
      <DialogTitle>Change name </DialogTitle>
    <DialogDescription>
      Make changes to your slides here. Click save when you&apos;re done.
    </DialogDescription>
  </DialogHeader>
  <div className="grid gap-4 p-4">
  {/* update the file name */}
    <div className="grid items-center grid-cols-4 gap-4">
   
   <Label htmlFor="name" className="block col-span-4 text-left">
       Name
      </Label>
      <Input id="name"   value={updatedName} onChange={(event) => setUpdatedName(event.target.value)} className="block col-span-4" />
   
    </div>

    <Separator/>
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
  </div>
  <DialogFooter>
    <Button type="submit" onClick={handleSubmit}>Save changes</Button>
  </DialogFooter>
</DialogContent>
</Dialog>
      


      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle >Are you sure absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete <span className="text-gray-700 dark:text-gray-200">{name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 mt-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant='destructive'
              onClick={handleDeleteSlide}
            >


              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}