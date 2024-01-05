"use client";

// Library Imports
import { useState } from "react";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// custom Hooks and functions
import {
  deleteBook,
  deleteCourse,
  deleteProgram,
  deleteSlide,
} from "@/lib/functions";

import { SlideEdit } from "./slides-edit";
import { CourseEdit } from "./course-preset-actions";
import { BookEdit } from "./bookEdit";
import { ProgramEdit } from "./programEdit";
import { toast } from "sonner";

export function DataTableRowActions({ row, title, setRefresh }) {
  const { id, name } = row.original;

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleDelete = () => {
    const deleteFunctionMap = {
      Course: deleteCourse,
      Slides: deleteSlide,
      Program: deleteProgram,
      Books: deleteBook,
    };

    const deleteFunction = deleteFunctionMap[title];

    if (deleteFunction) {
      toast.promise(deleteFunction(id, setRefresh), {
        loading: "Deleting...",
        success: "Success",
        error: "Failed to delete ❌",
      });

      toast.dismiss(id);
    }

    setShowDeleteDialog(false);
  };

  const renderDropdownMenu = () => {
    switch (title) {
      case "Courses":
        return (
          <CourseEdit
            data={row.original}
            setShowDialog={setShowDialog}
            setRefresh={setRefresh}
          />
        );
      case "Books":
        return (
          <BookEdit
            data={row.original}
            setRefresh={setRefresh}
            setShowDialog={setShowDialog}
          />
        );
      case "Programs":
        return (
          <ProgramEdit
            data={row.original}
            id={id}
            setRefresh={setRefresh}
            setShowDialog={setShowDialog}
          />
        );
      case "Slides":
        return (
          <SlideEdit
            data={row.original}
            id={id}
            setRefresh={setRefresh}
            setShowDialog={setShowDialog}
          />
        );
    }
  };

  const handleClick = () => {
    setShowDialog(!showDialog);
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onSelect={() => handleClick()}>
            Edit
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className=""
          >
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {title}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Are you sure you want to delete {name} file? This action cannot be
            undone.
          </AlertDialogDescription>
          <AlertDialogFooter className="gap-4 mt-6">
            <Button onClick={handleDelete}>Delete</Button>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit {title}</DialogTitle>
            <DialogDescription>
              Make changes to {name} here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {renderDropdownMenu()}
        </DialogContent>
      </Dialog>
    </>
  );
}
