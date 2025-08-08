import Header from "../components/Header";
import { CardsTable } from "./CardsTable";

export default function CardsPage() {
    return (
        <div className="ml-4">
            <Header />

            <div className="mt-4">
                <div className="bg-white p-5 rounded-3xl">
                    
                    <CardsTable />
                
                </div>
            </div>
        </div>
    );
}
