import React from 'react'

const TransactionRow = ({ fromAccount, transactionType, toAccount, amount, timestamp }) => {
    const isPositive = String(amount).startsWith('+')
    const amountColor = isPositive ? "text-green-500" : "text-red-500";
    return (
        <tr className="hover:bg-gray-100 transition">
            <td className="py-2 px-3">{fromAccount}</td>
            <td className="py-2 px-3 font-semibold">{transactionType}</td>
            <td className="py-2 px-3">{toAccount || '-'}</td>
            <td className={`py-2 px-3 font-semibold ${amountColor}`}>{amount}</td>
            <td className="py-2 px-3">{timestamp}</td>
        </tr>
    )
}

export default TransactionRow
