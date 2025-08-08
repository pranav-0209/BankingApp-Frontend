import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ManageAccount from './pages/ManageAccount';
import Transfer from "./pages/Transfer";
import DashBoard from "./pages/DashBoard";
import TransactionHistory from "./pages/TransactionHistory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


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
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/accounts" element={<ManageAccount />} />
              <Route path="/transfer" element={<Transfer />} />
              <Route path="/transactions" element={<TransactionHistory />} />
              {/* ...other routes... */}
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default function App() {
  return (
    
      <Routes>
        {/* Public routes: Login/Signup */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected/main app routes */}
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    
  );
}

