// src/components/SessionExpiredModal.jsx
import React from "react";
import { Button } from "@mui/material";

const SessionExpiredModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Session Expired</h3>
                    <h4 className="text-gray-600 mb-6">Your session has expired. Please log in again.</h4>
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={onClose}
                        style={{ marginTop: '20px' }}
                    >
                        Go to Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SessionExpiredModal;