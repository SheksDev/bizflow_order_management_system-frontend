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

export interface CakeOrderDetails {
    size?: string;
    // shape?: string;
    layer?: string;
    flavour?: string[];
    topping?: string[];
    toppers?: string[];
    frosting?: string;
    inscription?: string;
    extra?: string[];
}

export interface CupcakeOrderDetails {
    flavour?: string[];
    frosting?: string;
    // frostingColor?: string[];
    topping?: string[];
    toppers?: string[];
    volume?: string;
    inscription?: string;
    boxType?: string;
    extra?: string[];
}

export interface FoodTrayOrderDetails {
    trayType?: string;
    protein?: string[];
    sides?: string[];
    rice?: string[];
    pasta?: string[];
    snacks?: string[];
    fruits?: string[];
    drinks?: string[];
    treatItems?: string[];
    portionSize?: string;
    servingSize?: string;
    extra?: string[];
}

export interface MiniCateringOrderDetails {
    cateringType?: string;
    guestCount?: number;
    menuItems?: string[];
    proteins?: string[];
    sides?: string[];
    drinks?: string[];
    desserts?: string[];
    snacks?: string[];
    servingStyle?: string;
    setupRequired?: boolean;
    setupDetails?: string;
    dietaryRequirements?: string[];
    extra?: string[];
}

export interface RoomDecorOrderDetails {
    occasion?: string;
    theme?: string;
    colorScheme?: string[];
    roomType?: string;
    decorations?: string[];
    balloons?: string[];
    flowers?: string[];
    lighting?: string[];
    backdrop?: string;
    lettering?: string;
    setupRequired?: boolean;
    setupLocation?: string;
    extra?: string[];
}

export interface GiftBoxOrderDetails {
    packagingType?: string;
    theme?: string;
    colorScheme?: string[];
    // recipient?: string;
    occasion?: string;
    giftItems?: string[];
    snacks?: string[];
    drinks?: string[];
    treatItems?: string[];
    flowers?: string[];
    personalization?: string;
    message?: string;
    extra?: string[];
}

export interface HotAirBalloonTreatBoxDetails {
    theme?: string;
    colorScheme?: string[];
    occasion?: string;
    // recipient?: string;
    balloonColor?: string[];
    balloonMessage?: string;
    treatItems?: string[];
    flowers?: string[];
    personalization?: string;
    message?: string;
    extra?: string[];
}

export interface MoneyBouquetOrderDetails {
    amount?: number;
    currency?: string;
    denomination?: string[];
    flowerType?: string;
    flowerColor?: string[];
    wrappingColor?: string[];
    // arrangementStyle?: string;
    message?: string;
    // recipient?: string;
    occasion?: string;
    extra?: string[];
}

export interface FlowerBouquetOrderDetails {
    flowerType?: string[];
    flowerColor?: string[];
    bouquetSize?: string;
    // arrangementStyle?: string;
    wrappingColor?: string[];
    greenery?: string[];
    occasion?: string;
    // recipient?: string;
    message?: string;
    extra?: string[];
}

export type OrderItemDetails =
    | CakeOrderDetails
    | FoodTrayOrderDetails
    | MiniCateringOrderDetails
    | RoomDecorOrderDetails
    | GiftBoxOrderDetails
    | HotAirBalloonTreatBoxDetails
    | MoneyBouquetOrderDetails
    | FlowerBouquetOrderDetails
    | CupcakeOrderDetails;

export interface OrderItem {
    id: string;
    itemId: string;
    orderNumber: string;
    productCategoryId: string;
    productName: string;
    quantity: number;
    unitPrice: string;
    totalPrice: string;
    details: OrderItemDetails;
    status: "PENDING"
            | "PREPARING"
            | "READY"
            | "OUT_FOR_DELIVERY"
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
    recipientName: string;
    recipientPhone: string;
    status: "PENDING" |  
            "IN_PROGRESS" | 
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
    totalTips?: string;

    customer: CustomerData;
    items: OrderItem[];
    payments: PaymentData[];
    expenses: ExpenseData[];
}

export interface OrdersSummary {
    totalOrder: number;
    totalOrderValue: {
        total: number;
        amount: string;
        pendingOrders: number;
        inProgressOrders: number;
        completedOrders: number;
        cancelledOrders: number;
    },
    totalPayments: {
        amount: string;
        rate: string;
    },
    totalTips: string;
    totalOutstanding: {
        amount: string;
        volume: number;
    },
    totalOrderRefunded: string;
}

export interface CreateOrderItem {
    categoryId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    details: OrderItemDetails;
}

export interface createOrderPayload {
    customerId: string;
    deliveryDate: string;
    deliveryAddress?: string;
    deliveryMethod: string;
    recipientName: string;
    recipientPhone: string;
    notes?: string;
    items: CreateOrderItem[];
}

export interface OrdersResponse {
    success: boolean;
    message: string;
    data: {
        orders: OrderData[];

        summary: OrdersSummary;

        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }
}

export interface OrderResponse {
    success: boolean;
    message: string;
    data: OrderData;
}

export interface ProductData {
    id: string;
    categoryId: string;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ProductsResponse {
    success: boolean;
    message: string;
    data: ProductData[];
}