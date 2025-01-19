import {Menu} from "lucide-react";
import React from "react";

interface SidebarToggleProps {
    isOpen: boolean;
    onToggle: () => void;
}

export const SidebarToggleComponent: React.FC<SidebarToggleProps> = ({ isOpen, onToggle }) => {
    return (
        <button
            type="button"
            onClick={onToggle}
            className="absolute top-4 left-4 z-50 inline-flex items-center p-2 text-green-800 rounded-lg sm:hidden hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors duration-200"
            aria-controls="default-sidebar"
            aria-expanded={isOpen}
        >
            <span className="sr-only">Toggle sidebar</span>
            <Menu className="w-6 h-6" />
        </button>
    );
};