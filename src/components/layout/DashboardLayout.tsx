import {MainSideBarComponent} from "../sidebar/MainSideBarComponent.tsx";
import React from "react";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen">
            <MainSideBarComponent/>
            <div className="p-4 sm:ml-64">
                <div className="flex-1">
                    <main className="p-6">{children}</main>
                </div>
            </div>
        </div>
    );
};