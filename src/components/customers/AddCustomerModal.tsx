import React, { useState, type Dispatch, type SetStateAction } from "react";
import type  { CreateCustomerPayload } from "../../api/customers/types/customers";
import { AddCustomer, EditCustomer } from "../../api/customers/customer";
import type { Info } from "./CustomerCreationToast";
import { useLocation, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

interface Props {
    setOpenModal?: Dispatch<SetStateAction<boolean>>;
    setLoading?: Dispatch<SetStateAction<boolean>>;
    newCustomer?: Dispatch<SetStateAction<Info>>;
    loading?: boolean;
    refetchCustomers?: () => void;
    refetchCustomer?: () => void;
    toast?: Dispatch<SetStateAction<boolean>>;
    editValues?: CreateCustomerPayload | null;
    customerId?: string;
}

function AddCustomerModal(
    {
        setOpenModal,
        loading,
        setLoading,
        refetchCustomers,
        refetchCustomer,
        toast,
        newCustomer,
        editValues,
        customerId,
    } : Props
) {

    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState<CreateCustomerPayload>({
        name: editValues?.name ?? "",
        phone: editValues?.phone ?? "",
        email: editValues?.email ?? "",
        address: editValues?.address ?? "",
        notes: editValues?.notes ?? ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSaveEditCustomer = async (customerId?: string) => {

        try {

            setLoading?.(true);

            if (!editValues) {

                console.log(formData);

                const response = await AddCustomer(formData);

                console.log(response);

                refetchCustomers?.();

                setOpenModal?.(false);

                newCustomer?.(() => ({
                    name: response.data.name,
                    id: response.data.customerId,
                }))

            } else {

                console.log(formData);

                const response = await EditCustomer(customerId ?? "", formData);

                console.log(response);

                refetchCustomer?.();

                setOpenModal?.(false);

                newCustomer?.(() => ({
                    name: response.data.name,
                    id: response.data.customerId,
                }))

            }

            toast?.(true);

        } catch (err: unknown) {

            console.log(err);

        } finally {

            setLoading?.(false);
        }
    }

    return (
        <div
            className="fixed z-20 inset-0 w-full h-full p-4 bg-[#1E1B19]/40 flex items-center justify-center">
            
            <div
                className="rounded-md bg-white bf-shadow w-xl p-6 flex flex-col items-start">

                <div
                    className="w-full flex justify-between pb-6">

                    <div
                        className="flex flex-col gap-1">

                        <h2
                            className="font-semibold text-[24px]/[32px] tracking-[-0.36px] text-bf-primaryblack">
                            Add Customer
                        </h2>

                        <p
                            className="font-normal text-[13px]/[18px] text-bf-primarytext">
                            Create a new operational customer record for orders.
                        </p>

                    </div>

                    <img 
                        src="/src/assets/CancelIcon.svg" 
                        alt="" 
                        onClick={() => {

                            if (location.pathname.includes("/customers/create")) {
                                navigate("/customers")
                            } else {
                                setOpenModal?.(false)
                            }
                        }}
                        className="cursor-pointer"
                    />

                </div>

                <div
                    className="flex items-start gap-2 p-2 rounded-md bg-[#F4ECE8] mb-4">

                    <img 
                        src="/src/assets/WarningIcon.svg" 
                        alt="" 
                    />

                    <p
                        className="font-normal text-[13px]/[21.1px] text-bf-primarytext">
                        New customer records are immediately available for active order creation and ledger tracking.
                    </p>
                </div>

                <form
                    id="add-customer"
                    onSubmit={(e) => {

                        e.preventDefault();

                        handleSaveEditCustomer(customerId ?? "");
                    }}
                    className="w-full h-60 no-scrollbar overflow-y-auto flex flex-col items-center gap-4">

                        <div
                            className="w-full flex flex-col items-start gap-1">

                                <label 
                                    htmlFor=""
                                    className="flex gap-1 items-start font-semibold text-[12px]/[16px] tracking-[0,12px] text-bf-primaryblack">
                                    Customer Full Name 
                                    <span
                                        className="text-bf-error">
                                        *
                                    </span>
                                </label>

                                <div
                                    className="w-full px-4 py-2.25 rounded-md bg-white bf-shadow text-bf-primarytextlight font-normal text-[14px]">

                                    <input 
                                        name="name"
                                        type="text" 
                                        value={formData.name ?? ""}
                                        className="w-full outline-none"
                                        placeholder="e.g Acme Corps"
                                        onChange={(e) => handleInputChange(e)}
                                    />

                                </div>

                                <span
                                    className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                                    Official name for order packing slips and invoices.
                                </span>
                            
                        </div>

                        <div
                            className="w-full flex items-center gap-4">

                            <div
                                className="w-full flex flex-col items-start gap-1">

                                <label 
                                    htmlFor=""
                                    className="flex gap-1 items-start font-semibold text-[12px]/[16px] tracking-[0,12px] text-bf-primaryblack">
                                        Phone Number
                                        <span
                                            className="text-bf-error">
                                            *
                                        </span>
                                </label>

                                <div
                                    className="w-full px-4 py-2.25 rounded-md bg-bf-backgroundTwo bf-shadow text-bf-primarytextlight font-normal text-[14px]">

                                    <input 
                                        name="phone"
                                        type="tel"
                                        value={formData.phone ?? ""}
                                        className="w-full outline-none"
                                        placeholder="+234 800 000 0000" 
                                        onChange={handleInputChange}
                                    />

                                </div>

                                <span
                                    className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                                    Primary contact for delivery
                                </span>

                            </div>
                            

                            <div
                                className="w-full flex flex-col items-start gap-1">

                                <label 
                                    htmlFor=""
                                    className="flex gap-1 items-start font-semibold text-[12px]/[16px] tracking-[0,12px] text-bf-primaryblack">
                                        Email Address
                                </label>

                                <div
                                    className="w-full px-4 py-2.25 rounded-md bg-bf-backgroundTwo bf-shadow text-bf-primarytextlight font-normal text-[14px]">

                                    <input 
                                        name="email"
                                        type="email"
                                        value={formData.email ?? ""}
                                        className="w-full outline-none"
                                        placeholder="name@domain.com"
                                        onChange={handleInputChange} 
                                    />

                                </div>

                                <span
                                    className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                                    For electronic receipts & newsletter
                                </span>

                            </div>

                        </div>

                        <div
                            className="w-full flex flex-col items-start gap-1">

                            <label 
                                htmlFor=""
                                className="flex gap-1 items-start font-semibold text-[12px]/[16px] tracking-[0,12px] text-bf-primaryblack">
                                    Delivery Address
                                    <span
                                        className="text-bf-error">
                                        *
                                    </span>
                            </label>

                            <div
                                className="w-full h-18 px-4 py-4 rounded-md bg-bf-backgroundTwo bf-shadow text-bf-primarytextlight font-normal text-[14px]">

                                <textarea  
                                    name="address"
                                    value={formData.address ?? ""}
                                    className="w-full h-full outline-none resize-none"
                                    placeholder="e.g 12B Admiralty Way, Lekki Phase 1, Lagos, Nigeria"
                                    onChange={handleInputChange}
                                />

                            </div>

                            <span
                                className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                                Primary delivery destination
                            </span>

                        </div>

                        <div
                            className="w-full flex flex-col items-start gap-1">

                            <label 
                                htmlFor=""
                                className="font-semibold text-[12px]/[16px] tracking-[0,12px] text-bf-primaryblack">
                                    Notes
                            </label>

                            <div
                                className="w-full h-23 px-4 py-4 rounded-md bg-bf-backgroundTwo bf-shadow text-bf-primarytextlight font-normal text-[14px]">

                                <textarea  
                                    name="notes"
                                    value={formData.notes ?? ""}
                                    className="w-full h-full outline-none resize-none"
                                    placeholder="e.g Allergy to nuts."
                                    onChange={handleInputChange}
                                />

                            </div>

                            <span
                                className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                                Customer specific notes, preferences
                            </span>

                        </div>

                </form>

                <div
                    className="w-full mt-4 flex items-end justify-end">

                    <div
                        className="pt-2 flex items-center gap-2 justify-end">

                        <button
                            type="button"
                            onClick={() => {
                                
                                if (location.pathname.includes("/customers/create")) {
                                    navigate("/customers")
                                } else {
                                    setOpenModal?.(false)
                                }
                            }}
                            className="px-6 py-2 rounded-md text-bf-primarytext font-semibold text-[14px]/[20px] text-center cursor-pointer">
                            Cancel
                        </button>

                        <button
                            form="add-customer"
                            type="submit"
                            disabled={!formData.name || !formData.phone || !formData.email || !formData.address || loading}
                            className="flex gap-1 items-center px-6 py-2 rounded-md bg-bf-primary bf-shadow text-white disabled:bg-[#F7EFEB] disabled:text-[#B0AAA7] cursor-pointer disabled:cursor-not-allowed">

                            <img 
                                src="/src/assets/TickWhiteIcon.svg" 
                                alt="" 
                            />

                            <span
                                className="font-semibold text-[14px]/[20px] text-center">
                                {!loading ? "Save Customer" : "Saving..."}
                            </span>

                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default AddCustomerModal