"use client";

import { useState, useEffect } from "react";
import { X, Landmark, ChevronDown, UserRound, LayoutGrid, Banknote, WalletCards, ReceiptText, ShoppingBag } from "lucide-react";
import { useAppStore } from "@/store/appStore";

export default function EditTransactionModal({ onClose, onUpdateTransaction, transactionToEdit }) {
    const formatDateForInput = (dateStr) => {
        if (!dateStr) return "";
        const dateObj = new Date(dateStr);
        if (isNaN(dateObj)) return "";
        return dateObj.toISOString().split("T")[0];
    };

    const [activity, setActivity] = useState("");
    const [orderId, setOrderId] = useState("");
    const [date, setDate] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [fund, setFund] = useState("");
    const [errors, setErrors] = useState({});
    const { updateTransaction, cards } = useAppStore();

    useEffect(() => {
        if (transactionToEdit) {
            setActivity(transactionToEdit.activity || "");
            setOrderId(transactionToEdit.id_transaction || "");
            setDate(formatDateForInput(transactionToEdit.date));
            setPrice(transactionToEdit.price || "");
            setType(transactionToEdit.type || "");
            setCategory(transactionToEdit.category || "");
            setFund(transactionToEdit.fund || "");
        }
    }, [transactionToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!activity) newErrors.activity = "Activity name is required.";
        if (!orderId) newErrors.orderId = "Order Id number is required.";
        if (!date) newErrors.date = "Date is required.";
        if (!price) newErrors.price = "Price balance is required.";
        if (!type) newErrors.type = "Type is required.";
        if (!category) newErrors.category = "Category is required.";
        if (!fund) newErrors.fund = "Fund Source is required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const updatedTransactionData = {
            ...transactionToEdit,
            activity,
            id_transaction: orderId,
            date: new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
            price,
            type,
            category,
            fund,
        };

        const success = updateTransaction(updatedTransactionData);

        if (success) {
            onClose();
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                price: "Insufficient balance for this update.",
            }));
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300 backdrop-blur-xs" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                <div className="p-8 pb-6 flex-shrink-0">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                    {/* 5. Ubah Judul Modal */}
                    <h2 className="text-2xl font-bold text-gray-800">Edit Transaction</h2>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto px-8">
                        <div className="space-y-5">
                            {/* Input Activity Name */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Activity Name</label>
                                <ShoppingBag size={20} className="absolute left-3 top-9.5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="e.g., 1 Fire Chicken"
                                    value={activity}
                                    onChange={(e) => setActivity(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-gray-300 font-semibold text-gray-600"
                                />
                                {errors.activity && <p className="text-red-500 text-xs mt-1">{errors.activity}</p>}
                            </div>

                            {/* Input Order Id */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Order Id</label>
                                <ReceiptText size={20} className="absolute left-3 top-9.5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Enter order id on the receipt"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-gray-300 font-semibold text-gray-600"
                                />
                                {errors.orderId && <p className="text-red-500 text-xs mt-1">{errors.orderId}</p>}
                            </div>

                            {/* Input Date */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Date</label>
                                <UserRound size={20} className="absolute left-3 top-9.5 text-gray-400" />
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold text-gray-600"
                                />
                                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                            </div>

                            {/* Input Price */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Price</label>
                                <Banknote size={20} className="absolute left-3 top-9.5 text-gray-400" />
                                <input
                                    type="number"
                                    placeholder="e.g., 50000"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-gray-300 font-semibold text-gray-600"
                                />
                                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                            </div>

                            {/* Input Type */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Type</label>
                                <WalletCards size={20} className="absolute left-3 top-9.5 text-gray-400" />
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-gray-300 font-semibold text-gray-600 appearance-none"
                                >
                                    <option value="" disabled>
                                        Choose Type
                                    </option>
                                    <option value="Income">Income</option>
                                    <option value="Expense">Expense</option>
                                </select>
                                <ChevronDown size={20} className="absolute right-4 top-10 text-gray-400 pointer-events-none" />
                                {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                            </div>

                            {/* Input Category */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Category</label>
                                <LayoutGrid size={20} className="absolute left-3 top-9.5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="e.g., Food"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-gray-300 font-semibold text-gray-600"
                                />
                                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                            </div>

                            {/* Input Fund */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Fund Source</label>
                                <Landmark size={20} className="absolute left-3 top-10 text-gray-400" />
                                <select
                                    value={fund}
                                    onChange={(e) => setFund(e.target.value)}
                                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold text-gray-600 appearance-none"
                                >
                                    <option value="" disabled>
                                        Choose Fund
                                    </option>
                                    {cards.map((card) => (
                                        <option key={card.id} value={card.bank}>
                                            {card.bank}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown size={20} className="absolute right-4 top-10 text-gray-400 pointer-events-none" />
                                {errors.fund && <p className="text-red-500 text-xs mt-1">{errors.fund}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="p-8 pt-6 flex-shrink-0">
                        <div className="flex justify-end space-x-4">
                            <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                                Cancel
                            </button>
                            <button type="submit" className="px-6 py-3 text-sm font-semibold text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
