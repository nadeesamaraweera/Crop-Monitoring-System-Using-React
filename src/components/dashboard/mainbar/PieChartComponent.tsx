import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

export const PieChartComponent = ({ data }: { data: any[] }) => {
    return (
        <div className="bg-gray-50 shadow-lg rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-lg font-bold text-center mb-4">Dietary Overview</h3>
            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                    <Tooltip />
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={140}
                        fill="#4caf50"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#4caf50" : "#3bff45"} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
