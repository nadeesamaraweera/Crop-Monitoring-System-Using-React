import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

export const PieChartComponent = ({ data }: { data: any[] }) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <PieChart>
                <Tooltip />
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#4caf50"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#4caf50" : "#3bff45"} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};
