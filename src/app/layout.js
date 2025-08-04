// File: app/layout.js

import { Manrope } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar"; // Sidebar akan menjadi bagian dari layout utama

const manrope = Manrope({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800']
});

export const metadata = {
  title: "Cashora Dashboard",
  description: "Modern Finance Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className={`${manrope.className} bg-gray-200`}>
        {/* Padding untuk seluruh aplikasi (p-5) */}
        <div className="p-4 min-h-screen">
          {/* Wrapper utama dengan position: relative untuk 'mengikat' sidebar */}
          <div className="relative h-[calc(100vh-2.5rem)] w-full">
            
            {/* Sidebar dipanggil di sini */}
            <Sidebar />

            {/* Konten utama diberi margin kiri seukuran sidebar */}
            <main className="ml-72 h-full overflow-y-auto">
              {/* {children} akan merender isi dari page.jsx */}
              {children}
            </main>

          </div>
        </div>
      </body>
    </html>
  );
}