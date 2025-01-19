import {DashboardLayout} from "../components/layout/DashboardLayout.tsx";
import {TitleComponent} from "../components/common/TitleComponent.tsx";
import {StatsCard} from "../components/dashboard/mainbar/StatsComponents.tsx";
import {LineChartComponent} from "../components/dashboard/mainbar/LineChartComponent.tsx";
import {ColumnChartComponent} from "../components/dashboard/mainbar/ColumnChartComponent.tsx";

export const DashboardPage = () => {
    const stats = [
        { title: "Total Crops", value: 120 },
        { title: "Total Equipment", value: 50 },
        { title: "Fields", value: 20 },
        { title: "Staff", value: 30 },
        { title: "Vehicles", value: 15 },
        { title: "Yearly Revenue", value: 50000 }
    ];

    const lineChartData = [
        { date: "2023-01", value: 10 },
        { date: "2023-02", value: 20 },
        { date: "2023-03", value: 15 },
        { date: "2023-04", value: 30 },
        { date: "2023-05", value: 25 },
        { date: "2023-06", value: 40 },
        { date: "2023-07", value: 35 },
        { date: "2023-08", value: 50 },
        { date: "2023-09", value: 45 },
        { date: "2023-10", value: 60 },
        { date: "2023-11", value: 55 },
        { date: "2023-12", value: 70 },
    ];

    const columnChartData = [
        { category: "Veg", value: 40 },
        { category: "Fruits", value: 30 },
        { category: "Grains", value: 50 },
        { category: "Dairy", value: 20 },
        { category: "Meat", value: 35 },
        { category: "Poultry", value: 25 },
        { category: "Fish", value: 45 },
        { category: "Nuts", value: 15 }
    ];

    return (
        <>
            <DashboardLayout>
                <TitleComponent title="Dashboard Section" fPath="Dashboard" sPath=""/>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <StatsCard key={index} title={stat.title} value={stat.value}/>
                    ))}
                </div>

                <div className="mt-8 flex flex-wrap">
                    <LineChartComponent data={lineChartData}/>
                    <ColumnChartComponent data={columnChartData}/>
                </div>
            </DashboardLayout>

        </>
    );
};