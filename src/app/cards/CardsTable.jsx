"use client";

import { useState } from "react";
import { Search, MoreHorizontal, SquareIcon, PlusCircle, CreditCard } from "lucide-react";
import AddCardModal from "./components/AddCardModal";

import { useCardStore } from "@/store/cardStore";

const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export const CardsTable = () => {
    const { cards, addCard, deleteCard } = useCardStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [openActionMenuId, setOpenActionMenuId] = useState(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleAddCard = (newCardData) => {
        addCard(newCardData);
    };

    const handleDeleteCard = (cardId) => {
        if (confirm("Are you sure you want to delete this card?")) {
            deleteCard(cardId);
            setOpenActionMenuId(null);
        }
    };

    const filteredCards = cards.filter((card) => card.bank.toLowerCase().includes(searchQuery.toLowerCase()) || card.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div>
            <div className="flex items-center justify-end">
                <button
                    onClick={openModal}
                    className="flex gap-2 items-center space-x-2 border border-gray-200 bg-gray-100 rounded-xl px-3 py-3 text-md font-bold text-gray-800 hover:bg-gray-50 transition-colors"
                >
                    <PlusCircle size={20} /> Add Card
                </button>
            </div>

            <div className="flex items-center justify-between border p-2 bg-gray-50 border-gray-200 rounded-2xl mt-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center space-x-2 border border-gray-200 bg-white rounded-xl p-2 text-sm font-semibold text-gray-800">
                        <CreditCard size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Card List</h2>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800" />
                        <input
                            type="text"
                            placeholder="Search by bank or name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="py-2 pl-11 w-60 bg-white border border-gray-200 rounded-xl text-sm font-semibold placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto mt-3 rounded-2xl border border-gray-200">
                <table className="min-w-full text-sm text-left">
                    <thead className="text-gray-500 bg-gray-50">
                        <tr className="border-b border-gray-200">
                            <th className="p-3 w-12">
                                <SquareIcon size={20} />
                            </th>
                            <th className="p-3 font-semibold">Bank</th>
                            <th className="p-3 font-semibold">Card Number</th>
                            <th className="p-3 font-semibold">Name</th>
                            <th className="p-3 font-semibold">Balance</th>
                            <th className="p-3 font-semibold">Expired</th>
                            <th className="p-3 font-semibold">CVV</th>
                            <th className="p-3 font-semibold text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCards.map((card) => (
                            <tr key={card.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="p-3 text-gray-300">
                                    <SquareIcon size={20} />
                                </td>
                                <td className="p-3 font-semibold text-gray-800">{card.bank}</td>
                                <td className="p-3 font-semibold text-gray-800">{card.card_number.slice(0, -6) + "******"}</td>
                                <td className="p-3 font-semibold text-gray-800">{card.name}</td>
                                <td className="p-3 font-bold text-gray-800 text-sm">{formatCurrency(card.balance)}</td>
                                <td className="p-3 font-semibold text-gray-800">{card.exp}</td>
                                <td className="p-3 font-semibold text-gray-800">{card.cvv.slice(3) + "***"}</td>
                                <td className="p-3 relative">
                                    <div className="flex justify-center">
                                        <button
                                            onClick={() => setOpenActionMenuId(openActionMenuId === card.id ? null : card.id)}
                                            className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-200"
                                        >
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </div>
                                    {openActionMenuId === card.id && (
                                        <div className="absolute right-4 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Edit
                                            </a>
                                            <button onClick={() => handleDeleteCard(card.id)} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
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

            {isModalOpen && <AddCardModal onClose={closeModal} onAddCard={handleAddCard} />}
        </div>
    );
};
