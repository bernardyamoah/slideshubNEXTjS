"use client"

import { ColumnDef } from "@tanstack/react-table"
import { PresetActions } from "./slides-preset-actions";
// import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "./dataTableColumnHeader";




// export const columns: ColumnDef<UserSlidesCardProps>[] = [
//     {
//         id: "select",
//         header: ({ table }) => (
//           <Checkbox
//             checked={
//               table.getIsAllPageRowsSelected() ||
//               (table.getIsSomePageRowsSelected() && "indeterminate")
//             }
//             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//             aria-label="Select all"
//           />
//         ),
//         cell: ({ row }) => (
//           <Checkbox
//             checked={row.getIsSelected()}
//             onCheckedChange={(value) => row.toggleSelected(!!value)}
//             aria-label="Select row"
//           />
//         ),
//         enableSorting: false,
//         enableHiding: false,
//       },
//     {
//         accessorKey: "name",

//         header: ({ column }) => {
//             return (
//                 <DataTableColumnHeader column={column} title="Name" />
//             )
//         },
//     },
//     {
//         accessorKey: "timePosted",
//         header: ({ column }) => {
//             return (
//                 <DataTableColumnHeader column={column} title="Time Posted" />
//             )
//         },
//     },
//     {
//         accessorKey: "size",
//         header: ({ column }) => {
//             return (
//                 <DataTableColumnHeader column={column} title="Size" />
//             )
//         },
//     },
//     {
//         accessorKey: "fileType",
//         header: "File Type",
//     },
//     {
//         accessorKey: "courseId",
//         header: ({ column }) => {
//             return (
//                 <DataTableColumnHeader column={column} title="Course ID" />
//             )
//         },
//     },
//     {
//         accessorKey: "Actions",
//         id: "actions",
//         cell: ({ row }) => {
//             const slide = row.original

//             return (
//                 <PresetActions name={slide.name} id={slide.id} />
//             )
//         },
//     },
// ];