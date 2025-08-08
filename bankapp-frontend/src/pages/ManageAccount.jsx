import React from 'react'

const ManageAccount = () => {

    const accounts = [
        {
            id: 1,
            type: "Savings",
            number: "100 000 001",
            balance: 50000,
            createdAt: "2024-06-22T14:45:00Z"
        },
        {
            id: 2,
            type: "Current",
            number: "200 000 001",
            balance: 150000,
            createdAt: "2024-07-11T10:13:00Z"
        }
    ];

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
                                <tr key={acc.id} className="hover:bg-gray-100 transition">
                                    <td className="py-3 px-3">{acc.type}</td>
                                    <td className="py-3 px-3">{acc.number}</td>
                                    <td className="py-3 px-3 font-semibold text-[#2872c9]">
                                        ₹{Number(acc.balance).toLocaleString()}
                                    </td>
                                    <td className="py-3 px-4">
                                        {/* Format date as DD/MM/YYYY */}
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
                    <button className="inline-block bg-[#2872c9] text-white px-5 py-2 rounded-lg shadow hover:bg-[#1a4f7d] transition text-sm font-medium">
                        + Add New Account
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ManageAccount
