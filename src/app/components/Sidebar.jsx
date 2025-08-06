"use client";

import { LayoutGrid, Settings, LogOut, Palette, CreditCard, ArrowRightLeft } from "lucide-react";
import Link from "next/link";

const NavItem = ({ icon, label, href, active, alertCount, children }) => (
    <div className={`relative flex items-center justify-between py-4 px-4 rounded-lg transition-colors ${active ? "bg-gray-100" : "hover:bg-gray-50"}`}>
        <Link href={href || "#"} className="flex items-center grow">
            {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-brand-600 rounded-full"></div>}
            <div className="flex items-center">
                <div className={`${active ? "text-gray-600" : "text-gray-500"}`}>{icon}</div>
                <span className={`ml-3 text-sm font-semibold ${active ? "text-gray-900" : "text-gray-500"}`}>{label}</span>
            </div>
        </Link>

        {alertCount && <span className="bg-brand-500 text-white text-xs font-bold rounded-full px-2 py-0.5">{alertCount}</span>}

        {children}
    </div>
);

const ThemeToggle = () => (
    <div className="relative inline-flex items-center cursor-default">
        <div className="w-11 h-6.5 bg-brand-500 rounded-full"></div>
        <div className="absolute top-[3px] left-0.5 bg-white border-none rounded-full h-5 w-5 transition-all"></div>
    </div>
);

const Sidebar = () => {
    return (
        <aside className="absolute h-full w-72 bg-white rounded-3xl p-6 flex flex-col z-20">
            <div className="flex items-center gap-3 mb-10 pl-4">
                <div className="bg-brand-600 p-2.5 rounded-lg">
                    <p className="font-bold text-lg text-white">D</p>
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Ngrekap</h1>
            </div>

            {/* MENU */}
            <div className="mb-8">
                <p className="text-sm text-gray-400 font-normal mb-2 pl-4">Menu</p>
                <nav className="flex flex-col space-y-1">
                    <NavItem icon={<LayoutGrid size={20} />} label="Dashboard" href="/" active />
                    <NavItem icon={<ArrowRightLeft size={20} />} label="Transaction" href="/transactions" />
                    <NavItem icon={<CreditCard size={20} />} label="Cards" href="#" />
                </nav>
            </div>

            {/* GENERAL */}
            <div className="flex-grow">
                <p className="text-sm text-gray-400 font-normal mb-4 pl-4">General</p>
                <nav className="flex flex-col space-y-1">
                    <NavItem icon={<Settings size={20} />} label="Settings" href="#" />
                    <NavItem icon={<Palette size={20} />} label="Theme" href="#">
                        <ThemeToggle />
                    </NavItem>
                </nav>
            </div>

            {/* LOGOUT */}
            <div className="mt-auto">
                <NavItem icon={<LogOut size={20} />} label="Log Out" href="#" />
            </div>
        </aside>
    );
};

export default Sidebar;
