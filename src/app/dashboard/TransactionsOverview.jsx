"use client";
import { useState } from "react"; // Impor useState
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useAppStore } from "@/store/appStore";

// Fungsi untuk memformat mata uang Rupiah
const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                <p className="font-bold text-gray-800 mb-2">{label}</p>
                {payload.map((pld, index) => (
                    <div key={index} className="flex items-center justify-between text-sm py-0.5">
                        <div className="flex items-center">
                            <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: pld.color }}></span>
                            <span className="text-gray-600">{pld.name}:</span>
                        </div>
                        <span className="font-bold text-gray-800 ml-4">{formatCurrency(pld.value)}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export const TransactionsOverview = () => {
    const [timeRange, setTimeRange] = useState('yearly');
    const transactions = useAppStore((state) => state.transactions);

    const processChartData = (range) => {
        const now = new Date();
        
        if (range === 'yearly') {
            const monthlyData = {};
            const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const currentMonthIndex = now.getMonth();
            const monthOrder = allMonths.slice(0, currentMonthIndex + 1);
            
            monthOrder.forEach(month => {
                monthlyData[month] = { Earning: 0, Spending: 0 };
            });

            transactions.forEach(tx => {
                const txDate = new Date(tx.date.replace(/(\d+)(st|nd|rd|th)/, "$1"));
                if (txDate.getFullYear() === now.getFullYear()) {
                    const monthName = allMonths[txDate.getMonth()];
                    if (monthlyData[monthName]) {
                        const price = parseFloat(tx.price);
                        if (tx.type === 'Income') monthlyData[monthName].Earning += price;
                        else if (tx.type === 'Expense') monthlyData[monthName].Spending += price;
                    }
                }
            });
            
            return monthOrder.map(month => {
                const data = monthlyData[month];
                return { name: month, ...data, Savings: data.Earning - data.Spending };
            });
        }

        if (range === 'monthly') {
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            const currentDayOfMonth = now.getDate(); // Ambil tanggal hari ini
            
            // Buat array untuk setiap hari dalam bulan ini
            const dailyData = Array.from({ length: daysInMonth }, (_, i) => ({
                name: `${i + 1}`,
                Earning: 0,
                Spending: 0,
            }));

            transactions.forEach(tx => {
                const txDate = new Date(tx.date.replace(/(\d+)(st|nd|rd|th)/, "$1"));
                if (txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear) {
                    const dayOfMonth = txDate.getDate() - 1;
                    const price = parseFloat(tx.price);
                    if (dailyData[dayOfMonth]) {
                        if (tx.type === 'Income') dailyData[dayOfMonth].Earning += price;
                        else if (tx.type === 'Expense') dailyData[dayOfMonth].Spending += price;
                    }
                }
            });

            // DIUBAH: Potong array data agar hanya sampai hari ini
            const slicedDailyData = dailyData.slice(0, currentDayOfMonth);

            return slicedDailyData.map(day => ({ ...day, Savings: day.Earning - day.Spending }));
        }
        
        return [];
    };

    const chartData = processChartData(timeRange);
    const totalSavings = chartData.reduce((sum, item) => sum + item.Savings, 0);

    // Fungsi untuk menghitung perubahan persentase
    const calculatePercentageChange = () => {
        if (chartData.length < 2) {
            return { text: "N/A", isIncrease: true }; // Tidak cukup data untuk perbandingan
        }

        const currentPeriodSavings = chartData[chartData.length - 1].Savings;
        const previousPeriodSavings = chartData[chartData.length - 2].Savings;

        if (previousPeriodSavings === 0) {
            if (currentPeriodSavings > 0) return { text: "↑ 100%", isIncrease: true };
            if (currentPeriodSavings < 0) return { text: "↓ 100%", isIncrease: false };
            return { text: "-", isIncrease: true };
        }

        const change = ((currentPeriodSavings - previousPeriodSavings) / Math.abs(previousPeriodSavings)) * 100;
        const isIncrease = change >= 0;
        const symbol = isIncrease ? '↑' : '↓';

        return {
            text: `${symbol} ${Math.abs(change).toFixed(1)}%`,
            isIncrease: isIncrease
        };
    };

    const percentageInfo = calculatePercentageChange();

    const formatYAxis = (tickItem) => {
        if (tickItem >= 1000000) return `Rp ${new Intl.NumberFormat('id-ID', { maximumFractionDigits: 1 }).format(tickItem / 1000000)}jt`;
        if (tickItem >= 1000) return `Rp ${new Intl.NumberFormat('id-ID').format(tickItem / 1000)}rb`;
        return `Rp ${tickItem}`;
    };
    
    const activeBtnClasses = "text-sm text-white min-w-16 px-2 py-1 rounded-full bg-gradient-to-t from-gray-900 via-gray-800 to-gray-600";
    const inactiveBtnClasses = "text-sm border border-gray-200 text-gray-500 min-w-16 px-2 py-1 rounded-full hover:bg-gray-100";

    return (
        <div className="bg-white p-6 rounded-2xl h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start">
                <h2 className="text-xl font-bold text-gray-800">Transactions Overview</h2>
                <div className="flex space-x-1 mt-4 sm:mt-0">
                    <button onClick={() => setTimeRange('monthly')} className={timeRange === 'monthly' ? activeBtnClasses : inactiveBtnClasses}>
                        {timeRange === 'monthly' && "• "}Monthly
                    </button>
                    <button onClick={() => setTimeRange('yearly')} className={timeRange === 'yearly' ? activeBtnClasses : inactiveBtnClasses}>
                        {timeRange === 'yearly' && "• "}Yearly
                    </button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-end mt-4">
                <div className="flex items-center space-x-2">
                    <p className="text-3xl font-bold text-gray-800">{formatCurrency(totalSavings)}</p>
                    {/* Tampilkan persentase dinamis */}
                    <div className={`px-2 py-1 ${percentageInfo.isIncrease ? 'bg-green-100' : 'bg-red-100'} rounded-full`}>
                        <p className={`text-[10px] ${percentageInfo.isIncrease ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                            {percentageInfo.text}
                        </p>
                    </div>
                </div>
                <div className="flex space-x-4 text-sm text-gray-500 mt-4 sm:mt-0">
                    <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 bg-cyan-300 rounded-full"></span>
                        <span>Earning</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></span>
                        <span>Spending</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 bg-gray-300 rounded-full"></span>
                        <span>Savings</span>
                    </div>
                </div>
            </div>

            <div style={{ width: "100%", height: 180 }} className="mt-6">
                <ResponsiveContainer>
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                        <XAxis dataKey="name" stroke="gray" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="gray" fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatYAxis} />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "transparent", strokeWidth: 0, fill: "transparent" }} />
                        <defs>
                            <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorEarning" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="Savings" stroke="#e5e7eb" strokeWidth={2} fill="transparent" dot={false} />
                        <Area type="monotone" dataKey="Earning" stroke="#22d3ee" strokeWidth={2} fill="url(#colorEarning)" dot={false} />
                        <Area type="monotone" dataKey="Spending" stroke="#6366f1" strokeWidth={3} fill="url(#colorSpending)" activeDot={{ r: 8, stroke: "white", strokeWidth: 2 }} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
