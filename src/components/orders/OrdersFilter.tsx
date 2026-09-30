

function OrdersFilter() {
    return (
        <div
            className="w-full p-2 rounded-sm bg-white bf-shadow flex items-center gap-2">
            
            <div
                className="flex-2 w-full flex items-center gap-2 px-3 py-1.25 rounded-md bg-[#FAF2EE] text-bf-primarytextlight font-normal text-[13px]">

                <img 
                    src="/src/assets/SearchIcon.svg" 
                    alt="" 
                />

                <input 
                    type="text"
                    placeholder="Search order by id, customer or order item" 
                    className="w-full cursor-pointer"
                />

            </div>

            <div
                className="flex-2 w-full bg-[#FAF2EE] p-1 rounded-md">
                
                <ul
                    className="w-full flex items-center justify-between font-medium text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">

                    <li
                        className="px-3 py-1 rounded-xs  cursor-pointer">
                        All {}
                    </li>

                    <li
                        className="px-3 py-1 rounded-xs  cursor-pointer">
                        Pending {}
                    </li>

                    <li
                        className="px-3 py-1 rounded-xs  cursor-pointer">
                        Ready {}
                    </li>

                    <li
                        className="px-3 py-1 rounded-xs  cursor-pointer">
                        Delivered {}
                    </li>

                    <li
                        className="px-3 py-1 rounded-xs  cursor-pointer">
                        Cancelled {}
                    </li>

                </ul>

            </div>

            <div
                className="flex-1 w-full bg-[#FAF2EE] px-3 py-2 rounded-md flex items-center gap-1 font-medium text-[11px]/[14px] tracking-[0.22px] text-bf-primaryblack">

                <p>
                    Delivery:   
                </p>

                <input 
                    type="date" 
                    name="" 
                    id="" 
                    className=" cursor-pointer"
                />

            </div>
        </div>
    )
}

export default OrdersFilter