import React, { useState, useEffect } from "react";

interface DataItem {
    id: string;
    [key: string]: any;
}

interface FieldConfig<T> {
    name: keyof T;
    label: string;
    type: "text" | "number" | "email" | "file" | "date" | "time";
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
    accept?: string;
    defaultValue?: any;
}

interface CrudFormProps<T extends DataItem> {
    data?: T;
    onSubmit: (data: Partial<T>) => void;
    onCancel: () => void;
    fields: Array<FieldConfig<T>>;
}

export function CrudForm<T extends DataItem>({
                                                 data,
                                                 onSubmit,
                                                 onCancel,
                                                 fields,
                                             }: CrudFormProps<T>) {
    const [formData, setFormData] = useState<Partial<T>>({});
    const [filePreview, setFilePreview] = useState<Record<string, string>>({});

    useEffect(() => {
        const initialData: Partial<T> = {};
        fields.forEach((field) => {
            if (data && data[field.name] !== undefined) {
                initialData[field.name] = data[field.name];

                if (field.type === 'file' && typeof data[field.name] === 'string') {
                    setFilePreview(prev => ({
                        ...prev,
                        [String(field.name)]: data[field.name] as string
                    }));
                }
            } else if (field.defaultValue !== undefined) {
                initialData[field.name] = field.defaultValue;
            }
        });
        setFormData(initialData);
    }, [data, fields]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const processedData = { ...formData };
        fields.forEach((field) => {
            if (field.type === "file") {
                const fileInput = formData[field.name] as unknown as FileList;
                if (fileInput?.length > 0) {
                    // @ts-ignore
                    processedData[field.name] = fileInput[0];
                }
            } else if (field.type === "number") {
                // @ts-ignore
                processedData[field.name] = Number(formData[field.name]);
            }
        });

        onSubmit(processedData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files } = e.target;

        if (type === "file" && files && files.length > 0) {
            setFormData(prev => ({ ...prev, [name]: files }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(prev => ({
                    ...prev,
                    [name]: reader.result as string
                }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const renderField = (field: FieldConfig<T>) => {
        const fieldName = String(field.name);
        const value = formData[field.name];

        return (
            <div key={fieldName} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                </label>

                <input
                    type={field.type}
                    name={fieldName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-300"
                    {...(field.type !== "file" ? { value: value || "" } : {})}
                />

                {field.type === 'file' && filePreview[fieldName] && (
                    <div className="mt-2">
                        <img
                            src={filePreview[fieldName]}
                            alt="Preview"
                            className="h-20 w-20 object-cover rounded"
                        />
                    </div>
                )}

                {field.type !== 'file' && value && (
                    <p className="text-sm text-gray-600 mt-1">
                        Current value: {value}
                    </p>
                )}
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
            {fields.map(renderField)}

            <div className="flex gap-2 justify-end pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}