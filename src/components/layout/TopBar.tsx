

function TopBar() {
    return (
        <div
            className="w-full h-16 p-6 flex items-center gap-2 bg-[#FFF8F5] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">

            <div>

                <img 
                    src="/src/assets/BizFlow-Logo.svg" 
                    alt=""
                    className="w-8 h-8" 
                />

            </div>

            <h3
                className="font-semibold text-[11px]/[14px] tracking-[0.55px] text-bf-primarytextlight">
                OPERATIONS
            </h3>

            <div
                className="text-[10px] text-bf-primarytext font-bold">
                /
            </div>

            <h3
                className="font-semibold text-[16px]/[24px] text-bf-primaryblack">
                Design System & Component Foundation
            </h3>

        </div>
    )
}

export default TopBar