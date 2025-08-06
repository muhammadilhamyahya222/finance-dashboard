"use client";

import { Search, GitCompare, Bell, ChevronDown } from "lucide-react";
import { usePathname } from 'next/navigation';

export default function Header() {

    const pathname = usePathname(); 

    const getTitle = () => {
        if (pathname === '/') {
            return 'Overview';
        }

        const title = pathname.substring(1);
        return title.charAt(0).toUpperCase() + title.slice(1);
    };
  
    const pageTitle = getTitle();

    return (
        <header className="bg-white p-3 rounded-3xl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-black text-gray-800 pl-2">{pageTitle}</h2>
                </div>

                <div className="flex items-center gap-4">
                    {/* SEARCH BAR */}
                    <div className="relative">
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                        <input
                            type="text"
                            placeholder="Search anything..."
                            className="pl-11 pr-4 py-4 w-72 bg-gray-100 border-none rounded-full text-sm font-semibold placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* ICON */}
                    <div className="flex items-center bg-gray-100 rounded-full">
                        <div className="flex items-center gap-1 p-2.5">
                            <button className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 hover:text-blue-600">
                                <GitCompare size={20} />
                            </button>
                            <button className="relative p-1.5 rounded-full hover:bg-gray-200 text-gray-500 hover:text-blue-600">
                                <Bell size={20} />
                                <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                            </button>
                        </div>
                    </div>

                    {/* PROFILE */}
                    <div className="flex items-center bg-gray-100 rounded-full">
                        <div className="flex items-center gap-2 p-1">
                            <img src="/profile.svg" alt="User Profile" className="h-11 w-11 rounded-full" />
                            <div>
                                <p className="font-bold text-sm text-gray-800">Ilham Yahya</p>
                                <p className="text-xs text-gray-500">code.yahya</p>
                            </div>
                            <button className="text-gray-500 hover:text-gray-800">
                                <ChevronDown size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};