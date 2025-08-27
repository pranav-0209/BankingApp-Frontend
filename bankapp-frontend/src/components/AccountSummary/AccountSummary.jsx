import React, { useState, useEffect } from 'react';
import AccountCard from './AccountCard'
import api from "../../api";

const AccountSummary = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await api.get('/account');
                if (response.data) {
                   const sortedAccounts = response.data.sort((a, b) =>
                        new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    setAccounts(sortedAccounts);
                }
            } catch (error) {
                console.error("Error fetching accounts:", error);
                setError("Failed to load account information");
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, []);

    if (loading) {
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

    if (error) {
        return (
            <div className="w-full max-w-[1010px] bg-white border border-red-100 rounded-xl px-10 py-6 mb-5 shadow-sm mx-auto">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <>
            <div className="w-full max-w-[1010px] bg-white border border-gray-300 rounded-xl px-10 pt-3 pb-5 mb-3 shadow-sm mx-auto">
                {/* Title */}
                <div className="mb-3 text-2xl font-semibold text-[#263d6b] tracking-wide">
                    Accounts
                </div>
                {/* Cards Row */}
                <div className="flex gap-25">
                     {accounts.slice(0, 2).map((account) => (
                        <AccountCard
                            key={account.accountNumber}
                            type={account.accountType}
                            accountNumber={account.accountNumber}
                            balance={account.balance}
                            bgColor={account.accountType === 'CURRENT' ? '#4F709C' : '#213555'}
                            textColor="#F1EFEF"
                        />
                    ))}
                </div>
            </div>
        </>

    )
}

export default AccountSummary
