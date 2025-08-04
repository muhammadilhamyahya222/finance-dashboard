// File: src/app/components/dashboard/MyCards.jsx
import { MoreHorizontal, Wifi } from 'lucide-react';

// Komponen kecil untuk logo Mastercard
const MastercardLogo = () => (
  <div className="flex">
    <div className="w-6 h-6 bg-red-500 rounded-full"></div>
    <div className="w-6 h-6 bg-orange-400 rounded-full -ml-3 opacity-90"></div>
  </div>
);

export const MyCards = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">My Cards</h2>
          <p className="text-sm text-gray-400">Total 3 cards</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Visual Kartu */}
      <div className="bg-blue-600 p-5 rounded-xl text-white relative flex flex-col justify-between flex-grow max-h-[180px]">
        {/* Latar belakang abstrak */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-700/50 to-transparent rounded-xl"></div>
        
        {/* Baris Atas Kartu */}
        <div className="flex justify-between items-center z-10">
          <div className="flex items-center space-x-2">
            <Wifi size={20} className="-rotate-90" />
            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-semibold">Active</span>
          </div>
          <MastercardLogo />
        </div>

        {/* Baris Bawah Kartu */}
        <div className="grid grid-cols-3 gap-4 z-10 mt-8">
            <div>
                <p className="text-xs opacity-70">Card Number</p>
                <p className="font-mono text-sm tracking-wider">**** 6782</p>
            </div>
             <div>
                <p className="text-xs opacity-70">EXP</p>
                <p className="font-mono text-sm">09/29</p>
            </div>
             <div>
                <p className="text-xs opacity-70">CVV</p>
                <p className="font-mono text-sm">***</p>
            </div>
        </div>
      </div>

      {/* Info Spending Limit */}
      <div className="mt-6">
        <p className="text-sm text-gray-600">Spending limit</p>
        <div className="flex items-baseline space-x-2 mt-1">
            <p className="text-xl font-bold text-gray-800">$3,884.00</p>
            <p className="text-sm font-normal text-gray-400">used from $20,630.00</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '18.8%' }}></div>
        </div>
      </div>
    </div>
  );
};
