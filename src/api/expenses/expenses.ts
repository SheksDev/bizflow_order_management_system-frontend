import api from "../axios"
import type { ExpenseQuery, ExpenseResponse } from "./types/expenses";



export const GetExpenses = async (
    { page, limit, orderNumber, expenseCategoryId, startDate, endDate, period, date, month } : ExpenseQuery = {}
) => {

    const params = {
        ...(page && { page }),
        ...(limit && { limit }),
        ...(expenseCategoryId && { expenseCategoryId }),
        ...(orderNumber && {orderNumber }),
        ...(startDate && {startDate }),
        ...(endDate && {endDate }),
        ...(period && { period}),
        ...(date && { date}),
        ...(month && { month}),
    };

    const response = await api.get("/expenses/all", { params });

    return response.data as ExpenseResponse;
}