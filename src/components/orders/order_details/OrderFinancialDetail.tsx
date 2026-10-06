import { formatCurrency } from "../../../utils/formatCurrency";




interface Props {
    originalTotal: string | undefined;
    currentTotal?: string | undefined;
    totalPaid?: string | undefined;
    totalTips?: string | undefined;
    totalRefunded?: string | undefined;
    outstanding?: string | undefined;
}

interface FinancialInfo {
    financialInfo: Props;
}


function OrderFinancialDetail(
    {
        financialInfo,
    } : FinancialInfo
) {
    return (
        <div
            className="w-full flex flex-col gap-4 p-6 rounded-lg bg-white bf-shadow">

            <div
                className="flex items-center justify-between px-4 py-2 rounded-sm bg-[#FAF2EE]">

                <p
                    className="font-bold text-[11px]/[14px] tracking-[0.55px] text-bf-primarytextlight">
                    ORDER FINANCIAL PAYMENT LEDGER
                </p>

                <p
                    className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">
                    Currency: NGN (₦)
                </p>

            </div>

            <div
                className="w-full flex items-center gap-2">

                <div
                    className="flex-1 p-2 rounded-sm bg-[#FAF2EE]">

                    <p
                        className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                        Original Total
                    </p>

                    <p
                        className="pt-0.5 font-bold text-[13px]/[18px] text-bf-primaryblack">
                        {formatCurrency(Number(financialInfo.originalTotal ?? ""))}
                    </p>

                </div>

                <div
                    className="flex-1 p-2 rounded-sm bg-[#FAF2EE]">

                    <p
                        className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                        Current Order Total
                    </p>

                    <p
                        className="pt-0.5 font-bold text-[13px]/[18px] text-bf-primary">
                        {formatCurrency(Number(financialInfo.currentTotal ?? ""))}
                    </p>

                </div>

                <div
                    className="flex-1 p-2 rounded-sm bg-bf-live">

                    <p
                        className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primaryblack">
                        Payments Received
                    </p>

                    <p
                        className="pt-0.5 font-bold text-[13px]/[18px] text-bf-success">
                        {formatCurrency(Number(financialInfo.totalPaid ?? ""))}
                    </p>

                </div>

                <div
                    className="flex-1 p-2 rounded-sm bg-[#FAF2EE]">

                    <p
                        className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                        Tips Allocated (isTip)
                    </p>

                    <p
                        className="pt-0.5 font-bold text-[13px]/[18px] text-bf-primaryblack">
                        {formatCurrency(Number(financialInfo.totalTips ?? ""))}
                    </p>

                </div>

                <div
                    className="flex-1 p-2 rounded-sm bg-[#FAF2EE]">

                    <p
                        className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                        Refunds Handled
                    </p>

                    <p
                        className="pt-0.5 font-bold text-[13px]/[18px] text-bf-primaryblack">
                        {formatCurrency(Number(financialInfo.totalRefunded ?? ""))}
                    </p>

                </div>

                <div
                    className="flex-1 p-2 rounded-sm bg-[#FFDBCC]">

                    <p
                        className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">
                        Outstanding Due
                    </p>

                    <p
                        className="pt-0.5 font-bold text-[13px]/[18px] text-bf-primary">
                        {formatCurrency(Number(financialInfo.outstanding ?? ""))}
                    </p>

                </div>

            </div>

            <div
                className="flex items-center gap-2 p-2 rounded-sm bg-[#F4ECE8]">

                <img 
                    src="/src/assets/WarningIcon.svg" 
                    alt="" 
                />

                <p
                    className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">
                    Payment status: 
                    <span className="font-bold">{financialInfo.outstanding === "0" ? "  Settled " : " Partially Settled "}</span>. 
                    Outstanding balance of 
                    <span className="font-bold">{` ${formatCurrency(Number(financialInfo.outstanding ?? ""))} `}</span> 
                    is flagged for collection.
                </p>
            </div>
        </div>
    )
}

export default OrderFinancialDetail