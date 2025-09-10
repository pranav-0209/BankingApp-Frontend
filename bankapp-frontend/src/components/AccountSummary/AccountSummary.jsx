import React from 'react';
import AccountCard from './AccountCard';
import api from "../../api";
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { HiPlus } from 'react-icons/hi';
import { useQuery } from '@tanstack/react-query';
import { useAccounts } from '../../hooks/useAccountQueries';


const fetchAndSortAccounts = async () => {
    const { data } = await api.get('/account');
    if (!data) return [];
    return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const AccountSummary = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: accounts = [], isLoading, isError, error } = useAccounts(user?.userId);

    if (isLoading) {
        return (
            <div className="w-full max-w-[1010px] bg-white border border-gray-300 rounded-xl px-10 py-6 mb-5 shadow-sm mx-auto">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="flex gap-4">
                        <div className="h-40 bg-red-200 rounded flex-1"></div>
                        <div className="h-40 bg-gray-200 rounded flex-1"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="w-full max-w-[1010px] bg-white border border-red-100 rounded-xl px-10 py-6 mb-5 shadow-sm mx-auto">
                <div className="text-red-500">Error: {error.message}</div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[1010px] bg-white border border-gray-300 rounded-xl px-10 pt-2 pb-5 mb-3 shadow-sm mx-auto">
            {/* Title */}
            <div className="mb-2 text-2xl font-semibold text-[#263d6b] tracking-wide">
                Accounts
            </div>
            {/* Cards Row */}
            {accounts.length > 0 ? (
                <div className="flex justify-between">
                    {accounts.slice(0, 2).map((account) => (
                        <AccountCard
                            key={account.accountNumber}
                            type={account.accountType}
                            accountNumber={account.accountNumber}
                            balance={account.balance}
                        />
                    ))}
                </div>
            ) : (
                <div
                    className="w-[400px] h-[200px] min-w-[200px] rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-gray-400 cursor-pointer transition"
                    onClick={() => navigate('/accounts')}
                >
                    <div className="text-center">
                        <HiPlus className="mx-auto text-4xl" />
                        <p className="mt-2 font-semibold">Create New Account</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountSummary;
