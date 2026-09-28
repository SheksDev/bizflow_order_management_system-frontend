import axios from "axios";
import type { DashboardMetrics,  DashboardQuery } from "../api/dashboard/types/dashboard";
import DashboardLayout from "../components/dashboard/DashboardLayout"
import { useState } from "react";
import { GetDashboardMetrics } from "../api/dashboard/dashboard";
import type { OrderData } from "../api/orders/types/orders";
import { GetOrders } from "../api/orders/order";
import { GetPayments } from "../api/payments/payment";
import type { PaymentData } from "../api/payments/types/payment";
import type { ExpenseData } from "../api/expenses/types/expenses";
import { GetExpenses } from "../api/expenses/expenses";


function Dashboard() {

    const [isLoading, setIsLoading] = useState(false);
    const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
    const [orders, setOrders] = useState<OrderData[] | null>(null);
    const [payments, setPayments] = useState<PaymentData[] | null>(null);
    const [expenses, setExpenses] = useState<ExpenseData[] | null>(null);
    const [metricsDuration, setMetricsDuration] = useState<DashboardQuery>({
        period: "current_month",
        date: "",
        month: "",
    });


    const getDashboardMetrics = async (data: DashboardQuery) => {

        try {
            
            setIsLoading(true);

            const metrics = await GetDashboardMetrics(data);
            const orders  = await GetOrders(metricsDuration);
            const payments  = await GetPayments(metricsDuration);
            const expenses  = await GetExpenses(metricsDuration);

            setMetrics(metrics.data?.data);
            setOrders(orders.data.orders);
            setPayments(payments.data.payments);
            setExpenses(expenses.data.expenses);

        } catch(err) {

            if (axios.isAxiosError(err)) {
                console.log(
                    err.response?.data?.message ?? "Dashboard retrival failed"
                );
                } else if (err instanceof Error) {
                console.log(err.message);
                } else {
                console.log("Something went wrong");
            }

        } finally {

            setIsLoading(false)
        }
    }
    return (
        <DashboardLayout 
            isLoading={isLoading}
            getDashboardMetrics={getDashboardMetrics}
            summary={metrics}
            orders={orders}
            payments={payments}
            expenses={expenses}
            duration={metricsDuration}
            setDuration={setMetricsDuration}
        />
    )
}

export default Dashboard