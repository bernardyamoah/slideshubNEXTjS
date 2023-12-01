import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./dataTableColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { PresetActions } from "./slides-preset-actions";
interface TableData {
    id: string;
    name: string;
    
  }
export function generateDynamicColumns<T>(columnConfig: { [key: string]: string }): ColumnDef<T>[] {
    const columns: ColumnDef<T>[] = [];
    
        // columns.push({
        //     id: "select",
        //     header: ({ table }) => (
        //         <Checkbox
        //             checked={
        //                 table.getIsAllPageRowsSelected() ||
        //                 (table.getIsSomePageRowsSelected() && "indeterminate")
        //             }
        //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        //             aria-label="Select all"
        //         />
        //     ),
        //     cell: ({ row }) => (
        //         <Checkbox
        //             checked={row.getIsSelected()}
        //             onCheckedChange={(value) => row.toggleSelected(!!value)}
        //             aria-label="Select row"
        //         />
        //     ),
        //     enableSorting: false,
        //     enableHiding: false,
        // },
        
        // );

    for (const key in columnConfig) {
    
    if (key === "Actions") {
            // Define the Actions column
            columns.push({
                id: "actions",
                accessorKey: key,
                cell: ({ row }) => {
                    const {name,id} = row.original as TableData;
                    
                    return <PresetActions name={name} id={id} />;
                },
            
            });
        }
        
        else {
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
    }

    return columns;
}