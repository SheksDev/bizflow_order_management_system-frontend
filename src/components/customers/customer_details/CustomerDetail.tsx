import type { CustomerData } from "../../../api/customers/types/customers";
import { formatDateTime } from "../../../utils/formatDateTime";
import { getInitials } from "../../../utils/getIntitals";


interface DetailProps {
    customer: CustomerData | null;
    editCustomer: () => void;
}


function CustomerDetail(
    {
        customer,
        editCustomer,
    } : DetailProps
) {

    return (
        <div
            className="w-full flex items-center justify-between gap-8 p-6 rounded-lg bg-white bf-shadow">

            {
                customer && (

                    <div
                        className="min-w-0 flex-1 flex items-center gap-4">

                        <div
                            className="shrink-0 w-16 h-16 flex items-center justify-center rounded-xl bg-bf-primary text-white">

                            <span
                                className="font-semibold text-[24px]/[32px] tracking-[-0.6px]">
                                {getInitials(customer.name)}
                            </span>

                        </div>

                        <div
                            className="min-w-0">

                            <div
                                className="flex items-center gap-2 ">
                                
                                <p
                                    className="whitespace-nowrap font-semibold text-[24px]/[32px] tracking-[-0.36px] text-bf-primaryblack">
                                    {customer.name}
                                </p>

                                <p
                                    className="shrink-0 whitespace-nowrap px-2 py-0.5 rounded-md bg-[#F4ECE8] text-bf-primarytext font-semibold text-[11px]/[14px] tracking-[0.55px]">
                                    {`#${customer.customerId}`}
                                </p>

                                <p
                                    className="shrink-0 whitespace-nowrap px-2 py-0.5 rounded-md bg-bf-live text-bf-primaryblack font-semibold text-[11px]/[14px] tracking-[0.22px]">
                                    {`${"Active"} Client`}
                                </p>

                            </div>

                            <p
                                className="pt-0.5 font-normal text-[14px]/[20px] text-bf-primarytext">
                                Operational records, contact details, and associated order history for {customer.name}
                            </p>

                            <p
                                className="whitespace-nowrap pt-1 font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                                Client since {formatDateTime(customer.createdAt).date}
                            </p>

                        </div>

                    </div>
                )
            }

            <div
                className="shrink-0 flex items-center gap-2">

                <button
                    onClick={editCustomer}
                    className="shrink-0 flex items-center justify-center gap-1.5 px-4 py-2 bg-[#FAF2EE] bf-shadow font-semibold text-[14px]/[20px] text-bf-primaryblack rounded-md cursor-pointer">

                    <img 
                        src="/src/assets/EditIcon.svg" 
                        alt="" 
                    />

                    <span>
                        Edit Customer
                    </span>

                </button>
                

                <button
                    className="shrink-0 flex items-center justify-center gap-1.5 px-4 py-2 bg-bf-primary bf-shadow font-semibold text-[14px]/[20px] text-white rounded-md cursor-pointer">

                    <img 
                        src="/src/assets/AddIcon.svg" 
                        alt="" 
                    />

                    <span>
                        Create Order
                    </span>

                </button>

            </div>

        </div>
    )
}

export default CustomerDetail