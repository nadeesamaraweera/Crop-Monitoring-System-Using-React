import React, { useState } from 'react';
import {
    LayoutDashboard,
    LandPlot,
    Users,
    TreesIcon,
    CarIcon,
    PenToolIcon,
    LogOutIcon,
} from 'lucide-react';
import { SidebarLogoComponent } from "./SidebarLogoComponent.tsx";
import {SidebarToggleComponent} from "./SidebarToggleComponent.tsx";
import {SidebarItemComponent} from "./SidebarItemComponent.tsx";
import {Poll} from "@mui/icons-material";

export const MainSideBarComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const sidebarItems = [
        { href: "/dashboard", Icon: LayoutDashboard, label: "Dashboard" },
        { href: "/dashboard/fields", Icon: LandPlot, label: "Fields" },
        { href: "/dashboard/crops", Icon: TreesIcon, label: "Crops" },
        { href: "/dashboard/staffs", Icon: Users, label: "Staff" },
        { href: "/dashboard/logs", Icon: Poll, label: "Logs" },
        { href: "/dashboard/vehicles", Icon: CarIcon, label: "Vehicles" },
        { href: "/dashboard/equipment", Icon: PenToolIcon, label: "Equipment" },
        { href: "/logout", Icon: LogOutIcon, label: "Logout" }
    ];

    return (
        <>
            <SidebarToggleComponent isOpen={isOpen} onToggle={toggleSidebar} />
            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out bg-gradient-to-b from-green-700 to-green-600 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto">
                    <SidebarLogoComponent />
                    <ul className="space-y-1 font-medium mt-5">
                        {sidebarItems.map((item, index) => (
                            <SidebarItemComponent
                                key={index}
                                {...item}
                                isLastItem={index === sidebarItems.length - 1}
                            />
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    );
};