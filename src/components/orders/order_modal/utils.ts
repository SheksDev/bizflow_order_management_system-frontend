import type { OrderItemDetails } from "../../../api/orders/types/orders";


export const getDetailValue = (
    details: OrderItemDetails,
    field: string
): string => {
    const value = (details as Record<string, unknown>)[field];

    if (Array.isArray(value)) {
        return value.join(", ");
    }

    if (value === null || value === undefined || value === "") {
        return "";
    }

    return String(value);
};