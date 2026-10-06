import React, { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import CustomerSelect,{ type Customer } from "../../ui/CustomerSelect"
import { GetAllCustomers } from "../../api/customers/customer";
import axios from "axios";
import { getInitials } from "../../utils/getIntitals";
import { CreateOrder, GetProducts } from "../../api/orders/order";
import  { type createOrderPayload, type ProductData } from "../../api/orders/types/orders";
import CakeItem from "./order_modal/CakeItem";
import { formatCurrency } from "../../utils/formatCurrency";
import { useLocation, useNavigate } from "react-router-dom";



interface Props {
    setOpenModal?: Dispatch<SetStateAction<boolean>>;
}

function AddOrderModal(
    {
        setOpenModal,
    } : Props
) {

    const navigate = useNavigate();
    const location = useLocation();

    const [customerId, setCustomerId] = useState<string>("")
    const [customers, setCustomers] = useState<Customer[] | null>([])
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [products, setProducts] = useState<ProductData[] | null>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedProducts, setSelectedProducts] = useState<ProductData[]>([]);
    const [categoryId, setCategoryId] = useState<string>("");

    const [payload, setPayload] = useState<createOrderPayload>({
        customerId: "",
        deliveryDate: "",
        deliveryAddress: "",
        deliveryMethod: "",
        recipientName: "",
        recipientPhone: "",
        notes: "",
        items: []
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            
        setPayload((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSelectProduct = (product: ProductData) => {

        setSelectedProducts((prev) => {

            const alreadySelected = prev.some(
                (item) => item.categoryId === product.categoryId
            );

            if (alreadySelected) {
                return prev;
            }

            return [...prev, product];
        });
    };


    const fetchAllData = async () => {

        try {

            // setIsLoading(true);

            const retrievedCustomers = await GetAllCustomers();
            const retrievedProducts = await GetProducts();

            setCustomers(retrievedCustomers.data?.customers ?? []);
            setProducts(retrievedProducts.data ?? []);

        } catch(err) {

            if (axios.isAxiosError(err)) {
                console.log(
                    err.response?.data?.message ?? "Customers retrival failed"
                );
                } else if (err instanceof Error) {
                console.log(err.message);
                } else {
                console.log("Something went wrong");
            }

        }
    };

    useEffect(() => {

        const fetchData = async () => {

            await fetchAllData();

        }

        fetchData();

    }, [])

    let customer;

    if (customerId) {
        customer = customers?.find(customer => customer.customerId === customerId);
    }

    const handleCreateOrder = async (
        payload: createOrderPayload
    ) => {

        try {

            setIsSubmitting(true);

            const response = await CreateOrder(payload);

            console.log("RESPONSE:", response);

        } catch (err) {

            if (axios.isAxiosError(err)) {
                console.log(
                    err.response?.data?.message ?? "Unable to create order"
                );
                } else if (err instanceof Error) {
                console.log(err.message);
                } else {
                console.log("Something went wrong");
            }

        } finally {

            setIsSubmitting(false);
        }
    }

    return (
        <div
            className="fixed z-20 inset-0 w-full h-full p-4 bg-[#1E1B19]/40 flex items-center justify-center">

            <div
                className="rounded-md bf-shadow w-225 flex flex-col items-start">

                <div
                    className="w-full flex justify-between px-6 py-4 bg-white rounded-t-md">

                    <div
                        className="flex flex-col gap-1">

                        <h2
                            className="font-semibold text-[24px]/[32px] tracking-[-0.36px] text-bf-primaryblack">
                            Create Order
                        </h2>

                        <p
                            className="font-normal text-[13px]/[18px] text-bf-primarytext">
                            Create a new operational order record for customers.
                        </p>

                    </div>

                    <img 
                        src="/src/assets/CancelIcon.svg" 
                        alt="" 
                        onClick={() => {

                            if (location.pathname.includes("/orders/create")) {
                                navigate("/orders");
                            } else {
                                setOpenModal?.(false);
                            }
                        }}
                        className="cursor-pointer"
                    />

                </div>

                <div
                    className="w-full p-6 bg-bf-backgroundTwo">
                        
                        <form 
                            action=""
                            className="w-full h-90 flex flex-col items-start gap-4 no-scrollbar overflow-y-auto">

                                {
                                    !customer && (

                                        <div
                                            className="w-full p-4 flex flex-col gap-1 rounded-xs bg-white bf-shadow">

                                            <label 
                                                htmlFor=""
                                                className="flex items-center gap-1">
                                                <p
                                                    className="font-semibold text-[14px]/[20px] text-bf-primaryblack">
                                                    Customer
                                                </p>
                                                <span className="text-bf-error">*</span>
                                            </label>

                                            <CustomerSelect 
                                                customers={customers}
                                                value={customerId}
                                                onChange={setCustomerId}
                                                selectCustomer={(customerId: string) => {
                                                    setPayload((prev) => ({
                                                        ...prev,
                                                        customerId: customerId,
                                                    }))
                                                }}
                                            />

                                            <small
                                                className="font-normal text-[13px]/[18px] text-bf-primarytextlight">
                                                Search existing client records by name, phone or email.
                                            </small>

                                        </div>
                                    )
                                }

                                {
                                    customer && (

                                        <div
                                            className="w-full p-4 rounded-xs bg-white bf-shadow flex items-center justify-between">

                                                <div
                                                    className="flex items-start gap-2">

                                                    <div
                                                        className="w-8 h-8 rounded-xl bg-[#FFDBCA] flex items-center justify-center">

                                                        <p
                                                            className="font-bold text-[14px]/[20px] text-[#331200]">
                                                            {getInitials(customer.name)}
                                                        </p>

                                                    </div>

                                                    <div
                                                        className="flex flex-col items-start">

                                                        <div
                                                            className="flex items-center gap-1">
                                                            <p
                                                                className="font-bold text-[14px]/[20px] text-bf-primaryblack">
                                                                {customer.name}
                                                            </p>

                                                            <img src="/src/assets/VerifiedIcon.svg" alt="" />
                                                        </div>

                                                        <div
                                                            className="flex items-center gap-1.5">

                                                            <img src="/src/assets/PhoneIcon.svg" alt="" />

                                                            <p
                                                                className="font-normal text-[13px]/[18px] text-bf-primarytext">
                                                                {customer.phone}
                                                            </p>

                                                        </div>

                                                        <div
                                                            className="flex items-center gap-1.5">

                                                            <img src="/src/assets/EnvelopeIcon.svg" alt="" />

                                                            <p
                                                                className="font-normal text-[13px]/[18px] text-bf-primarytext">
                                                                {customer.email}
                                                            </p>

                                                        </div>
                                                    </div>

                                                </div>

                                                <button
                                                    onClick={() => setCustomerId("")}
                                                    className="px-2 py-1 rounded-xs bg-[#F4ECE8] font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primary cursor-pointer">
                                                    Change Client
                                                </button>

                                        </div>
                                    )
                                }

                                <div
                                    className="w-full flex flex-col items-start gap-4 p-4 bg-white rounded-xs bf-shadow">

                                    <div
                                        className="w-full flex items-center gap-1">
                                        
                                        <img 
                                            src="/src/assets/DeliverTwoIcon.svg" 
                                            alt="" 
                                        />

                                        <p
                                            className="font-semibold text-[12px]/[16px] text-bf-primaryblack">
                                            ORDER SCHEDULE & DELIVERY DETAILS
                                        </p>
                                    </div>

                                    <div
                                        className="w-full flex flex-start gap-4">

                                        <div
                                            className="flex-1 w-full flex flex-col gap-1">

                                            <label 
                                                htmlFor=""
                                                className="font-medium text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext flex items-center gap-1">
                                                <p>
                                                    Delivery Date & Time
                                                </p>
                                                <span className="text-bf-error">*</span>
                                            </label>

                                            <div
                                                className="p-2 rounded-xs bg-bf-backgroundTwo flex items-center">

                                                <img 
                                                    src="/src/assets/CalendarTwoIcon.svg" 
                                                    alt="" 
                                                    className="pr-2"
                                                />

                                                <input 
                                                    type="datetime-local" 
                                                    name="deliveryDate"
                                                    value={payload.deliveryDate} 
                                                    id="" 
                                                    className="w-full outline-none font-medium text-[13px]/[18px] text-bf-primaryblack cursor-pointer appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                                    onChange={handleInputChange}
                                                />

                                            </div>

                                        </div>

                                        <div
                                            className="flex-1 w-full flex flex-col gap-1">

                                            <label 
                                                htmlFor=""
                                                className="font-medium text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext flex items-center gap-1">
                                                <p>
                                                    Delivery Method
                                                </p>
                                                <span className="text-bf-error">*</span>
                                            </label>

                                            <div
                                                className="w-full p-2 rounded-xs bg-bf-backgroundTwo flex items-start cursor-pointer">

                                                <select 
                                                    name="deliveryMethod" 
                                                    id=""
                                                    value={payload.deliveryMethod}
                                                    onChange={handleInputChange}
                                                        className="w-full font-medium text-[13px]/[18px] text-bf-primaryblack outline-none">

                                                        <option 
                                                            value="PICKUP"
                                                            className="cursor-pointer">
                                                                PICKUP
                                                        </option>
                                                        <option 
                                                            value="DELIVERY"
                                                            className="cursor-pointer">
                                                                DELIVERY
                                                        </option>
                                                </select>

                                            </div>
                                        </div>

                                    </div>

                                    <div
                                        className="w-full flex flex-start gap-4">

                                        <div
                                            className="flex-1 w-full flex flex-col gap-1">

                                            <label 
                                                htmlFor=""
                                                className="font-medium text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext flex items-center gap-1">
                                                <p>
                                                    Recipient Name
                                                </p>
                                                <span className="text-bf-error">*</span>
                                            </label>

                                            <div
                                                className="p-2 rounded-xs bg-bf-backgroundTwo flex items-center">

                                                <input 
                                                    type="text" 
                                                    name="recipientName" 
                                                    value={payload.recipientName}
                                                    id="" 
                                                    placeholder="e.g. John Doe"
                                                    className="w-full outline-none font-normal text-[13px] text-bf-primarytextlight cursor-pointer"
                                                    onChange={handleInputChange}
                                                />

                                            </div>

                                        </div>

                                        <div
                                            className="flex-1 w-full flex flex-col gap-1">

                                            <label 
                                                htmlFor=""
                                                className="font-medium text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext flex items-center gap-1">
                                                <p>
                                                    Recipient Phone
                                                </p>
                                                <span className="text-bf-error">*</span>
                                            </label>

                                            <div
                                                className="p-2 rounded-xs bg-bf-backgroundTwo flex items-center">

                                                <input 
                                                    type="text" 
                                                    name="recipientPhone" 
                                                    value={payload.recipientPhone}
                                                    id="" 
                                                    placeholder="e.g. 08000000000"
                                                    className="w-full outline-none font-normal text-[13px] text-bf-primarytextlight cursor-pointer"
                                                    onChange={handleInputChange}
                                                />

                                            </div>
                                        </div>

                                    </div>

                                    <div
                                        className="w-full flex flex-col gap-1">

                                        <label 
                                            htmlFor=""
                                            className="font-medium text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">
                                            Delivery Address
                                        </label>

                                        <div
                                            className="p-2 rounded-xs bg-bf-backgroundTwo flex items-center">

                                            <img 
                                                src="/src/assets/LocationIcon.svg" 
                                                alt="" 
                                                className="pr-2"
                                            />

                                            <input 
                                                type="text" 
                                                name="deliveryAddress" 
                                                value={payload.deliveryAddress}
                                                id="" 
                                                placeholder="e.g. 14B Admiralty Way, Lekki Phase 1, Lagos"
                                                className="w-full outline-none font-normal text-[13px] text-bf-primarytextlight cursor-pointer"
                                                onChange={handleInputChange}
                                            />

                                        </div>

                                    </div>

                                    <div
                                        className="w-full flex flex-col gap-1">

                                        <label 
                                            htmlFor=""
                                            className="font-medium text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">
                                            Delivery Notes
                                        </label>

                                        <div
                                            className="p-2 rounded-xs bg-bf-backgroundTwo flex items-start">

                                            <input 
                                                type="text" 
                                                name="notes" 
                                                value={payload.notes}
                                                id=""
                                                placeholder="Internal notes regarding preparation, dispatch, or packaging"
                                                className="w-full outline-none font-normal text-[13px] text-bf-primarytextlight cursor-pointer" 
                                                onChange={handleInputChange}
                                            />

                                        </div>

                                    </div>

                                </div>

                                {
                                    selectedProducts && 
                                    selectedProducts.some(product => product.name === "Cake") 
                                    && (
                                        <CakeItem 
                                            payload={payload}
                                            setPayload={setPayload}
                                            categoryId={categoryId}
                                        />
                                    )
                                }

                                <div
                                    className="relative w-full">

                                    <button
                                        onClick={
                                            (e) => {

                                                e.preventDefault();

                                                console.log(products);

                                                setIsOpen((prev) => !prev);
                                            }
                                        }
                                        className="px-4 py-1.5 rounded-xs bg-[#FFDBCA] bf-shadow flex items-center justify-center gap-1 cursor-pointer">

                                        <img 
                                            src="/src/assets/AddRoundColorIcon.svg" 
                                            alt="" 
                                        />

                                        <p
                                            className="font-bold text-[12px]/[16px] tracking-[0.12px] text-[#331200]">
                                            Add Product Category
                                        </p>

                                    </button>

                                    {isOpen && (
                                        <div 
                                            className="absolute left-0 top-full z-50 mt-1 w-46 overflow-hidden rounded-xs border-bf-border bg-white bf-shadow cursor-pointer">

                                            {/* Results */}

                                            <div 
                                                className="max-h-60 overflow-y-auto no-scrollbar">

                                                {products && products?.length > 0 ? (
                                                    products?.map((product) => {

                                                        // const isSelected = customer.customerId === value;

                                                        return (
                                                            <button
                                                                key={product.categoryId}
                                                                type="button"
                                                                onClick={
                                                                    () => {
                                                                        handleSelectProduct(product);

                                                                        setCategoryId(product.categoryId);

                                                                        setIsOpen(false);
                                                                    }
                                                                }
                                                                className={`w-full px-4 py-2 text-left flex items-center justify-between hover:bg-bf-backgroundTwo cursor-pointer`}
                                                            >
                                                                <div className="min-w-0">
                                                                    <p 
                                                                        className="font-medium text-[14px] text-bf-primaryblack truncate">
                                                                        {product.name}
                                                                    </p>
                                                                </div>
                                                            </button>
                                                        );
                                                    })
                                                ) : (
                                                    <div className="px-4 py-5 text-center">
                                                        <p className="text-[13px] text-bf-primarytextlight">
                                                            No products found.
                                                        </p>
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    )}

                                </div>

                        </form>
                </div>

                <div
                    className="w-full flex items-center justify-between px-8 py-4 bg-white border-t border-[#F4ECE8] rounded-b-md">

                        <div
                            className="flex items-center gap-6">

                            <div
                                className="">

                                <p
                                    className="font-semibold text-[11px]/[14px] tracking-[0.55px] text-bf-primarytextlight">
                                    CONFIGURATION OVERVIEW
                                </p>

                                <div
                                    className="font-semibold text-[14px]/[20px] text-bf-primaryblack flex items-center gap-1">
                                    <span>{selectedProducts.length} Categories </span>
                                    <span className="w-1.25 h-1.25 rounded-full bg-bf-primaryblack"/>
                                    <span>{payload.items.length} Configured Items</span>
                                </div>
                                
                            </div>

                            <div
                                className="w-px h-8 bg-[#E9E1DD]"
                            />

                            <div>

                                <p
                                    className="font-semibold text-[11px]/[14px] tracking-[0.55px] text-bf-primarytextlight">
                                    COMBINED ORDER GROSS
                                </p>

                                <h3
                                    className="font-bold text-[24px]/[28px] tracking-[-0.48px] text-bf-primary">
                                    {formatCurrency(
                                        payload.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
                                    )} 
                                    <span className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">NGN</span>
                                </h3>

                            </div>

                        </div>

                        <div
                            className="flex items-center gap-2">

                            <button
                                onClick={(e) => {
                                    e.preventDefault();

                                    if (location.pathname.includes("/orders/create")) {
                                        navigate("/orders");
                                    } else {
                                        setOpenModal?.(false);
                                    }
                                }}
                                className="px-6 py-2 rounded-sm bg-white font-semibold text-[14px]/[20px] text-bf-primaryblack bf-shadow cursor-pointer">
                                Cancel
                            </button>

                            <button
                                onClick={(e) => {

                                    e.preventDefault();

                                    console.log(payload);

                                    handleCreateOrder(payload);
                                }}
                                disabled={isSubmitting}
                                className="px-6 py-2 rounded-sm bg-bf-primary font-semibold text-[14px]/[20px] text-white flex items-center gap-1 bf-shadow cursor-pointer disabled:bg-[#F7EFEB] disabled:text-[#B0AAA7] disabled:cursor-not-allowed">

                                <img 
                                    src="/src/assets/RoundTickIcon.svg" 
                                    alt="" 
                                />

                                <p>
                                    {isSubmitting ? "...Creating Order" :"Create Order"}
                                </p>

                            </button>

                        </div>

                </div>

            </div>
        </div>
    )
}

export default AddOrderModal