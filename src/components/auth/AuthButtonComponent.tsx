import React from 'react';

interface ButtonProps {
    text: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
}

export const AuthButtonComponent: React.FC<ButtonProps> = ({ text, type = "button", onClick }) => {
    return (
        <>
            <button
                type={type}
                onClick={onClick}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-colors font-medium"
            >
                {text}
            </button>
        </>
    );
};