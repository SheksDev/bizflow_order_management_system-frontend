import { useEffect, useRef, useState } from "react";




export interface Customer {
    customerId: string;
    name: string;
    phone: string;
    email?: string;
}

interface CustomerSelectProps {
    customers: Customer[] | null;
    value: string;
    onChange: (customerId: string) => void;
    placeholder?: string;
    disabled?: boolean;
    selectCustomer: (customerId: string) => void;
}

function CustomerSelect(
    {
        customers,
        value,
        onChange,
        placeholder = "Select or search registered customer...",
        disabled = false,
        selectCustomer,
    } : CustomerSelectProps
) {

    // console.log(customers);

    const containerRef = useRef<HTMLDivElement>(null);

    const [searchValue, setSearchValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);


    // Find the currently selected customer
    const selectedCustomer = customers?.find(
        (customer) => customer.customerId === value
    );

    // Filter customers based on what the user types
    const filteredCustomers = customers?.filter((customer) => {

        const search = searchValue.trim().toLowerCase();

        if (!search) {
            return true;
        }

        return (
        customer.name.toLowerCase().includes(search) ||
        customer.phone.toLowerCase().includes(search) ||
        customer.email?.toLowerCase().includes(search)
        );
    });

    // Show selected customer's name in the input
    useEffect(() => {
        if (selectedCustomer) {
            setSearchValue(selectedCustomer.name);
        }
    }, [selectedCustomer]);

    // Close dropdown when clicking outside
    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {

            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);

                // Restore selected customer name if user didn't select anything
                if (selectedCustomer) {
                setSearchValue(selectedCustomer.name);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectedCustomer]);

    const handleSearchChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {

        const search = event.target.value;

        setSearchValue(search);
        setIsOpen(true);

        // If the user starts changing the selected customer,
        // remove the previous selection.
        if (value) {
            onChange("");
        }
    };

    const handleSelectCustomer = (customer: Customer) => {
        setSearchValue(customer.name);
        onChange(customer.customerId);
        selectCustomer(customer.customerId);
        setIsOpen(false);
    };

    // const handleClear = () => {
    //     setSearchValue("");
    //     onChange("");
    //     setIsOpen(true);
    // };

    return (
        <div
            ref={containerRef}
            className="relative w-full">

            {/* Input */}

            <div
                className="px-4 py-2.5 rounded-xs bg-bf-backgroundTwo w-full flex items-center">

                <img 
                    src="/src/assets/SearchIcon.svg"
                    alt="" 
                    className="pr-2"
                />

                <input 
                    type="text" 
                    className="w-full py-px font-normal text-[14px] text-bf-primarytextlight outline-none cursor-pointer"
                    value={searchValue}
                    disabled={disabled}
                    onChange={handleSearchChange}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                />

                <img 
                    src="/src/assets/DropDownIcon.svg" 
                    alt="" 
                />

            </div>

            {isOpen && !disabled && (
                <div 
                    className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xs border-bf-border bg-white bf-shadow cursor-pointer">

                    {/* Results */}

                    <div className="max-h-60 overflow-y-auto no-scrollbar">

                        {filteredCustomers && filteredCustomers?.length > 0 ? (
                            filteredCustomers?.map((customer) => {

                                const isSelected = customer.customerId === value;

                                return (
                                    <button
                                        key={customer.customerId}
                                        type="button"
                                        onClick={() => handleSelectCustomer(customer)}
                                        className={`w-full px-4 py-3 text-left flex items-center justify-between hover:bg-bf-backgroundTwo ${
                                        isSelected
                                            ? "bg-bf-backgroundTwo"
                                            : ""
                                        } cursor-pointer`}
                                    >
                                        <div className="min-w-0">
                                            <p 
                                                className="font-medium text-[14px] text-bf-primaryblack truncate">
                                                {customer.name}
                                            </p>

                                            <p 
                                                className="mt-0.5 text-[12px] text-bf-primarytextlight">
                                                {customer.phone}
                                            </p>
                                        </div>

                                        {isSelected && (
                                            <span className="text-bf-primary text-[12px]">
                                                Selected
                                            </span>
                                        )}
                                    </button>
                                );
                            })
                        ) : (
                            <div className="px-4 py-5 text-center">
                                <p className="text-[13px] text-bf-primarytextlight">
                                    No customers found.
                                </p>
                            </div>
                        )}

                    </div>
                </div>
            )}

        </div>
    )
}

export default CustomerSelect