import { create } from 'zustand';

const initialCardList = [
    { 
        id: "1", 
        bank: "BRI", 
        card_number: "423598234979", 
        name: "Muhammad Ilham Yahya", 
        balance: 5000000,
        color: "blue",
        exp: "12/28",
        cvv: "123"
    },
    { 
        id: "2", 
        bank: "Jago", 
        card_number: "334668324534", 
        name: "Muhammad Ilham Yahya", 
        balance: 2450000,
        color: "orange",
        exp: "06/27",
        cvv: "456"
    },
    { 
        id: "3", 
        bank: "BTN", 
        card_number: "976345235545", 
        name: "Muhammad Ilham Yahya", 
        balance: 8000000,
        color: "gray",
        exp: "09/29",
        cvv: "789"
    },
];

export const useCardStore = create((set) => ({
    cards: initialCardList,

    addCard: (newCardData) => {
        const colors = ["blue", "orange", "green", "red", "purple", "teal"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const newCardWithId = { 
            ...newCardData, 
            id: Date.now().toString(),
            color: newCardData.color || randomColor
        };
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
