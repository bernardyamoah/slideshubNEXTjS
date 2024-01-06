"use client";
import { useState } from "react";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { deleteSelectedSlides, deleteSelectedCourses, deleteSelectedBooks, deleteSelectedPrograms } from "@/lib/functions";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  selectedRowIds: any[];
  setRefresh: any;
  title: string
}

export function DataTableViewOptions<TData>({
  table,
  selectedRowIds,
  setRefresh,
  title
}: DataTableViewOptionsProps<TData>) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);




  const handleDelete = () => {
    const deleteFunctionMap = {
      Course: deleteSelectedCourses,
      Slides: deleteSelectedSlides,
      Programs: deleteSelectedPrograms,
      Books: deleteSelectedBooks,
    };

    const deleteFunction = deleteFunctionMap[title];
    try {
      console.log(title)
      let id = toast.promise(deleteFunction(selectedRowIds, setRefresh), {
        loading: "Deleting...",
        success: "Success",
        error: "Failed to delete!",
      })
      toast.dismiss(id);
      setShowDeleteDialog(false);

    } catch (error) {
      console.log(error);
      setShowDeleteDialog(false);
    }
  }

  return (
    <div className="gap-5 flex ">
      <Button
        variant="secondary"
        size="sm"
        className={` h-8 duration-400 transition-all   ${selectedRowIds.length > 0 ? 'flex' : 'hidden'}`}
        onClick={() =>
          setShowDeleteDialog(true)

        }
      >
        <Trash2Icon className=" h-4 w-4" />

      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
          >
            <MixerHorizontalIcon className="mr-2 h-4 w-4" />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide(),
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {title}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Are you sure you want to proceed? This action cannot be
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
    </div>
  );
}
