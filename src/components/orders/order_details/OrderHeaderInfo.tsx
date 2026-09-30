

function OrderHeaderInfo() {

    const order = "";

    return (
        <div
            className="w-full flex items-center justify-between gap-8 p-6 rounded-lg bg-white bf-shadow">

                {
                    !order && (

                        <div
                            className="min-w-0 flex-1 flex flex-col items-start gap-1">

                            <div
                                className="w-full flex items-center gap-2">
                            
                                <h3
                                    className="font-bold text-[32px]/[40px] tracking-[-0.64px] text-bf-primaryblack flex items-center gap-1">
                                    Order
                                    <span
                                        className="text-bf-primary">
                                        {}
                                    </span>
                                </h3>

                                <div
                                    className="px-3 py-1 rounded-xl bg-[#FFDBCC] text-bf-primarytext flex items-center font-semibold text-[11px]/[14px] tracking-[0.22px]">
                                    <p>
                                        {}
                                    </p>
                                </div>
                                
                            </div>
                            
                            <p
                                className="font-normal text-[13px]/[18px] text-bf-primarytextlight">
                                Order logged {} at {} WAT.
                            </p>

                        </div>
                    )
                }

                <div
                    className="shrink-0 flex items-center gap-2">

                    <button
                        // onClick={editCustomer}
                        className="shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#FAF2EE] bf-shadow font-semibold text-[14px]/[20px] text-bf-primaryblack rounded-md cursor-pointer">

                        <img 
                            src="/src/assets/EditIcon.svg" 
                            alt="" 
                        />

                        <span>
                            Edit Order
                        </span>

                    </button>

                    <button
                        // onClick={editCustomer}
                        className="shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#FAF2EE] bf-shadow font-semibold text-[14px]/[20px] text-bf-error rounded-md cursor-pointer">

                        <img 
                            src="/src/assets/EditIcon.svg" 
                            alt="" 
                        />

                        <span>
                            Cancel Customer
                        </span>

                    </button>
                    

                    <button
                        // onClick={editCustomer}
                        className="shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#FAF2EE] bf-shadow font-semibold text-[14px]/[20px] text-bf-primaryblack rounded-md cursor-pointer">

                        <img 
                            src="/src/assets/EditIcon.svg" 
                            alt="" 
                        />

                        <span>
                            Print Slip
                        </span>

                    </button>

                    <button
                        // onClick={editCustomer}
                        className="shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-2 bg-bf-primary bf-shadow font-semibold text-[14px]/[20px] text-white rounded-md cursor-pointer">

                        <img 
                            src="/src/assets/EditIcon.svg" 
                            alt="" 
                        />

                        <span>
                            Log Payment
                        </span>

                    </button>

                </div>

        </div>
    )
}

export default OrderHeaderInfo