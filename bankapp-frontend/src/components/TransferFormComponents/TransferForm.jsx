import React, { useState, useCallback, memo } from 'react';
import api from '../../api';
import { Button } from '@mui/material';
import SuccessModal from '../SuccessModal';

const TransferForm = memo(({ accounts, onTransactionSuccess }) => {
    const [fromAccount, setFromAccount] = useState(accounts[0]?.accountNumber || '');
    const [toAccount, setToAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const fromAccDetails = accounts.find(acc => acc.accountNumber === fromAccount);

        // Reset any previous error messages
        setMessage(null);

        // Basic validation checks
        if (!fromAccount || !toAccount || !amount || parseFloat(amount) <= 0) {
            setMessage({ 
                type: 'error', 
                text: 'Please fill all fields with valid information.' 
            });
            return;
        }

        if (fromAccount === toAccount) {
            setMessage({ 
                type: 'error', 
                text: 'Cannot transfer money to the same account.' 
            });
            return;
        }

        if (fromAccDetails && fromAccDetails.balance < parseFloat(amount)) {
            setMessage({ 
                type: 'error', 
                text: 'Insufficient funds for this transfer.' 
            });
            return;
        }

        setLoading(true);

        try {
            const response = await api.post('/transaction/transfer', {
                account: fromAccount,
                toAccount: toAccount,
                amount: parseFloat(amount),
                transactionType: 'TRANSFER'
            });
            
            console.log('Transfer Success:', {
                status: response.status,
                data: response.data,
                fromAccount,
                toAccount,
                amount: parseFloat(amount)
            });

            onTransactionSuccess(fromAccount);
            onTransactionSuccess(toAccount);
            setModalOpen(true);
            setAmount('');
            setToAccount('');
            setFromAccount(accounts[0]?.accountNumber || '');

        } catch (error) {
            console.error('Transfer Error:', error);
            
            // Handle specific error cases
            const errorMessage = error.response?.data?.message;
            
            // Check if the error message contains information about the recipient account
            if (errorMessage?.includes(toAccount)) {
                setMessage({ 
                    type: 'error', 
                    text: `Recipient account ${toAccount} not found.` 
                });
            } else {
                setMessage({ 
                    type: 'error', 
                    text: errorMessage || 'Transfer failed. Please try again.' 
                });
            }
        } finally {
            setLoading(false);
        }
    }, [fromAccount, toAccount, amount, accounts, onTransactionSuccess]);

    return (
        <div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block font-semibold mb-1">Transfer From:</label>
                    <select
                        className="w-full font-medium border rounded p-2"
                        value={fromAccount}
                        onChange={(e) => setFromAccount(e.target.value)}
                    >
                        <option value="" disabled>Select source account</option>
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
                        placeholder="Recipient's account number"
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
                    <div className={`p-3 rounded text-center ${message.type === 'error' ? 'bg-red-100 text-red-700' : ''}`}>
                        {message.text}
                    </div>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={loading}
                    style={{ marginTop: '1rem' }}
                >
                    {loading ? 'Processing...' : 'Confirm Transfer'}
                </Button>
            </form>

            <SuccessModal
                open={modalOpen}
                message="Transfer was completed successfully!"
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
});

export default TransferForm;