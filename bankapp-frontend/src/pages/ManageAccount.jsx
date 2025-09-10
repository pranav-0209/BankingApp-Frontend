import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button
} from '@mui/material';
import AddAccountModal from '../components/AddAccountModal';
import { useAccounts } from '../hooks/useAccountQueries';
import api from '../api';
import SuccessModal from '../components/SuccessModal';
import { HiPlus } from 'react-icons/hi';
import AnimatedDeleteModal from '../components/AnimatedDeleteModal';
import { useQueryClient } from '@tanstack/react-query'; // Add this import
import { useAuth } from '../auth/AuthContext';

const ManageAccount = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const { data: accounts = [] } = useAccounts(user?.userId);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Add this state
    const [selectedAccount, setSelectedAccount] = useState(null);
    const headerCellStyles = { fontSize: '1.1rem', fontWeight: 'bold' };
    const bodyCellStyles = { fontSize: '1rem' };

    const handleAddAccount = async (accountData) => {
        try {
            await api.post('/account', accountData);
            await queryClient.invalidateQueries(['accounts']); // Add this line
            setIsModalOpen(false);
            setSuccessMessage("Successfully added new account!");
            setShowSuccessModal(true);
        } catch (error) {
            console.error("Failed to add account:", error);
            alert(error.response?.data?.message || "Failed to add account.");
        }
    };

    const handleDeleteClick = (account) => {
        setSelectedAccount(account);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await api.delete(`/account/${selectedAccount.accountNumber}`);
            await queryClient.invalidateQueries(['accounts']); // Add this line
            setSuccessMessage('Account deleted successfully!');
            setShowSuccessModal(true);
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to delete account.');
        }
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
        setSelectedAccount(null);
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

                {accounts.length > 0 ? (
                    // If accounts exist, show the table
                    <>
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
                                                    onClick={() => handleDeleteClick(acc)}
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
                    </>
                ) : (
                    // If no accounts exist, show this prompt using Tailwind CSS
                    <div className="text-center py-10">
                        <p className="text-2xl font-semibold text-gray-700 mb-3">
                            No Accounts Found
                        </p>
                        <p className="text-base text-gray-500 mb-8">
                            Get started by creating your first bank account.
                        </p>
                        <Button
                            variant="contained"
                            size="large"
                            // startIcon={<HiPlus />}
                            onClick={() => setIsModalOpen(true)}
                        >
                            Add New Account
                        </Button>
                    </div>
                )}
            </div>

            <AddAccountModal
                isOpen={isModalOpen} // Changed to pass as a prop
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddAccount}
            />

            <SuccessModal
                open={showSuccessModal}
                message={successMessage}
                onClose={handleCloseSuccessModal}
            />
            
            <AnimatedDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={handleDeleteModalClose}
                onConfirm={handleDeleteConfirm}
                accountDetails={selectedAccount}
            />
        </div>
    );
};

export default ManageAccount;