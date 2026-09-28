import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { RECENT_EXPENSES_COLUMNS, RECENT_EXPENSES_TITLE, RECENT_ORDERS_COLUMNS, RECENT_ORDERS_TITLE, RECENT_PAYMENTS_COLUMNS, RECENT_PAYMENTS_TITLE, type ExpenseRow, type OrderRow, type PaymentRow } from "./dashboard"
import DashboardStats from "./DashboardStats"
import DashboardTable from "./DashboardTable"
import Financial from "./Financial"
import type { DashboardMetrics, DashboardQuery } from "../../api/dashboard/types/dashboard"
import type { OrderData } from "../../api/orders/types/orders"
import { GetCustomer } from "../../api/customers/customer"
import type { PaymentData } from "../../api/payments/types/payment"
import type { ExpenseData } from "../../api/expenses/types/expenses"
import { Skeleton, TableSkeleton } from "../../ui/Skeleton"


interface DashboardProps {
    isLoading: boolean;
    getDashboardMetrics: (metricsData: DashboardQuery) => Promise<void>;
    summary: DashboardMetrics | null;
    orders: OrderData[] | null;
    payments: PaymentData[] | null;
    expenses: ExpenseData[] | null;
    duration: DashboardQuery;
    setDuration: Dispatch<SetStateAction<DashboardQuery>>;
}



