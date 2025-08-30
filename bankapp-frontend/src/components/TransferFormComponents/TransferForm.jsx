import React, { useState } from 'react';
import api from '../../api';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

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
             <Button
                type="submit"
                variant="contained"
                size="large" // 👈 Set the size
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Confirm Transfer'}
            </Button>
        </form>
    )
}

export default TransferForm
