"use client"
import * as React from "react"
import { formatTime } from '@/lib/functions';
import { Input } from "@/components/ui/input"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { DataTableViewOptions } from "./table-view";
import { DataTablePagination } from "./tablePagination";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    title: string
    pageInfo: {
        pageCount: number
        currentPage: number
        pageSize: number
    }
    setPageInfo: any
}
export function DataTable<TData, TValue>({
    columns,
    data,
    title,
    pageInfo,
    setPageInfo // Assuming setPageInfo is passed from Books compone


}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
        const handlePageSizeChange = (newSize: number) => {
            setPageInfo(prevState => ({
                ...prevState,
                pageSize: newSize,
                currentPage: 0 // Reset to first page on pageSize change
            }));
        };
    
        const handlePageChange = (newPageIndex: number) => {
            setPageInfo(prevState => ({
                ...prevState,
                currentPage: newPageIndex
            }));
        };
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        // initialState: { pageIndex: pageInfo.currentPage, pageSize },
        manualPagination: true,
        pageCount: pageInfo.pageCount,

        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,

        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,

        },
    })

    return (
        <>
            <div className="flex justify-between items-center py-4">
                <Input
                    placeholder={`Filter by ${title} name `}
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }

                    className="max-w-sm"
                />


                {/* Column Visiblily  */}
                <DataTableViewOptions table={table} />

            </div>



            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="capitalize">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <DataTablePagination  table={table} 
                onPageSizeChange={handlePageSizeChange}
                onPageChange={handlePageChange} 
                pageInfo={pageInfo}   />

        </>
    )
}
