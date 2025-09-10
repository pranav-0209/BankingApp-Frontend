import { HiHome, HiUser, HiRefresh, HiMenuAlt2, HiLogout } from 'react-icons/hi';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';


const navItems = [
    { label: 'Home', icon: <HiHome />, path: '/dashboard' },
    { label: 'Account', icon: <HiUser />, path: '/accounts' },
    { label: 'Transfer', icon: <HiRefresh />, path: '/transfer' },
    { label: 'Transaction', icon: <HiMenuAlt2 />, path: '/transactions' },
];


const Sidebar = ({ current, onNavigate }) => {

    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to login page after logout
    };
    return (
        <aside className="bg-[#99CCFF] w-75 min-h-screen flex flex-col border-r border-gray-200 overflow-hidden">
            {/* Bank Name */}
            <div className="pt-15 pb-20 flex justify-center">
                <img src="/images/aurabank-logo.png" alt="AuraBank Logo" className="w-58" />
            </div>
            {/* Nav Links */}
            <nav className="flex flex-col gap-5">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        end={item.path === "/"}
                        className={({ isActive }) =>
                            `flex items-center gap-5 pl-13 pr-2 py-3 text-2xl font-medium cursor-pointer
        ${isActive
                                ? 'bg-white text-[#2872c9] shadow-md transition-all duration-300 transform scale-105'
                                : 'text-[#476488] hover:bg-[#97c6ec] hover:text-[#263d6b] transition-colors duration-300'}`
                        }

                    >
                        <span className="text-3xl transition-transform duration-300 transform group-hover:rotate-12">{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
            <div className="pt-5">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-5 pl-13.5 pr-2 py-3 text-2xl font-medium rounded-l-lg cursor-pointer w-full text-[#476488] hover:bg-[#97c6ec] hover:text-[#263d6b] transition-colors duration-300"
                >
                    <span className="text-3xl transition-transform duration-300 transform group-hover:rotate-12"><HiLogout /></span>
                    <span>Logout</span>
                </button>
            </div>
        </aside>

    )
}

export default Sidebar
