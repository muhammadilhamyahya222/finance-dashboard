// src/app/page.jsx
"use client"; // Tambahkan ini karena kita akan menggunakan hook

import Header from "./components/Header";
import { Greeting } from "./dashboard/Greeting";
import { MyCards } from "./dashboard/MyCards";
import { RecentTransactions } from "./dashboard/RecentTransactions";
import { StatsCard } from "./dashboard/StatsCard";
import { TransactionsOverview } from "./dashboard/TransactionsOverview";
import { useAppStore } from "@/store/appStore";

export default function DashboardPage() {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const { cards, transactions } = useAppStore();

    const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0);
    const totalIncome = transactions.filter((t) => t.type === "Income").reduce((sum, t) => sum + parseFloat(t.price), 0);

    const totalExpenses = transactions.filter((t) => t.type === "Expense").reduce((sum, t) => sum + parseFloat(t.price), 0);

    const totalSavings = totalIncome - totalExpenses;

    return (
        <div className="ml-4">
            <Header />

            <div className="mt-4">
                <div className="bg-white p-5 rounded-3xl">
                    <Greeting />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        <StatsCard type="balance" title="Net worth" amount={formatCurrency(totalBalance.toString())} subtitle="Net worth across all." />
                        <StatsCard type="income" title="Total Income" amount={formatCurrency(totalIncome.toString())} subtitle="Total income this month" />
                        <StatsCard type="expenses" title="Total Expenses" amount={formatCurrency(totalExpenses.toString())} subtitle="Total expenses" />
                        <StatsCard type="savings" title="Savings" amount={formatCurrency(totalSavings.toString())} subtitle="This month savings" />
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="lg:col-span-2">
                        <TransactionsOverview />
                    </div>
                    <div>
                        <MyCards />
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <div className="bg-white p-6 rounded-3xl">
                    <RecentTransactions />
                </div>
            </div>
        </div>
    );
}
