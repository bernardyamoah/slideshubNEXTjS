"use client";

// Library Imports
import { useState } from "react";


import { Button } from "@/components/ui/button";

import { Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog";

// custom Hooks and functions
import { SlideEdit } from "./slides-edit";
import { CourseEdit } from "./course-preset-actions";
import { BookEdit } from "./bookEdit";
import { ProgramEdit } from "./program-edit";


export function DataTableRowActions({ row, title, setRefresh }) {
  const { id, name } = row.original;
  const [showDialog, setShowDialog] = useState(false);


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


  return (
    <>


      <Dialog open={showDialog} onOpenChange={setShowDialog}>

        <DialogTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 border-none data-[state=open]:bg-muted">  <Edit className="h-4 w-4" />

            <span className="sr-only">Edit dialog</span>
          </Button>

        </DialogTrigger>
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
