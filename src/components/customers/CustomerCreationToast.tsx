import type { Dispatch, SetStateAction } from "react";

export type Info = {
    name: string,
    id: string,
};

interface Props {
    customerInfo: Info | null;
    close: Dispatch<SetStateAction<boolean>>;
    isEdit?: boolean;
    open: boolean;
}

function CustomerCreationToast(
    {
        customerInfo,
        close,
        isEdit,
        open,
    } : Props
) {

    return (
        <div
            className={`w-md absolute z-50 top-5 right-5 flex items-start gap-4 p-4 rounded-lg bg-white border-l-4 border-bf-primary bf-shadow transition-all duration-500 ease-in-out ${
                open
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 translate-x-20 scale-90 blur-sm pointer-events-none"
            }`}>

            <div
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-bf-success/15">

                <img 
                    src="/src/assets/SuccessTickIcon.svg" 
                    alt="" 
                />

            </div>
            
            <div
                className="w-full flex-1 flex flex-col items-start">

                <div
                    className="w-full pb-1 flex items-center justify-between">

                    <p
                        className="font-semibold text-[11px]/[14px] tracking-[0.55px] text-bf-success">
                        CUSTOMER {!isEdit ? "ADDED" : "EDITED"} SUCCESSFULLY
                    </p>

                    <span
                        className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                        Just now
                    </span>

                </div>

                <h3
                    className="font-semibold text-[16px]/[20px] text-bf-primaryblack">
                    {customerInfo?.name}
                </h3>

                <p
                    className="pt-0.5 font-normal text-[13px]/[18px] text-bf-primarytext flex items-center gap-1">
                    Assigned record

                    <span
                        className="text-bf-primary">
                        {`#${customerInfo?.id}`}
                    </span>
                </p>

                <div
                    className="pt-4 flex items-center gap-2">

                    <button
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-sm bg-bf-primary">

                        <img 
                            src="/src/assets/OrderWhiteIcon.svg" 
                            alt="" 
                        />

                        <span
                            className="font-semibold text-[12px]/[16px] tracking-[0.12px] text-white cursor-pointer">
                            Create Order
                        </span>

                    </button>

                    <button
                        className="px-4 py-1.5 rounded-sm bg-[#F4ECE8] font-semibold text-[12px]/[16px] tracking-[0.12px] text-bf-primaryblack text-center cursor-pointer">
                        View Profile
                    </button>

                </div>

            </div>

            <div
                className="flex items-center cursor-pointer"
                onClick={() => close(false)}>
                <img 
                    src="/src/assets/CancelIcon.svg" 
                    alt="" 
                />
            </div>

        </div>
        
    )
}

export default CustomerCreationToast