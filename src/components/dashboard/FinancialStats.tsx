import type { DashboardMetrics } from '../../api/dashboard/types/dashboard';
import { getFinancialStats } from './dashboard'


interface DashboardStatsProps {
    summary: DashboardMetrics | null;
}

function FinancialStats(
    {
        summary
    } : DashboardStatsProps
) {
    return (
        <>
            {
                summary && (

                    <div
                        className="flex flex-wrap items-start gap-2 w-full">

                        {
                            getFinancialStats(summary).map((stat) => (

                                <div
                                    key={stat.type}
                                    className='flex-1 min-w-24 px-2 pt-2 py-5.5 rounded-sm bg-[#FAF2EE] flex flex-col'>

                                    <p
                                        className={`font-medium text-[11px]/[14px] tracking-[0.22px] ${
                                            stat.type === "gross"
                                                ? "text-bf-primarytext"
                                                : stat.type === "inflow"
                                                ? "text-bf-success"
                                                : stat.type === "outflow"
                                                ? "text-bf-error"
                                                : "text-bf-primary"
                                        }`}>
                                        {stat.title}
                                    </p>

                                    <p
                                        className={`pt-0.5 font-bold text-[16px]/[24px] ${
                                            stat.type === "gross"
                                                ? "text-bf-primaryblack"
                                                : stat.type === "inflow"
                                                ? "text-bf-success"
                                                : stat.type === "outflow"
                                                ? "text-bf-error"
                                                : "text-bf-primary"
                                        }`}>
                                        {stat.amount}
                                    </p>

                                    <div
                                        className='flex items-center justify-between pt-1'>

                                        {

                                            stat.desc.map((desc, index) => (

                                                <p
                                                    key={index}
                                                    className='font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight'>
                                                    {desc}
                                                </p>
                                            ))

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

export default FinancialStats