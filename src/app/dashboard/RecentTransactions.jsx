const transactions = [
    { id: "INV_000076", activity: "Hotel Booking", date: "17 Apr, 2028", time: "03:45 PM", price: "$25,500", status: "Success" },
    { id: "INV_000075", activity: "Flight Ticket Booking", date: "15 Apr, 2028", time: "11:30 AM", price: "$32,750", status: "Pending" },
    { id: "INV_000074", activity: "Groceries", date: "15 Apr, 2028", time: "09:00 AM", price: "$1,200", status: "Success" },
];

import { Search, ChevronDown, Filter, Wallet, MoreHorizontal, SquareCheckBig, SquareActivity, SquareCheck, SquareIcon } from "lucide-react";

const StatusPill = ({ status }) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold";
    const statusClasses = {
        Success: "bg-green-100 text-green-800",
        Pending: "bg-yellow-100 text-yellow-800",
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

export const RecentTransactions = () => {
    return (
        <div>
            <div className="flex items-center justify-between border p-2 bg-gray-50 border-gray-200 rounded-2xl">
                <div className="flex items-center gap-2">
                    <button className="flex items-center space-x-2 border border-gray-200 bg-gray-100 rounded-xl px-2 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50">
                        <Wallet size={20} />
                    </button>
                    <h2 className="text-xl font-bold text-gray-800">Recent Transaction</h2>
                </div>
                <div className="flex items-center gap-2">
                    {/* SEARCH BAR */}
                    <div className="relative">
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="py-2 pl-11 w-60 bg-white border border-gray-200 rounded-xl text-sm font-semibold placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-2 border border-gray-200 bg-white rounded-xl px-2 py-2 text-sm font-bold text-gray-800 hover:bg-gray-50">
                            <span>All Category</span>
                            <ChevronDown size={16} />
                        </button>
                        <button className="flex items-center space-x-2 border border-gray-200 bg-white rounded-xl px-2 py-2 text-sm font-bold text-gray-800 hover:bg-gray-50">
                            <span>Filter</span>
                            <Filter size={16} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto mt-3 rounded-2xl border border-gray-200">
                <table className="min-w-full text-sm text-left">
                    <thead className="text-gray-500 bg-gray-50">
                        <tr className="border-b border-gray-200">
                            <th className="p-3 text-gray-300">
                                <SquareIcon size={20}/>
                            </th>
                            <th className="p-3 font-semibold">Activity</th>
                            <th className="p-3 font-semibold">Order ID</th>
                            <th className="p-3 font-semibold">Date</th>
                            <th className="p-3 font-semibold">Price</th>
                            <th className="p-3 font-semibold">Status</th>
                            <th className="p-3 font-semibold"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="p-3 text-gray-300">
                                    <SquareIcon size={20}/>
                                </td>
                                <td className="p-3 font-semibold text-gray-800">{tx.activity}</td>
                                <td className="p-3 font-semibold text-gray-800">{tx.id}</td>
                                <td className="p-3 font-semibold text-gray-800">{tx.date}</td>
                                <td className="p-3 font-semibold text-gray-800">{tx.price}</td>
                                <td className="p-3">
                                    <StatusPill status={tx.status} />
                                </td>
                                <td className="p-3 text-gray-500">
                                    <MoreHorizontal size={20} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
