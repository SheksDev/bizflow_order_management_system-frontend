import { getInitials } from "../../../utils/getIntitals";




interface Props {
    customerId: string | undefined;
    name?: string | undefined;
    phone?: string | undefined;
    email?: string | undefined;
}

interface CustomerInfo {
    customerInfo: Props;
}


function OrderCustomerDetail(
    {
        customerInfo,
    } : CustomerInfo
) {
    return (
        <div
            className="flex-1 w-full p-4 rounded-lg bg-white bf-shadow">

                <div
                    className="flex flex-col gap-2">

                    <div
                        className="flex items-center justify-between px-4 py-2 rounded-sm bg-[#FAF2EE]">

                        <p
                            className="font-bold text-[11px]/[14px] tracking-[0.55px] text-bf-primarytextlight">
                            CUSTOMER PROFILE
                        </p>

                        <p
                            className="font-bold text-[11px]/[14px] tracking-[0.55px] text-bf-primary">
                            {`#${customerInfo.customerId}`}
                        </p>

                    </div>

                    <div
                        className="flex items-center gap-2">

                        <div
                            className="w-12 h-12 rounded-xl bg-[#FFDBCA] font-bold text-[18px]/[26px] tracking-[-0.18px] text-[#331200] flex items-center justify-center">
                            
                            <p>
                                {getInitials(customerInfo.name ?? "")}
                            </p>

                        </div>

                        <div>
                            
                            <p
                                className="font-bold text-[16px]/[24px] text-bf-primaryblack">
                                {customerInfo.name}
                            </p>

                            <p
                                className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                                Artisanal Client
                            </p>

                        </div>
                    
                    </div>

                    <div
                        className="flex flex-col gap-1.5 pt-2">

                        <div
                            className="flex items-center gap-2">

                            <img 
                                src="/src/assets/PhoneIcon.svg" 
                                alt="" 
                            />

                            <p
                                className="font-semibold text-[13px]/[18px] text-bf-primaryblack">
                                {customerInfo.phone}
                            </p>

                        </div>
                        

                        <div
                            className="flex items-center gap-2">

                            <img 
                                src="/src/assets/EnvelopeIcon.svg" 
                                alt="" 
                            />

                            <p
                                className="font-normal text-[13px]/[18px] text-bf-primarytext">
                                {customerInfo.email}
                            </p>

                        </div>

                    </div>

                </div>

                <div
                    className="pt-4">

                    <button
                        className="w-full px-4 py-2 rounded-md bg-[#F4ECE8] font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primaryblack cursor-pointer">
                        View Customer Profile
                    </button>

                </div>

        </div>
    )
}

export default OrderCustomerDetail