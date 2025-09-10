import React, { memo, useMemo } from 'react';
import { HiCreditCard } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AccountCard = memo(({ type, accountNumber, balance, bgColor, textColor }) => {
  const navigate = useNavigate();

  const formattedBalance = useMemo(() => 
    `₹${Number(balance).toLocaleString()}`, 
    [balance]
  );

  // Enhanced gradient backgrounds for each account type
  const cardStyle = useMemo(() => {
    const gradients = {
      SAVINGS: {
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: '#ffffff'
      },
      CURRENT: {
        background: 'linear-gradient(135deg, #009688 0%, #26a69a 100%)',
        color: '#ffffff'
      }
    };

    return {
      background: gradients[type]?.background || bgColor,
      color: gradients[type]?.color || textColor,
      cursor: 'pointer'
    };
  }, [type, bgColor, textColor]);

  return (
    <motion.div
      onClick={() => navigate('/accounts')}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2), 0 10px 10px -5px rgba(0,0,0,0.1)',
      }}
      whileTap={{ scale: 0.98 }}
      className="w-[400px] min-w-[200px] rounded-lg px-9 py-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm"
      style={cardStyle}
    >
      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-white/10 rounded-full transform translate-x-32 translate-y-32" />
        <div className="absolute left-0 top-0 w-32 h-32 bg-white/10 rounded-full transform -translate-x-16 -translate-y-16" />
      </div>

      {/* Card Content */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="text-base font-semibold uppercase opacity-90">
            {type} ACCOUNT
          </div>
          <HiCreditCard className="text-2xl opacity-80" />
        </div>
        
        <div className="space-y-1">
          <div className="text-xs opacity-80">Account Number</div>
          <div className="font-mono text-lg tracking-widest mb-5 flex items-center space-x-2">
            <span>••••</span>
            <span>••••</span>
            <span>{accountNumber.slice(-4)}</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="text-xs opacity-80 mb-1">Available Balance</div>
          <div className="text-2xl font-bold tracking-wide">{formattedBalance}</div>
        </motion.div>
      </div>

      {/* Enhanced Shine Effect */}
      <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-45 animate-shine" />
    </motion.div>
  );
});

AccountCard.displayName = 'AccountCard';

export default AccountCard;
