import React from 'react'
import AccountCard from './AccountCard'

const AccountSummary = () => {
    return (
        <>
            <div className="w-full max-w-[1010px] bg-white border border-gray-300 rounded-xl px-10 pt-3 pb-6 mb-5 shadow-sm mx-auto">
                {/* Title */}
                <div className="mb-3 text-2xl font-semibold text-[#263d6b] tracking-wide">
                    Accounts
                </div>
                {/* Cards Row */}
                <div className="flex gap-25">
                    <AccountCard
                        type="Saving"
                        accountNumber="100 000 001"
                        balance={50000}
                        bgColor="bg-[#7b9e9e]"
                        textColor="#f9fafb"
                    />
                    <AccountCard
                        type="Current"
                        accountNumber="200 000 001"
                        balance={150000}
                        bgColor="bg-[#313f56]"
                        textColor="#f9fafb"
                    />
                </div>
            </div>
        </>

    )
}

export default AccountSummary
