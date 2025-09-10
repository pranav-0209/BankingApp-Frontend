import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';

const AddAccountModal = ({ isOpen, onClose, onSubmit }) => {
    const [accountType, setAccountType] = useState('SAVINGS');
    const [balance, setBalance] = useState('');
    const [error, setError] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // When opening, first make the component visible.
            setIsVisible(true);
            // Then, after a tiny delay, trigger the animation.
            const enterTimeout = setTimeout(() => setIsAnimating(true), 10);
            return () => clearTimeout(enterTimeout);
        } else {
            // When closing, first trigger the exit animation.
            setIsAnimating(false);
            // Then, after the animation duration (300ms), unmount the component from the DOM.
            const exitTimeout = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(exitTimeout);
        }
    }, [isOpen]);

    if (!isVisible) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleBalanceChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) { // Allow decimals
            setBalance(value);
            if (error) setError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalBalance = parseFloat(balance);

        if (isNaN(finalBalance) || finalBalance < 1000) {
            setError("Minimum initial balance of Rs. 1000 is required.");
            return;
        }

        onSubmit({ accountType, balance: finalBalance });
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${isAnimating ? 'bg-black/50' : 'bg-black/0'
                }`}
            onClick={handleBackdropClick}
        >
            <div
                className={`bg-white p-8 rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-semibold mb-6 text-[#263d6b]">Add New Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Account Type</label>
                        <select
                            value={accountType}
                            onChange={(e) => setAccountType(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#61a8e8]"
                        >
                            <option value="SAVINGS">Savings</option>
                            <option value="CURRENT">Current</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Initial Balance</label>
                        <input
                            type="text"
                            value={balance}
                            onChange={handleBalanceChange}
                            className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#61a8e8]'}`}
                            placeholder="e.g., 1000"
                            required
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                        <Button
                            variant="outlined"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAccountModal;