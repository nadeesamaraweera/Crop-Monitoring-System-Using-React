export const AlertComponent = ({message, type = "success", onClose,}: {
    message: string;
    type?: "success" | "update" | "error" | "warning" | "delete"
    onClose: () => void;
}) => {
    const typeStyles = {
        update: "text-green-700 border-green-300 bg-green-50 dark:bg-white dark:text-green-600 dark:border-green-400",
        success: "text-green-800 border-green-400 bg-green-50 dark:bg-white dark:text-green-700 dark:border-green-500",
        delete: "text-red-700 border-red-300 bg-white dark:bg-green-50 dark:text-red-600 dark:border-red-400",
        warning: "text-yellow-700 border-yellow-400 bg-white dark:bg-green-50 dark:text-yellow-600 dark:border-yellow-500",
        error: "text-red-800 border-red-400 bg-red-50 dark:bg-red-900 dark:text-red-200 dark:border-red-500",
    };

    return (
        <div
            className={`flex items-center p-4 mb-4 text-sm border rounded-lg ${typeStyles[type]}`}
            role="alert"
        >
            <span className="sr-only">{type}</span>
            <div className="flex-grow">
                <span className="font-medium">{type.toUpperCase()}:</span> {message}
            </div>
            <button
                onClick={onClose}
                className="ml-4 text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline"
            >
                Close
            </button>
        </div>
    );
};