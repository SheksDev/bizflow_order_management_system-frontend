import { SIDEBAR_MENU_ITEMS } from "./type"
import { useNavigate, useLocation } from "react-router-dom";


function SideBar() {

    const navigate = useNavigate();
    const location = useLocation();
    
    return (
        <div
            className="h-screen shrink-0 transistion-all duration-300 w-[256px] p-6 bg-bf-backgroundTwo flex flex-col justify-between items-start">

            <div
                className="w-full">

                <div
                    className="w-full h-18.5 flex gap-2 items-center pb-4 ">

                    <img 
                        src="/src/assets/BizFlow-Logo.svg" 
                        alt=""
                        className="w-8 h-8" 
                    />

                    <div
                        className="">

                        <h3
                            className="font-semibold text-[16px]/[20px] text-left text-bf-primaryblack">
                            BizFlow
                        </h3>

                        <p
                            className="font-semibold text-[11px]/[13.8px] tracking-[0.22px] text-left text-bf-primarytext">
                            Didun Delight Operations
                        </p>

                    </div>

                </div>

                <div
                    className="min-w-0 flex flex-col gap-4 text-bf-primarytext h-85 overflow-y-scroll no-scrollbar">

                        {
                            SIDEBAR_MENU_ITEMS.map((item) => (

                                <div
                                    key={item.name}
                                    className={`min-w-0 flex items-center gap-2 p-2 rounded-sm cursor-pointer ${location.pathname.includes(item.path) && "bg-bf-primary text-[#FFFFFF]"}`}

                                    onClick={() => {

                                        navigate(`${item.path}`)

                                    }}>

                                    {
                                        location.pathname.includes(item.path)
                                            ? (
                                                <img 
                                                    src={item.iconActivePath} 
                                                    alt="" 
                                                    // className={`w-3.75 h-3.75}`}
                                                />
                                            )
                                            : (
                                                <img 
                                                    src={item.iconPath} 
                                                    alt="" 
                                                    // className={`w-3.75 h-3.75}`}
                                                />
                                            )
                                    }

                                    <p
                                        className="font-semibold text-[14px]/[20px] text-left">
                                        {item.title}
                                    </p>

                                </div>
                            ))
                        }

                </div>

            </div>

            <div
                className="w-full py-2">

                <div
                    className="w-full p-4 rounded-sm flex items-center gap-2 bg-[#f4ECE8]">

                    <div
                        className="w-8 h-8 rounded-xl bg-[#903F00] flex items-center justify-center">

                        <img 
                            src="/src/assets/ProfileIcon.svg" 
                            alt="" 
                            className="w-3 h-3"
                        />

                    </div>

                    <div
                        className="flex flex-col items-start">

                        <p
                            className="font-semibold text-[14px]/[20px] text-left text-bf-primaryblack">
                            Sekemi A.
                        </p>
                        

                        <p
                            className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-left text-bf-primarytext">
                            Staff
                        </p>

                        <p
                            className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-left text-bf-primarytextlight">
                            Didun Delight Lagos
                        </p>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default SideBar