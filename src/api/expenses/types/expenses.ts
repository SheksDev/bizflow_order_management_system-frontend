import type { User } from "../../auth/types/auth";

export type ExpenseQuery = {
    page?: string,
    limit?: string,
    expenseCategoryId?: string,
    orderNumber?: string
    startDate?: string
    endDate?: string
    period?: string;
    date?: string;
    month?: string;
}



export interface ExpenseData {
    id: string;
    expenseNumber: string;
    expenseCategoryId: string;
    title: string;
    amount: string;
    expenseDate: string;
    description: string | "";
    receiptUrl: string | "";
    recordedById :string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null,
    orderNumber: string | null;

    expenseCategory?: {
        categoryId: string;
        name: string;
    };

    order?: {
        orderNumber: string | null;
    } | null;

    recordedBy: User;
}



export interface ExpenseResponse {
    success: boolean,
    message: string,
    data: {
        expenses: [
            ExpenseData,
        ]
    }
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }
}