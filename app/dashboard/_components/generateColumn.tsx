import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./TableColumnHeaderFilter";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox"
export function generateDynamicColumns<T>(
  columnConfig: { [key: string]: string },
  title: string,
  setRefresh: any,
): ColumnDef<T>[] {
  const columns: ColumnDef<T>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  for (const key in columnConfig) {
    if (key === "thumbnail") {
      columns.push({
        accessorKey: key,
        header: ({ column }) => (
          <>
            <DataTableColumnHeader column={column} title={columnConfig[key]} />
          </>
        ),
        cell: ({ row }) => (
          <Avatar>
            <AvatarImage
              src={(row.original as any).thumbnail}
              alt="Thumbnail"
            />
          </Avatar>
        ),
      });
    } else {
      columns.push({
        accessorKey: key,
        header: ({ column }) => (
          <>
            <DataTableColumnHeader column={column} title={columnConfig[key]} />
          </>
        ),
      });
    }
  }

  columns.push({
    id: "actions",
    cell: ({ row }) => {
      return (
        <DataTableRowActions row={row} title={title} setRefresh={setRefresh} />
      );
    },
  });

  return columns;
}
