import React from 'react';

interface InputFieldProps {
    label: string;
    type: string;
    placeholder?: string;
    required?: boolean;
    id?: string;
}

export const AuthInputComponent:React.FC<InputFieldProps> = ({ label, type, placeholder, required, id }) => {
    return (
        <>
            <div>
                <label htmlFor={id} className="text-sm font-medium text-gray-700 block mb-2">
                    {label}
                </label>
                <input
                    type={type}
                    id={id}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gray-50"
                    placeholder={placeholder}
                    required={required}
                />
            </div>
        </>
    );
};