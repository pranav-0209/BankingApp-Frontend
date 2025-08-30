import React from 'react'
import { HiCreditCard } from 'react-icons/hi';

const AccountCard = ({ type, accountNumber, balance, bgColor, textColor }) => {
  return (
    <div className="w-[400px] min-w-[200px] rounded-lg px-9 py-6 flex flex-col justify-between" style={{ backgroundColor: bgColor, color: textColor }}>      <div>
      <div className="text-base font-semibold mb-1 uppercase opacity-90">{type} ACCOUNT</div>
      <div className="text-xs opacity-80 mb-1">Account Number</div>
      <div className="font-mono text-lg tracking-widest mb-5">{accountNumber}</div>
    </div>
      <div>
        <div className="text-xs opacity-80 mb-1">Balance</div>
        <div className="text-2xl font-bold">{`₹${Number(balance).toLocaleString()}`}</div>
      </div>
    </div>
  );
};

export default AccountCard;
