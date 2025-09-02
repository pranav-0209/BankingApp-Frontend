import React, { useState } from 'react';
import api from '../../api';
import { Button } from '@mui/material';
import SuccessModal from '../SuccessModal';

const DepositForm = ({ accounts, onTransactionSuccess }) => {
    const [selectedAccount, setSelectedAccount] = useState(accounts[0]?.accountNumber || '');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    // Standardize the message state to always be an object or null
    const [message, setMessage] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedAccount || !amount || parseFloat(amount) <= 0) {
            setMessage({ type: 'error', text: 'Please select an account and enter a valid amount.' });
            return;
        }

        setLoading(true);
        setMessage(null); // Clear previous messages

        try {
            await api.post('/transaction/deposit', {
                account: selectedAccount,
                transactionType: 'DEPOSIT',
                amount: parseFloat(amount)
            });

            // Call the success callback to update parent component's state
            onTransactionSuccess(selectedAccount);
            setShowSuccessModal(true); // Show the modal on success
            setAmount(''); // Reset the amount input
            // Correctly reset the selected account if needed, or remove if not desired
            setSelectedAccount(accounts[0]?.accountNumber || '');

        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Deposit failed.' });
        } finally {
            setLoading(false);
        }
    }

    const handleCloseModal = () => {
        setShowSuccessModal(false);
    };

    return (
        <div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block font-semibold mb-1">Deposit To:</label>
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
                {/* Single, consistent message display area */}
                {message && (
                    <div className={`p-3 rounded text-center ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {message.text}
                    </div>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth // Make button take full width for better UI
                    disabled={loading}
                    style={{ marginTop: '1rem' }} // Add some margin
                >
                    {loading ? 'Processing...' : 'Confirm Deposit'}
                </Button>
            </form>

            {showSuccessModal && (
                <SuccessModal
                    message="Deposit was completed successfully!"
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default DepositForm;