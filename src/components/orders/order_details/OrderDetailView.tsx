import { useNavigate, useParams } from "react-router-dom";
import OrderHeaderInfo from "./OrderHeaderInfo";
import { Skeleton, TableSkeleton } from "../../../ui/Skeleton";
import OrderDeliveryDetail from "./OrderDeliveryDetail";
import OrderCustomerDetail from "./OrderCustomerDetail";
import OrderItemsDetail from "./OrderItemsDetail";
import OrderFinancialDetail from "./OrderFinancialDetail";
import OrderPaymentDetail from "./OrderPaymentDetail";
import OrderExpenseDetail from "./OrderExpenseDetail";
import { useEffect, useState } from "react";
import type { OrderData } from "../../../api/orders/types/orders";
import { GetOrder } from "../../../api/orders/order";
import axios from "axios";


function OrderDetailView() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [order, setOrder] = useState<OrderData | null>(null);

    const navigate = useNavigate();

    const { orderNumber } = useParams();

    const fetchOrder = async () => {

        if (!orderNumber) return;

        try {

            setIsLoading(true);

            const response = await GetOrder(orderNumber);

            console.log(response);

            setOrder(response.data);

        } catch (err) {

            
            if (axios.isAxiosError(err)) {
                console.log(
                    err.response?.data?.message ?? "Failed to load customer"
                );
                } else if (err instanceof Error) {
                console.log(err.message);
                } else {
                console.log("Something went wrong");
            }

        } finally {

            setIsLoading(false);
        }
    }

    useEffect(() => {

        const handleFetchOrder = async () => {

            await fetchOrder();
        };

        handleFetchOrder();
    }, []);

    return (
        <div
            className="relative p-6 min-h-screen w-full min-w-0 flex flex-col items-start gap-6 no-scrollbar">

            <div
                className="w-full flex items-center gap-1 font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">

                <div
                    className="pr-2 flex items-center gap-1 cursor-pointer"
                    onClick={() => {
                        navigate("/orders");
                    }}>

                        <img 
                        src="/src/assets/ArrowRightIcon.svg" 
                        alt="" 
                        className="rotate-180"
                    />

                    <span
                        className="font-semibold text-[12px]/[16px] tracking-[0.12px] text-bf-primary cursor-pointer">
                        Back to Orders
                    </span>

                </div>

                <span>
                    /
                </span>

                <span>
                    Orders
                </span>

                <span>
                    /
                </span>

                <span
                    className="text-bf-primaryblack">
                    {order?.orderNumber ?? ""}
                </span>

            </div>

            {
                isLoading ? (
                    <div
                        className="w-full flex flex-wrap items-start gap-4">
                        <div
                            className="flex-1 min-w-36 rounded-lg bg-white flex flex-col items-start gap-4 justify-between p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">

                            <Skeleton className="w-90 h-7 bg-bf-backgroundTwo" />
                            <Skeleton className="w-full h-8 bg-bf-primarytextlight/30" />
                            <Skeleton className="w-90 h-7 bg-bf-backgroundTwo" />
                            
                        </div>
                    </div>
                ) : (

                    <OrderHeaderInfo 
                        headerInfo={
                            {
                                orderNumber: order?.orderNumber,
                                status: order?.status,
                                createdAt: order?.createdAt
                            }
                        }
                    />
                )
            }

            {
                isLoading ? (
                    <div
                        className="w-full flex flex-wrap items-start gap-4">
                        <div
                            className="flex-2 min-w-36 rounded-lg bg-white flex flex-col items-start gap-4 justify-between p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">

                            <Skeleton className="w-80 h-7 bg-bf-backgroundTwo" />
                            <Skeleton className="w-full h-8 bg-bf-primarytextlight/30" />
                            <Skeleton className="w-80 h-7 bg-bf-backgroundTwo" />
                            
                        </div>
                        <div
                            className="flex-1 min-w-36 rounded-lg bg-white flex flex-col items-start gap-4 justify-between p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">

                            <Skeleton className="w-40 h-7 bg-bf-backgroundTwo" />
                            <Skeleton className="w-full h-8 bg-bf-primarytextlight/30" />
                            <Skeleton className="w-40 h-7 bg-bf-backgroundTwo" />
                            
                        </div>
                    </div>
                ) : (
                    <div
                        className="flex flex-wrap items-start gap-4 w-full">
                        
                        <OrderDeliveryDetail 
                            deliveryInfo={
                                {
                                    orderDate: order?.orderDate,
                                    deliveryDate: order?.deliveryDate,
                                    deliveryMethod: order?.deliveryMethod,
                                    deliveryAddress: order?.deliveryAddress,
                                    notes: order?.notes,
                                    recipientName: order?.recipientName,
                                    recipientPhone: order?.recipientPhone,
                                }
                            }
                        />

                        <OrderCustomerDetail 
                            customerInfo={
                                {
                                    customerId: order?.customer.customerId,
                                    name: order?.customer.name,
                                    phone: order?.customer.phone,
                                    email: order?.customer.email,
                                }
                            }
                        />
                    </div>
                )
            }

            {
                isLoading ? (
                    <TableSkeleton />
                ) : (

                    <OrderItemsDetail 
                        orderItems={order?.items}
                    />
                )
            }

            {
                isLoading ? (
                    <div>

                    </div>
                ) : (

                    <OrderFinancialDetail 
                        financialInfo={
                                {
                                    originalTotal: order?.originalTotal,
                                    currentTotal: order?.currentTotal,
                                    totalPaid: order?.totalPaid,
                                    totalTips: order?.totalTips,
                                    totalRefunded: order?.totalRefunded,
                                    outstanding: order?.outstanding,
                                }
                            }
                    />
                )
            }

            {
                isLoading ? (
                    <TableSkeleton />
                ) : (

                    <OrderPaymentDetail 
                        orderPayments={order?.payments}
                        orderNumber={order?.orderNumber}
                    />
                )
            }

            {
                isLoading ? (
                    <TableSkeleton />
                ) : (

                    <OrderExpenseDetail 
                        orderExpenses={order?.expenses}
                        orderNumber={order?.orderNumber}
                    />
                )
            }

        </div>
    )
}

export default OrderDetailView