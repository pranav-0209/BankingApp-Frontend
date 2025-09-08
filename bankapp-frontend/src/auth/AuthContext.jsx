import { createContext, useContext, useMemo, useState, useCallback } from "react";
import { isAuthenticated, getDecoded, setToken as saveToken, clearToken } from "../auth/token";
import { useReducer } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const AuthContext = createContext(null);

// Custom hook to use auth context
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                authed: true,
                user: action.payload.user,
                loading: false,
            };
        case 'LOGOUT':
            return {
                ...state,
                authed: false,
                user: null,
                loading: false,
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};

const initialState = {
    authed: isAuthenticated(),
    user: getDecoded(),
    loading: false,
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const queryClient = useQueryClient();

    const login = useCallback((token) => {
        queryClient.clear();
        saveToken(token);
        const user = getDecoded();
        dispatch({ type: 'LOGIN', payload: { user } });
    }, [queryClient]);

    const logout = useCallback(() => {
        queryClient.clear();
        clearToken();
        dispatch({ type: 'LOGOUT' });
    }, [queryClient]);

    const value = useMemo(() => ({
        ...state,
        login,
        logout,
    }), [state, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };