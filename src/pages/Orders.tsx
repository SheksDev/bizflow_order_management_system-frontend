import { useEffect, useState } from "react"
import OrderLayout from "../components/orders/OrderLayout"
import { type OrdersSummary, type OrderData } from "../api/orders/types/orders"
import { GetOrders } from "../api/orders/order";
import axios from "axios";


function Orders() {

    const [orders, setOrders] = useState<OrderData[] | []>([]);
    const [summary, setSummary] = useState<OrdersSummary | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchAllOrders = async () => {

        try {

            setIsLoading(true);

            const response = await GetOrders();

            console.log(response.data.orders);
            setOrders(response.data.orders);
            setSummary(response.data.summary);

        } catch (err) {

            if (axios.isAxiosError(err)) {
                console.log(
                    err.response?.data?.message ?? "Orders retrival failed"
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

        const fetchOrders = async () => {

            await fetchAllOrders();
        }

        fetchOrders();
    }, []);

    return (
        <div
            className="relative w-full">

            <OrderLayout 
                orders={orders}
                summary={summary}
                isLoading={isLoading}
            />

        </div>
    )
}

export default Orders