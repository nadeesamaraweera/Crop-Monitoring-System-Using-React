import React from "react";
import {Plus} from "lucide-react";

interface AddButtonProps {
    onClick: () => void;
    label?: string;
}

export const AddButtonComponent: React.FC<AddButtonProps> = ({onClick, label}) => {
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
        >
            <Plus className="w-4 h-4 mr-2" />
            {label}
        </button>
    );
};