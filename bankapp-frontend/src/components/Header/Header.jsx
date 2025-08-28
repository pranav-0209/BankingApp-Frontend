import React from 'react'
import { useNavigate } from "react-router-dom";
import { HiBell } from 'react-icons/hi';
import { HiArrowLeft } from "react-icons/hi";
import { useAuth } from '../../auth/AuthContext';

const Header = ({ variant = "default", title = "" }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Helper function to get user initials
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase();
  };

  // Get user's first name for greeting
  const getFirstName = (fullName) => {
    if (!fullName) return "User";
    return fullName.split(" ")[0];
  };

  if (variant === "manageAccounts" || variant === "transfer" || variant === "transactions") {
    return (
      <header className="flex items-center justify-between px-10 py-4 bg-white rounded-b-lg shadow-sm mb-8">
        {/* Back Button + Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1 pl-1.5 pr-2 py-0.5 outline-2 rounded-l-lg outline-offset-0  text-white font-thin bg-[#263d6b] hover:bg-[#2872c9] cursor-pointer"
          >
            <HiArrowLeft className="text-xl" />
            <span className='text-xl pb-0.5'>Back</span>
          </button>
        </div>
        <div className="flex items-center gap-6">
          {/* Notification Icon */}
          <button className="relative bg-blue-50 p-2.5 rounded-full hover:bg-blue-100 transition">
            <HiBell className="text-xl text-[#2872c9]" />
            {/* Notification dot */}
            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
          {/* User Avatar */}
          <div className="h-12 w-12 bg-[#c1e0ff] rounded-full flex items-center justify-center border-2 border-white shadow">
            <span className="text-[#263d6b] text-xl font-bold">{getInitials(user?.name)}</span>
            {/* Replace above with an <img /> if you have a profile pic */}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between px-10 py-3.5 bg-white rounded-b-lg shadow-sm mb-3">
      {/* Greeting */}
      <div>
        <div className="text-2xl font-semibold text-[#263d6b]">
          Welcome back,
        </div>
        <div className="text-lg text-[#2872c9] font-medium">
          {user?.name || "Guest"}
        </div>
      </div>

      {/* Right section: notification + profile */}
      <div className="flex items-center gap-6">
        {/* Notification Icon */}
        <button className="relative bg-blue-50 p-2.5 rounded-full hover:bg-blue-100 transition">
          <HiBell className="text-xl text-[#2872c9]" />
          {/* Notification dot */}
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        {/* User Avatar */}
        <div className="h-12 w-12 bg-[#c1e0ff] rounded-full flex items-center justify-center border-2 border-white shadow">
          <span className="text-[#263d6b] text-xl font-bold">{getInitials(user?.name)}</span>
          {/* Replace above with an <img /> if you have a profile pic */}
        </div>
      </div>
    </header>
  )
}

export default Header
