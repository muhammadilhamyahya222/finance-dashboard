import { Manrope } from "next/font/google";
import "./globals.css";
import "./output.css";
import Sidebar from "./components/Sidebar";

const manrope = Manrope({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
    title: "Ngrekap Dashboard",
    description: "Modern Finance Dashboard",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link href="./output.css" rel="stylesheet" />
            </head>
            <body className={`${manrope.className} bg-gray-200`}>
                <div className="p-4 min-h-screen">
                    <div className="relative h-[calc(100vh-2.5rem)] w-full">
                        <Sidebar />

                        <main className="ml-72 h-full overflow-y-auto">{children}</main>
                    </div>
                </div>
            </body>
        </html>
    );
}
