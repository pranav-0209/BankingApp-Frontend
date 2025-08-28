import React, { useState } from 'react';
import api from '../../api';

const TransferForm = ({ accounts, onTransactionSuccess }) => {

    const [fromAccount, setFromAccount] = useState(accounts[0]?.accountNumber || '');
    const [toAccount, setToAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fromAccount || !toAccount || !amount || amount <= 0) {
            setMessage({ type: 'error', text: 'Please fill in all fields and enter a valid amount.' });
            return;
        }

        if (fromAccount === toAccount) {
            setMessage({ type: 'error', text: 'Cannot transfer to the same account.' });
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            await api.post('/transaction/transfer', {
                account: fromAccount,
                toAccount: toAccount,
                amount: parseFloat(amount),
                transactionType: 'TRANSFER'
            });
            alert('Transfer successful!');
            onTransactionSuccess(fromAccount); // Refresh balance in parent
            onTransactionSuccess(toAccount);
            setAmount('');
            setToAccount('');
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Transfer failed.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="block font-semibold mb-1">Transfer From:</label>
                <select
                    className="w-full border rounded p-2"
                    value={fromAccount}
                    onChange={(e) => setFromAccount(e.target.value)}
                >
                    <option value="" disabled>Select your account</option>
                    {accounts.map(acc => (
                        <option key={acc.accountNumber} value={acc.accountNumber}>
                            {acc.accountType} - {acc.accountNumber} (Balance: ₹{acc.balance.toLocaleString()})
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block font-semibold mb-1">Transfer To:</label>
                <input
                    type="text"
                    className="w-full border rounded p-2"
                    placeholder="Enter recipient's account number"
                    value={toAccount}
                    onChange={(e) => setToAccount(e.target.value)}
                />
            </div>
            <div>
                <label className="block font-semibold mb-1">Amount:</label>
                <input
                    type="number"
                    className="w-full border rounded p-2"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            {message && (
                <div className={`p-3 rounded text-center ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}
            <button
                type="submit"
                disabled={loading}
                className="mt-4 bg-[#61a8e8] text-white font-semibold px-5 py-2 rounded hover:bg-[#2872c9] transition disabled:bg-gray-400"
            >
                {loading ? 'Processing...' : 'Confirm Transfer'}
            </button>
        </form>
    )
}

export default TransferForm
