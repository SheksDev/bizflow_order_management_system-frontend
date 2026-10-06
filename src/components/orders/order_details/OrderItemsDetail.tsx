import type { OrderItem } from "../../../api/orders/types/orders"
import Table from "../../../ui/Table"
import { ORDER_ITEMS_COLUMNS } from "./OrderDetailsColumn"



interface OrderItems {
    orderItems: OrderItem[] | undefined;
}


function OrderItemsDetail(
    {
        orderItems,
    } : OrderItems
) {
    return (
        <div
            className="w-full rounded-lg bg-white bf-shadow">

            <div
                className="flex items-center justify-between p-4 bg-bf-backgroundTwo">

                <div
                    className="flex items-center gap-2">

                    <img 
                        src="/src/assets/OrderItemIcon.svg" 
                        alt="" 
                    />

                    <h3
                        className="font-bold text-[16px]/[24px] text-bf-primaryblack">
                        Ordered Artisanal Items
                    </h3>

                </div>

                <p
                    className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                    {orderItems?.length} Items Configured
                </p>

            </div>

            <Table
                columns={ORDER_ITEMS_COLUMNS}
                bodyOptions={orderItems}
                table={"orders"}
            />

        </div>
    )
}

export default OrderItemsDetail