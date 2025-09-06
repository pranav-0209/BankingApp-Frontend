import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ManageAccount from './pages/ManageAccount';
import Transfer from "./pages/Transfer";
import DashBoard from "./pages/DashBoard";
import TransactionHistory from "./pages/TransactionHistory";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuth, AuthProvider } from './auth/AuthContext'
import { PrivateRoute } from './routes/guards';
import { Outlet } from "react-router-dom";
import UserManagement from './pages/UserManagement';


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
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/accounts" element={<ManageAccount />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/transactions" element={<TransactionHistory />} />
          <Route path="/manage-users" element={<UserManagement />} />
        </Route>
      </Route>
    </Routes>
  </div>
);


export default function App() {
  return (
    <AppRoutes />
  );
}

