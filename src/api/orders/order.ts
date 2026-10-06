import api from "../axios"
import type { createOrderPayload, OrderResponse, OrdersQuery, OrdersResponse, ProductsResponse } from "./types/orders";



export const GetOrders = async (
    { page, limit, search, status, customerId, deliveryDate, period, date, month } : OrdersQuery = {}
) => {

    const params = {
        ...(page && { page }),
        ...(limit && { limit }),
        ...(search && { search }),
        ...(status && { status }),
        ...(customerId && { customerId }),
        ...(deliveryDate && { deliveryDate}),
        ...(period && { period}),
        ...(date && { date}),
        ...(month && { month}),
    };

    const response = await api.get("/orders/all", { params });

    return response.data as OrdersResponse;
}

export const GetOrder = async (
    orderNumber: string,
) => {

    const response = await api.get(`/orders/${orderNumber}`);

    return response.data as OrderResponse;
}

export const GetProducts = async () => {

    const response = await api.get("/products/all");

    return response.data as ProductsResponse;
}

export const CreateOrder = async (
    payload: createOrderPayload
) => {

    const response = await api.post("/orders/create", payload);

    return response.data as OrderResponse;
}