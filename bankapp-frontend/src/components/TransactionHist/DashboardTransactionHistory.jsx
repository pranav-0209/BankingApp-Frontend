import React, { useState, useEffect } from 'react';
import TransactionRow from './TransactionRow';
import api from "../../api";


const DashboardTransactionHistory = () => {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await api.get('/transaction');
                console.log("Transactions fetched:", response.data);
                setTransactions(response.data);
            } catch (error) {
                setError("Failed to fetch transactions");
                console.error("Error fetching transactions:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);


    return (
        <div className="w-full max-w-[1010px] bg-white border border-gray-300 rounded-xl px-10 pt-5 pb-3 shadow-sm mx-auto">
            {/* Section Title */}
            <div className="mb-4 text-2xl font-semibold text-[#263d6b] tracking-wide">
                Transactions History
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-base text-left">
                    <thead>
                        <tr className="text-gray-500 font-semibold border-b">
                            <th className="py-2 px-3">From</th>
                            <th className="py-2 px-3">Type</th>
                            <th className="py-2 px-3">To</th>
                            <th className="py-2 px-3">Amount</th>
                            <th className="py-2 px-3">TimeStamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.slice(0, 4).map((txn) => (
                            <TransactionRow key={txn.id} {...txn} />
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DashboardTransactionHistory
