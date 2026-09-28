import { useEffect, useState } from "react"
import CustomerLayout from "../components/customers/CustomerLayout"
import { GetAllCustomers } from "../api/customers/customer";
import axios from "axios";
import type { CustomerData, CustomerSummary } from "../api/customers/types/customers";
// import { Outlet } from "react-router-dom";
import AddCustomerModal from "../components/customers/AddCustomerModal";
import CustomerCreationToast from "../components/customers/CustomerCreationToast";


function Customers() {

    const [isLoading, setIsLoading] = useState(false);
    const [customers, setCustomers] = useState<CustomerData[]>([]);
    const [summary, setSummary] = useState<CustomerSummary | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [notification, setNotification] = useState<boolean>(false);
    const [toastInfo, setToastInfo] = useState({
        name: "",
        id: "",
    })

    // const showNotification = () => {

    //     setNotification(true)

    //     setTimeout(() => {
    //         setNotification(false)
    //     }, 6000)
    // }

    const fetchAllCustomers = async () => {

        try {

            setIsLoading(true);

            const response = await GetAllCustomers();

            setCustomers(response.data?.customers ?? []);
            setSummary(response.data?.summary ?? null);

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

        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {

        const fetchCustomers = async () => {

            await fetchAllCustomers();

        }

        fetchCustomers();

    }, [])

    return (
        <div
            className="relative w-full">

            <CustomerCreationToast 
                customerInfo={toastInfo}
                close={setNotification}
                open={notification}
            />

            <CustomerLayout 
                isLoading={isLoading}
                customers={customers}
                summary={summary}
                addCustomer={setOpenModal}
            />

            {
                openModal && (
                    <AddCustomerModal 
                        setOpenModal={setOpenModal}
                        loading={isLoading}
                        setLoading={setIsLoading}
                        refetchCustomers={fetchAllCustomers}
                        toast={setNotification}
                        newCustomer={setToastInfo}
                    />
                )
            }

        </div>
    )
}

export default Customers