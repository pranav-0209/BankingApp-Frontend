import { useLocation, Route, Routes } from "react-router-dom";
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DashBoard from './components/MainComponent/DashBoard';
import ManageAccount from './components/MainComponent/ManageAccount';
import Transfer from "./components/MainComponent/Transfer";
import TransactionHistory from "./components/MainComponent/TransactionHistory";

function App() {

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

export default App
