export const StatsCard = ({ title, value }: { title: string; value: number }) => {
    return (
        <div className="bg-white shadow-lg border-2 border-transparent rounded-lg p-4 flex items-center justify-between transform transition-all duration-300 hover:scale-105 hover:border-green-500 hover:shadow-xl cursor-pointer">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
};
