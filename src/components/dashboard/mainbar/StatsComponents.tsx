export const StatsCard = ({ title, value }: { title: string; value: number }) => {
    return (
        <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
};
