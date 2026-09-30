import type { OrdersSummary } from "../../api/orders/types/orders";
import { formatCurrency } from "../../utils/formatCurrency";




export const ORDERS_STATS = (data: OrdersSummary) => [

    {
        type: "customer",
        title: "TOTAL ACTIVE RECORDS",
        volume: data.totalOrder,
        stats: [
                `${data.totalOrderValue.pendingOrders}`, 
                `${data.totalOrderValue.readyOrders}`, 
                `${data.totalOrderValue.deliveredOrders}`, 
                `${data.totalOrderValue.cancelledOrders}`
            ]
    },

    {
        type: "order",
        title: "BOOKED ORDER VALUE",
        volume: formatCurrency(Number(data.totalOrderValue.amount)),
        stats: [`${data.totalOrderValue.total} recorded confirmed orders`]
    },

    {
        type: "payment",
        title: "INFLOWS COLLECTED",
        volume: formatCurrency(Number(data.totalPayments.amount)),
        stats: [`${data.totalPayments.rate}% settlement rate`]
    },

    {
        type: "balance",
        title: "RECEIVABLES DUE",
        volume: formatCurrency(Number(data.totalOutstanding.amount)),
        stats: [`Across ${data.totalOutstanding.volume} pending accounts`]
    },
]