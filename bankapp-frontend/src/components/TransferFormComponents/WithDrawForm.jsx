import React, { useState } from 'react';
import api from '../../api';
import { Button } from '@mui/material';
import SuccessModal from '../SuccessModal';

const WithDrawForm = ({ accounts, onTransactionSuccess }) => {
    const [selectedAccount, setSelectedAccount] = useState(accounts[0]?.accountNumber || '');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedAccDetails = accounts.find(acc => acc.accountNumber === selectedAccount);

        if (!selectedAccount || !amount || parseFloat(amount) <= 0) {
            setMessage({ type: 'error', text: 'Please select an account and enter a valid amount.' });
            return;
        }

        if (selectedAccDetails && selectedAccDetails.balance < parseFloat(amount)) {
            setMessage({ type: 'error', text: 'Insufficient funds for this withdrawal.' });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            await api.post('/transaction/withdraw', {
                account: selectedAccount,
                amount: parseFloat(amount),
                transactionType: 'WITHDRAW'
            });

            onTransactionSuccess(selectedAccount);
            setShowSuccessModal(true);
            setAmount(''); // Reset amount after success
            setSelectedAccount(accounts[0]?.accountNumber || ''); // Reset account selection

        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Withdrawal failed.' });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
    };

    return (
        <div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block font-semibold mb-1">Withdraw From:</label>
                    <select
                        className="w-full font-medium border rounded p-2"
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
                    {loading ? 'Processing...' : 'Confirm Withdrawal'}
                </Button>
            </form>

            {showSuccessModal && (
                <SuccessModal
                    message="Withdrawal was completed successfully!"
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default WithDrawForm;