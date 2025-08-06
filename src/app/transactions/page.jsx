import Header from "../components/Header";
import { TransactionsTable } from "./TransactionsTable";

export default function TransactionsPage() {
    return (
        <div className="ml-4">
            <Header />

            <div className="mt-4">
                <div className="bg-white p-6 rounded-3xl">
                    
                    <TransactionsTable />
                
                </div>
            </div>
        </div>
    );
}
