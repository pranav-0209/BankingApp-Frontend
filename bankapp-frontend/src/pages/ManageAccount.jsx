import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button
} from '@mui/material';
import AddAccountModal from '../components/AddAccountModal';
import api from '../api';
import SuccessModal from '../components/SuccessModal';

const ManageAccount = () => {
    const [accounts, setAccounts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const headerCellStyles = { fontSize: '1.1rem', fontWeight: 'bold' };
    const bodyCellStyles = { fontSize: '1rem' };

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
            setIsModalOpen(false); // Close the creation modal
            setSuccessMessage("Successfully added new account!"); // Set success message
            setShowSuccessModal(true); // Show the success modal
        } catch (error) {
            console.error("Failed to add account:", error);
            alert(error.response?.data?.message || "Failed to add account.");
        }
    };

    const handleDelete = async (accountNumber) => {
        if (window.confirm('Are you sure you want to delete this account? This action cannot be undone.')) {
            try {
                await api.delete(`/account/${accountNumber}`);
                fetchAccounts(); // Refresh the list
                setSuccessMessage('Account deleted successfully!');
                setShowSuccessModal(true); // Show success modal
            } catch (error) {
                alert(error.response?.data?.message || 'Failed to delete account.');
            }
        }
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
        setSuccessMessage('');
    };

    return (
        <div>
            <div className='px-18 py-5'>
                <span className='text-3xl font-semibold'>Manage Accounts</span>
                <p className='text-xl mt-2.5 mb-8'>Your financial overview at a glance.</p>
            </div>
            <div className="w-full max-w-[1010px] mx-auto mb-5 bg-white border border-gray-300 rounded-xl p-6 shadow-sm">
                <div className="mb-6 text-2xl font-semibold text-[#263d6b] tracking-wide flex items-center justify-between">
                    <span>All Account List :</span>
                </div>

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
                                            onClick={() => handleDelete(acc.accountNumber)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className='mt-5 justify-end flex'>
                    <Button
                        variant="contained"
                        onClick={() => setIsModalOpen(true)}
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

            {showSuccessModal && (
                <SuccessModal
                    message={successMessage}
                    onClose={handleCloseSuccessModal}
                />
            )}
        </div>
    )
}

export default ManageAccount;
