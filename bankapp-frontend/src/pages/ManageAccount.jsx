import React, { useState, useEffect } from 'react';
import AddAccountModal from '../components/AddAccountModal';
import api from '../api';

const ManageAccount = () => {
    const [accounts, setAccounts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchAccounts = async () => {
        try {
            const response = await api.get('/account');
            setAccounts(response.data);
        } catch (error) {
            console.error("Failed to fetch accounts:", error);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    const handleAddAccount = async (accountData) => {
        try {
            await api.post('/account', accountData);
            fetchAccounts(); // Refresh the accounts list
            setIsModalOpen(false); // Close the modal
        } catch (error) {
            console.error("Failed to add account:", error);
            // You could add some user-facing error handling here
        }
    };


    return (
        <div>
            <div className='px-18 py-5'>
                <span className='text-3xl font-semibold'>Manage Accounts</span>
                <p className='text-xl mt-2.5 mb-8'>Your financial overview at a glance.</p>
            </div>
            <div className="w-full max-w-[1010px] mx-auto bg-white border border-gray-300 rounded-xl p-6 shadow-sm">

                {/* Section Title */}
                <div className="mb-6 text-2xl font-semibold text-[#263d6b] tracking-wide flex items-center gap-2">
                    All Account List :
                </div>

                {/* Accounts Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xl text-left">
                        <thead>
                            <tr className="text-gray-500 font-medium border-b">
                                <th className="py-3 px-3">Type</th>
                                <th className="py-3 px-3">Account Number</th>
                                <th className="py-3 px-3">Balance</th>
                                <th className="py-3 px-3">Created Date</th>
                                <th className="py-3 px-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map(acc => (
                                <tr key={acc.accountNumber} className="hover:bg-gray-100 transition">
                                    <td className="py-3 px-3">{acc.accountType}</td>
                                    <td className="py-3 px-3">{acc.accountNumber}</td>
                                    <td className="py-3 px-3 font-semibold text-[#2872c9]">
                                        ₹{Number(acc.balance).toLocaleString()}
                                    </td>
                                    <td className="py-3 px-4">
                                        {new Date(acc.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-3 flex gap-2">
                                        <button className="text-blue-500 hover:underline text-base">Edit</button>
                                        <button className="text-red-500 hover:underline text-base">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Add Account Button */}
                <div className="mt-6 text-right">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-block bg-[#2872c9] text-white px-5 py-2 rounded-lg shadow hover:bg-[#1a4f7d] transition text-sm font-medium"
                    >
                        + Add New Account
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <AddAccountModal
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddAccount}
                />
            )}
        </div>
    )
}

export default ManageAccount;