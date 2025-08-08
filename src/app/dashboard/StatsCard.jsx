import { Wallet, TrendingUp, TrendingDown, PiggyBank, MoreHorizontal } from "lucide-react";

const cardStyles = {
    balance: {
        Icon: Wallet,
        gradient: "from-purple-500 to-indigo-600",
        title: "Total Balance",
        subtitle: "Net worth across all.",
    },
    income: {
        Icon: TrendingUp,
        gradient: "from-orange-500 to-red-500",
        title: "Monthly Income",
        subtitle: "Total income this month",
    },
    expenses: {
        Icon: TrendingDown,
        gradient: "from-pink-500 to-rose-500",
        title: "Monthly Expenses",
        subtitle: "Total Expenses.",
    },
    savings: {
        Icon: PiggyBank,
        gradient: "from-blue-400 to-sky-500",
        title: "Savings",
        subtitle: "This month savings",
    },
};

export const StatsCard = ({ type, amount }) => {
    const { Icon, gradient, title, subtitle } = cardStyles[type];

    return (
        <div className="bg-gray-50 p-2 rounded-2xl border flex flex-col justify-between h-full">
            {/* Bagian Atas: Ikon dan Jumlah */}
            <div className="bg-white p-2 rounded-2xl border">
                <div className="flex items-start space-x-2">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient}`}>
                        <Icon className="text-white" size={24} />
                    </div>
                    <div className="text-left">
                        <p className="text-2xl font-bold text-gray-800">{amount}</p>
                        <p className="text-xs text-gray-600">{subtitle}</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-2 ml-1 mr-1">
                <p className="text-md font-semibold text-gray-800">{title}</p>
                <button className="text-gray-600 hover:text-gray-700">
                    <MoreHorizontal size={20} />
                </button>
            </div>
        </div>
    );
};
