import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button
} from '@mui/material';
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
            setIsModalOpen(false);
            alert("Successfully added new account!");
            // Close the modal
        } catch (error) {
            console.error("Failed to add account:", error);
            // You could add some user-facing error handling here
        }
    };

    const handleDeleteAccount = async (accountNumber) => {
        // Show a confirmation dialog before proceeding
        const isConfirmed = window.confirm("Are you sure you want to delete this account? This action cannot be undone.");

        if (isConfirmed) {
            try {
                await api.delete(`/account/${accountNumber}`);
                // After successful deletion, refresh the list of accounts
                fetchAccounts();
            } catch (error) {
                console.error(`Failed to delete account ${accountNumber}:`, error);
                // Optionally, show an error message to the user
                alert("Failed to delete account. Please try again.");
            }
        }
    };

    const headerCellStyles = { fontSize: '1.1rem', fontWeight: 'bold' };
    const bodyCellStyles = { fontSize: '1rem' };

    return (
        <div>
            <div className='px-18 py-5'>
                <span className='text-3xl font-semibold'>Manage Accounts</span>
                <p className='text-xl mt-2.5 mb-8'>Your financial overview at a glance.</p>
            </div>
            <div className="w-full max-w-[1010px] mx-auto mb-5 bg-white border border-gray-300 rounded-xl p-6 shadow-sm">

                {/* Section Title */}
                <div className="mb-6 text-2xl font-semibold text-[#263d6b] tracking-wide flex items-center gap-2">
                    All Account List :
                </div>

                {/* Accounts Table */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={headerCellStyles}>Type</TableCell>
                                <TableCell sx={headerCellStyles}>Account Number</TableCell>
                                <TableCell sx={headerCellStyles}>Balance</TableCell>
                                <TableCell sx={headerCellStyles}>Created Date</TableCell>
                                <TableCell sx={headerCellStyles}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {accounts.map(acc => (
                                <TableRow key={acc.accountNumber}>
                                    <TableCell sx={bodyCellStyles}>{acc.accountType}</TableCell>
                                    <TableCell sx={bodyCellStyles}>{acc.accountNumber}</TableCell>
                                    <TableCell sx={bodyCellStyles}>
                                        ₹{Number(acc.balance).toLocaleString()}
                                    </TableCell>
                                    <TableCell sx={bodyCellStyles}>
                                        {new Date(acc.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell sx={bodyCellStyles}>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleDeleteAccount(acc.accountNumber)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Add Account Button */}
                <div className="mt-6 mr-6 text-right">
                    <Button
                        variant="contained" onClick={() => setIsModalOpen(true)}

                    >
                        Add New Account
                    </Button>
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