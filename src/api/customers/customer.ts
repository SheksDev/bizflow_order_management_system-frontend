import api from "../axios"
import type { CreateCustomerPayload, CustomerResponse, GetCustomersResponse } from "./types/customers";

export const AddCustomer = async (
    payload: CreateCustomerPayload
) => {


    const response = await api.post(`/customers/create`, payload);

    return response.data as CustomerResponse;
}


export const EditCustomer = async (
    customerId: string,
    payload: CreateCustomerPayload
) => {


    const response = await api.patch(`/customers/${customerId}`, payload);

    return response.data as CustomerResponse;
}


export const GetAllCustomers = async () => {


    const response = await api.get(`/customers/all`);

    return response.data as GetCustomersResponse;
}


export const GetCustomer = async (
    customerId: string
) => {


    const response = await api.get(`/customers/${customerId}`);

    return response.data as CustomerResponse;
}