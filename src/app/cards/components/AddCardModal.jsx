"use client";

import { useState } from "react";
import { X, Landmark, CreditCard, Wallet, UserRound } from "lucide-react";

export default function AddCardModal({ onClose }) {
    const [bankName, setBankName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardBalance, setCardBalance] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!bankName) newErrors.bankName = "Bank name is required.";
        if (!cardNumber) newErrors.cardNumber = "Card number is required.";
        if (!cardName) newErrors.cardNumber = "Card name is required.";
        if (!cardBalance) newErrors.cardBalance = "Card balance is required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newCardData = {
            bank: bankName,
            card_number: cardNumber,
            card_name: cardName,
            balance: cardBalance,
        };

        console.log("New Card Data:", newCardData);

        alert("Card added successfully! (Check console for data)");
        onClose();
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300 backdrop-blur-xs" onClick={onClose}>
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Card</h2>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        {/* Input Bank Name */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Bank</label>
                            <Landmark size={20} className="absolute left-3 top-10 text-gray-400" />
                            <input
                                type="text"
                                placeholder="e.g., BRI, Jago"
                                value={bankName}
                                onChange={(e) => setBankName(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300 font-semibold text-gray-600"
                            />
                            {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
                        </div>

                        {/* Input Card Number */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Card Number</label>
                            <CreditCard size={20} className="absolute left-3 top-10 text-gray-400" />
                            <input
                                type="number"
                                placeholder="Enter 12-16 digit card number"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300 font-semibold text-gray-600"
                            />
                            {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                        </div>

                        {/* Input Card Name */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Name</label>
                            <UserRound size={20} className="absolute left-3 top-10 text-gray-400" />
                            <input
                                type="text"
                                placeholder="e.g., John Doe"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300 font-semibold text-gray-600"
                            />
                            {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                        </div>

                        {/* Input Balance */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Card Balance</label>
                            <Wallet size={20} className="absolute left-3 top-10 text-gray-400" />
                            <input
                                type="number"
                                placeholder="e.g., 5000000"
                                value={cardBalance}
                                onChange={(e) => setCardBalance(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300 font-semibold text-gray-600"
                            />
                            {errors.cardBalance && <p className="text-red-500 text-xs mt-1">{errors.cardBalance}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 mt-8">
                        <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="px-6 py-3 text-sm font-semibold text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition-colors">
                            Save Card
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
