import { formatDateTime } from "../../../utils/formatDateTime";



interface Props {
    orderNumber?: string | undefined;
    status?: "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "READY" | "OUT_FOR_DELIVERY" | "DELIVERED" | "COMPLETED" | "CANCELLED" | undefined;
    createdAt?: string | undefined;
}

interface HeaderInfo {
    headerInfo: Props;
}

function OrderHeaderInfo(
    {
        headerInfo,
    } : HeaderInfo
) {

    const order = "";

    return (
        <div
            className="w-full flex items-center justify-between gap-8 p-6 rounded-lg bg-white bf-shadow">

                {
                    !order && (

                        <div
                            className="flex-1 min-w-0 flex flex-col items-start gap-1">

                            <div
                                className="w-full flex items-center gap-2">
                            
                                <h3
                                    className="font-bold text-[32px]/[40px] tracking-[-0.64px] text-bf-primaryblack flex items-center gap-1">
                                    Order
                                    <span
                                        className="text-bf-primary">
                                        {`#${headerInfo.orderNumber}`}
                                    </span>
                                </h3>

                                <div
                                    className="px-3 py-1 rounded-xl bg-[#FFDBCC] text-bf-primarytext flex items-center font-semibold text-[11px]/[14px] tracking-[0.22px]">
                                    <p>
                                        {headerInfo.status}
                                    </p>
                                </div>
                                
                            </div>

                            <p
                                className="pt-0.5 font-normal text-[14px]/[20px] text-bf-primarytext">
                                Operational records, order details, and associated payments and expenses history for {headerInfo.orderNumber}
                            </p>
                            
                            <p
                                className="font-normal text-[13px]/[18px] text-bf-primarytextlight">
                                Order logged 
                                <span className="font-semibold">{formatDateTime(headerInfo.createdAt ?? "").date}</span> at 
                                <span className="font-semibold">{formatDateTime(headerInfo.createdAt ?? "").time}</span> WAT.
                            </p>

                        </div>
                    )
                }

                <div
                    className="flex-1 flex flex-wrap items-center gap-2">

                    <button
                        // onClick={editCustomer}
                        className="shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-2 bg-bf-backgroundTwo bf-shadow font-semibold text-[14px]/[20px] text-bf-primaryblack rounded-md cursor-pointer">

                        <img 
                            src="/src/assets/EditIcon.svg" 
                            alt="" 
                        />

                        <span>
                            Edit Order
                        </span>

                    </button>

                    <button
                        // onClick={editCustomer}
                        className="shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-2 bg-bf-backgroundTwo bf-shadow font-semibold text-[14px]/[20px] text-bf-error rounded-md cursor-pointer">

                        <img 
                            src="/src/assets/CancelRoundIcon.svg" 
                            alt="" 
                        />

                        <span>
                            Cancel Order
                        </span>

                    </button>
                    

                    <button
                        // onClick={editCustomer}
                        className="shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-2 bg-bf-backgroundTwo bf-shadow font-semibold text-[14px]/[20px] text-bf-primaryblack rounded-md cursor-pointer">

                        <img 
                            src="/src/assets/PrinterIcon.svg" 
                            alt="" 
                        />

                        <span>
                            Print Slip
                        </span>

                    </button>

                    <button
                        // onClick={editCustomer}
                        className="shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-2 bg-bf-primary bf-shadow font-semibold text-[14px]/[20px] text-white rounded-md cursor-pointer">

                        <img 
                            src="/src/assets/LogPaymentIcon.svg" 
                            alt="" 
                        />

                        <span>
                            Log Payment
                        </span>

                    </button>

                </div>

        </div>
    )
}

export default OrderHeaderInfo