// File: app/page.jsx

import Header from "./components/Header";

export default function DashboardPage() {
  return (
    // Padding p-8 ini menciptakan jarak antara Header/Konten dengan bingkai aplikasi
    <div className="ml-4">
      <Header />
      
      <div className="mt-4">
          <div className="bg-white p-8 rounded-3xl">
            <h2 className="font-bold text-xl">Area Main Content</h2>
            <p className="text-gray-500 mt-2">
              Sekarang semua sudah pas. Ada bingkai, dan semua komponen terpisah dengan jarak.
            </p>
          </div>
      </div>
    </div>
  );
}