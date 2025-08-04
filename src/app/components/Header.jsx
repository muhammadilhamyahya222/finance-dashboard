// File: app/components/Header.jsx
"use client";
// ... (semua import sama seperti sebelumnya) ...
import { Search, GitCompare, Bell, Settings, ChevronDown } from "lucide-react";

const Header = () => {
    return (
        // Header sebagai panel terpisah dengan rounded di semua sisi
        <header className="bg-white p-3 rounded-3xl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 pl-2">Overview</h2>
                </div>

                {/* Grup Aksi di Kanan */}
                <div className="flex items-center gap-4">
                    {/* Search Bar (Tidak berubah) */}
                    <div className="relative">
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search anything..."
                            className="pl-11 pr-4 py-4 w-72 bg-gray-100 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* [PERUBAHAN] Pembungkus baru untuk ikon & profil */}
                    <div className="flex items-center bg-gray-100 rounded-full">
                        {/* Ikon-ikon di dalam pembungkus */}
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
                        {/* [PERUBAHAN] Garis pemisah vertikal yang halus */}
                    <div className="flex items-center bg-gray-100 rounded-full">

                        {/* Profil Pengguna di dalam pembungkus */}
                        <div className="flex items-center gap-2 p-1">
                            <img
                                src="profile.svg"
                                alt="User Profile"
                                className="h-11 w-11 rounded-full" // Ukuran gambar disesuaikan agar pas
                            />
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

export default Header;
