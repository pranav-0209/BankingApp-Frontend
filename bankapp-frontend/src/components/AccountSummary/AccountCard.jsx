import React, { memo, useMemo } from 'react';
import { HiCreditCard } from 'react-icons/hi';
const AccountCard = memo(({ type, accountNumber, balance, bgColor, textColor }) => {
  const formattedBalance = useMemo(() => 
    `₹${Number(balance).toLocaleString()}`, 
    [balance]
  );

  const cardStyle = useMemo(() => 
    ({ backgroundColor: bgColor, color: textColor }), 
    [bgColor, textColor]
  );

  return (
    <div className="w-[400px] min-w-[200px] rounded-lg px-9 py-6 flex flex-col justify-between" 
         style={cardStyle}>
      <div>
        <div className="text-base font-semibold mb-1 uppercase opacity-90">{type} ACCOUNT</div>
        <div className="text-xs opacity-80 mb-1">Account Number</div>
        <div className="font-mono text-lg tracking-widest mb-5">{accountNumber}</div>
      </div>
      <div>
        <div className="text-xs opacity-80 mb-1">Balance</div>
        <div className="text-2xl font-bold">{formattedBalance}</div>
      </div>
    </div>
  );
});

AccountCard.displayName = 'AccountCard';

export default AccountCard;
