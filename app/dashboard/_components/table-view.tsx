"use client";

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
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { deleteSelectedSlides } from "@/lib/functions";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  selectedRowIds: any[];
  setRefresh: any;
}

export function DataTableViewOptions<TData>({
  table,
  selectedRowIds,
  setRefresh
}: DataTableViewOptionsProps<TData>) {
  const handleDelete = () => {

    try {
      let id = toast.promise(deleteSelectedSlides(selectedRowIds), {
        loading: "Deleting...",
        success: "Success",
        error: "Failed to delete!",
      })
      toast.dismiss(id);
      setRefresh(true)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="gap-5 flex ">
      <Button
        variant="secondary"
        size="sm"
        className={` h-8 duration-400 transition-all   ${selectedRowIds.length > 0 ? 'flex' : 'hidden'}`}
        onClick={() =>
          handleDelete()
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

    </div>
  );
}
