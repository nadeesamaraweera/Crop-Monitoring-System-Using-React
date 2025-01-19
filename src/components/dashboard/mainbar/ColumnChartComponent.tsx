import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const ColumnChartComponent = ({ data }: { data: any[] }) => {
    return (
        <BarChart width={550} height={350} data={data}>
            <CartesianGrid stroke="#e0e0e0" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4caf50" />
        </BarChart>
    );
};
