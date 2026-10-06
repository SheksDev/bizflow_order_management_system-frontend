import type { ExpenseData } from "../../../api/expenses/types/expenses";
import type { OrderItem } from "../../../api/orders/types/orders";
import type { PaymentData } from "../../../api/payments/types/payment";
import type { TableColumn } from "../../../ui/Table";
import { formatCurrency } from "../../../utils/formatCurrency";
import { formatDateTime } from "../../../utils/formatDateTime";
import { getDetailValue } from "../order_modal/utils";



export const ORDER_ITEMS_COLUMNS: TableColumn<OrderItem>[] = [

    {
        key: "productName",
        label: "ITEM DETAILS & CUSTOM SPECIFICATIONS",
        render: (row) => (

            <div
                className="flex flex-col items-start gap-1.5">

                <h3
                    className="font-bold text-[16px]/[24px] text-bf-primaryblack">
                    {row.productName ?? ""}
                </h3>
                
                <div
                    className="w-full p-2 flex flex-col items-start gap-1 rounded-sm bg-bf-backgroundTwo">

                    <div
                        className="flex items-center gap-3">

                        <p
                            className="font-bold text-[13px]/[18px] text-bf-primaryblack">
                            Size: 
                            <span className="text-bf-primarytext">
                                {`  ${getDetailValue(row.details, "size")}`}
                            </span>
                        </p>
                        

                        {/* <p
                            className="font-bold text-[13px]/[18px] text-bf-primaryblack">
                            Shape: 
                            <span className="text-bf-primarytext">
                                {`  ${row.details.shape ?? ""}`}
                            </span>
                        </p> */}

                    </div>
                    

                    <div
                        className="flex items-center gap-3">

                        <p
                            className="font-bold text-[13px]/[18px] text-bf-primaryblack">
                            Layer: 
                            <span className="text-bf-primarytext">
                                {`  ${getDetailValue(row.details, "layer")}`}
                            </span>
                        </p>

                        <p
                            className="font-bold text-[13px]/[18px] text-bf-primaryblack">
                            Flavour: 
                            <span className="text-bf-primarytext">
                                {`  ${getDetailValue(row.details, "flavour")}`}
                            </span>
                        </p>

                    </div>

                    <p
                        className="font-bold text-[13px]/[18px] text-bf-primaryblack">
                        Frosting: 
                        <span   className="text-bf-primarytext">
                            {`  ${getDetailValue(row.details, "frosting")}`}
                        </span>
                    </p>

                    <p
                        className="font-bold text-[13px]/[18px] text-bf-primaryblack">
                        Topping: 
                        <span   className="text-bf-primarytext">
                            {`  ${getDetailValue(row.details, "topping")}`}
                        </span>
                    </p>

                    <p
                        className="font-bold text-[13px]/[18px] text-bf-primaryblack">
                        Topper: 
                        <span   className="text-bf-primarytext">
                            {`  ${getDetailValue(row.details, "topper")}`}
                        </span>
                    </p>

                    <p
                        className="font-bold text-[13px]/[18px] text-bf-primaryblack">
                        Inscription: 
                        <span className="text-bf-primary">
                            {`  ${getDetailValue(row.details, "inscription")}`}
                        </span>
                    </p>

                    <p
                        className="font-bold text-[13px]/[18px] text-bf-primaryblack">
                        Extra: 
                        <span className="text-bf-primarytext">
                            {`  ${getDetailValue(row.details, "extra")}`}
                        </span>
                    </p>

                </div>
            </div>
        )
    },
    {
        key: "quantity",
        label: "QTY",
        render: (row) => (

            <p
                className="font-bold text-[14px]/[20px] text-bf-primaryblack">
                {row.quantity ?? ""}
            </p>
        )
    },
    {
        key: "unitPrice",
        label: "UNIT PRICE (₦)",
        render: (row) => (

            <p
                className="font-semibold text-[13px]/[18px] text-bf-primaryblack">
                {formatCurrency(Number(row.unitPrice ?? ""))}
            </p>
        )
    },
    {
        key: "totalPrice",
        label: "TOTAL (₦)",
        render: (row) => (

            <p
                className="font-bold text-[13px]/[18px] text-bf-primaryblack">
                {formatCurrency(Number(row.totalPrice ?? ""))}
            </p>
        )
    },
]



export const ORDER_PAYMENTS_COLUMNS: TableColumn<PaymentData>[] = [

    {
        key: "paymentNumber",
        label: "PAYMENT NUMBER",
        render: (row) => (

            <p
                className="font-bold text-[12px]/[16px] tracking-[0.12px] text-bf-primary">
                {row.paymentNumber ?? ""}
            </p>
        )
    },
    {
        key: "paymentDate",
        label: "TIMESTAMP",
        render: (row) => (

            <p
                className="font-normal text-[13px]/[18px] text-bf-primaryblack">
                {`${formatDateTime(row.paymentDate ?? "").date}, ${formatDateTime(row.paymentDate ?? "").time}`}
            </p>
        )
    },
    {
        key: "paymentMethod",
        label: "METHOD & CHANNEL",
        render: (row) => (

            <p
                className="font-normal text-[13px]/[18px] text-bf-primaryblack">
                {row.paymentMethod ?? ""}
            </p>
        )
    },
    {
        key: "reference",
        label: "TRANSACTION REFERENCE",
        render: (row) => (

            <p
                className="font-normal text-[13px]/[18px] text-bf-primarytextlight font-libertinus-mono">
                {row.reference ?? ""}
            </p>
        )
    },
    {
        key: "amount",
        label: "AMOUNT (₦)",
        render: (row) => (

            <p
                className="font-bold text-[13px]/[18px] text-bf-success">
                {formatCurrency(Number(row.amount ?? ""))}
            </p>
        )
    },
]



export const ORDER_EXPENSES_COLUMNS: TableColumn<ExpenseData>[] = [

    {
        key: "title",
        label: "EXPENSE ITEM",
        render: (row) => (

            <p
                className="font-medium text-[13px]/[18px] text-bf-primaryblack">
                {row.title ?? ""}
            </p>
        )
    },
    {
        key: "expenseCategory",
        label: "CATEGORY",
        render: (row) => (

            <p
                className="px-2 py-[1.5px] rounded-xs bg-[#F4ECE8] font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext w-fit">
                {row.expenseCategory?.name ?? ""}
            </p>
        )
    },
    {
        key: "expenseDate",
        label: "DATE",
        render: (row) => (

            <p
                className="font-normal text-[13px]/[18px] text-bf-primarytextlight">
                {formatDateTime(row.expenseDate ?? "").date}
            </p>
        )
    },
    {
        key: "receiptUrl",
        label: "RECEIPT",
        render: (row) => (

            <p
                className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primary cursor-pointer">
                {row.receiptUrl ?? "-"}
            </p>
        )
    },
    {
        key: "amount",
        label: "AMOUNT EXPENSED (₦)",
        render: (row) => (

            <p
                className="font-bold text-[13px]/[18px] text-bf-primary">
                {`-${formatCurrency(Number(row.amount ?? ""))}`}
            </p>
        )
    },
]