import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./TableColumnHeaderFilter";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function generateDynamicColumns<T>(
  columnConfig: { [key: string]: string },
  title: string,
  setRefresh: any,
): ColumnDef<T>[] {
  const columns: ColumnDef<T>[] = [];

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
