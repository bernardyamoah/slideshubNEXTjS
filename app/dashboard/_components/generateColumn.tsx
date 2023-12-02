import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./TableColumnHeaderFilter";

import { DataTableRowActions } from "./data-table-row-actions";

interface TableData {
    id: string;
    name: string;

}
export function generateDynamicColumns<T>(columnConfig: { [key: string]: string }): ColumnDef<T>[] {
    const columns: ColumnDef<T>[] = [


    ];

    for (const key in columnConfig) {


        columns.push({
            accessorKey: key,
            header: ({ column }) => {
                return (
                    <>
                        <DataTableColumnHeader column={column} title={columnConfig[key]} />
                    </>
                )
            },



        },


        );
    }
    columns.push({
        // id: "actions",
        // cell: ({ row }) => <DataTableRowActions row={row} />,
        id: "actions",
        accessorKey: 'Actions',
        cell: ({ row }) => {
            return <DataTableRowActions row={row.original} />;
        },

    },)
    return columns;
}

