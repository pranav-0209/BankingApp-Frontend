import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { setOnSessionExpiredHandler } from '../api';

export const useSessionExpired = () => {
    const [isSessionExpiredOpen, setIsSessionExpiredOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleSessionExpired = useCallback(() => {
        setIsSessionExpiredOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setIsSessionExpiredOpen(false);
        logout();
        navigate('/login');
    }, [logout, navigate]);

    // Register the handler when the hook is used
    setOnSessionExpiredHandler(handleSessionExpired);

    return {
        isSessionExpiredOpen,
        handleModalClose
    };
};