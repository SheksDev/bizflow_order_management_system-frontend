import type { DashboardMetrics } from "../../api/dashboard/types/dashboard";
import { Skeleton } from "../../ui/Skeleton";
import { formatCurrency } from "../../utils/formatCurrency";
import FinancialStats from "./FinancialStats"


interface DashboardStatsProps {
    isLoading: boolean;
    summary: DashboardMetrics | null;
}

function Financial({ summary, isLoading } : DashboardStatsProps) {
    return (
        <div
            className="w-full flex flex-col gap-4 p-6 rounded-lg bg-[#FFFFFF] bf-shadow">

            {
                isLoading ? (

                    <div
                        className="flex flex-col items-start gap-4 w-full">

                        <Skeleton 
                            className="w-30 h-8 bg-[#FAF2EE]"
                        />

                        <Skeleton 
                            className={`relative w-full h-3 rounded-xl overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.05)] bg-bf-primarytextlight/30`}
                        />

                        <div
                            className="flex flex-wrap items-start gap-2 w-full">
                            
                            {
                                Array.from({ length : 4 }).map((_, index) => (

                                    <Skeleton 
                                        key={index}
                                        className='flex-1 min-w-24 h-22 px-2 pt-2 py-5.5 rounded-sm bg-[#FAF2EE] flex flex-col' 
                                    />
                                ))
                            }
                        </div>
                    </div>

                ) : (

                    <>

                        <div
                            className="flex items-center justify-between">

                            <div
                                className="flex items-center gap-1">

                                <img 
                                    src="/src/assets/OperationIcon.svg" 
                                    alt="" 
                                />

                                <h2
                                    className="font-semibold text-[18px]/[26px] tracking-[-0.18px] text-bf-primaryblack">
                                    Operating Financial Breakdown
                                </h2>

                            </div>

                            <div
                                className="flex items-center gap-2">

                                <p
                                    className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                                    Net Cash Yield
                                </p>

                                <p
                                    className="font-bold text-[14px]/[20px] text-bf-success">
                                    {formatCurrency(Number(summary?.financials.netRevenue))}
                                </p>

                            </div>
                        </div>

                        <div
                            className="flex flex-col gap-[5.5px]">

                            <div
                                className={`relative w-full h-3 rounded-xl overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.05)] ${summary?.financials.cashFlow.total === "0" ? "bg-[#FAF2EE]" : "bg-bf-error"}`}>
                                    <div
                                        className="h-full bg-bf-success"
                                        style={{width: `${Number(summary?.financials.cashFlow.inflow)}%`}}>
                                    </div>
                            </div>

                            <div
                                className="flex items-center justify-between">

                                <div
                                    className="flex items-center gap-1 text-bf-primarytext">

                                    <div
                                        className="w-2 h-2 rounded-xl bg-bf-success">
                                    </div>

                                    <p
                                        className="font-semibold text-[11px]/[14px] tracking-[0.22px]">
                                        Inflows: {summary?.financials.cashFlow.inflow}%
                                    </p>

                                </div>
                                

                                <div
                                    className="flex items-center gap-1 text-bf-primarytext">

                                    <div
                                        className="w-2 h-2 rounded-xl bg-bf-error">
                                    </div>

                                    <p
                                        className="font-semibold text-[11px]/[14px] tracking-[0.22px]">
                                        Outflows: {summary?.financials.cashFlow.outflow}%
                                    </p>

                                </div>

                            </div>

                        </div>

                        <FinancialStats 
                            summary={summary}
                        />

                        {/* {
                            isLoading ? (

                                <div
                                    className="flex flex-wrap items-start gap-2 w-full">

                                    {
                                        Array.from({ length : 4 }).map((_, index) => (

                                            <Skeleton 
                                                key={index}
                                                className='flex-1 min-w-24 h-22 px-2 pt-2 py-5.5 rounded-sm bg-[#FAF2EE] flex flex-col' 
                                            />
                                        ))
                                    }
                                </div>
                            ) : (
                                <FinancialStats 
                                    summary={summary}
                                />
                            )
                        } */}
                    </>
                )
            }

        </div>
    )
}

export default Financial