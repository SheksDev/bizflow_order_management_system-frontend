import { formatDateTime } from "../../../utils/formatDateTime";




interface Props {
    orderDate?: string | undefined;
    deliveryDate?: string | undefined;
    deliveryMethod?: "PICKUP" | "DELIVERY" | undefined;
    deliveryAddress?: string | undefined;
    notes?: string | undefined;
    recipientName?: string | undefined;
    recipientPhone?: string | undefined;
}

interface DeliveryInfo {
    deliveryInfo: Props;
}

function OrderDeliveryDetail(
    {
        deliveryInfo,
    } : DeliveryInfo
) {
    return (
        <div
            className="flex-2 w-full p-4 rounded-lg bg-white bf-shadow flex flex-col gap-4">

            <div
                className="px-4 py-2 rounded-sm bg-bf-backgroundTwo flex items-start">

                <p
                    className="font-bold text-[11px]/[14px] tracking-[0.55px] text-bf-primarytextlight">
                    FULFILLMENT DELIVERY DETAILS
                </p>

            </div>

            <div
                className="grid grid-cols-2 gap-4">

                <div>
                    
                    <p
                        className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                        Order Date & Time
                    </p>

                    <p
                        className="pt-0.5 font-semibold text-[16px]/[24px] text-bf-primaryblack">
                        {formatDateTime(deliveryInfo.orderDate ?? "").date}, {formatDateTime(deliveryInfo.orderDate ?? "").time} WAT
                    </p>

                </div>
                

                <div>
                    
                    <p
                        className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                        Delivery Date & Time
                    </p>

                    <p
                        className="pt-0.5 font-semibold text-[16px]/[24px] text-bf-primary">
                        {formatDateTime(deliveryInfo.deliveryDate ?? "").date}, {formatDateTime(deliveryInfo.deliveryDate ?? "").time} WAT
                    </p>

                </div>

                <div>
                    
                    <p
                        className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                        Delivery Method
                    </p>

                    <div
                        className="flex items-center gap-1">

                        {
                            deliveryInfo.deliveryMethod === "DELIVERY"
                                ? <img 
                                        src="/src/assets/DeliveryIcon.svg" 
                                        alt="" 
                                    />
                                : <img 
                                        src="/src/assets/PickupIcon.svg" 
                                        alt="" 
                                    />
                        }

                        <p
                            className="font-medium text-[14px]/[20px] text-bf-primaryblack">
                            {deliveryInfo.deliveryMethod ?? "-"}
                        </p>

                    </div>

                </div>

                <div>
                    
                    <p
                        className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                        Delivery Address
                    </p>

                    <p
                        className="font-medium text-[14px]/[20px] text-bf-primaryblack">
                        {deliveryInfo.deliveryAddress ?? "-"}
                    </p>

                </div>

                <div>
                    
                    <p
                        className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                        Recipient Details
                    </p>

                    <p
                        className="font-medium text-[14px]/[20px] text-bf-primaryblack">
                        {deliveryInfo.recipientName ?? "-"}
                    </p>
                    <p
                        className="font-normal text-[14px]/[20px] text-bf-primarytextlight">
                        {deliveryInfo.recipientPhone ?? "-"}
                    </p>

                </div>

                <div>
                    
                    <p
                        className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                        Order Notes
                    </p>

                    <p
                        className="font-medium text-[14px]/[20px] text-bf-primaryblack">
                        {deliveryInfo.notes ?? "-"}
                    </p>

                </div>

            </div>

        </div>
    )
}

export default OrderDeliveryDetail