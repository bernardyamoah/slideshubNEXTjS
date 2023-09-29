"use client";

import React, {  useState } from "react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
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


import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DocumentUpload from "@/components/document-upload";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { deleteProgram, updateProgram } from "@/lib/functions";

interface PresetActionsProps {
 
  id: string;
  programs: Program[];
  setPrograms: React.Dispatch<React.SetStateAction<Program[]>>;
}

export function PresetActions({
  id,
  programs,
  setPrograms,
}: PresetActionsProps) {
 
  const [showDialog, setShowDialog] = useState(false);
  const programData = programs.find((program) => program.$id === id);
  
  const [formFields, setFormFields] = useState({
    updatedName: programData?.name || '',
    updatedDuration: programData?.duration || '',
    updatedCampusId: programData?.campusId || '',
    });
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Perform the update
     
      const updatedAttributes: {
        name?: string;
     duration?:string;
     campusId?:string;
      } = {};
      if (formFields.updatedName !== programData?.name) {
        updatedAttributes.name = formFields.updatedName;
      }
      if (formFields.updatedDuration !== programData?.duration) {
        updatedAttributes.duration = formFields.updatedDuration;
        }
        if (formFields.updatedCampusId !== programData?.campusId) {
          updatedAttributes.campusId = formFields.updatedCampusId;
          }

      await updateProgram(id, updatedAttributes);

      // Reset form fields
      
      //  Reset form fields
setFormFields({
updatedName: programData?.name || '',
updatedDuration: '',
updatedCampusId: ''
});

      setPrograms((prevPrograms) =>
        prevPrograms.map((program) => {
          if (program.$id === id) {
            return {
              ...program,
              ...updatedAttributes,
            };
          }
          return program;
        })
      );
    } catch (error) {
      console.error("Error updating program:", error);
      
    }
  };

  const handleDeleteSlide = async () => {
    try {
      // Call the deleteSlide function to delete the slide
      await deleteProgram(id);

      // Update the slides state by filtering out the deleted slide
      const updatedPrograms = programs.filter((program) => program.$id !== id);
      setPrograms(updatedPrograms);
    } catch (error) {
      // Handle error
    }
  };

 
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
            <DialogTitle>Change name program </DialogTitle>
            <DialogDescription>
              Make changes to your programs here. Click save when you&apos;re
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
                value={formFields.updatedName}
                onChange={(event) => setFormFields((prevFormFields) => ({
                  ...prevFormFields,
                  updatedName: event.target.value,
                }))}
                className="block col-span-4"
              />
            </div>

            <Separator />
            {/* Update Program Duration */}
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="duration" className="col-span-4 text-left">
                Update Duration
              </Label>
             
            </div>
            {/* Update program Description */}
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="description" className="col-span-4 text-left">
                Update Description
              </Label>
             
            </div>
             {/* Update program Campus */}
             <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="campus" className="col-span-4 text-left">
                Update Campus
              </Label>
             
            </div>

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
              <span className="text-gray-700 dark:text-gray-200">{programData?.name}</span>.
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
