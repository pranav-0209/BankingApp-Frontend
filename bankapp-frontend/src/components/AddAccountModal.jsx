import React, { useState } from 'react';

const AddAccountModal = ({ onClose, onSubmit }) => {
    const [accountType, setAccountType] = useState('SAVINGS');
    const [balance, setBalance] = useState('');
    const [error, setError] = useState('');

    const handleBalanceChange = (e) => {
        const value = e.target.value;
        // Allow only numbers to be entered
        if (/^\d*$/.test(value)) {
            setBalance(value);
            // Clear error when user starts typing a valid number
            if (error) {
                setError('');
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalBalance = parseFloat(balance);

        // Validation check
        if (isNaN(finalBalance) || finalBalance < 1000) {
            setError("Minimum balance of Rs. 1000 is required.");
            return;
        }

        onSubmit({ accountType, balance: finalBalance });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
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
                            type="text" // Changed from "number" to "text"
                            value={balance}
                            onChange={handleBalanceChange}
                            className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#61a8e8]'}`}
                            placeholder="Minimum balance Rs.1000 is required" // Updated placeholder
                            required
                        />
                         {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-[#2872c9] text-white hover:bg-[#1a4f7d] transition font-medium"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAccountModal;