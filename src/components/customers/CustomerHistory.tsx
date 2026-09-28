import { useEffect, useState } from "react";
import type { CustomerData } from "../../api/customers/types/customers";
import Table from "../../ui/Table";
import type { CustomerOrderHistoryRow } from "./customer.types";
import { CUSTOMER_ORDER_HISTORY } from "./CustomerColumn";


interface Props {
    customer: CustomerData | null;
}

function CustomerHistory(
    {
        customer
    } : Props
) {

    const [customerOrders, setCustomerOrders] = useState<CustomerOrderHistoryRow[]>([])

    useEffect(() => {

        const loadCustomerOrders = async () => {
    
        const transformedOrders: CustomerOrderHistoryRow[] = await Promise.all(
            

                (customer?.orders ?? []).map(async (order) => {

                    const items = order?.items?.map((item) => {

                        return {
                            orderName: item.productName ?? "",

                            details: item.details ?? "",
                        }
                    })

                    return {

                        orderNumber: order.orderNumber ?? "",
                        orderItem: items,
                        delivery : {
                            deliveryDate: order.deliveryDate ?? "",
                            deliveryAddress: order.deliveryAddress ?? "",
                        },
                        value: Number(order.currentTotal ?? ""),
                        payment: {
                            paid: Number(order.totalPaid ?? ""),
                            balance: Number(order.outstanding ?? ""),
                        },
                        status: order.status ?? "",
                    };
                })
            );

            setCustomerOrders(transformedOrders);
        };

        loadCustomerOrders();

    }, [customer?.orders])

    return (
        <div
            className="flex-1 min-w-0 w-full rounded-lg bf-shadow">

            <div
                className="w-full flex items-center justify-between gap-8 p-6 bg-white bf-shadow rounded-t-lg">

                <div
                    className="min-w-0 flex-1 flex flex-col items-start gap-0.5">

                    <div
                        className="shrink-0 flex items-center gap-2">

                        <img 
                            src="/src/assets/OrderHistoryIcon.svg" 
                            alt="" 
                        />

                        <h3
                            className="font-semibold text-[16px]/[24px] text-bf-primaryblack">
                            Order History
                        </h3>

                    </div>

                    <p
                        className="font-normal text-[13px]/[18px] text-bf-primarytext">
                        Track production status, delivery timeline, and balance settlements.
                    </p>

                </div>

                <div
                    className="shrink-0 p-1 bg-[#F4ECE8] rounded-sm">

                    {
                        customer?.orders && (

                            <ul
                                className="shrink-0 flex items-center gap-1">

                                <li
                                    className="font-medium text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext px-2 py-1 rounded-xs cursor-pointer">
                                    {/* All Orders (`${
                                        customer?.orders.length
                                    }`) */}
                                    {
                                        `All Orders (${
                                            customer?.orders.length
                                        })`
                                    }
                                </li>

                                <li
                                    className="font-medium text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext px-2 py-1 rounded-xs cursor-pointer">
                                    {
                                            `Pending (${
                                            customer?.orders.filter(order => order.status === "PENDING").length
                                        })`
                                    }
                                </li>

                                <li
                                    className="font-medium text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext px-2 py-1 rounded-xs cursor-pointer">
                                    {
                                        `Completed (${
                                            customer?.orders.filter(order => order.status === "COMPLETED").length
                                        })`
                                    }
                                </li>

                            </ul>

                        )
                    }

                </div>

            </div>

            <Table 
                columns={CUSTOMER_ORDER_HISTORY}
                bodyOptions={customerOrders}
                table={"orders"}
            />

        </div>
    )
}

export default CustomerHistory