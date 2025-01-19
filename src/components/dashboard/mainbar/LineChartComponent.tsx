import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const LineChartComponent = ({ data }: { data: any[] }) => {
    return (
        <LineChart width={550} height={350} data={data}>
            <CartesianGrid stroke="#e0e0e0" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#4caf50" />
        </LineChart>
    );
};
