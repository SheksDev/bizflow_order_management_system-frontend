import type { OrderData } from "../../api/orders/types/orders";
import type { TableColumn } from "../../ui/Table";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDateTime } from "../../utils/formatDateTime";




export const ORDER_COLUMNS: TableColumn<OrderData>[] = [

    {
        key: "orderNumber",
        label: "ORDER #",
        render: (row) => (

            <p
                className="font-bold text-[14px]/[20px] text-bf-primary">
                {`#${row.orderNumber ?? "-"}`}
            </p>
        )
    },
    {
        key: "customer",
        label: "CUSTOMER",
        render: (row) => (

            <div
                className="flex flex-col items-start">

                <p
                    className="font-semibold text-[14px]/[20px] text-bf-primaryblack">
                    {row.customer.name ?? "-"}
                </p>

                <p
                    className="font-normal text-[13px]/[18px] text-bf-primarytextlight">
                    {row.customer.phone ?? "-"}
                </p>

            </div>
        )
    },
    {
        key: "orderDate",
        label: "ORDER DATE",
        render: (row) => (

            <p
                className="font-medium text-[13px]/[18px] text-bf-primarytext">
                {formatDateTime(row.orderDate ?? "-").date}
            </p>
        )
    },
    {
        key: "deliveryDate",
        label: "DELIVERY & METHOD",
        render: (row) => (

            <div
                className="flex flex-col items-start gap-0.5">

                <p
                    className="font-semibold text-[13px]/[18px] text-bf-primaryblack">
                    {`${formatDateTime(row.deliveryDate ?? "-").date}, ${formatDateTime(row.deliveryDate ?? "-").time}`}
                </p>

                <div
                    className="flex items-center gap-1">

                    {
                        row.deliveryMethod === "PICKUP" 
                        ? (
                            <img 
                                src="/src/assets/PickupIcon.svg" 
                                alt="" 
                            />
                        ) : (
                            <img 
                                src="/src/assets/DeliveryIcon.svg" 
                                alt="" 
                            />
                        )
                    }

                    <p
                        className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primaryblack">
                        {row.deliveryAddress ?? "-"}
                    </p>

                </div>

            </div>
        )
    },
    {
        key: "items",
        label: "ORDER ITEMS",
        render: (row) => (

            <div
                className="flex flex-col items-start gap-1">

                {
                    row.items.map((item, index) => (

                        <p
                            key={index}
                            className="font-normal text-[13px]/[18px] text-bf-primaryblack">
                            {item.productName ?? "-"}
                        </p>
                    ))
                }

            </div>
        )
    },
    {
        key: "currentTotal",
        label: "TOTAL (₦)",
        render: (row) => (

            <p
                className="font-bold text-[13px]/[18px] text-bf-primaryblack">
                {formatCurrency(Number(row.currentTotal ?? "-"))}
            </p>
        )
    },
    {
        key: "payments",
        label: "CUSTOMER",
        render: (row) => (

            <div
                className="flex flex-col items-start gap-0.5">

                <p
                    className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-success">
                    {`${formatCurrency(Number(row.totalPaid ?? "-"))} Paid`}
                </p>

                <p
                    className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primary">
                    {row.outstanding ? `${formatCurrency(Number(row.outstanding ?? "-"))} Due` : "Settled"}
                </p>

                {
                    row.totalTips !== "0" && (

                        <p
                            className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                            {`${formatCurrency(Number(row.totalTips ?? "-"))} Tips`}
                        </p>
                    )
                }

                {
                    row.totalRefunded !== "0" && (

                        <p
                            className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                            {`${formatCurrency(Number(row.totalRefunded ?? "-"))} Refund`}
                        </p>
                    )
                }

            </div>
        )
    },
    {
        key: "status",
        label: "STATUS",
        render: (row) => (

            <div
                className={`w-fit px-2 py-1 rounded-xl ${
                    row.status === "PENDING"
                        ? "bg-[#FFDBCC]"
                        : row.status === "READY"
                        ? "bg-bf-live"
                        : row.status === "DELIVERED"
                        ? "bg-bf-success"
                        : "bg-[#FFDAD6]"
                }`}>

                <p
                    className={`font-semibold text-[11px]/[14px] tracking-[0.22px] ${
                        row.status === "PENDING"
                            ? "text-bf-primarytext"
                            : row.status === "READY"
                            ? "text-bf-success"
                            : row.status === "DELIVERED"
                            ? "text-bf-live"
                            : "bg-bf-error"
                    }`}>
                    {row.status}
                </p>

            </div>
        )
    },
]