const transactions = [
  { id: 'INV_000076', activity: 'Hotel Booking', date: '17 Apr, 2028', time: '03:45 PM', price: '$25,500', status: 'Success' },
  { id: 'INV_000075', activity: 'Flight Ticket Booking', date: '15 Apr, 2028', time: '11:30 AM', price: '$32,750', status: 'Pending' },
  { id: 'INV_000074', activity: 'Groceries', date: '15 Apr, 2028', time: '09:00 AM', price: '$1,200', status: 'Success' },
];

const StatusPill = ({ status }) => {
  const baseClasses = 'px-3 py-1 rounded-full text-xs font-semibold';
  const statusClasses = {
    Success: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
}

export const RecentTransactions = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Transaction</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="text-gray-500">
            <tr className="border-b">
              <th className="p-3 font-semibold">Activity</th>
              <th className="p-3 font-semibold">Order ID</th>
              <th className="p-3 font-semibold">Date</th>
              <th className="p-3 font-semibold">Price</th>
              <th className="p-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-800">{tx.activity}</td>
                <td className="p-3 text-gray-500">{tx.id}</td>
                <td className="p-3 text-gray-500">{tx.date}</td>
                <td className="p-3 font-medium text-gray-800">{tx.price}</td>
                <td className="p-3"><StatusPill status={tx.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};