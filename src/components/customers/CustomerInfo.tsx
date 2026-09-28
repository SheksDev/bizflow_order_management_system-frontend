import type { CustomerData } from "../../api/customers/types/customers";


interface Props {
    customer: CustomerData | null;
}

function CustomerInfo(
    {
        customer
    } : Props
) {
    return (
        <div
            className="shrink-0 min-w-70 flex flex-col items-start gap-4 p-6 rounded-lg bg-white bf-shadow">

            <div
                className="shrink-0 w-full flex items-center justify-between">

                <div
                    className="flex items-center gap-2">

                    <img 
                        src="/src/assets/InfoIcon.svg" 
                        alt="" 
                    />

                    <h3
                        className="font-semibold text-[16px]/[24px] text-bf-primaryblack">
                        Customer Information
                    </h3>

                </div>

                <span
                    className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primary cursor-pointer">
                    Edit
                </span>

            </div>

            <div
                className="shrink-0 w-full flex flex-col items-center gap-2">

                <div
                    className="w-full flex flex-col gap-0.5 p-2 rounded-sm bg-[#FAF2EE]">

                    <p
                        className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                        DIRECT PHONE
                    </p>

                    <div
                        className="pt-0.5 flex items-center justify-between">

                        <span
                            className="font-semibold text-[14px]/[20px] text-bf-primaryblack">
                            {customer?.phone}
                        </span>

                        <div
                            className="flex items-center gap-2">

                            <img 
                                src="/src/assets/ClipboardIcon.svg" 
                                alt="" 
                            />
                            

                            <img 
                                src="/src/assets/PhoneIcon.svg" 
                                alt="" 
                            />

                        </div>

                    </div>
                    
                </div>

                <div
                    className="w-full flex flex-col gap-0.5 p-2 rounded-sm bg-[#FAF2EE]">

                    <p
                        className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                        EMAIL ADDRESS
                    </p>

                    <div
                        className="flex items-center justify-between">

                        <span
                            className="font-medium text-[13px]/[18px] text-bf-primaryblack">
                            {customer?.email}
                        </span>

                        <div>

                            <img 
                                src="/src/assets/ClipboardIcon.svg" 
                                alt="" 
                            />

                        </div>

                    </div>
                    
                </div>

                <div
                    className="w-full flex flex-col gap-1 p-2 rounded-sm bg-[#FAF2EE]">

                    <p
                        className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                        PRIMARY DELIVERY ADDRESS
                    </p>

                    <p
                        className="font-semibold text-[14px]/[20px] text-bf-primaryblack">
                        {customer?.defaultAddress}
                    </p>
                    
                </div>

            </div>

            <div
                className="w-full flex flex-col gap-1.25 p-2 rounded-sm bg-[#F4ECE8]">

                <div
                    className="flex items-center gap-1.5">

                    <img 
                        src="/src/assets/NotesIcon.svg" 
                        alt="" 
                    />

                    <p
                        className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primary">
                        Customer Notes
                    </p>

                </div>

                <p
                    className="font-normal text-[13px]/[21.1px] text-bf-primarytext italic">
                    {`"${customer?.notes}"`}
                </p>
                
            </div>

        </div>
    )
}

export default CustomerInfo