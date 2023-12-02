"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button" 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'



import { DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { deleteCourse } from "@/lib/functions"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useState } from "react"



export function DataTableRowActions({
  row,
}) {
  const {id}=row
  const [showDeleteDialog, setShowDeleteDialog] =useState(false)

  const handleDelete = () => {
    alert(id)
    setShowDeleteDialog(false);
    
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
        <DropdownMenuItem>Edit</DropdownMenuItem>
    
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)} className="bg-red-100 text-red-700 hover:!text-white hover:!bg-red-700">
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
<AlertDialogContent>
  <AlertDialogHeader>
    <AlertDialogTitle>Delete Course</AlertDialogTitle>
  </AlertDialogHeader>
  <AlertDialogDescription>
    Are you sure you want to delete this course? This action cannot be
    undone.
  </AlertDialogDescription>
  <AlertDialogFooter className="gap-4 mt-6">

   
    <Button onClick={handleDelete}>Delete</Button>
    <Button variant="secondary" onClick={() => setShowDeleteDialog(false)}>
        Cancel
      </Button>
  </AlertDialogFooter>
</AlertDialogContent>
      </AlertDialog>
      
      </>
  )
}
