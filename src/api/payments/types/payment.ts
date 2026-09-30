
export interface PaymentsQuery {
    page?: number;
    limit?: number;
    status?: string;
    orderNumber?: string;
    period?: string;
    date?: string;
    month?: string;
}

export interface RefundData {
    id: string;
    refundNumber: string;
    paymentId: string;
    amount: string | number;
    refundMethod: "CASH";
    reason: string;
    refundDate: string;
    reference: string;
    createdAt: string;
}


export interface PaymentData {
    id: string;
    paymentNumber: string;
    amount: string;
    paymentMethod: "CASH"
                | "BANK_TRANSFER"
                | "POS"
                | "MOBILE_MONEY"
                | "OTHER";
    paymentDate: string;
    paymentSource: "MANUAL" | "ONLINE";
    reference: string;
    notes: string;
    receivedById: string;
    createdAt: string;
    updatedAt: string;
    orderNumber: string;
    status: "COMPLETED" | 
            "PARTIALLY_REFUNDED" |
            "REFUNDED";
    tipAmount: string;
    refunds: RefundData[];
}


export interface PaymentResponse {
    success: boolean,
    message: string,
    data: {
        payments: [
            PaymentData,
        ]
    }
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }
}