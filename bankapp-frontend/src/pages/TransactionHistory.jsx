import React from 'react'
import { useState } from "react";
import TransactionRow from '../components/TransactionHist/TransactionRow';



const sampleTransactions = [
    {
        from: "100 000 001",
        type: "Transfer",
        to: "200 000 001",
        amount: "-5000",
        timestamp: "8/8/2025"
    },
    {
        from: "100 000 001",
        type: "Deposit",
        to: "",
        amount: "+1000",
        timestamp: "6/8/2025"
    },
    {
        from: "100 000 001",
        type: "Transfer",
        to: "200 000 001",
        amount: "-5000",
        timestamp: "8/8/2025"
    },
    {
        from: "100 000 001",
        type: "Withdraw",
        to: "",
        amount: "-1500",
        timestamp: "7/8/2025"
    },
    {
        from: "100 000 001",
        type: "Deposit",
        to: "",
        amount: "+1000",
        timestamp: "6/8/2025"
    }
];


const TransactionHistory = () => {

    const [selectedAccount, setSelectedAccount] = useState("");
    const [search, setSearch] = useState("");

    // You can actually filter transactions by `selectedAccount` or `search`
    // Here, we'll show all as demo
    const filteredTransactions = sampleTransactions.filter(
        tx =>
            (!search ||
                tx.from.includes(search) ||
                tx.to.includes(search) ||
                tx.type.toLowerCase().includes(search.toLowerCase()) ||
                tx.amount.includes(search)
            ) &&
            (!selectedAccount || tx.from === selectedAccount)
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
                    <select
                        value={selectedAccount}
                        onChange={e => setSelectedAccount(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring w-full md:w-1/4"
                    >
                        <option value="">Select account</option>
                        <option value="100 000 001">100 000 001</option>
                        <option value="200 000 001">200 000 001</option>
                    </select>
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
                            {filteredTransactions.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-gray-400">
                                        No transactions found.
                                    </td>
                                </tr>
                            ) : (
                                filteredTransactions.map((txn, idx) => (
                                    <TransactionRow key={idx} {...txn} />
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
