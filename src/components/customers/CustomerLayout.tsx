import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import type { CustomerData, CustomerSummary } from "../../api/customers/types/customers"
import { TableSkeleton } from "../../ui/Skeleton"
import Table from "../../ui/Table"
import { CUSTOMER_COLUMNS } from "./CustomerColumn"
import CustomerStats from "./CustomersStats"
import type { CustomerRow } from "./customer.types"
import { useNavigate } from "react-router-dom"



interface CustomerProps {
    isLoading: boolean;
    customers: CustomerData[]
    summary: CustomerSummary | null;
    addCustomer: Dispatch<SetStateAction<boolean>>;
    // editValues: Dispatch<SetStateAction<CreateCustomerPayload | undefined>>;
    // isEdit: Dispatch<SetStateAction<boolean>>;
}


function CustomerLayout(
    {
        customers,
        summary,
        isLoading,
        addCustomer,
    } : CustomerProps
) {

    // console.log(customers);
    // console.log(summary);

    const navigate = useNavigate();

    const [retrievedCustomers, setCustomers] = useState<CustomerRow[]>([])


    useEffect(() => {

        const loadCustomers = async () => {
        
            const transformedCustomers: CustomerRow[] = await Promise.all(

                (customers ?? []).map(async (customer) => {

                    return {
                        customerName: customer.name ?? "",
                        customerId: customer.customerId ?? "",
                        phoneNumber: customer.phone ?? "",
                        email: customer.email ?? "",
                        orders: customer.orders ? customer.orders.length : 0,
                        total: Number(customer.totalOrderValue ?? ""),
                        balance: Number(customer.totalOutstanding ?? ""),
                        dateAdded: customer.createdAt ?? "",
                    };
                })
            );

            setCustomers(transformedCustomers);
        };

        loadCustomers();
    }, [customers])

    return (
        <div
            className="absolute p-6 min-h-screen w-full min-w-0 flex flex-col items-center gap-6 no-scrollbar">

            <div
                className="w-full flex justify-between items-center">

                <div
                    className="w-100 flex flex-col gap-0.5">

                    <div
                        className="flex items-center gap-1">

                        <h2
                            className="font-bold text-[32px]/[40px] tracking-[-0.8px] text-bf-primaryblack">
                            Customers
                        </h2>

                    </div>

                    <p
                        className="font-normal text-[14px]/[20px] text-bf-primarytext">
                        Manage customer records used for orders and business operations.
                    </p>

                </div>

                <div
                    className="flex gap-2 items-center">

                        <div
                            className="w-[320px] py-2.25 pl-4 pr-3 rounded-md bg-white shadow-[0_1px_2px_rgba(0,,0,0.05)] flex items-center justify-center gap-2">

                            <img 
                                src="/src/assets/SearchIcon.svg" 
                                alt="" 
                                className="w-[13.5px] h-[13.5px]"
                            />

                            <input 
                                type="text" 
                                placeholder="Search by name, phone, or email.."
                                className="w-full outline-none text-normal text-[14px] text-bf-primarytextlight"
                            />
                        </div>

                    <button
                        className={`px-4 py-2 rounded-md text-[#FFF1EB] bg-bf-primary flex items-center gap-1.5 bf-border-l cursor-pointer shadow-[0_1px_2px_rgba(0,,0,0.05)]`}
                        onClick={() => addCustomer(true)}>

                        <img 
                            src="/src/assets/AddIcon.svg" 
                            alt="" 
                        />

                        <p
                            className="font-semibold text-[14px]/[20px]">
                            Add Customer
                        </p>

                    </button>

                </div>

            </div>

            <CustomerStats 
                isLoading={isLoading}
                summary={summary}
            />

            {
                isLoading ? (
                    <TableSkeleton />
                ) : (

                    <Table 
                        columns={CUSTOMER_COLUMNS}
                        bodyOptions={retrievedCustomers}
                        onRowClick={(row) => {
                            navigate(`/customers/${row.customerId}`)
                        }}
                        table={"customers"}
                    />
                )
            }

        </div>
    )
}

export default CustomerLayout