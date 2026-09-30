import type { CustomerData } from "../../../api/customers/types/customers";
import { CUSTOMER_STATS } from "../customer.types";


interface SummaryProps {
    customer: CustomerData | null;
}


function CustomerOrderSummary(
    {
        customer,
    } : SummaryProps
) {

    // console.log(customer);

    const transformedCustomer = () => {

        const totalOrders = customer?.orders ? customer?.orders.length : 0;
        const totalCompleted = customer?.orders ? customer?.orders
            .filter(order => order?.status === "COMPLETED")
            .length : 0;
        const totalCancelled = customer?.orders ? customer?.orders
            .filter(order => order?.status === "CANCELLED")
            .length : 0;
    
        return {

            totalOrders,
            totalCompleted,
            totalCancelled,
            totalOrderValue: customer?.totalOrderValue,
            totalOutstanding: customer?.totalOutstanding,
            totalOrderRefunded: customer?.totalOrderRefunded,
        };
    };

    const summary = transformedCustomer();
    
    return (
        <div
            className="w-full flex items-center gap-4">

            {
                summary && (

                    <>

                        {

                            CUSTOMER_STATS(summary).map((stat) => (

                                <div
                                    key={stat.type}
                                    className="flex-1 min-w-0 bg-white flex flex-col items-start gap-1.5 rounded-lg p-4 bf-shadow">

                                    <p
                                        className="font-semibold text-[10px]/[14px] tracking-[0.55px] text-bf-primarytextlight">
                                        {stat.title}
                                    </p>

                                    <h3
                                        className={`font-bold text-[24px]/[32px] tracking-[-0.36px] ${stat.type !== "balance" ? "text-bf-primaryblack" : "text-bf-primary"}`}>
                                        {stat.volume}
                                    </h3>

                                    <div
                                        className="flex items-center gap-2">

                                        {
                                            stat.stats.map((s, index) => (

                                                <p
                                                    key={index}
                                                    className={`font-medium text-[11px]/[14px] ${
                                                        ["order", "payment"].includes(stat.type)
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
        </div>
    )
}

export default CustomerOrderSummary