"use client";

import { useState } from "react";
import { X, Landmark, CreditCard, Wallet, UserRound } from "lucide-react";

export default function AddTransactionModal({ onClose }) {
    const [activity, setActivity] = useState("");
    const [orderId, setOrderId] = useState("");
    const [date, setDate] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [fund, setFund] = useState("");
    const [errors, setErrors] = useState({});

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

        const newTransactionData = {
            activity: activity,
            order_id: orderId,
            date: date,
            price: price,
            type: type,
            category: category,
            fund: fund,
        };

        console.log("New Card Data:", newTransactionData);

        alert("Card added successfully! (Check console for data)");
        onClose();
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300 backdrop-blur-xs" onClick={onClose}>
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Transaction</h2>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        {/* Input Activity Name */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Activity Name</label>
                            <Landmark size={20} className="absolute left-3 top-10 text-gray-400" />
                            <input
                                type="text"
                                placeholder="e.g., 1 Fire Chicken"
                                value={activity}
                                onChange={(e) => setActivity(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300 font-semibold text-gray-600"
                            />
                            {errors.activity && <p className="text-red-500 text-xs mt-1">{errors.activity}</p>}
                        </div>

                        {/* Input Order Id */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Order Id</label>
                            <CreditCard size={20} className="absolute left-3 top-10 text-gray-400" />
                            <input
                                type="number"
                                placeholder="Enter order id on the receipt"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300 font-semibold text-gray-600"
                            />
                            {errors.orderId && <p className="text-red-500 text-xs mt-1">{errors.orderId}</p>}
                        </div>

                        {/* Input Date */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Date</label>
                            <UserRound size={20} className="absolute left-3 top-10 text-gray-400" />
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-gray-600"
                            />
                            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                        </div>

                        {/* Input Price */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Price</label>
                            <Wallet size={20} className="absolute left-3 top-10 text-gray-400" />
                            <input
                                type="number"
                                placeholder="e.g., 50000"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300 font-semibold text-gray-600"
                            />
                            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                        </div>

                        {/* Input Price */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Type</label>
                            <Wallet size={20} className="absolute left-3 top-10 text-gray-400" />
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300 font-semibold text-gray-600 appearance-none"
                            >
                                <option value="" disabled>
                                    Choose Type
                                </option>

                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                        </div>

                        {/* Input Category */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Category</label>
                            <Wallet size={20} className="absolute left-3 top-10 text-gray-400" />
                            <input
                                type="text"
                                placeholder="e.g., Food"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300 font-semibold text-gray-600"
                            />
                            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                        </div>

                        {/* Input Fund */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Fund Source</label>
                            <Wallet size={20} className="absolute left-3 top-10 text-gray-400" />
                            <select
                                value={fund}
                                onChange={(e) => setFund(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300 font-semibold text-gray-600 appearance-none"
                            >
                                <option value="" disabled>
                                    Choose Fund
                                </option>

                                <option value="bri">BRI</option>
                                <option value="btn">BTN</option>
                                <option value="jago">Jago</option>
                            </select>
                            {errors.fund && <p className="text-red-500 text-xs mt-1">{errors.fund}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 mt-8">
                        <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="px-6 py-3 text-sm font-semibold text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition-colors">
                            Save Transaction
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
