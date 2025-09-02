import React, { useState } from 'react';
import api from '../api';
import { Button } from '@mui/material';
import SuccessModal from './SuccessModal'; // Import the modal

const AddAccountModal = ({ onClose, onAccountAdded }) => {
    const [accountType, setAccountType] = useState('SAVINGS');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State for the modal

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            await api.post('/account/create', { accountType });
            onAccountAdded(); // Refresh the account list in the parent component
            setShowSuccessModal(true); // Show the modal on success
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to create account.' });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        onClose(); // Also close the create account modal
    };

    // If success modal is shown, don't render the form
    if (showSuccessModal) {
        return (
            <SuccessModal
                message="New account created successfully!"
                onClose={handleCloseModal}
            />
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Add New Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-1">Account Type:</label>
                        <select
                            value={accountType}
                            onChange={(e) => setAccountType(e.target.value)}
                            className="w-full border rounded p-2"
                        >
                            <option value="SAVINGS">Savings</option>
                            <option value="CURRENT">Current</option>
                        </select>
                    </div>

                    {message && (
                        <div className={`p-3 rounded text-center bg-red-100 text-red-700`}>
                            {message.text}
                        </div>
                    )}

                    <div className="flex justify-end space-x-4">
                        <Button variant="outlined" onClick={onClose} disabled={loading}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Account'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAccountModal;