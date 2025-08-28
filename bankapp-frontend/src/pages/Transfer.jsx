import { useState, useEffect } from 'react';
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

    return (
        <div>
            <div className='px-18 py-5'>
                <span className='text-3xl font-semibold'>Transfer</span>
                <p className='text-xl mt-2.5 mb-3'>Deposit, withdraw, or transfer funds.</p>
            </div>
            <div className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl px-15 py-5 shadow">
                {/* Tabs */}
                <div className="flex gap-8 mb-6">
                    <button
                        className={`flex-1 py-4 rounded-lg font-semibold text-lg transition
            ${activeTab === 'deposit'
                                ? 'bg-[#61a8e8] text-white shadow'
                                : 'bg-[#c1e0ff] text-[#263d6b] hover:bg-[#9ec9ed]'}`
                        }
                        onClick={() => setActiveTab('deposit')}
                    >
                        Deposit
                    </button>
                    <button
                        className={`flex-1 py-4 rounded-lg font-semibold text-lg transition
            ${activeTab === 'withdraw'
                                ? 'bg-[#61a8e8] text-white shadow'
                                : 'bg-[#c1e0ff] text-[#263d6b] hover:bg-[#9ec9ed]'}`
                        }
                        onClick={() => setActiveTab('withdraw')}
                    >
                        Withdraw
                    </button>
                    <button
                        className={`flex-1 py-4 rounded-lg font-semibold text-lg transition
            ${activeTab === 'transfer'
                                ? 'bg-[#61a8e8] text-white shadow'
                                : 'bg-[#c1e0ff] text-[#263d6b] hover:bg-[#9ec9ed]'}`
                        }
                        onClick={() => setActiveTab('transfer')}
                    >
                        Transfer
                    </button>
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
