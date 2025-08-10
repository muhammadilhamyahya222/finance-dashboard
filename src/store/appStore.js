import { create } from 'zustand';

const initialCards = [
    { id: "1", bank: "BRI", card_number: "423598234979", name: "Muhammad Ilham Yahya", balance: 5000000, color: "blue", exp: "12/28", cvv: "123" },
    { id: "2", bank: "Jago", card_number: "334668324534", name: "Muhammad Ilham Yahya", balance: 2450000, color: "orange", exp: "06/27", cvv: "456" },
    { id: "3", bank: "BTN", card_number: "976345235545", name: "Muhammad Ilham Yahya", balance: 8000000, color: "green", exp: "09/29", cvv: "789" },
];

const initialTransactions = [
    { id: "1", id_transaction: "INV_000075", activity: "KAI Sby-Jbr", date: "15 Apr, 2028", time: "11:30 AM", price: "88000", type: "Expense", category: "Ticket", fund: "BRI" },
    { id: "2", id_transaction: "INV_000076", activity: "Hotel Booking", date: "17 Apr, 2028", time: "03:45 PM", price: "150000", type: "Expense", category: "Ticket", fund: "BRI" },
    { id: "3", id_transaction: "INV_000074", activity: "Geprek Basmalah", date: "15 Apr, 2028", time: "09:00 AM", price: "13000", type: "Income", category: "Food", fund: "BTN" },
];

export const useAppStore = create((set, get) => ({

    cards: initialCards,
    transactions: initialTransactions,

    // === ACTIONS ===

    // --- Card ---
    addCard: (newCardData) => {
        const colors = ["blue", "orange", "green", "red", "purple", "teal"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const newCardWithId = { ...newCardData, id: Date.now().toString(), color: newCardData.color || randomColor };
        set((state) => ({ cards: [newCardWithId, ...state.cards] }));
    },
    updateCard: (updatedCard) => {
        set((state) => ({
            cards: state.cards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
        }));
    },
    deleteCard: (cardId) => {
        set((state) => ({
            cards: state.cards.filter((card) => card.id !== cardId)
        }));
    },

    // --- Transaction ---
    addTransactionAndUpdateBalance: (newTransactionData) => {
        set((state) => {
            let updatedCards = [...state.cards];
            const transactionPrice = parseFloat(newTransactionData.price);
            const cardIndex = state.cards.findIndex(card => card.bank === newTransactionData.fund);

            if (cardIndex !== -1) {
                const cardToUpdate = { ...updatedCards[cardIndex] };
                if (newTransactionData.type === 'Expense') {
                    cardToUpdate.balance -= transactionPrice;
                } else if (newTransactionData.type === 'Income') {
                    cardToUpdate.balance += transactionPrice;
                }
                updatedCards[cardIndex] = cardToUpdate;
            }

            return {
                transactions: [newTransactionData, ...state.transactions],
                cards: updatedCards
            };
        });
    },

    deleteTransaction: (transactionId) => {
        set((state) => {
            const transactionToDelete = state.transactions.find(t => t.id === transactionId);
            if (!transactionToDelete) return {};

            let updatedCards = [...state.cards];
            const transactionPrice = parseFloat(transactionToDelete.price);
            const cardIndex = state.cards.findIndex(card => card.bank === transactionToDelete.fund);

            if (cardIndex !== -1) {
                const cardToUpdate = { ...updatedCards[cardIndex] };
                if (transactionToDelete.type === 'Expense') {
                    cardToUpdate.balance += transactionPrice;
                } else if (transactionToDelete.type === 'Income') {
                    cardToUpdate.balance -= transactionPrice;
                }
                updatedCards[cardIndex] = cardToUpdate;
            }

            return {
                transactions: state.transactions.filter(t => t.id !== transactionId),
                cards: updatedCards
            };
        });
    },

    updateTransaction: (updatedTransaction) => {
        set((state) => {
            const originalTransaction = state.transactions.find(t => t.id === updatedTransaction.id);
            if (!originalTransaction) return {};

            let updatedCards = [...state.cards];

            const originalPrice = parseFloat(originalTransaction.price);
            const originalCardIndex = state.cards.findIndex(c => c.bank === originalTransaction.fund);
            if (originalCardIndex !== -1) {
                if (originalTransaction.type === 'Expense') updatedCards[originalCardIndex].balance += originalPrice;
                else updatedCards[originalCardIndex].balance -= originalPrice;
            }

            const newPrice = parseFloat(updatedTransaction.price);
            const newCardIndex = updatedCards.findIndex(c => c.bank === updatedTransaction.fund);
            if (newCardIndex !== -1) {
                if (updatedTransaction.type === 'Expense') updatedCards[newCardIndex].balance -= newPrice;
                else updatedCards[newCardIndex].balance += newPrice;
            }
            
            return {
                transactions: state.transactions.map(t => t.id === updatedTransaction.id ? updatedTransaction : t),
                cards: updatedCards
            };
        });
    },
}));
