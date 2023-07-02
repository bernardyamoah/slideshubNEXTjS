"use client"

import * as React from "react"
import { Dialog } from "@radix-ui/react-dialog"
import { Edit, FileType, Flag, MoreHorizontal, Trash } from "lucide-react"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { toast } from "@/components/ui/use-toast"
import { deleteSlide } from "@/lib/functions"
interface PresetActionsProps {
    name: string;
    id: string;
    filetype:string;
  }
  
export function PresetActions({name, id,filetype}:PresetActionsProps) {
  const [open, setIsOpen] = React.useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [showUpdateDialog, setShowUpdateDialog] = React.useState(false)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-none p-2 h-2">
            <span className="sr-only ">Actions</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        <DropdownMenuItem
            onSelect={() => setShowUpdateDialog(true)}
        
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
    
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This file <span className="font-bold text-emerald-600">({name}.{filetype.toLocaleLowerCase()})</span> will no longer be
              accessible by you or others you&apos;ve shared it with.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                setShowDeleteDialog(false)
                deleteSlide(id)
                toast({
                  description: "This preset has been deleted.",
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