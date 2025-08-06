const transactions = [
    { id: "1", bank: "BRI", card_number: "423598234979", name: "Muhammad Ilham Yahya", balance: "5000000" },
    { id: "2", bank: "Jago", card_number: "334668324534", name: "Muhammad Ilham Yahya", balance: "2450000" },
    { id: "3", bank: "BTN", card_number: "976345235545", name: "Muhammad Ilham Yahya", balance: "8000000" },
];

import { Search, ChevronDown, Filter, Wallet, MoreHorizontal, SquareIcon, PlusCircle } from "lucide-react";

const TypePill = ({ type }) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold";
    const typeClasses = {
        Income: "bg-green-100 text-green-800",
        Expense: "bg-red-100 text-red-800",
    };
    return <span className={`${baseClasses} ${typeClasses[type]}`}>{type}</span>;
};

export const CardsTable = () => {
    return (
        <div>
            <div className="flex items-center justify-end">
                <button className="flex gap-2 items-center space-x-2 border border-gray-200 bg-gray-100 rounded-xl px-3 py-3 text-md font-bold text-gray-800 hover:bg-gray-50">
                    <PlusCircle size={20} /> Add Card
                </button>
            </div>
            <div className="flex items-center justify-between border p-2 bg-gray-50 border-gray-200 rounded-2xl mt-4">
                <div className="flex items-center gap-2">
                    <button className="flex items-center space-x-2 border border-gray-200 bg-gray-100 rounded-xl px-2 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50">
                        <Wallet size={20} />
                    </button>
                    <h2 className="text-xl font-bold text-gray-800">Card List</h2>
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
                                <SquareIcon size={20} />
                            </th>
                            <th className="p-3 font-semibold">Bank</th>
                            <th className="p-3 font-semibold">Card Number</th>
                            <th className="p-3 font-semibold">Name</th>
                            <th className="p-3 font-semibold">Balance</th>
                            <th className="p-3 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="p-3 text-gray-300">
                                    <SquareIcon size={20} />
                                </td>
                                <td className="p-3 font-semibold text-gray-800">{tx.bank}</td>
                                <td className="p-3 font-semibold text-gray-800">{tx.card_number && tx.card_number.slice(0, -6) + '******'}</td>
                                <td className="p-3 font-semibold text-gray-800">{tx.name}</td>
                                <td className="p-3 font-semibold text-gray-800 text-sm">Rp{tx.balance}</td>
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
