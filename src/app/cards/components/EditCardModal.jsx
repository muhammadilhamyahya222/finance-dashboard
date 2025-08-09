"use client";

import { useState, useEffect } from "react";
import { X, Landmark, CreditCard, Wallet, UserRound, Calendar, Lock } from "lucide-react";
import { useCardStore } from "@/store/cardStore";

export default function EditCardModal({ onClose, cardToEdit }) {
    const [bankName, setBankName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardBalance, setCardBalance] = useState("");
    const [exp, setExp] = useState("");
    const [cvv, setCvv] = useState("");
    const [errors, setErrors] = useState({});

    const updateCard = useCardStore((state) => state.updateCard);

    useEffect(() => {
        if (cardToEdit) {
            setBankName(cardToEdit.bank || "");
            setCardNumber(cardToEdit.card_number || "");
            setCardName(cardToEdit.name || "");
            setCardBalance(cardToEdit.balance || "");
            setExp(cardToEdit.exp || "");
            setCvv(cardToEdit.cvv || "");
        }
    }, [cardToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!bankName) newErrors.bankName = "Bank name is required.";
        if (!cardNumber) newErrors.cardNumber = "Card number is required.";
        if (!cardName) newErrors.cardName = "Card name is required.";
        if (!exp || exp.length < 5) newErrors.exp = "Invalid EXP date.";
        if (!cvv) newErrors.cvv = "CVV is required.";
        if (!cardBalance) newErrors.cardBalance = "Card balance is required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const updatedCardData = {
            ...cardToEdit,
            bank: bankName,
            card_number: cardNumber,
            name: cardName,
            balance: parseFloat(cardBalance),
            exp: exp,
            cvv: cvv,
        };

        updateCard(updatedCardData);
        onClose();
    };

    const handleExpChange = (e) => {
        let numericValue = e.target.value.replace(/\D/g, '');

        if (numericValue.length > 4) {
            numericValue = numericValue.slice(0, 4);
        }

        if (numericValue.length > 2) {
            const formattedValue = `${numericValue.slice(0, 2)}/${numericValue.slice(2)}`;
            setExp(formattedValue);
        } else {
            setExp(numericValue);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Card</h2>

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
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-gray-300 font-semibold text-gray-600"
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
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-gray-300 font-semibold text-gray-600"
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
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-gray-300 font-semibold text-gray-600"
                            />
                            {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                        </div>

                        <div className="flex space-x-4">
                            {/* Input EXP */}
                            <div className="relative w-1/2">
                                <label className="block text-sm font-semibold text-gray-600 mb-1">EXP</label>
                                <Calendar size={20} className="absolute left-3 top-10 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="MM/YY"
                                    value={exp}
                                    onChange={handleExpChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-gray-300 font-semibold text-gray-600"
                                />
                                {errors.exp && <p className="text-red-500 text-xs mt-1">{errors.exp}</p>}
                            </div>
                            {/* Input CVV */}
                            <div className="relative w-1/2">
                                <label className="block text-sm font-semibold text-gray-600 mb-1">CVV</label>
                                <Lock size={20} className="absolute left-3 top-10 text-gray-400" />
                                <input
                                    type="number"
                                    placeholder="e.g., 123"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-gray-300 font-semibold text-gray-600"
                                />
                                {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                            </div>
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
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-gray-300 font-semibold text-gray-600"
                            />
                            {errors.cardBalance && <p className="text-red-500 text-xs mt-1">{errors.cardBalance}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 mt-8">
                        <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="px-6 py-3 text-sm font-semibold text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition-colors">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
