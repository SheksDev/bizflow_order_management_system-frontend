import type { CustomerSummary } from "../../api/customers/types/customers";
import type { OrderItemDetails } from "../../api/orders/types/orders";
import { formatCurrency } from "../../utils/formatCurrency";

export interface Summary {
    totalOrders?: number;
    totalCompleted?: number;
    totalCancelled?: number;
    totalOrderValue?: string | number;
    totalOutstanding?: string | number;
    totalOrderRefunded?: string | number;
}

export const CUSTOMERS_STATS = (summary: CustomerSummary) => [

    {
        type: "customer",
        title: "TOTAL DIRECTORY RECORDS",
        volume: `${summary.totalCustomer} Customer${
            summary.totalCustomer === 0 || summary.totalCustomer === 1 ? "" : "s"
        }`,
        stats: `${0}% active`
    },
    {
        type: "order",
        title: "CUMMULATIVE ORDER VALUE",
        volume: `${formatCurrency(Number(summary.totalOrderValue))}`,
        stats: `${summary.totalOrder} Order${
            summary.totalOrder === 0 || summary.totalOrder === 1 ? "" : "s"
        }`
    },
    {
        type: "balance",
        title: "TOTAL OUTSTANDING",
        volume: `${formatCurrency(Number(summary.totalOutstanding))}`,
        stats: `${0} account pending`
    },
    {
        type: "settle",
        title: "FUFILLED ORDERS",
        volume: `${summary.completedOrders} Settled`,
        stats: `Lagos, Central`
    },
]

export const CUSTOMER_STATS = (summary: Summary) => [

    {
        type: "order",
        title: "TOTAL ORDERS",
        volume: `${summary.totalOrders} Order${
            summary.totalOrders === 0 || summary.totalOrders === 1 ? "" : "s"
        }`,
        stats: [
            `${summary.totalCompleted} Completed`,   
            `${summary.totalCancelled} Cancelled`
        ]
    },
    {
        type: "orderValue",
        title: "TOTAL ORDER VALUE",
        volume: `${formatCurrency(Number(summary.totalOrderValue))}`,
        stats: [ `Gross revenue` ]
    },
    {
        type: "payment",
        title: "PAYMENTS SETTLED",
        volume: `${formatCurrency(Number(summary.totalOrderValue) - Number(summary.totalOutstanding))}`,
        stats: [ 
            `${ ( 
                (
                    (Number(summary.totalOrderValue) - Number(summary.totalOutstanding)) / Number(summary.totalOrderValue)
                ) * 100
            )}% Inflow Rate` 
        ]
    },
    {
        type: "balance",
        title: "OUTSTANDNG BALANCE",
        volume: `${formatCurrency(Number(summary.totalOutstanding))} Settled`,
        stats: ["Action Due"]
    },
]


export interface CustomerRow {
    customerName: string;
    customerId: string;
    phoneNumber: string;
    email: string;
    orders: number;
    total: number;
    balance: number;
    dateAdded: string;
}

export interface OrderItem {
    orderName: string;
    // details: Record<string, string | string[]>;
    details: OrderItemDetails;
}


export interface CustomerOrderHistoryRow {
    orderNumber: string;
    orderItem: OrderItem[];
    delivery : {
        deliveryDate: string;
        deliveryAddress: string;
    };
    value: number;
    payment: {
        paid: number;
        balance: number;
    }
    status: "PENDING" | 
            "IN_PROGRESS" |  
            "COMPLETED" | 
            "CANCELLED";
}