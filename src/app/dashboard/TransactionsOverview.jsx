"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Dot } from "recharts";

const data = [
    { name: "Jan", Spending: 2400, Earning: 4000, Savings: 1600 },
    { name: "Feb", Spending: 1398, Earning: 3000, Savings: 1602 },
    { name: "Mar", Spending: 4800, Earning: 5000, Savings: 200 },
    { name: "Apr", Spending: 3908, Earning: 4780, Savings: 872 },
    { name: "May", Spending: 22430, Earning: 28000, Savings: 5570 },
    { name: "Jun", Spending: 3800, Earning: 4390, Savings: 590 },
    { name: "Jul", Spending: 4300, Earning: 5490, Savings: 1190 },
    { name: "Aug", Spending: 3200, Earning: 6200, Savings: 3000 },
    { name: "Sep", Spending: 4100, Earning: 7100, Savings: 3000 },
    { name: "Oct", Spending: 2500, Earning: 8000, Savings: 5500 },
    { name: "Nov", Spending: 2800, Earning: 8500, Savings: 5700 },
    { name: "Dec", Spending: 3100, Earning: 9200, Savings: 6100 },
];

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
                        <span className="font-bold text-gray-800 ml-4">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(pld.value)}</span>
                    </div>
                ))}
            </div>
        );
    }

    return null;
};

export const TransactionsOverview = () => {
    const formatYAxis = (tickItem) => {
        return `${tickItem / 1000}k`;
    };

    return (
        <div className="bg-white p-6 rounded-2xl h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start">
                <h2 className="text-xl font-bold text-gray-800">Transactions Overview</h2>
                <div className="flex space-x-1 mt-4 sm:mt-0">
                    <button className="text-sm border border-gray-200 text-gray-500 min-w-16 px-2 py-1 rounded-full hover:bg-gray-100">Monthly</button>
                    <button className="text-sm text-white min-w-16 px-2 py-1 rounded-full bg-gradient-to-t from-gray-900 via-gray-800 to-gray-600">• Yearly</button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-end mt-4">
                <div className="flex items-center space-x-2">
                    <p className="text-3xl font-bold text-gray-800">Rp47500000</p>
                    <div className="px-2 py-1 bg-gray-100 rounded-full">
                        <p className="text-[10px] text-green-500 font-semibold">↑ 4.9%</p>
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
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
