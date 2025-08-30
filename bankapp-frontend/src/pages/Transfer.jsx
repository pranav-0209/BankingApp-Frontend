import { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import WithdrawForm from '../components/TransferFormComponents/WithDrawForm';
import DepositForm from '../components/TransferFormComponents/DepositForm';
import TransferForm from '../components/TransferFormComponents/TransferForm';
import api from '../api'

const Transfer = () => {

    const [activeTab, setActiveTab] = useState('deposit');
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await api.get('/account');
                setAccounts(response.data);
                console.log("Accounts fetched:", response.data);
            } catch (err) {
                setError('Failed to fetch accounts. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAccounts();
    }, []);

    const refreshBalance = async (accountNumber) => {
        try {
            const response = await api.get(`/account/balance/${accountNumber}`);
            const newBalance = response.data;
            setAccounts(prevAccounts =>
                prevAccounts.map(acc =>
                    acc.accountNumber === accountNumber ? { ...acc, balance: newBalance } : acc
                )
            );
        } catch (error) {
            console.error("Could not refresh balance:", error);
        }
    };

    const buttonStyles = {
        padding: '15px 0', // Increase vertical padding
        fontSize: '1.2rem',  // Increase font size
        fontWeight: '500'
    };

    return (
        <div>
            <div className='px-18 py-5'>
                <span className='text-3xl font-semibold'>Transfer</span>
                <p className='text-xl mt-2.5 mb-3'>Deposit, withdraw, or transfer funds.</p>
            </div>
            <div className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl px-15 py-5 shadow">
                {/* Tabs */}
                <div className="flex gap-8 mb-6">
                    <Button
                        variant={activeTab === 'deposit' ? 'contained' : 'outlined'}
                        onClick={() => setActiveTab('deposit')}
                        fullWidth
                        sx={buttonStyles} // 👈 Apply custom styles
                    >
                        Deposit
                    </Button>
                    <Button
                        variant={activeTab === 'withdraw' ? 'contained' : 'outlined'}
                        onClick={() => setActiveTab('withdraw')}
                        fullWidth
                        sx={buttonStyles} // 👈 Apply custom styles
                    >
                        Withdraw
                    </Button>
                    <Button
                        variant={activeTab === 'transfer' ? 'contained' : 'outlined'}
                        onClick={() => setActiveTab('transfer')}
                        fullWidth
                        sx={buttonStyles} // 👈 Apply custom styles
                    >
                        Transfer
                    </Button>
                </div>

                {/* Conditional Forms */}
                {loading && <p>Loading accounts...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && (
                    <>
                        {activeTab === 'deposit' && <DepositForm accounts={accounts} onTransactionSuccess={refreshBalance} />}
                        {activeTab === 'withdraw' && <WithdrawForm accounts={accounts} onTransactionSuccess={refreshBalance} />}
                        {activeTab === 'transfer' && <TransferForm accounts={accounts} onTransactionSuccess={refreshBalance} />}
                    </>
                )}
            </div>
        </div>
    )
}

export default Transfer
