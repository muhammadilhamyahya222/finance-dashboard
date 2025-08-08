import { ChevronDown, Upload } from "lucide-react";

export const Greeting = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Good Morning, Ilham</h1>
                <p className="text-gray-500 mt-1">Here's an overview of your financial health and recent activity.</p>
            </div>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
                <button className="flex items-center space-x-2 border border-gray-200 bg-white rounded-lg px-2 py-2 text-md font-semibold text-gray-800 hover:bg-gray-50">
                    <span>This Month</span>
                    <ChevronDown size={16} />
                </button>
                <button className="flex items-center space-x-2 border border-gray-200 bg-white rounded-lg px-2 py-2 text-md font-semibold text-gray-800 hover:bg-gray-50">
                    <Upload size={16} />
                    <span>Export</span>
                </button>
            </div>
        </div>
    );
};
