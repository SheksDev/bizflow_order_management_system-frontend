import type React from "react";
import type { DashboardMetrics } from "../../api/dashboard/types/dashboard";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDateTime } from "../../utils/formatDateTime";


export interface TableRow {
    [key: string]: string | number;
}

export interface TableColumn<T extends object> {
    key: keyof T;
    label: string;
    render?: (row: T) => React.ReactNode;
}

export interface OrderRow {
    orderNumber: string;
    customerItem: {
        customer: string;
        item: Array<string>
    };
    delivery: {
        deliveryDate: string;
        deliveryAddress: string;
    };
    total: string;
    balance: string | number;
    status: string;
}

export interface PaymentRow {
    order: {
        ref: string;
        orderNumber: string;
    };
    paymentMethod: string;
    amount: string | number;
    date: string;
}

export interface ExpenseRow {
    title: string;
    category: string | undefined;
    date: string;
    amount: string | number;
}

const getPreviousMonth = (period: string) => {

    const date = new Date();

    if (period === "CURRENT_MONTH") {
        date.setMonth(date.getMonth() - 1);
    } else {
        date.setMonth(date.getMonth() - 2);
    }

    const previousMonth = date.toLocaleString("en-US", {
        month: "short",
    });

    return previousMonth;

}
// console.log(previousMonth); // "Sep"

export const getDashboardStats = (summary: DashboardMetrics) => [
    {
        type: "order",
        title: "ACTIVE ORDERS",
        iconPath: "/src/assets/OrderIcon.svg",
        amount: summary.orders.active,
        desc: "October Billing Cycle",
        statuses: [
            {
                name: "Pending",
                volume: summary.orders.pending
            },
            {
                name: "Done",
                volume: summary.orders.completed
            },
            {
                name: "Cancelled",
                volume: summary.orders.cancelled
            },
        ]
    },
    {
        type: "gross",
        title: "GROSS ORDER VALUE",
        iconPath: "/src/assets/CashierIcon.svg",
        amount: `${formatCurrency(Number(summary.financials.grossOrderValue))}`,
        desc: "Booked Sales Pipeline",
        trendIconPath: `${
            summary.comparisons.grossOrderValue.direction === "INCREASE"
                ? "/src/assets/TrendIcon.svg"
                : summary.comparisons.grossOrderValue.direction === "DECREASE"
                ? "/src/assets/DownTrendIcon.svg"
                : "/src/assets/NoTrendIcon.svg"
        }`,
        status: `${summary.comparisons.grossOrderValue.percentageChange}% vs ${getPreviousMonth(summary.period.type)}`,
        color: `${
            summary.comparisons.grossOrderValue.direction === "INCREASE"
                ? "text-bf-success"
                : summary.comparisons.grossOrderValue.direction === "DECREASE"
                ? "text-bf-error"
                : "text-bf-primary"
        }`,
    },
    {
        type: "payment",
        title: "PAYMENTS RECEIVED",
        iconPath: "/src/assets/PaymentGreenIcon.svg",
        amount: `+ ${formatCurrency(Number(summary.financials.inflow.total))}`,
        desc: "Actual Inflow Collected",
        statusDesc: "Settlement Rate",
        status: `${summary.comparisons.paymentReceived.percentageChange}%`,
        color: `${
            summary.comparisons.paymentReceived.direction === "INCREASE"
                ? "text-bf-primaryblack bg-bf-live px-2 py-0.5 rounded-xl"
                : summary.comparisons.paymentReceived.direction === "DECREASE"
                ? "text-bf-error bg-[#FFDAD6] px-2 py-0.5 rounded-xl"
                : "text-bf-primary bg-[#FFDBCC] px-2 py-0.5 rounded-xl"
        }`,
    },
    {
        type: "balance",
        title: "BALANCE DUE",
        iconPath: "/src/assets/TabIcon.svg",
        amount: `${formatCurrency(Number(summary.financials.balanceDue))}`,
        desc: "Unsettled Customer Tabs",
        status:` ${summary.orders.unpaidBalances} unpaid balances`,
        color: "orange",
    },
    {
        type: "outflow",
        title: "OUTFLOWS LOGGED",
        iconPath: "/src/assets/ExpenseRedIcon.svg",
        amount: `- ${formatCurrency(Number(summary.financials.outflow.total))}`,
        desc: "Kitchen & Dispatch Costs",
        status: `${summary.financials.outflowEntries} expense entries`,
        color: "red",
    },
]


