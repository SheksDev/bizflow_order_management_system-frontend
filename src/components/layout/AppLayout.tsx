import TopBar from "./TopBar"
import SideBar from "./SideBar"
import { Outlet } from "react-router-dom";


function AppLayout() {
    return (
        <div
            className="relative w-full h-screen flex overflow-hidden">

                <SideBar />

                <div
                    className="flex-1 min-w-0 flex flex-col">

                    <TopBar />

                    <main
                        className="flex-1 min-w-0 relative overflow-auto bg-bf-background no-scrollbar">
                        <Outlet />
                    </main>
                    
                </div>
            
        </div>
    )
}

export default AppLayout