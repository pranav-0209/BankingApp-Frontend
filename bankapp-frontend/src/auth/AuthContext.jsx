import { createContext, useContext, useMemo, useState, useCallback } from "react";
import { isAuthenticated, getDecoded, setToken as saveToken, clearToken } from "../auth/token";

const AuthContext = createContext(null);

// Custom hook to use auth context
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

const AuthProvider = ({ children }) => {
    const [authed, setAuthed] = useState(isAuthenticated());
    const [user, setUser] = useState(getDecoded());

    const login = useCallback((token) => {
        saveToken(token);
        setAuthed(true);
        setUser(getDecoded());
    }, []);

    const logout = useCallback(() => {
        clearToken();
        setAuthed(false);
        setUser(null);
    }, []);

    const value = useMemo(
        () => ({ authed, user, login, logout }), 
        [authed, user, login, logout]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };