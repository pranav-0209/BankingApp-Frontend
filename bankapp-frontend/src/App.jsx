import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// import ManageAccount from './pages/ManageAccount';
// import Transfer from "./pages/Transfer";
// import DashBoard from "./pages/DashBoard";
// import TransactionHistory from "./pages/TransactionHistory";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuth, AuthProvider } from './auth/AuthContext'
import { PrivateRoute } from './routes/guards';
import { Outlet } from "react-router-dom";
// import UserManagement from './pages/UserManagement';
import LoadingSpinner from './components/LoadingSpinner';
import SessionExpiredModal from './components/SessionExpiredModal';
import { useSessionExpired } from './hooks/useSessionExpired';

const DashBoard = lazy(() => import("./pages/DashBoard"));
const Transfer = lazy(() => import("./pages/Transfer"));
const TransactionHistory = lazy(() => import("./pages/TransactionHistory"));
const ManageAccount = lazy(() => import("./pages/ManageAccount"));
const UserManagement = lazy(() => import("./pages/UserManagement"));

function MainLayout() {

  const location = useLocation();

  let variant = "default";

  if (location.pathname === "/accounts") {
    variant = "manageAccounts";
  } else if (location.pathname === "/transfer") {
    variant = "transfer";
  }
  else if (location.pathname === "/transactions") {
    variant = "transactions";
  }

  return (
    <>
      <div className="flex min-h-screen bg-[#F0F4F7]"> {/* Flexbox, row by default */}

        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header variant={variant} />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

const AppRoutes = () => (
  <div id="main-container">
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected app routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Suspense fallback={<LoadingSpinner />}>
            <DashBoard />
          </Suspense>} />
          <Route path="/accounts" element={<Suspense fallback={<LoadingSpinner />}>
            <ManageAccount />
          </Suspense>} />
          <Route path="/transfer" element={<Suspense fallback={<LoadingSpinner />}>
            <Transfer />
          </Suspense>} />
          <Route path="/transactions" element={<Suspense fallback={<LoadingSpinner />}>
            <TransactionHistory />
          </Suspense>} />
          <Route path="/manage-users" element={<Suspense fallback={<LoadingSpinner />}>
            <UserManagement />
          </Suspense>} />
        </Route>
      </Route>
    </Routes>
  </div>
);


export default function App() {
  const { isSessionExpiredOpen, handleModalClose } = useSessionExpired();

  return (
    <>
      <AppRoutes />
      <SessionExpiredModal 
        isOpen={isSessionExpiredOpen} 
        onClose={handleModalClose} 
      />
    </>
  );
}

