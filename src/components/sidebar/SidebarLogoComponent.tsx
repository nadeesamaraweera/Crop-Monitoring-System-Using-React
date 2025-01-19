import React from 'react';

export const SidebarLogoComponent: React.FC = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center mb-3">
                <img
                    src="/src/assets/farmer.jpeg"
                    className="h-28 w-40 mb-2"
                    alt="Green Shadow Logo"
                />
                <h1 className="text-white text-2xl font-bold text-center">
                Green Shadow
            </h1>
                <h3 className="text-white text-lg font-medium text-center">
                (Pvt) Ltd
            </h3>
            </div>
        </>
    );
};
