import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Area } from "recharts";

export const LineChartComponent = ({ data }: { data: any[] }) => {
    return (
        <LineChart width={550} height={350} data={data}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="date" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip />
            {/* Adding Area to fill under the line */}
            <Area type="monotone" dataKey="value" stroke="#82ca9d" fill="#82ca9d" />
            <Line type="monotone" dataKey="value" stroke="#4caf50" />
        </LineChart>
    );
};

