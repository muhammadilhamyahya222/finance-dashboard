import { create } from "zustand";

const initialTransactionsList = [
    { id: "1", id_transaction: "INV_000075", activity: "KAI Sby-Jbr", date: "15 Apr, 2028", time: "11:30 AM", price: "88000", type: "Expense", category: "Ticket", fund: "BRI" },
    { id: "2", id_transaction: "INV_000076", activity: "Hotel Booking", date: "17 Apr, 2028", time: "03:45 PM", price: "150000", type: "Expense", category: "Ticket", fund: "BRI" },
    { id: "3", id_transaction: "INV_000074", activity: "Geprek Basmalah", date: "15 Apr, 2028", time: "09:00 AM", price: "13000", type: "Income", category: "Food", fund: "BTN" },
];

export const useTransactionStore = create((set) => ({

    transactions: initialTransactionsList,

    addTransaction: (newTransactionData) => {
        set((state) => ({
            transactions: [newTransactionData, ...state.transactions],
        }));
    },

    updateTransaction: (updatedTransaction) => {
        set((state) => ({
            transactions: state.transactions.map((transaction) => (transaction.id === updatedTransaction.id ? updatedTransaction : transaction)),
        }));
    },

    deleteTransaction: (transactionId) => {
        set((state) => ({
            transactions: state.transactions.filter((transaction) => transaction.id !== transactionId),
        }));
    },
}));
