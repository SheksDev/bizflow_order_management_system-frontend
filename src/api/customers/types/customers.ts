import type { OrderData } from "../../orders/types/orders";

// export interface CustomersData {
//     id: string;
//     name: string;
//     phone: string;
//     email: string;
//     defaultAddress: string;
//     notes: string;
//     createdById?: string;
//     createdAt: string;
//     updatedAt: string;
//     deletedAt?: string | null;
//     customerId: string;
//     totalOrderValue: string;
//     totalOutstanding: string;
//     totalOrderRefunded: string;

//     orders: [
//         OrderData,
//         payments: [
//             PaymentData
//         ]
//     ]
// }

export interface CustomerData {
    id: string;
    name: string;
    phone: string;
    email: string;
    defaultAddress: string;
    notes: string;
    createdById?: string;
    createdAt: string;
    updatedAt?: string;
    deletedAt?: string | null;
    customerId: string;
    totalOrderValue?: string;
    totalOutstanding?: string;
    totalOrderRefunded?: string;

    orders?: OrderData[];
}

export interface CustomerSummary {
    totalCustomer: number;
    totalOrder: number;
    totalOrderValue: string;
    totalOutstanding: string;
    completedOrders: number;
}

// export interface GetCustomerResponse {
//     success: boolean;
//     message: string;
//     data: CustomerData;
//     pagination?: {
//         page: number;
//         limit: number;
//         total: number;
//         totalPages: number;
//     }
// }

export interface GetCustomersResponse {
    success: boolean;
    message: string;
    data: {
        customers: [ CustomerData ];
        summary: CustomerSummary;
        pagination?: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        }
    };
}

export interface CreateCustomerPayload {
    name: string;
    phone: string;
    email?: string;
    address?: string;
    notes?: string;
}

export interface CustomerResponse {
    success: boolean;
    message: string;
    data: CustomerData;
}