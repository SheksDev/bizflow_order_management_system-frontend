import { useNavigate } from "react-router-dom";
import { Skeleton, TableSkeleton } from "../../ui/Skeleton"
import Table from "../../ui/Table"
import { ORDER_COLUMNS } from "./OrdersColumn";
import OrdersFilter from "./OrdersFilter"
import OrdersStats from "./OrdersStats"
import type { OrderData, OrdersSummary } from "../../api/orders/types/orders";


interface Props {
    orders: OrderData[] | undefined;
    summary: OrdersSummary | null;
    isLoading: boolean | null;
}


function OrderLayout(
    {
        orders,
        summary,
        isLoading,
    }: Props
) {

    const navigate = useNavigate();

    return (
        <div
            className="absolute p-6 min-h-screen w-full min-w-0 flex flex-col items-center gap-6 no-scrollbar">

                <div
                    className="w-full flex justify-between items-center">

                    <div
                        className="w-100 flex flex-col gap-0.5">

                        <div
                            className="flex items-center gap-1">

                            <h2
                                className="font-bold text-[32px]/[40px] tracking-[-0.8px] text-bf-primaryblack">
                                Orders
                            </h2>

                        </div>

                        <p
                            className="font-normal text-[14px]/[20px] text-bf-primarytext">
                            Create, manage, and track customer orders for fulfillment.
                        </p>

                    </div>

                    <div
                        className="flex items-center">

                        <button
                            className={`px-4 py-2 rounded-md text-[#FFF1EB] bg-bf-primary flex items-center gap-1.5 bf-border-l cursor-pointer shadow-[0_1px_2px_rgba(0,,0,0.05)]`}
                            >

                            <img 
                                src="/src/assets/AddIcon.svg" 
                                alt="" 
                            />

                            <p
                                className="font-semibold text-[14px]/[20px]">
                                Create Order
                            </p>

                        </button>

                    </div>

                </div>

                <OrdersStats 
                    summary={summary}
                    isLoading={isLoading}
                />

                {
                    isLoading ? (
                        
                        <div
                            className="w-full p-2 bg-white flex items-start">
                            <Skeleton className="w-full h-6 bg-[#FAF2EE]" />
                        </div>
                    ) : (

                        <OrdersFilter />
                    )
                }

                {
                    isLoading ? (
                        <TableSkeleton />
                    ) : (

                        <Table
                            columns={ORDER_COLUMNS}
                            bodyOptions={orders}
                            onRowClick={(row) => {
                                navigate(`/orders/${row.orderNumber}`)
                            }}
                            table={"orders"}
                        />
                    )
                }
        </div>
    )
}

export default OrderLayout