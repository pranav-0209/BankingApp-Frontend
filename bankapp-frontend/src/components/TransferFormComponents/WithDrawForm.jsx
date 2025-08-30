import React, { useState } from 'react';
import api from '../../api';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const WithDrawForm = ({ accounts, onTransactionSuccess }) => {
    const [selectedAccount, setSelectedAccount] = useState(accounts[0]?.accountNumber || '');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedAccount || !amount || amount <= 0) {
            setMessage({ type: 'error', text: 'Please select an account and enter a valid amount.' });
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            await api.post('/transaction/withdraw', {
                account: selectedAccount,
                amount: parseFloat(amount),
                transactionType: 'WITHDRAW'
            });
            alert('Withdrawal successful!');
            onTransactionSuccess(selectedAccount); // Refresh balance in parent
            setAmount(''); // Reset amount
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Withdrawal failed.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="block font-semibold mb-1">Withdraw From:</label>
                <select
                    className="w-full border rounded p-2"
                    value={selectedAccount}
                    onChange={(e) => setSelectedAccount(e.target.value)}
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
                <label className="block font-semibold mb-1">Amount:</label>
                <input type="number"
                    className="w-full border rounded p-2"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} />
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
                {loading ? 'Processing...' : 'Confirm Withdrawal'}
            </Button>
        </form>
    )
}

export default WithDrawForm
