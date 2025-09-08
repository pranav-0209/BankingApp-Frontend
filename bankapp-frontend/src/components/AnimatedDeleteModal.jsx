import React, { useState, useEffect } from 'react';

const AnimatedDeleteModal = ({ isOpen, onClose, onConfirm, accountDetails }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isAnimating ? 'bg-black/50' : 'bg-black/0'
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ${
          isAnimating
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-75 opacity-0 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Warning Icon */}
        <div className="text-center pt-8 pb-4">
          <div className="mx-auto flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
            <div className={`transform transition-all duration-500 delay-200 ${
              isAnimating ? 'scale-100 rotate-0' : 'scale-0 rotate-45'
            }`}>
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          
          <h3 className={`text-2xl font-bold text-gray-900 mb-2 transition-all duration-300 delay-100 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Delete Account?
          </h3>
          
          <div className={`text-gray-600 px-6 transition-all duration-300 delay-150 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <p className="mb-4">
              Are you sure you want to delete this account? This action cannot be undone.
            </p>
            
            {/* Account Details */}
            <div className="bg-red-50 rounded-lg p-4 text-left">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Account Type:</span>
                <span className="text-sm font-bold text-red-600">{accountDetails?.accountType}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Account Number:</span>
                <span className="text-sm font-mono text-gray-900">{accountDetails?.accountNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Balance:</span>
                <span className="text-sm font-bold text-red-600">
                  ₹{Number(accountDetails?.balance || 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`flex gap-3 p-6 pt-0 transition-all duration-300 delay-200 ${
          isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors duration-150"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-3 text-white bg-red-600 border border-red-600 rounded-lg font-medium hover:bg-red-700 hover:border-red-700 transition-colors duration-150"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimatedDeleteModal;