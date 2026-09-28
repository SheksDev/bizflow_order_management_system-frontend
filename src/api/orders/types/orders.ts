import type { CustomerData } from "../../customers/types/customers";
import type { ExpenseData } from "../../expenses/types/expenses";
import type { PaymentData } from "../../payments/types/payment";

export interface OrdersQuery {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    customerId?: string;
    deliveryDate?: string;
    period?: string;
    date?: string;
    month?: string;
}

export interface OrderDetails {
    size?: string;
    extra?: string[];
    layer?: string;
    flavour?: string[];
    topping?: string[];
    frosting?: string;
    inscription?: string;
}

export interface OrderItem {
    id: string;
    itemId: string;
    orderNumber: string;
    productCategoryId: string;
    productName: string;
    quantity: number;
    unitPrice: string;
    totalPrice: string;
    details: OrderDetails;
    status: "PENDING"
            | "CONFIRMED"
            | "PREPARING"
            | "READY"
            | "DELIVERED"
            | "CANCELLED";
    createdAt: string;
    updatedAt: string;
}

export interface OrderData {
    id: string;
    orderNumber: string;
    customerId: string;
    orderDate: string;
    deliveryDate: string;
    deliveryAddress: string;
    deliveryMethod: "PICKUP" | "DELIVERY",
    status: "PENDING" | 
            "CONFIRMED" | 
            "IN_PROGRESS" | 
            "READY" |  
            "OUT_FOR_DELIVERY" | 
            "DELIVERED" | 
            "COMPLETED" | 
            "CANCELLED";
    originalTotal: string;
    currentTotal: string;
    notes: string;
    createdById: string;
    createdAt: string;
    updatedAt: string;
    cancelledAt: string | null;
    cancelReason?: string | null;
    deletedAt: string | null;

    totalPaid?: string; 
    totalRefunded?: string;
    outstanding?: string;

    customer: CustomerData;
    items: OrderItem[];
    payments: PaymentData[];
    expenses: ExpenseData[];
}

export interface OrderResponse {
    success: boolean,
    message: string,
    data: {
        orders: [
            OrderData,
        ]
    }
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }
}