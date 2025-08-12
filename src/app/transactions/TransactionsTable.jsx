"use client";

import { useState, useMemo, } from "react";
import { Search, ChevronDown, Filter, Wallet, MoreHorizontal, SquareIcon, PlusCircle } from "lucide-react";
import AddTransactionModal from "./components/AddTransactionModal";
import EditTransactionModal from "./components/EditTransactionModal";
import { useAppStore } from "@/store/appStore";

const formatCurrency = (amount) => {
    // Pastikan input adalah angka sebelum memformat
    const number = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(number)) return "Rp 0";

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(number);
};

const TypePill = ({ type }) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold";
    const typeClasses = {
        Income: "bg-green-100 text-green-800",
        Expense: "bg-red-100 text-red-800",
    };
    return <span className={`${baseClasses} ${typeClasses[type]}`}>{type}</span>;
};

export const TransactionsTable = () => {
    const { transactions, deleteTransaction } = useAppStore();
    
    // State untuk modal
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    
    // State untuk filter dan pencarian
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedType, setSelectedType] = useState("All");

    // State untuk visibilitas dropdown
    const [openActionMenuId, setOpenActionMenuId] = useState(null);
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

    // Handler untuk modal
    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);

    const openEditModal = (transaction) => {
        setSelectedTransaction(transaction);
        setIsEditModalOpen(true);
        setOpenActionMenuId(null);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedTransaction(null);
    };

    const handleDeleteTransaction = (transactionId) => {
        if (confirm("Are you sure you want to delete this transaction?")) {
            deleteTransaction(transactionId);
            setOpenActionMenuId(null);
        }
    };

    // Mengambil daftar kategori unik dari transaksi
    const uniqueCategories = useMemo(() => {
        const categories = new Set(transactions.map(tx => tx.category));
        return ["All", ...categories];
    }, [transactions]);

    // Logika filter gabungan
    const filteredTransaction = transactions.filter(transaction => {
        const matchesSearch = transaction.activity.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              transaction.date.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || transaction.category === selectedCategory;
        const matchesType = selectedType === "All" || transaction.type === selectedType;

        return matchesSearch && matchesCategory && matchesType;
    });

    return (
        <div>
            <div className="flex items-center justify-end">
                <button onClick={openAddModal} className="flex gap-2 items-center space-x-2 border border-gray-200 bg-gray-100 rounded-xl px-3 py-3 text-md font-bold text-gray-800 hover:bg-gray-50">
                    <PlusCircle size={20} /> Add Transaction
                </button>
            </div>

            <div className="flex items-center justify-between border p-2 bg-gray-50 border-gray-200 rounded-2xl mt-4">
                <div className="flex items-center gap-2">
                    <button className="flex items-center space-x-2 border border-gray-200 bg-gray-100 rounded-xl px-2 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50">
                        <Wallet size={20} />
                    </button>
                    <h2 className="text-xl font-bold text-gray-800">Transaction History</h2>
                </div>

                <div className="flex items-center gap-2">
                    {/* SEARCH BAR */}
                    <div className="relative">
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="py-2 pl-11 w-60 bg-white border border-gray-200 text-gray-800 rounded-xl text-sm font-semibold placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                    </div>
                    {/* FILTER DROPDOWN GABUNGAN */}
                    <div className="relative">
                        <button onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)} className="flex items-center space-x-2 border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm font-bold text-gray-800 hover:bg-gray-50">
                            <span>Filter</span>
                            <Filter size={16} />
                        </button>
                        {isFilterDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-xl z-20 p-4">
                                <h4 className="font-bold text-gray-800 mb-2">Filter by Type</h4>
                                <div className="flex space-x-2 mb-4">
                                    {["All", "Income", "Expense"].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setSelectedType(type)}
                                            className={`px-3 py-1 text-sm rounded-full ${selectedType === type ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                                <h4 className="font-bold text-gray-800 mb-2">Filter by Category</h4>
                                <div className="relative">
                                    <select 
                                        value={selectedCategory} 
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500 text-gray-700"
                                    >
                                        {uniqueCategories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                                <button onClick={() => setIsFilterDropdownOpen(false)} className="mt-4 w-full bg-brand-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-brand-700">
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto mt-3 rounded-2xl border border-gray-200">
                <table className="min-w-full text-sm text-left table-fixed">
                    <thead className="text-gray-500 bg-gray-50">
                        <tr className="border-b border-gray-200">
                            <th className="p-3 text-gray-300"><SquareIcon size={20} /></th>
                            <th className="p-3 font-semibold">Activity</th>
                            <th className="p-3 font-semibold">Order ID</th>
                            <th className="p-3 font-semibold">Date</th>
                            <th className="p-3 font-semibold">Price</th>
                            <th className="p-3 font-semibold">Type</th>
                            <th className="p-3 font-semibold">Category</th>
                            <th className="p-3 font-semibold">Fund</th>
                            <th className="p-3 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransaction.map((transaction) => (
                            <tr key={transaction.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="p-3 text-gray-300"><SquareIcon size={20} /></td>
                                <td className="p-3 w-1/5 font-semibold text-gray-800">{transaction.activity}</td>
                                <td className="p-3 font-semibold text-gray-800">{transaction.id_transaction}</td>
                                <td className="p-3 font-semibold text-gray-800">{transaction.date}</td>
                                <td className="p-3 font-semibold text-gray-800">{formatCurrency(transaction.price)}</td>
                                <td className="p-3"><TypePill type={transaction.type} /></td>
                                <td className="p-3 font-semibold text-gray-800">{transaction.category}</td>
                                <td className="p-3 font-semibold text-gray-800">{transaction.fund}</td>
                                <td className="p-3 relative">
                                    <div className="flex justify-center">
                                        <button
                                            onClick={() => setOpenActionMenuId(openActionMenuId === transaction.id ? null : transaction.id)}
                                            className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-200"
                                        >
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </div>
                                    {openActionMenuId === transaction.id && (
                                        <div className="absolute right-4 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                                            <button onClick={() => openEditModal(transaction)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDeleteTransaction(transaction.id)} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isAddModalOpen && <AddTransactionModal onClose={closeAddModal} />}
            {isEditModalOpen && <EditTransactionModal onClose={closeEditModal} transactionToEdit={selectedTransaction} />}
        </div>
    );
};
