"use client"

import * as React from "react"

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
import { Card } from "@/components/ui/card";
import { CardBody, Dialog, Typography, Input } from "@material-tailwind/react";
import { Button } from "@/components/ui/button";
import DocumentUpload from "@/components/document-upload";


interface PresetActionsProps {
  name: string;
  id: string;

}

export function PresetActions({ name, id }: PresetActionsProps) {


  const [programId, setProgramId] = React.useState("");

  const [currentFile, setCurrentFile] = React.useState<File | null>(null);

  const [updatedName, setUpdatedName] = React.useState(name);
  React.useEffect(() => {
    async function fetchCourses() {

    }

    fetchCourses()
  }, [programId]);
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
      setUpdatedName('');

      // Close the dialog
      setOpen(false);
    } catch (error) {
      console.error("Error updating slide:", error);
      setCurrentFile(null);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleDeleteSlide = () => {
    deleteSlide(id);
    setShowDeleteDialog(false);
    successMessage("Slide deleted successfully!");
  };
  // const [open, setIsOpen] = React.useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)

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
              Update {name}
            </Typography>

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
      </Dialog>



      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This file <span className="font-bold text-emerald-600">({name})</span> will no longer be
              accessible by you or others you&apos;ve shared it with.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 mt-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button

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