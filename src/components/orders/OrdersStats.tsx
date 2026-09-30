import type { OrdersSummary } from "../../api/orders/types/orders";
import { Skeleton } from "../../ui/Skeleton";
import { ORDERS_STATS } from "./orders.types";


interface Props {
    summary: OrdersSummary | null;
    isLoading: boolean | null;
}


function OrdersStats(
    {
        summary,
        isLoading,
    }: Props
) {

    return (
        <div
            className="w-full flex items-start gap-4">

            {
                isLoading ? (
                    
                    <div
                        className="w-full flex flex-wrap items-start gap-4">
                        {
                            Array.from({ length : 4 }).map((_, index) => (

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

                    <>
                        {
                            summary && (

                                <>

                                    {

                                        ORDERS_STATS(summary).map((stat) => (

                                            <div
                                                key={stat.type}
                                                className="flex-1 min-w-0 bg-white flex flex-col items-start gap-1.5 rounded-lg p-4 bf-shadow">

                                                <p
                                                    className="font-semibold text-[10px]/[14px] tracking-[0.55px] text-bf-primarytextlight">
                                                    {stat.title}
                                                </p>

                                                <h3
                                                    className={`font-bold text-[24px]/[32px] tracking-[-0.36px] ${stat.type === "balance" ? 
                                                    "text-bf-primary" : 
                                                    stat.type === "payment" ?
                                                    "text-bf-success" :
                                                    "text-bf-primaryblack"}`}>
                                                    {stat.volume}
                                                </h3>

                                                <div
                                                    className="w-full flex items-center gap-1">

                                                    {
                                                        stat.stats.map((s, index) => (

                                                            <p
                                                                key={index}
                                                                className={`font-medium text-[11px]/[14px] ${
                                                                    ["payment"].includes(stat.type)
                                                                        ? "text-bf-success"
                                                                        : stat.type === "balance"
                                                                        ? "text-bf-primary"
                                                                        : "text-bf-primarytextlight"
                                                                }`}>
                                                                {s}
                                                            </p>
                                                        ))
                                                    }
                                                
                                                </div>

                                            </div>
                                        ))
                                    }
                                </>
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

export default OrdersStats