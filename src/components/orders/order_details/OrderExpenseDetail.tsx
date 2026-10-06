import type { ExpenseData } from "../../../api/expenses/types/expenses"
import Table from "../../../ui/Table";
import { formatCurrency } from "../../../utils/formatCurrency";
import { ORDER_EXPENSES_COLUMNS } from "./OrderDetailsColumn";




interface OrderExpenses {
    orderExpenses: ExpenseData[] | undefined;
    orderNumber: string | undefined;
}

function OrderExpenseDetail(
    {
        orderExpenses,
        orderNumber,
    } : OrderExpenses
) {
    return (
        <div
            className="w-full rounded-lg bg-white bf-shadow">

            <div
                className="w-full flex items-start p-4 bg-bf-backgroundTwo">

                <div
                    className="flex items-center gap-2">

                    <img 
                        src="/src/assets/ExpenseRedIcon.svg" 
                        alt="" 
                    />

                    <h3
                        className="font-bold text-[16px]/[24px] text-bf-primaryblack">
                        Contextual Order Fulfillment Expenses
                    </h3>

                    <p
                        className="font-normal text-[13px]/[18px] text-bf-primarytextlight">
                        Specific direct costs attributed to {`#${orderNumber}`}
                    </p>

                </div>

            </div>

            <Table 
                columns={ORDER_EXPENSES_COLUMNS}
                bodyOptions={orderExpenses}
                table={"expenses"}
            />

            <div
                className="w-full flex items-center justify-between px-4 py-3 bg-bf-backgroundTwo">

                <p
                    className="flex-2 font-normal text-[13px]/[18px] text-bf-primarytextlight">
                    Showing expenses attributed strictly to this order fulfillment. To create or manage global expenses, use the dedicated Expenses module.
                </p>

                <div
                    className="flex-1 shrink-0 flex items-center gap-2">

                    <p
                        className="shrink-0 font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                        Direct Fulfillment Cost:
                    </p>

                    <p
                        className="shrink-0 font-bold text-[16px]/[24px] text-bf-primary">
                        {`-${orderExpenses && formatCurrency(
                                orderExpenses.reduce(
                                (sum, payment) => sum + Number(payment.amount ?? ""),
                                0
                            )
                        )}`}
                    </p>
                </div>
            </div>

        </div>
    )
}

export default OrderExpenseDetail