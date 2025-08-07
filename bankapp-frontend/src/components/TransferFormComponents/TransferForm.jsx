import React from 'react'

const TransferForm = () => {
    return (
        <form className="space-y-4">
            <div>
                <label className="block font-semibold mb-1">Transfer From:</label>
                <select className="w-full border rounded p-2">
                    <option>Select your account</option>
                    {/* ...populate options dynamically... */}
                </select>
            </div>
            <div>
                <label className="block font-semibold mb-1">Transfer To:</label>
                <input type="text" className="w-full border rounded p-2" placeholder="Enter recipient's account number" />
            </div>
            <div>
                <label className="block font-semibold mb-1">Amount:</label>
                <input type="number" className="w-full border rounded p-2" placeholder="Enter amount" />
            </div>
            <button type="submit"
                className="mt-4 bg-[#61a8e8] text-white font-semibold px-5 py-2 rounded hover:bg-[#2872c9] transition"
            >
                Confirm Transfer
            </button>
        </form>
    )
}

export default TransferForm