export const getFinancialStats = (summary: DashboardMetrics) => [
    {
        type: "gross",
        title: "Gross Bookings",
        amount: `${formatCurrency(Number(summary.financials.grossOrderValue))}`,
        desc: [`${summary.orders.active} client contracts`],
    },
    {
        type: "inflow",
        title: "Inflows",
        amount: `+ ${formatCurrency(Number(summary.financials.inflow.total))}`,
        desc: [`Orders: +${formatCurrency(Number(summary.financials.inflow.orders))}`, `Tips: +${formatCurrency(Number(summary.financials.inflow.tips))}`],
    },
    {
        type: "outflow",
        title: "Outflows",
        amount: `- ${formatCurrency(Number(summary.financials.outflow.total))}`,
        desc: [`Expenses: -${formatCurrency(Number(summary.financials.outflow.expenses))}`, `Refunds: -${formatCurrency(Number(summary.financials.outflow.refunds))}`],
    },
    {
        type: "net-cash",
        title: "Net Operating Cash",
        amount: `${formatCurrency(Number(summary.financials.netRevenue))}`,
        desc: ["Reserve"],
    },
]


export const RECENT_ORDERS_TITLE = {
    icon: "/src/assets/ShoppingBagIcon.svg",
    title: "Recent Orders",
    desc: "Latest Orders",
    button: "View Orders",
    path: "/orders"
}

export const RECENT_ORDERS_COLUMNS: TableColumn<OrderRow>[] = [
    {
        key: "orderNumber",
        label: "ORDER #",
        render: (row) => (

            <p
                className="font-semibold text-[12px]/[16px] tracking-[0.12px] text-bf-primary">
                {`#${row.orderNumber}`}
            </p>
        )
    },
    {
        key: "customerItem",
        label: "CUSTOMER & ITEM",
        render: (row) => (

            <div
                className="flex flex-col">

                <p
                    className="font-medium text-[13px]/[18px] text-bf-primaryblack">
                    {row.customerItem.customer}
                </p>

                <div
                    className="flex flex-col gap-1">
                    {row.customerItem.item.map((item, index) => (
                        <p
                            key={index}
                            className="font-semibold text-[11px]/[14px] text-bf-primarytextlight">
                            {item}
                        </p>
                    ))}
                </div>

            </div>
        )
    },
    {
        key: "delivery",
        label: "DELIVERY",
        render: (row) => (

            <div
                className="flex flex-col">

                <p
                    className="font-normal text-[13px]/[18px] text-bf-primarytext">
                    {`${formatDateTime(row.delivery.deliveryDate).date}, ${formatDateTime(row.delivery.deliveryDate).time}`}
                </p>

                <p
                    className="font-semibold text-[11px]/[14px] text-bf-primarytextlight">
                    {row.delivery.deliveryAddress}
                </p>

            </div>
        )
    },
    {
        key: "total",
        label: "TOTAL (NGN)",
        render: (row) => (

            <p
                className="font-semibold text-[13px]/[18px] text-bf-primaryblack">
                {`${formatCurrency(Number(row.total))}`}
            </p>
        )
    },
    {
        key: "balance",
        label: "BALANCE",
        render: (row) => (

            <div
                className={`w-fit p-1 rounded-xl ${
                    row.balance !== 0
                        ? "bg-[#FFDBCA]"
                        : "bg-[#F4ECE8]"
                }`}>

                <p
                    className={`font-semibold text-[11px]/[14px] tracking-[0.22px] ${
                        row.balance !== 0
                        ? "text-bf-primarytext"
                        : "text-bf-primarytextlight"
                    }`}>
                    {`${row.balance === 0 ? "Settled" : `${formatCurrency(Number(row.balance))} Due`}`}
                </p>

            </div>
        )
    },
    {
        key: "status",
        label: "STATUS",
        render: (row) => (

            <div
                className={`w-fit px-2 py-1 rounded-xl ${
                    row.status === "PENDING" || row.status === "IN_PROGRESS"
                        ? "bg-[#FFDBCA]"
                        : row.status === "CONFIRMED" || row.status === "READY" || row.status === "COMPLETED"
                        ? "bg-bf-live"
                        : row.status === "OUT_FOR_DELIVERY" || row.status === "DELIVERED"
                        ? "bg-bf-primarytext"
                        : row.status === "CANCELLED"
                        ? "bg-[#FFDAD6]"
                        : null
                }`}>

                <p
                    className={`font-semibold text-[11px]/[14px] tracking-[0.22px] ${
                        row.status === "PENDING" || row.status === "IN_PROGRESS"
                        ? "text-bf-primarytext"
                        : row.status === "CONFIRMED" || row.status === "READY" || row.status === "COMPLETED"
                        ? "text-bf-primaryblack"
                        : row.status === "OUT_FOR_DELIVERY" || row.status === "DELIVERED"
                        ? "text-[#FFDBCA]"
                        : row.status === "CANCELLED"
                        ? "bg-bf-error"
                        : null
                    }`}>
                    {row.status}
                </p>

            </div>
        )
    }
]


