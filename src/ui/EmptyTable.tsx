

// import type { EmptyTableProps } from "./DashboardTable";

import { useNavigate } from "react-router-dom";

export interface EmptyTableProps {
    type: string;
    icon?: string;
    heading: string;
    message: string;
    action: string;
    path: string;
}

interface Props {
    emptyTable: EmptyTableProps | null;
}

function EmptyTable(
    {
        emptyTable
    } : Props
) {

    const navigate = useNavigate();

    return (
        <div
            className="bg-[#FFFFFF] p-12  w-full flex flex-col items-center justify-center gap-4 ">

            <div
                className="w-full flex flex-col items-center justify-center gap-1">

                <div
                    className="bg-[#F4ECE8] flex items-center justify-center rounded-xl w-10 h-10">

                    <img 
                        src={emptyTable?.icon} 
                        alt="" 
                    />

                </div>

                <p
                    className="font-semibold text-[14px] tracking-[-0.18] text-bf-primaryblack">
                    {emptyTable?.heading}
                </p>

                <p
                    className="font-normal text-[11px] tracking-[-0.18] text-bf-primaryblack">
                    {emptyTable?.message}
                </p>

            </div>

            <button
                onClick={(e) => {

                    e.preventDefault();

                    navigate(emptyTable?.path ?? "");
                }}
                className={`rounded-lg px-4 py-2 text-[#FFFFFF] font-bold text-[12px]/[22px] cursor-pointer ${
                    emptyTable?.type === "orders" || emptyTable?.type === "customers"
                        ? "bg-bf-primary"
                        : emptyTable?.type === "payments"
                        ? "bg-bf-success"
                        : emptyTable?.type === "expenses" && "bg-bf-error"
                }`}>
                {emptyTable?.action}
            </button>
            
        </div>
    )
}

export default EmptyTable