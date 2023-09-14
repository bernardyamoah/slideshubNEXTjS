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
import { Card, CardTitle } from "@/components/ui/card";
// import { CardBody, Dialog, Input } from "@material-tailwind/react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
// import DocumentUpload from "@/components/document-upload";


interface PresetActionsProps {
  name: string;
  id: string;

}

export function PresetActions({ name, id }: PresetActionsProps) {

  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const [updatedName, setUpdatedName] = useState(name);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
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
          <Button className="border-none p-2 h-2  bg-transparent text-gray-700 dark:text-gray-100 hover:bg-transparent">
            <span className="sr-only ">Actions</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
          >
          <Dialog open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleOpenDialog} variant="outline">Edit </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle>Edit { name}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
            




            





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

      {/* <Dialog

        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-full max-w-4xl lg:w-full p-2"
      >
        <Card className="mx-auto w-full lg:w-2/3">
          <CardBody className="flex flex-col gap-4">
            <CardTitle >
              Update {name}
            </CardTitle>

            <form className="mt-8 mb-2 w-full" onSubmit={handleSubmit}>
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  size="lg"
                  label="Name"
                  value={updatedName}
                  onChange={(event) => setUpdatedName(event.target.value)}
                />
                <DocumentUpload
                  currentFile={currentFile}
                  setCurrentFile={setCurrentFile}
                />
              </div>

              <Button type="submit" className="mt-6 w-full sm:w-auto mr-0">
                Update
              </Button>
            </form>
          </CardBody>

        </Card>
      </Dialog> */}
 


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