function DashboardLayout(
    {
        isLoading,
        getDashboardMetrics,
        summary,
        orders,
        payments,
        expenses,
        duration,
        setDuration
    } : DashboardProps
) {

    const [recentOrders, setRecentOrders] = useState<OrderRow[]>([])
    const [recentPayments, setRecentPayments] = useState<PaymentRow[]>([])
    const [recentExpenses, setRecentExpenses] = useState<ExpenseRow[]>([])


    useEffect(() => {
        getDashboardMetrics(duration);
    }, [duration]);

    useEffect(() => {

        const loadRecentOrders = async () => {

            const transformedOrders: OrderRow[] = await Promise.all(

                (orders ?? []).map(async (order) => {

                    const customer = (await GetCustomer(order.customer.customerId)).data.name;

                    const totalPayments = order.payments.reduce(
                        (sum, payment) => sum + Number(payment.amount),
                        0
                    );

                    const balance = Number(order.currentTotal) - totalPayments;

                    return {
                        orderNumber: order.orderNumber,
                        customerItem: {
                            customer,
                            item: order.items.map((item) => item.productName),
                        },
                        delivery: {
                            deliveryDate: order.deliveryDate,
                            deliveryAddress: order.deliveryAddress,
                        },
                        total: order.currentTotal,
                        balance,
                        status: order.status,
                    };
                })
            );

            setRecentOrders(transformedOrders);
        };

        const loadRecentPayments = async () => {

            const transformedPayments: PaymentRow[] = await Promise.all(

                (payments ?? []).map(async (payment) => {

                    return {

                        order: {
                            ref: payment.reference,
                            orderNumber: payment.orderNumber,
                        },
                        paymentMethod: payment.paymentMethod,
                        amount: payment.amount,
                        date: payment.paymentDate,
                    };
                })
            );

            setRecentPayments(transformedPayments);
        };

        const loadRecentExpenses = async () => {

            const transformedExpenses: ExpenseRow[] = await Promise.all(

                (expenses ?? []).map(async (expense) => {

                    return {

                        title: expense.title,
                        category: expense.expenseCategory?.name,
                        date: expense.expenseDate,
                        amount: expense.amount,
                    };
                })
            );

            setRecentExpenses(transformedExpenses);
        };

        loadRecentOrders();
        loadRecentPayments();
        loadRecentExpenses();

    }, [orders, payments, expenses]);

    
    return (
        <div
            className="p-6 min-h-screen w-full min-w-0 flex flex-col items-center gap-6 no-scrollbar">
            
            <div
                className="w-full flex justify-between items-center">

                <div
                    className="flex flex-col gap-0.5">

                    <div
                        className="flex items-center gap-1">

                        <h2
                            className="font-bold text-[32px]/[40px] tracking-[-0.8px] text-bf-primaryblack">
                            Dashboard
                        </h2>

                        <p
                            className="px-2 py-0.5 rounded-xl text-bf-primaryblack bg-bf-live font-semibold text-[11px]/[14px] tracking-[0.22px]">
                            Live Sync
                        </p>
                        
                    </div>

                    <p
                        className="font-normal text-[14px]/[20px] text-bf-primarytext">
                        Overview of your business operations and financial activity.
                    </p>

                </div>

                <div
                    className="p-1 rounded-lg bg-[#FFFFFF] shadow-[0_1px_2px_rgba(0,0,0,0.05)] font-semibold text-[11px]/[14px] tracking-[0.22px] flex items-center">

                    <button
                        className={`px-4 py-1.5 rounded-sm ${
                            duration.period === "current_month" 
                                ? "bg-bf-primary text-bf-background" 
                                : "text-bf-primarytext"} cursor-pointer`
                            
                        }
                        onClick={() => {
                            setDuration((prev) => (
                                {
                                    ...prev,
                                    period: "current_month",
                                }
                            ));

                        }}>
                        This Month
                    </button>

                    <button
                        className={`px-4 py-1.5 rounded-sm ${
                            duration.period === "previous_month" 
                                ? "bg-bf-primary text-bf-background" 
                                : "text-bf-primarytext"}  cursor-pointer`}
                        onClick={() => {
                            setDuration((prev) => (
                                {
                                    ...prev,
                                    period: "previous_month",
                                }
                            ));

                        }}>
                        Previous Month
                    </button>

                    <button
                        className={`px-2 py-1.5 rounded-sm text-bf-primarytext flex items-center gap-1 bf-border-l cursor-pointer`}>

                        <img 
                            src="/src/assets/CalendarIcon.svg" 
                            alt=""
                            className="w-3 h-[13.33px]" 
                        />

                        <p>
                            Custom
                        </p>

                    </button>

                </div>

            </div>

            {
                isLoading ? (
                    
                    <div
                        className="w-full flex flex-wrap items-start gap-4">
                        {
                            Array.from({ length : 5 }).map((_, index) => (

                                <div
                                    key={index}
                                    className="flex-1 min-w-36 rounded-lg bg-white flex flex-col items-start gap-4 justify-between p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">

                                    <Skeleton className="w-24 h-6 bg-[#FAF2EE]" />
                                    <Skeleton className="w-full h-8 bg-bf-primarytextlight/30" />
                                    <Skeleton className="w-24 h-6 bg-[#FAF2EE]" />
                                    
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <DashboardStats 
                        summary={summary}
                    />
                )
            }

            <Financial 
                isLoading={isLoading}
                summary={summary}
            />

            <div
                className="w-full flex flex-col items-start gap-6">

                {
                    isLoading ? (

                        <>

                            <TableSkeleton />

                        </>
                    ) : (

                        <>

                            <DashboardTable 
                                titleOptions={RECENT_ORDERS_TITLE}
                                columns={RECENT_ORDERS_COLUMNS}
                                bodyOptions={recentOrders}
                                table={"orders"}

                            />

                            <DashboardTable 
                                titleOptions={RECENT_PAYMENTS_TITLE}
                                columns={RECENT_PAYMENTS_COLUMNS}
                                bodyOptions={recentPayments}
                                table={"payments"}
                            />

                            <DashboardTable 
                                titleOptions={RECENT_EXPENSES_TITLE}
                                columns={RECENT_EXPENSES_COLUMNS}
                                bodyOptions={recentExpenses}
                                table={"expenses"}
                            />

                        </>
                    )
                }

            </div>

        </div>
    )
}

export default DashboardLayout