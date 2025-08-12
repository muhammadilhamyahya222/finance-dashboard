// src/app/page.jsx
"use client";

import Header from "./components/Header";
import { Greeting } from "./dashboard/Greeting";
import { MyCards } from "./dashboard/MyCards";
import { RecentTransactions } from "./dashboard/RecentTransactions";
import { TransactionsOverview } from "./dashboard/TransactionsOverview";

export default function DashboardPage() {
    return (
        <div className="ml-4">
            <Header />

            <div className="mt-4">
                <div className="bg-white p-5 rounded-3xl">
                    {/* Komponen Greeting sekarang sudah berisi StatsCard */}
                    <Greeting />
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
