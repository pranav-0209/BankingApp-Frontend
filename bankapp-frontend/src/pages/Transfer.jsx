import { useState } from 'react';
import DepositForm from '../components/TransferFormComponents/DepositForm';
import TransferForm from '../components/TransferFormComponents/TransferForm';
import WithDrawForm from '../components/TransferFormComponents/WithDrawForm';

const Transfer = () => {

    const [activeTab, setActiveTab] = useState('deposit');

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
                {activeTab === 'deposit' && (
                    <DepositForm />
                )}
                {activeTab === 'withdraw' && (
                    <WithDrawForm />
                )}
                {activeTab === 'transfer' && (
                    <TransferForm />
                )}
            </div>
        </div>
    )
}

export default Transfer
