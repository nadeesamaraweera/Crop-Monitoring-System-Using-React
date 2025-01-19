import React from "react";

interface SidebarItemProps {
    href: string;
    Icon: React.ElementType;
    label: string;
    badge?: string;
    isLastItem?: boolean;
}

export const SidebarItemComponent: React.FC<SidebarItemProps> = ({href, Icon, label, badge, isLastItem}) => {
    const baseStyles = "border-b flex items-center p-3 rounded-lg transition-all duration-200 group";
    const regularStyles = "text-green-50 hover:bg-green-500 hover:bg-opacity-40";
    const logoutStyles = "text-red-50 hover:bg-red-500 hover:bg-opacity-20 mt-6";

    return (
        <>
            <li>
                <a href={href} className={`${baseStyles} ${isLastItem ? logoutStyles : regularStyles}`} >
                    <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                    <span className="ms-3 font-medium text-xl">{label}</span>
                    {badge && (
                        <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-green-800 bg-green-200 rounded-full">
                            {badge}
                        </span>
                    )}
                </a>
            </li>
        </>
    );
};
