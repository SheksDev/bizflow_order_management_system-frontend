import type { TableColumn } from "../../ui/Table";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDateTime } from "../../utils/formatDateTime";
import { getInitials } from "../../utils/getIntitals";
import type { CustomerOrderHistoryRow, CustomerRow } from "./customer.types";



export const CUSTOMER_COLUMNS: TableColumn<CustomerRow>[] = [
    {
        key: "customerName",
        label: "CUSTOMER NAME",
        render: (row) => (

            <div
                className="flex items-center gap-2.5">

                <div
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FFDBCC]">

                    <p
                        className="font-bold text-[14px]/[20px] text-[#351000]">
                        {getInitials(row.customerName ?? "-")}
                    </p>

                </div>

                <p
                    className="font-semibold text-[14px]/[20px] text-bf-primaryblack">
                    {row.customerName ?? "-"}
                </p>

            </div>
        )
    },
    {
        key: "phoneNumber",
        label: "PHONE NUMBER",
        render: (row) => (

            <p
                className="font-normal font-libertinus-mono text-[13px]/[18px] text-bf-primarytext">
                {row.phoneNumber ?? "-"}
            </p>
        )
    },
    {
        key: "email",
        label: "EMAIL ADDRESS",
        render: (row) => (

            <p
                className="font-normal text-[13px]/[18px] text-bf-primarytext">
                {row.email ?? "-"}
            </p>
        )
    },
    {
        key: "orders",
        label: "ORDERS",
        render: (row) => (

            <div
                className="w-fit px-[8.3px] py-0.5 rounded-xl bg-[#F4ECE8]">

                <p
                    className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">
                    {`${row.orders ?? "-"} orders`}
                </p>

            </div>
        )
    },
    {
        key: "total",
        label: "TOTAL ORDER VALUE",
        render: (row) => (

            <p
                className="font-semibold text-[13px]/[18px] text-bf-primaryblack">
                {formatCurrency(row.total ?? "-")}
            </p>
        )
    },
    {
        key: "balance",
        label: "OUTSTANDING BALANCE",
        render: (row) => (

            <div
                className={`w-fit p-1 rounded-xl ${
                    row.balance !== 0
                        ? "bg-[#FFDBCC]"
                        : "bg-[#F4ECE8]"
                }`}>

                <p
                    className={`font-semibold text-[11px]/[14px] tracking-[0.22px] ${
                        row.balance !== 0
                        ? "text-bf-primarytext"
                        : "text-bf-primarytextlight"
                    }`}>
                    {`${row.balance === 0 ? "Settled" : `${row.balance} Due`}`}
                </p>

            </div>
        )
    },
    {
        key: "dateAdded",
        label: "DATE ADDED",
        render: (row) => (

            <p
                className="font-normal text-[13px]/[18px] text-bf-primarytextlight">
                {row.dateAdded ?? "-"}
            </p>
        )
    },
]

export const CUSTOMER_ORDER_HISTORY: TableColumn<CustomerOrderHistoryRow>[] = [

    {
        key: "orderNumber",
        label: "ORDER #",
        render: (row) => (

            <div
                className="px-[8.3px] py-0.5 flex flex-col">

                <p
                    className="font-bold text-[13px]/[18px] text-bf-primary">
                    <span className="italic">#</span>{`${row.orderNumber}`}
                </p>

                {/* <p
                    className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                    {`${row.orders} orders`}
                </p> */}

            </div>
        )
    },

    {
        key: "orderItem",
        label: "ORDER ITEM & DETAILS",
        render: (row) => (

            <div
                className="px-[8.3px] py-0.5 flex flex-col gap-1 w-60">

                {
                    row.orderItem?.map((item, index) => (

                        <div    key={index}>

                            <p
                                className="font-medium text-[16px]/[24px] text-bf-primaryblack">
                                {item.orderName}
                            </p>

                            <div
                                className="flex flex-col items-start">

                                <p
                                    className="font-normal text-[13px]/[18px] text-bf-primarytext">
                                    {`Size: ${item.details.size}`}
                                </p>
                                <p
                                    className="font-normal text-[13px]/[18px] text-bf-primarytext">
                                    {`Layer: ${item.details.layer}`}
                                </p>
                                <p
                                    className="font-normal text-[13px]/[18px] text-bf-primarytext">
                                    {`Flavour: ${
                                        item.details.flavour?.join(", ") ?? "No flavour specified"
                                    }`}
                                </p>
                                <p
                                    className="font-normal text-[13px]/[18px] text-bf-primarytext">
                                    {`Frosting: ${item.details.frosting}`}
                                </p>
                                <p
                                    className="font-normal text-[13px]/[18px] text-bf-primarytext">
                                    {`Topping: ${
                                        item.details.topping?.join(", ") ?? "No topping specified"
                                    }`}
                                </p>
                                <p
                                    className="font-normal text-[13px]/[18px] text-bf-primarytext">
                                    {`Inscription: ${item.details.inscription}`}
                                </p>
                                <p
                                    className="font-normal text-[13px]/[18px] text-bf-primarytext">
                                    {`Extra: ${
                                        item.details.extra?.join(", ") ?? "No extra"
                                    }`}
                                </p>

                            </div>

                        </div>
                    ))
                }

            </div>
        )
    },

    {
        key: "delivery",
        label: "TIMELINE",
        render: (row) => (

            <div
                className="px-[8.3px] py-0.5 flex flex-col">

                <p
                    className="font-medium text-[13px]/[18px] text-bf-primaryblack">
                    {`Deliv: ${formatDateTime(row.delivery.deliveryDate).date}, ${formatDateTime(row.delivery.deliveryDate).time}`}
                </p>

                <p
                    className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                    {row.delivery.deliveryAddress}
                </p>

            </div>
        )
    },

    {
        key: "value",
        label: "VALUE (₦)",
        render: (row) => (

            <p
                className="font-semibold text-[13px]/[18px] text-bf-primaryblack">
                {formatCurrency(row.value)}
            </p>
        )
    },

    {
        key: "payment",
        label: "PAYMENT",
        render: (row) => (

            <div
                className="px-[8.3px] py-0.5 flex flex-col">

                    <div
                        className="w-fit px-[8.3px] py-0.5 rounded-xl bg-[#FD9E70]">

                        <p
                            className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">
                            {`${formatCurrency(row.payment.balance)} Due`}
                        </p>

                    </div>

                <p
                    className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">
                    {`${formatCurrency(row.payment.paid)} Paid`}
                </p>

            </div>
        )
    },

    {
        key: "status",
        label: "STATUS",
        render: (row) => (

            <div
                className="w-fit px-[8.3px] py-0.5 rounded-xl bg-[#FFDBCC]">

                <p
                    className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primary">
                    {row.status}
                </p>

            </div>
        )
    },

]