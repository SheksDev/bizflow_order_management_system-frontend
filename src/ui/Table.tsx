import type { EmptyTableProps } from "./EmptyTable";
import EmptyTable from "./EmptyTable";
// import { useNavigate } from "react-router-dom";



export interface TableRow {
    [key: string]: string | number;
}

export interface TableColumn<T extends object> {
    key: keyof T;
    label: string;
    render?: (row: T) => React.ReactNode;
}


interface TableProps<T extends object> {
    titleOptions?: Record<string, string>;
    columns: TableColumn<T>[];
    bodyOptions?: T[];
    table?: string;
    onRowClick?: (row: T) => void;
}

function Table<T extends object>(
    {
        columns,
        bodyOptions,
        onRowClick,
        table,
    } : TableProps<T>
) {

    const EMPTY_TABLE_CONFIG: Record<string, EmptyTableProps> = {

        customers: {
            type: "customers",
            icon: "/src/assets/CustomerIcon.svg",
            heading: "No recent customers found",
            message: "There are no customers recorded.",
            action: "Add New Customer",
            path: "/customers/create",
        },

        orders: {
            type: "orders",
            icon: "/src/assets/OrderNeutralIcon.svg",
            heading: "No recent orders found",
            message: "There are no orders recorded.",
            action: "Record New Order",
            path: "/orders/create",
        },

        payments: {
            type: "payments",
            icon: "/src/assets/PaymentNeutralIcon.svg",
            heading: "No recent payments recorded",
            message: "There are no incoming transactions.",
            action: "Receive Payment",
            path: "/payments/create",
        },

        expenses: {
            type: "expenses",
            icon: "/src/assets/ExpenseNeutralIcon.svg",
            heading: "No recent expenses recorded",
            message:
            "Operational hub has recorded zero disbursements or supply outlays.",
            action: "Record New Expense",
            path: "/expenses/create",
        },
    };

    const emptyTable = EMPTY_TABLE_CONFIG[table ?? ""];


    return (
        <>

            {
                bodyOptions?.length !== 0 ? (

                    <div
                        className="w-full overflow-hidden border-bf-border rounded-lg bf-shadow">

                        <div
                            className="max-h-75 overflow-auto no-scrollbar">

                            <table
                                className={`w-max min-w-full border-collapse`}>

                                <thead
                                    className="bg-bf-backgroundTwo sticky top-0 z-10">
                                    
                                    <tr>

                                        {
                                            columns.map((column) => (

                                                <th
                                                    key={String(column.key)}
                                                    className={`whitespace-nowrap px-4 py-4.5 font-bold text-[11px]/[14px] tracking-[0.55px] text-bf-primarytext text-left`}>
                                                    {column.label}
                                                </th>
                                            ))
                                        }

                                    </tr>

                                </thead>

                                <tbody
                                    className="">

                                    {bodyOptions?.map((row, rowIndex) => (

                                        <tr 
                                            key={rowIndex}
                                            className="bg-[#FFFFFF] min-h-22 cursor-pointer"
                                            onClick={() => onRowClick?.(row)}
                                            >
                                            
                                            {columns.map((column) => (

                                                <td
                                                    key={String(column.key)}
                                                    className="min-h-22 p-4"
                                                >
                                                    {column.render
                                                        ? column.render(row)
                                                        : String(row[column.key])}
                                                </td>

                                            ))}

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>
                ) : (

                    <EmptyTable 
                        emptyTable={emptyTable}
                    />
                )
            }
        </>
    )
}

export default Table