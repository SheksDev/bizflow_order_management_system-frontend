import type { PaymentData } from "../../../api/payments/types/payment"
import Table from "../../../ui/Table";
import { ORDER_PAYMENTS_COLUMNS } from "./OrderDetailsColumn";




interface OrderPayments {
    orderPayments: PaymentData[] | undefined;
    orderNumber?: string | undefined;
};

function OrderPaymentDetail(
    {
        orderPayments,
        orderNumber
    } : OrderPayments
) {
    return (
        <div
            className="w-full rounded-lg bg-white bf-shadow">

            <div
                className="flex items-start p-4 bg-bf-backgroundTwo">

                <div
                    className="flex items-center gap-2">

                    <img 
                        src="/src/assets/PaymentGreenIcon.svg" 
                        alt="" 
                    />

                    <h3
                        className="font-bold text-[16px]/[24px] text-bf-primaryblack">
                        Payments Attributed to {`#${orderNumber}`}
                    </h3>

                </div>

            </div>

            <Table 
                columns={ORDER_PAYMENTS_COLUMNS}
                bodyOptions={orderPayments}
                table={"payments"}
            />

        </div>
    )
}

export default OrderPaymentDetail