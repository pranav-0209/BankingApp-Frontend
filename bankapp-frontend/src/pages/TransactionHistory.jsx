import { useState, useEffect } from "react";
import TransactionRow from '../components/TransactionHist/TransactionRow';
import api from '../api'; 
const TransactionHistory = () => {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await api.get('/transaction');
                setTransactions(response.data);
            } catch (err) {
                setError("Failed to fetch transaction history.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    // Filter transactions based on the search input
    const filteredTransactions = transactions.filter(tx =>
        (tx.fromAccount && tx.fromAccount.includes(search)) ||
        (tx.toAccount && tx.toAccount.includes(search)) ||
        tx.transactionType.toLowerCase().includes(search.toLowerCase()) ||
        String(tx.amount).includes(search)
    );

    return (
        <div>
            <div className='px-18 py-5'>
                <span className='text-3xl font-semibold'>Transaction History</span>
                <p className='text-xl mt-2.5 mb-3'>All your recent account activity.</p>
            </div>
            <div className="w-full max-w-[1010px] mx-auto bg-white border border-gray-200 rounded-xl p-6 shadow">
                {/* Title */}
                <div className="mb-5 text-2xl font-semibold text-[#263d6b]">Transaction History</div>

                {/* Select Account and Search */}
                <div className="flex flex-col md:flex-row gap-3 mb-5">
                    <input
                        type="text"
                        className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring w-full md:ml-3"
                        placeholder="Search transactions..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-base text-left">
                        <thead>
                            <tr className="text-gray-500 font-medium border-b">
                                <th className="py-2 px-3">From</th>
                                <th className="py-2 px-3">Type</th>
                                <th className="py-2 px-3">To</th>
                                <th className="py-2 px-3">Amount</th>
                                <th className="py-2 px-3">TimeStamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-6 text-gray-500">Loading...</td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-6 text-red-500">{error}</td>
                                </tr>
                            ) : filteredTransactions.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-6 text-gray-400">
                                        No transactions found.
                                    </td>
                                </tr>
                            ) : (
                                filteredTransactions.map((txn) => (
                                    <TransactionRow key={txn.id} {...txn} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default TransactionHistory
