import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { HiBell, HiArrowLeft, HiOutlineLogout, HiOutlineUser } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../auth/AuthContext';

const Header = ({ variant = "default", title = "" }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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

  const ProfileMenu = () => (
    <AnimatePresence>
      {showProfileMenu && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute right-0 top-16 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
        >
          <button 
            onClick={() => navigate('/profile')}
            className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 transition-colors"
          >
            <HiOutlineUser className="mr-2" />
            Profile
          </button>
          <button 
            onClick={logout}
            className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
          >
            <HiOutlineLogout className="mr-2" />
            Logout
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const RightSection = () => (
    <div className="flex items-center">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="h-12 w-12 bg-gradient-to-br from-[#99CCFF] to-[#2872c9] rounded-full flex items-center justify-center border-2 border-white shadow-md"
      >
        <span className="text-white text-xl font-bold">{getInitials(user?.name)}</span>
      </motion.div>
    </div>
  );

  const HeaderContent = () => {
    if (variant === "manageAccounts" || variant === "transfer" || variant === "transactions") {
      return (
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between px-10 py-4 bg-white rounded-b-lg shadow-sm mb-8"
        >
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-white bg-[#2872c9] hover:bg-[#2065b9] transition-colors"
            >
              <HiArrowLeft className="text-xl" />
              <span className="font-medium">Back</span>
            </motion.button>
            <h1 className="text-xl font-semibold text-[#263d6b]">{title}</h1>
          </div>
          <RightSection />
        </motion.header>
      );
    }

    return (
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between px-10 py-3 bg-white rounded-b-lg shadow-sm mb-3"
      >
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-2xl font-semibold text-[#263d6b]">
            Welcome back,
          </div>
          <div className="text-lg text-[#2872c9] font-medium">
            {user?.name || "Guest"}
          </div>
        </motion.div>
        <RightSection />
      </motion.header>
    );
  };

  return <HeaderContent />;
};

export default Header;
