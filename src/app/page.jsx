import Header from "./components/Header";
import { Greeting } from "./dashboard/Greeting";
import { MyCards } from "./dashboard/MyCards";
import { RecentTransactions } from "./dashboard/RecentTransactions";
import { StatsCard } from "./dashboard/StatsCard";
import { TransactionsOverview } from "./dashboard/TransactionsOverview";

export default function DashboardPage() {
    return (
        <div className="ml-4">
            <Header />

            <div className="mt-4">
                <div className="bg-white p-5 rounded-3xl">
                    <Greeting />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        <StatsCard type="balance" title="Net worth" amount="Rp15450000" subtitle="Net worth across all." />
                        <StatsCard type="income" title="Total Income" amount="Rp5500000" subtitle="Total income this month" />
                        <StatsCard type="expenses" title="Total Expenses" amount="Rp3750000" subtitle="Total expenses" />
                        <StatsCard type="savings" title="Savings" amount="Rp1750000" subtitle="This month savings" />
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
