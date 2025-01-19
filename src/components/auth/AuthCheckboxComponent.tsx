import React from 'react';

interface CheckboxProps {
    label: string;
    id: string;
}

export const AuthCheckboxComponent: React.FC<CheckboxProps> = ({ label, id}) => {
    return (
        <>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id={id}
                    className="w-4 h-4 border-gray-300 rounded text-green-600 focus:ring-green-500"
                />
                <label htmlFor={id} className="ml-2 text-sm text-gray-600">
                    {label}
                </label>
            </div>
        </>
    );
};