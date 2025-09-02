import React from 'react';

const TransactionRow = ({ fromAccount, transactionType, toAccount, amount, timestamp }) => {
    // Determine color and format amount based on transaction type
    const isDeposit = transactionType === 'DEPOSIT';
    const amountColor = isDeposit ? "text-green-500" : "text-red-500";
    const formattedAmount = `${isDeposit ? '+' : '- '}${Number(amount).toLocaleString('en-IN')}`;

    // Format the timestamp to be more readable
    const formattedTimestamp = new Date(timestamp).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <tr className="hover:bg-gray-100 transition">
            <td className="py-2 px-3">{fromAccount}</td>
            <td className="py-2 px-3 font-semibold">{transactionType}</td>
            <td className="py-2 px-3">{toAccount || '-'}</td>
            <td className={`py-2 px-3 ${amountColor}`}>
                {formattedAmount}
            </td>
            <td className="py-2 px-3">{formattedTimestamp}</td>
        </tr>
    );
};

export default TransactionRow;