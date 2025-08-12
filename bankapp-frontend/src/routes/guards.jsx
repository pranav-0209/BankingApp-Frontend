import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../auth/token";

export const PrivateRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};