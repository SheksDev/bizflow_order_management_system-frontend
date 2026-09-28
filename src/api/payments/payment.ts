import api from "../axios"
import type { PaymentsQuery, PaymentResponse } from "./types/payment";



export const GetPayments = async (
    { page, limit, status, orderNumber, period, date, month } : PaymentsQuery = {}
) => {

    const params = {
        ...(page && { page }),
        ...(limit && { limit }),
        ...(status && { status }),
        ...(orderNumber && {orderNumber }),
        ...(period && { period}),
        ...(date && { date}),
        ...(month && { month}),
    };

    const response = await api.get("/payments/all", { params });

    return response.data as PaymentResponse;
}