import type { DashboardMetrics } from "../../api/dashboard/types/dashboard";
import { getDashboardStats } from "./dashboard"

interface DashboardStatsProps {
    summary: DashboardMetrics | null;
}


function DashboardStats(
    {
        summary,
    } : DashboardStatsProps
) {

    return (
        <>

            {
                summary && (

                <div
                    className="flex flex-wrap items-start gap-4 w-full">

                        {
                            getDashboardStats(summary).map((stat) => (

                                <div
                                    key={stat.type}
                                    className="flex-1 min-w-36 p-4 rounded-lg bg-[#FFFFFF] bf-shadow flex flex-col justify-between items-start">

                                    <div
                                        className="w-full flex flex-col gap-0.5">

                                        <div
                                            className="flex items-center justify-between">

                                            <h3
                                                className={`font-semibold text-[10px]/[14px] tracking-[0.55px] text-bf-primarytext`}>
                                                {stat.title}
                                            </h3>

                                            <img 
                                                src={stat.iconPath} 
                                                alt="" 
                                                className="w-3.75 h-3.75"
                                            />

                                        </div>

                                        <h2
                                            className={`pt-1.5 font-bold text-[18px]/[40px] tracking-[-0.8px] ${stat.color === "green" || stat.type === "payment"
                                                            ? "text-bf-success"
                                                            : stat.color === "red"
                                                            ? "text-bf-error"
                                                            : stat.color === "orange"
                                                            ? "text-bf-primary"
                                                            : "text-bf-primarytext"
                                                        }`}>
                                            {stat.amount}
                                        </h2>

                                        <p
                                            className="font-semibold text-[11px]/[13px] tracking-[0.22px] text-bf-primarytextlight">
                                            {stat.desc}
                                        </p>

                                    </div>

                                    <div
                                        className="pt-4 font-semibold text-[11px]/[14px] tracking-[0.22px]">

                                            {
                                                stat.type === "order" 
                                                    ? (
                                                        <div
                                                            className="flex items-center gap-1.5">

                                                            {
                                                                stat.statuses && (

                                                                        stat?.statuses.map((status) => (

                                                                        <p
                                                                            key={status.name}
                                                                            className={`px-2 py-0.5 rounded-xl ${
                                                                                status.name === "Pending"
                                                                                    ? "text-bf-primary bg-[#FFDBCC]"
                                                                                    : status.name === "Done"
                                                                                    ? "text-bf-primaryblack bg-bf-live"
                                                                                    : status.name === "Cancelled"
                                                                                    ? "text-bf-error bg-[#FFDAD6]"
                                                                                    : null
                                                                            }`}>
                                                                            {`${status.volume}`}
                                                                        </p>
                                                                    ))
                                                                )
                                                            }

                                                        </div>
                                                    )
                                                    : (
                                                        <div
                                                            className="flex gap-1 items-center">

                                                            {
                                                                stat.type === "gross" && (

                                                                    <img 
                                                                        src={stat.trendIconPath} 
                                                                        alt="" 
                                                                        className="w-[13.33px] h-2"
                                                                    />
                                                                )
                                                            }

                                                            <p
                                                                className={`${
                                                                            stat.type === "gross"
                                                                                ? stat.color
                                                                                : stat.type === "payment"
                                                                                ? stat.color
                                                                                : stat.type === "balance"
                                                                                ? "text-bf-primarytext bg-[#FFDBCA] px-2 py-0.5 rounded-xl"
                                                                                : stat.type === "outflow"
                                                                                ? "text-bf-primarytext"
                                                                                : null
                                                                }`}>
                                                                {stat.status}
                                                            </p>

                                                        </div>
                                                    )
                                            }

                                    </div>

                                </div>
                            ))
                        }

                </div>

                )
            }
        </>
    )
}

export default DashboardStats