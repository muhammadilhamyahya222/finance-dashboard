// src/store/cardStore.js

import { create } from 'zustand';

// Data awal kartu Anda
const initialCardList = [
    { id: "1", bank: "BRI", card_number: "423598234979", name: "Muhammad Ilham Yahya", balance: 5000000 },
    { id: "2", bank: "Jago", card_number: "334668324534", name: "Muhammad Ilham Yahya", balance: 2450000 },
    { id: "3", bank: "BTN", card_number: "976345235545", name: "Muhammad Ilham Yahya", balance: 8000000 },
];

export const useCardStore = create((set) => ({
    // State: data yang disimpan
    cards: initialCardList,

    // Actions: fungsi untuk mengubah state
    addCard: (newCardData) => {
        const newCardWithId = { ...newCardData, id: Date.now().toString() };
        set((state) => ({
            cards: [newCardWithId, ...state.cards]
        }));
    },

    deleteCard: (cardId) => {
        set((state) => ({
            cards: state.cards.filter((card) => card.id !== cardId)
        }));
    },
}));