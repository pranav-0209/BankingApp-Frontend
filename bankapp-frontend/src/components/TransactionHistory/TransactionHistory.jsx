import React from 'react'
import TransactionRow from './TransactionRow';


const TransactionHistory = () => {

    const transactions = [
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

    return (
        <div className="w-full max-w-[1010px] bg-white border border-gray-300 rounded-xl px-10 pt-6 pb-8 shadow-sm mx-auto">
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
                        {transactions.map((txn, idx) => (
                            <TransactionRow key={idx} {...txn} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TransactionHistory
