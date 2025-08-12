"use client";

import { useState } from "react";
import { ChevronDown, Upload, Wallet, TrendingUp, TrendingDown, PiggyBank, MoreHorizontal } from "lucide-react";
import { useAppStore } from "@/store/appStore";

// Pindahkan 'cardStyles' dan komponen 'StatsCard' ke sini
const cardStyles = {
    balance: {
        Icon: Wallet,
        gradient: "from-purple-500 to-indigo-600",
        title: "Total Balance",
        subtitle: "Net worth across all.",
    },
    income: {
        Icon: TrendingUp,
        gradient: "from-orange-500 to-red-500",
        title: "Income", // Judul disederhanakan
        subtitle: "Total income for period",
    },
    expenses: {
        Icon: TrendingDown,
        gradient: "from-pink-500 to-rose-500",
        title: "Expenses", // Judul disederhanakan
        subtitle: "Total expenses for period",
    },
    savings: {
        Icon: PiggyBank,
        gradient: "from-blue-400 to-sky-500",
        title: "Savings", // Judul disederhanakan
        subtitle: "Total savings for period",
    },
};

const StatsCard = ({ type, amount }) => {
    const { Icon, gradient, title, subtitle } = cardStyles[type];

    return (
        <div className="bg-gray-50 p-2 rounded-2xl border flex flex-col justify-between h-full">
            <div className="bg-white p-2 rounded-2xl border">
                <div className="flex items-start space-x-2">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient}`}>
                        <Icon className="text-white" size={24} />
                    </div>
                    <div className="text-left">
                        <p className="text-2xl font-bold text-gray-800">{amount}</p>
                        <p className="text-xs text-gray-600">{subtitle}</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between mt-2 ml-1 mr-1">
                <p className="text-md font-semibold text-gray-800">{title}</p>
                {/* Tombol MoreHorizontal dihapus dari sini */}
            </div>
        </div>
    );
};

// Fungsi format mata uang sekarang menyingkat Triliun (T), Miliar (M), dan Juta (jt)
const formatCurrency = (amount) => {
    const number = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(number)) return "Rp 0";

    const absNumber = Math.abs(number);
    const sign = number < 0 ? "-" : "";

    if (absNumber >= 1e12) return `${sign}Rp ${new Intl.NumberFormat('id-ID', { maximumFractionDigits: 1 }).format(absNumber / 1e12)}T`;
    if (absNumber >= 1e9) return `${sign}Rp ${new Intl.NumberFormat('id-ID', { maximumFractionDigits: 1 }).format(absNumber / 1e9)}M`;
    if (absNumber >= 1e6) return `${sign}Rp ${new Intl.NumberFormat('id-ID', { maximumFractionDigits: 1 }).format(absNumber / 1e6)}jt`;

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(number);
};

export const Greeting = () => {
    const { cards, transactions } = useAppStore();
    
    // State untuk mengelola rentang waktu yang dipilih
    const [selectedRange, setSelectedRange] = useState("This Month");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const rangeOptions = ["This Month", "Last Month", "This Year", "All Time"];

    // Filter transaksi berdasarkan rentang waktu yang dipilih
    const filteredTransactions = transactions.filter(tx => {
        const now = new Date();
        const txDate = new Date(tx.date.replace(/(\d+)(st|nd|rd|th)/, "$1"));
        
        switch (selectedRange) {
            case "This Month":
                return txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear();
            case "Last Month":
                const lastMonth = new Date();
                lastMonth.setMonth(lastMonth.getMonth() - 1);
                return txDate.getMonth() === lastMonth.getMonth() && txDate.getFullYear() === lastMonth.getFullYear();
            case "This Year":
                return txDate.getFullYear() === now.getFullYear();
            case "All Time":
                return true;
            default:
                return true;
        }
    });

    // Kalkulasi tetap sama, tapi menggunakan 'filteredTransactions'
    const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0);
    const totalIncome = filteredTransactions.filter((t) => t.type === "Income").reduce((sum, t) => sum + parseFloat(t.price), 0);
    const totalExpenses = filteredTransactions.filter((t) => t.type === "Expense").reduce((sum, t) => sum + parseFloat(t.price), 0);
    const totalSavings = totalIncome - totalExpenses;

    const handleRangeSelect = (range) => {
        setSelectedRange(range);
        setIsDropdownOpen(false);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Good Morning, Ilham</h1>
                    <p className="text-gray-500 mt-1">Here's an overview of your financial health and recent activity.</p>
                </div>
                <div className="flex items-center space-x-3 mt-4 md:mt-0">
                    {/* Tombol dropdown rentang waktu */}
                    <div className="relative">
                        <button 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center space-x-2 border border-gray-200 bg-white rounded-lg px-3 py-2 text-md font-semibold text-gray-800 hover:bg-gray-50"
                        >
                            <span>{selectedRange}</span>
                            <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl z-20">
                                {rangeOptions.map((range, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleRangeSelect(range)}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button className="flex items-center space-x-2 border border-gray-200 bg-white rounded-lg px-2 py-2 text-md font-semibold text-gray-800 hover:bg-gray-50">
                        <Upload size={16} />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatsCard type="balance" amount={formatCurrency(totalBalance)} />
                <StatsCard type="income" amount={formatCurrency(totalIncome)} />
                <StatsCard type="expenses" amount={formatCurrency(totalExpenses)} />
                <StatsCard type="savings" amount={formatCurrency(totalSavings)} />
            </div>
        </>
    );
};
