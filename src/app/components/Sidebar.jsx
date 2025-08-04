// File: app/components/Sidebar.jsx
"use client";

import { LayoutGrid, BarChart2, Sun, Clock, Settings, LogOut } from "lucide-react";
import Link from "next/link";

const NavItem = ({ icon, label, href, active, alertCount }) => (
    <Link href={href}>
        <div className={`relative flex items-center justify-between py-4 px-4 rounded-lg cursor-pointer transition-colors ${active ? "bg-gray-100" : "hover:bg-gray-50"}`}>
            {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-blue-600 rounded-full"></div>}
            <div className="flex items-center">
                <div className={`${active ? "text-blue-600" : "text-gray-500"}`}>{icon}</div>
                <span className={`ml-3 text-sm font-semibold ${active ? "text-gray-900" : "text-gray-500"}`}>{label}</span>
            </div>
            {alertCount && <span className="bg-blue-500 text-white text-xs font-bold rounded-full px-2 py-0.5">{alertCount}</span>}
        </div>
    </Link>
);

const Sidebar = () => {
    return (
        // Sidebar sebagai panel melayang yang fixed
        <aside className="absolute h-full w-72 bg-white rounded-3xl p-6 flex flex-col z-20">
            <div className="flex items-center gap-3 mb-10 pl-4">
                <div className="bg-blue-600 p-2.5 rounded-lg">
                    <p className="font-bold text-lg text-white">D</p>
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Cashora</h1>
            </div>

            <div className="mb-8">
                <p className="text-sm text-gray-400 font-semibold mb-2 pl-4">Menu</p>
                <nav className="flex flex-col space-y-1">
                    <NavItem icon={<LayoutGrid size={20} />} label="Dashboard" href="/" active />
                    <NavItem icon={<BarChart2 size={20} />} label="Analytics" href="#" />
                    <NavItem icon={<Sun size={20} />} label="Insights" href="#" />
                    <NavItem icon={<Clock size={20} />} label="Updates" href="#" />
                </nav>
            </div>

            <div className="flex-grow">
                <p className="text-sm text-gray-400 font-semibold mb-4 pl-4">General</p>
                <nav className="flex flex-col space-y-1">
                    <NavItem icon={<Settings size={20} />} label="Settings" href="#" />
                </nav>
            </div>

            <div className="mt-auto">
              <NavItem icon={<LogOut size={20} />} label="Log Out" href="#" />
            </div>
        </aside>
    );
};

export default Sidebar;
