import { useState, useMemo } from "react";
import { Delete, Edit } from "@mui/icons-material";

interface DataItem {
    id: string;
    [key: string]: any;
}

interface Column {
    key: string;
    header: string;
}

interface NewTableProps<T extends DataItem> {
    data: T[];
    columns: Column[];
    onEdit: (item: T) => void;
    onDelete: (id: string) => void;
}

export function TableComponent<T extends DataItem>({
                                                       data = [],
                                                       columns,
                                                       onEdit,
                                                       onDelete
                                                   }: NewTableProps<T>) {

    const [filters, setFilters] = useState<Partial<Record<keyof T, string>>>({});

    const handleFilterChange = (key: keyof T, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const filteredData = useMemo(() => {
        const dataArray = Array.isArray(data) ? data : [];

        let result = [...dataArray];
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                result = result.filter((item) =>
                    String(item[key as keyof T] || '').toLowerCase().includes(value.toLowerCase())
                );
            }
        });
        return result;
    }, [data, filters]);

    if (!Array.isArray(data)) {
        return <div>No data available</div>;
    }

    return (
        <div className="rounded-lg border overflow-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50">
                <tr>
                    {columns.map((column) => (
                        <th key={column.key} className="p-4">
                            <div className="capitalize text-gray-600 text-lg font-semibold">
                                {column.header}
                            </div>
                            <input
                                className="w-full p-2 border border-green-500 rounded-md"
                                placeholder={`Filter ${column.header}`}
                                onChange={(e) => handleFilterChange(column.key as keyof T, e.target.value)}
                            />
                        </th>
                    ))}
                    <th className="p-4 text-gray-600 capitalize text-lg font-semibold">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody className="capitalize">
                {filteredData.length > 0 ? (
                    filteredData.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50">
                            {columns.map((column) => (
                                <td key={column.key} className="p-4 text-base">
                                    {row[column.key]}
                                </td>
                            ))}
                            <td className="p-4 space-x-2 flex">
                                <button
                                    onClick={() => onEdit(row)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <Edit />
                                </button>
                                <button
                                    onClick={() => onDelete(row.id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <Delete />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={columns.length + 1}
                            className="p-4 text-center text-gray-500"
                        >
                            No data available
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}