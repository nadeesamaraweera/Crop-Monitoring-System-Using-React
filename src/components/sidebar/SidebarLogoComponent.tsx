import React from 'react';

export const SidebarLogoComponent: React.FC = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center mb-3">
                <img
                    src="/src/assets/logo.png"
                    className="h-30 w-40 mb-6"
                    alt="Green Shadow Logo"
                />
            </div>
        </>
    );
};
