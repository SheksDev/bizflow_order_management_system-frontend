import type {  TableColumn } from "./dashboard";
import EmptyTable, { type EmptyTableProps } from "../../ui/EmptyTable";

interface TableProps<T extends object> {
    titleOptions: Record<string, string>;
    columns: TableColumn<T>[];
    bodyOptions: T[];
    table: string;
}

function DashboardTable<T extends object>({
    titleOptions,
    columns,
    bodyOptions,
    table,
}: TableProps<T>) {

    const EMPTY_TABLE_CONFIG: Record<string, EmptyTableProps> = {

        orders: {
            type: "orders",
            icon: "/src/assets/OrderNeutralIcon.svg",
            heading: "No recent orders found",
            message: "There are no orders recorded for this reporting period.",
            action: "Record New Order",
        },

        payments: {
            type: "payments",
            icon: "/src/assets/PaymentNeutralIcon.svg",
            heading: "No recent payments recorded",
            message: "There are no incoming transactions for this reporting period.",
            action: "Receive Payment",
        },

        expenses: {
            type: "expenses",
            icon: "/src/assets/ExpenseNeutralIcon.svg",
            heading: "No recent expenses recorded",
            message:
            "Operational hub has recorded zero disbursements or supply outlays this period.",
            action: "Record New Expense",
        },
    };

    const emptyTable = EMPTY_TABLE_CONFIG[table];

    return (
        <div
            className="w-full">

            <div
                className="w-full flex items-center justify-between p-4 bg-[#FFFFFF] rounded-t-lg rounded-">

                <div
                    className="flex items-center gap-1">

                    <img 
                        src={titleOptions.icon} 
                        alt="" 
                    />

                    <h3
                        className="font-semibold text-[16px]/[24px] text-bf-primaryblack">
                        {titleOptions.title}
                    </h3>

                    <div
                        className="pl-1">

                        <p
                            className="px-2 py-0.5 rounded-xl bg-[#F4ECE8] font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">
                            {titleOptions.desc}
                        </p>

                    </div>

                </div>

                <button
                    className="flex items-center gap-0.5 text-bf-primary cursor-pointer">

                    <p
                        className="font-semibold text-[11px]/[14px] tracking-[0.22px]">
                        {titleOptions.button}
                    </p>

                    <img 
                        src="/src/assets/ArrowRightIcon.svg" 
                        alt="" 
                    />

                </button>

            </div>

            {
                bodyOptions.length !== 0
                    ? (

                        <div
                            className="w-full border-bf-border overflow-hidden rounded-b-lg">

                            <div
                                className="max-h-75 overflow-auto no-scrollbar">

                                <table
                                    className={`w-full min-w-0 table-fixed border-collapse`}>

                                    <thead
                                        className="bg-[#FAF2EE] sticky top-0 z-10">
                                        
                                        <tr>

                                            {
                                                columns.map((column) => (

                                                    <th
                                                        key={String(column.key)}
                                                        className="px-4 py-2.5 text-left font-bold text-[11px]/[14px] tracking-[0.55px] text-bf-primarytext">
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
                                                className="bg-[#FFFFFF] min-h-22">
                                                
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
                    )
                    : (
                        <EmptyTable 
                            emptyTable={emptyTable}
                        />
                    )
            }

        </div>
    )
}

export default DashboardTable