import { useEffect, useState } from "react";
import { Skeleton, TableSkeleton } from "../../ui/Skeleton";
import CustomerDetail from "./CustomerDetail"
import CustomerOrderSummary from "./CustomerSummary";
import type { CreateCustomerPayload, CustomerData } from "../../api/customers/types/customers";
import { GetCustomer } from "../../api/customers/customer";
import axios from "axios";
import CustomerInfo from "./CustomerInfo";
import CustomerHistory from "./CustomerHistory";
import { useParams, useNavigate } from "react-router-dom";
import AddCustomerModal from "./AddCustomerModal";
import CustomerCreationToast from "./CustomerCreationToast";


function CustomerDetailView() {

    const [isLoading, setIsLoading] = useState(false);
    const [customer, setCustomer] = useState<CustomerData | null>(null);
    const [editValues, setEditValues] = useState<CreateCustomerPayload | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [openModal, setOPenModal] = useState<boolean>(false);
    const [notification, setNotification] = useState<boolean>(false);
    const [toastInfo, setToastInfo] = useState({
        name: "",
        id: "",
    })

    const navigate = useNavigate();

    const { customerId } = useParams();


    const fetchCustomer = async () => {

        if(!customerId) return;

        try {

            setIsLoading(true);

            const customer = await GetCustomer(customerId ?? "");

            // console.log(customer.data);
            setCustomer(customer.data);

        } catch(err) {

            if (axios.isAxiosError(err)) {
                console.log(
                    err.response?.data?.message ?? "Failed to load customer"
                );
                } else if (err instanceof Error) {
                console.log(err.message);
                } else {
                console.log("Something went wrong");
            }

        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {

        const handleFetchCustomer = async () => {

            await fetchCustomer();
        }

        handleFetchCustomer();

    }, [])

    const handleEditCustomer = () => {
        
        setEditValues(() => ({
            name: customer?.name ?? "",
            phone: customer?.phone ?? "",
            email: customer?.email ?? "",
            address: customer?.defaultAddress ?? "",
            notes: customer?.notes ?? "",
        }));

        setIsEditing(true);
        setOPenModal(true);
    }

    return (
        <div
            className="absolute z-10 p-6 min-h-screen w-full min-w-0 flex flex-col items-start gap-6 no-scrollbar bg-bf-background">

            <CustomerCreationToast 
                customerInfo={toastInfo}
                close={setNotification}
                isEdit={isEditing}
                open={notification}
            />

            {
                openModal && (

                    <AddCustomerModal
                        setOpenModal={setOPenModal}
                        loading={isLoading}
                        setLoading={setIsLoading}
                        editValues={editValues}
                        toast={setNotification}
                        newCustomer={setToastInfo}
                        refetchCustomer={fetchCustomer}
                        customerId={customer?.customerId}
                    />
                )
            }
            
            <div
                className="w-full flex items-center gap-1 font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">

                <div
                    className="pr-2 flex items-center gap-1 cursor-pointer"
                    onClick={() => {
                        navigate("/customers");
                    }}>

                        <img 
                        src="/src/assets/ArrowRightIcon.svg" 
                        alt="" 
                        className="rotate-180"
                    />

                    <span
                        className="font-semibold text-[12px]/[16px] tracking-[0.12px] text-bf-primary cursor-pointer">
                        Back to Customers
                    </span>

                </div>

                <span>
                    /
                </span>

                <span>
                    Customers
                </span>

                <span>
                    /
                </span>

                <span
                    className="text-bf-primaryblack">
                    {customer?.name}
                </span>

            </div>

            {
                isLoading  ? (

                    <div
                        className="w-full flex flex-wrap items-start gap-4">
                        <div
                            className="flex-1 min-w-36 rounded-lg bg-white flex flex-col items-start gap-4 justify-between p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">

                            <Skeleton className="w-80 h-7 bg-[#FAF2EE]" />
                            <Skeleton className="w-full h-8 bg-bf-primarytextlight/30" />
                            <Skeleton className="w-80 h-7 bg-[#FAF2EE]" />
                            
                        </div>
                    </div>

                ) : (

                    <CustomerDetail 
                        customer={customer}
                        editCustomer={handleEditCustomer}
                    />
                )
            }

            {
                isLoading ? (

                    <div
                        className="w-full flex flex-wrap items-start gap-4">
                        {
                            Array.from({ length : 4 }).map((_, index) => (

                                <div
                                    key={index}
                                    className="flex-1 min-w-36 rounded-lg bg-white flex flex-col items-start gap-4 justify-between p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">

                                    <Skeleton className="w-24 h-6 bg-[#FAF2EE]" />
                                    <Skeleton className="w-full h-8 bg-bf-primarytextlight/30" />
                                    <Skeleton className="w-24 h-6 bg-[#FAF2EE]" />
                                    
                                </div>
                            ))
                        }
                    </div>

                ) : (

                    <CustomerOrderSummary
                        customer={customer}
                    />
                )
            }

            {
                isLoading ? (

                    <div
                        className="w-full flex flex-wrap items-start gap-6 justify-between">

                        <TableSkeleton />
                        <TableSkeleton />
                    </div>

                ) : (

                    <div
                        className="w-full flex items-start gap-6 justify-between">

                        <CustomerInfo
                            customer={customer}
                        />

                        <CustomerHistory
                            customer={customer}
                        />

                    </div>
                )
            }

        </div>
    )
}

export default CustomerDetailView