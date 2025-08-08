"use client";

import { useState } from "react";
import { Search, ChevronDown, Filter, Wallet, MoreHorizontal, SquareIcon, PlusCircle } from "lucide-react";
import AddTransactionModal from "./components/AddTransactionModal";
import EditTransactionModal from "./components/EditTransactionModal";

const transactionsList = [
    { id: "1", id_transaction: "INV_000075", activity: "KAI Sby-Jbr", date: "15 Apr, 2028", time: "11:30 AM", price: "88000", type: "Expense", category: "Ticket", fund: "BRI" },
    { id: "2", id_transaction: "INV_000076", activity: "Hotel Booking", date: "17 Apr, 2028", time: "03:45 PM", price: "150000", type: "Expense", category: "Ticket", fund: "BRI" },
    { id: "3", id_transaction: "INV_000074", activity: "Geprek Basmalah", date: "15 Apr, 2028", time: "09:00 AM", price: "13000", type: "Income", category: "Food", fund: "BTN" },
];

const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
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
    const [transactions, setTransactions] = useState(transactionsList);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [openActionMenuId, setOpenActionMenuId] = useState(null);

    const openModal = () => setIsAddModalOpen(true);
    const closeModal = () => setIsAddModalOpen(false);

    const addTransaction = (newTransactionData) => {
        const newTransactionWithId = { ...newTransactionData, id: Date.now().toString() };
        setTransactions((prevTransaction) => [newTransactionWithId, ...prevTransaction]);
    };

    const openEditModal = (transaction) => {
        setSelectedTransaction(transaction);
        setIsEditModalOpen(true);
        setOpenActionMenuId(null);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedTransaction(null);
    };

    const updateTransaction = (updatedTransactionData) => {
        setTransactions((prevTransactions) => prevTransactions.map((transaction) => (transaction.id === updatedTransactionData.id ? updatedTransactionData : transaction)));
    };

    const deleteTransaction = (transactionId) => {
        if (confirm("Are you sure you want to delete this transaction?")) {
            setTransactions((prevTransaction) => prevTransaction.filter((transaction) => transaction.id !== transactionId));
            setOpenActionMenuId(null);
        }
    };

    const filteredTransaction = transactions.filter(
        (transaction) => transaction.activity.toLowerCase().includes(searchQuery.toLowerCase()) || transaction.date.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="flex items-center justify-end">
                <button onClick={openModal} className="flex gap-2 items-center space-x-2 border border-gray-200 bg-gray-100 rounded-xl px-3 py-3 text-md font-bold text-gray-800 hover:bg-gray-50">
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
                <table className="min-w-full text-sm text-left table-fixed">
                    <thead className="text-gray-500 bg-gray-50">
                        <tr className="border-b border-gray-200">
                            <th className="p-3 text-gray-300">
                                <SquareIcon size={20} />
                            </th>
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
                                <td className="p-3 text-gray-300">
                                    <SquareIcon size={20} />
                                </td>
                                <td className="p-3 w-1/5 font-semibold text-gray-800">{transaction.activity}</td>
                                <td className="p-3 font-semibold text-gray-800">{transaction.id_transaction}</td>
                                <td className="p-3 font-semibold text-gray-800">{transaction.date}</td>
                                <td className="p-3 font-semibold text-gray-800">{formatCurrency(transaction.price)}</td>
                                <td className="p-3">
                                    <TypePill type={transaction.type} />
                                </td>
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
                                            <button onClick={() => deleteTransaction(transaction.id)} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
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
            {isAddModalOpen && <AddTransactionModal onClose={closeModal} onAddTransaction={addTransaction} />}
            {isEditModalOpen && <EditTransactionModal onClose={closeEditModal} onUpdateTransaction={updateTransaction} transactionToEdit={selectedTransaction} />}
        </div>
    );
};
