import { useNavigate, useParams } from "react-router-dom";


function OrderDetailView() {

    const navigate = useNavigate();

    const { orderNumber } = useParams();

    return (
        <div
            className="relative p-6 min-h-screen w-full min-w-0 flex flex-col items-start gap-6 no-scrollbar">

            <div
                className="w-full flex items-center gap-1 font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">

                <div
                    className="pr-2 flex items-center gap-1 cursor-pointer"
                    onClick={() => {
                        navigate("/orders");
                    }}>

                        <img 
                        src="/src/assets/ArrowRightIcon.svg" 
                        alt="" 
                        className="rotate-180"
                    />

                    <span
                        className="font-semibold text-[12px]/[16px] tracking-[0.12px] text-bf-primary cursor-pointer">
                        Back to Orders
                    </span>

                </div>

                <span>
                    /
                </span>

                <span>
                    Orders
                </span>

                <span>
                    /
                </span>

                <span
                    className="text-bf-primaryblack">
                    {}
                </span>

            </div>

        </div>
    )
}

export default OrderDetailView