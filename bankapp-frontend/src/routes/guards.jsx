// In src/routes/guards.jsx

import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, getToken } from "../auth/token";
import { jwtDecode } from "jwt-decode"; // Import the decoder

// This is your existing guard for any logged-in user
export const PrivateRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

// This is the new guard specifically for ADMIN users
export const AdminGuard = () => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    const token = getToken();
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role; // Assumes the role is in the token payload

    return userRole === 'ADMIN' ? <Outlet /> : <Navigate to="/dashboard" replace />;
};