export const RECENT_PAYMENTS_TITLE = {
    icon: "/src/assets/BankIcon.svg",
    title: "Recent Payments",
    desc: "Live Inflow",
    button: "View Payments",
    path: "/payments"
}

export const RECENT_PAYMENTS_COLUMNS: TableColumn<PaymentRow>[] = [
    {
        key: "order",
        label: "REF & ORDER",
        render: (row) => (

            <div
                className="flex flex-col">

                <p
                    className="font-medium text-[13px]/[18px] text-bf-primaryblack">
                    {row.order.ref}
                </p>

                <p
                    className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primary">
                    {`#${row.order.orderNumber}`}
                </p>

            </div>
        )
    },
    {
        key: "paymentMethod",
        label: "METHOD",
        render: (row) => (

            <p
                className="font-normal text-[13px]/[18px] text-bf-primarytext">
                {row.paymentMethod}
            </p>
        )
    },    
    {
        key: "amount",
        label: "AMOUNT (NGN)",
        render: (row) => (

            <p
                className="font-semibold text-[13px]/[18px] text-bf-success">
                {`${formatCurrency(Number(row.amount))}`}
            </p>
        )
    },
    {
        key: "date",
        label: "DATE",
        render: (row) => (

            <p
                className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primaryblack">
                {formatDateTime(row.date).date}
            </p>
        )
    },
]


export const RECENT_EXPENSES_TITLE = {
    icon: "/src/assets/ReceiptRedIcon.svg",
    title: "Recent Expenses",
    desc: "Hub Operations",
    button: "View Expenses",
    path: "/expenses"
}

export const RECENT_EXPENSES_COLUMNS: TableColumn<ExpenseRow>[] = [
    {
        key: "title",
        label: "TITLE",
        render: (row) => (

            <p
                className="font-medium text-[13px]/[18px] text-bf-primaryblack">
                {row.title}
            </p>
        )
    },
    {
        key: "category",
        label: "CATEGORY",
        render: (row) => (

            <div
                className="w-fit p-1 rounded-xl bg-[#F4ECE8]">

                <p
                    className="font-medium text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">
                    {row.category}
                </p>

            </div>
        )
    },
    {
        key: "date",
        label: "DATE",
        render: (row) => (

            <p
                className="font-normal text-[13px]/[18px] text-bf-primarytext">
                {formatDateTime(row.date).date}
            </p>
        )
    },
    {
        key: "amount",
        label: "AMOUNT (NGN)",
        render: (row) => (

            <p
                className="font-semibold text-[13px]/[18px] text-bf-error">
                {`${formatCurrency(Number(row.amount))}`}
            </p>
        )
    },
]