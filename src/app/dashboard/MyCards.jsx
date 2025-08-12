"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Wifi } from "lucide-react";
import { useAppStore } from "@/store/appStore";

const MastercardLogo = () => (
    <div className="flex">
        <div className="w-6 h-6 bg-red-500 rounded-full"></div>
        <div className="w-6 h-6 bg-orange-400 rounded-full -ml-3 opacity-90"></div>
    </div>
);

const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export const MyCards = () => {
    const cards = useAppStore((state) => state.cards);

    const [selectedCard, setSelectedCard] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (cards && cards.length > 0) {
            const defaultCard = cards.find((card) => card.bank.toLowerCase() === "bri") || cards[0];
            setSelectedCard(defaultCard);
        }
    }, [cards]);

    if (!selectedCard) {
        return (
            <div className="bg-white p-6 rounded-2xl h-full flex flex-col justify-center items-center">
                <h2 className="text-xl font-bold text-gray-800">My Cards</h2>
                <p className="text-sm text-gray-400 mt-2">No cards available.</p>
                <p className="text-sm text-gray-400 mt-1">Please add a card first.</p>
            </div>
        );
    }

    const handleCardSelect = (card) => {
        setSelectedCard(card);
        setIsMenuOpen(false);
    };

    const colorVariants = {
        blue: "bg-blue-600",
        orange: "bg-orange-500",
        green: "bg-green-600",
        red: "bg-red-600",
        purple: "bg-purple-600",
        teal: "bg-teal-600",
        gray: "bg-gray-600",
    };

    const cardColorClass = colorVariants[selectedCard.color] || "bg-gray-600";

    return (
        <div className="bg-white p-6 rounded-2xl h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">My Cards</h2>
                    <p className="text-sm text-gray-400">Total {cards.length} cards</p>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center space-x-2 text-gray-600 bg-gray-50 px-3 py-1 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                        <span className="font-semibold text-sm">{selectedCard.bank}</span>
                        <ChevronDown size={16} className={`transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-xl z-20">
                            {cards.map((card) => (
                                <a
                                    key={card.id}
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleCardSelect(card);
                                    }}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    {card.bank}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className={`p-4 rounded-xl text-white relative flex flex-col justify-between flex-grow min-h-[160px] transition-colors duration-300 ${cardColorClass}`}>
                <div className="flex justify-between items-center z-10">
                    <div className="flex items-center space-x-2">
                        <Wifi size={20} className="rotate-90" />
                        <span className="bg-white text-gray-800 text-xs px-2 py-1 rounded-full font-semibold">{selectedCard.bank}</span>
                    </div>
                    <MastercardLogo />
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-end mt-4 z-10">
                    <div>
                        <p className="text-[10px] opacity-70">Card Number</p>
                        <p className="font-mono text-sm tracking-wider">**** **** **** {selectedCard.card_number.slice(-4)}</p>
                    </div>
                    <div className="flex space-x-6">
                        <div>
                            <p className="text-[10px] opacity-70">EXP</p>
                            <p className="font-mono text-xs">{selectedCard.exp}</p>
                        </div>
                        <div>
                            <p className="text-[10px] opacity-70">CVV</p>
                            <p className="font-mono text-xs">*** {selectedCard.cvv.slice(3)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <p className="text-sm text-gray-600">Card Balance</p>
                <div className="flex items-baseline space-x-2 mt-1">
                    <p className="text-xl font-bold text-gray-800">{formatCurrency(selectedCard.balance)}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className={`h-2.5 rounded-full transition-colors duration-300 ${cardColorClass}`} style={{ width: "100%" }}></div>
                </div>
            </div>
        </div>
    );
};
