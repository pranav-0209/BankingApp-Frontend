import { HiHome, HiUser, HiRefresh, HiMenuAlt2 } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';


const navItems = [
  { label: 'Home', icon: <HiHome />, path: '/' },
  { label: 'Account', icon: <HiUser />, path: '/accounts' },
  { label: 'Transfer', icon: <HiRefresh />, path: '/transfer' },
  { label: 'Transaction', icon: <HiMenuAlt2 />, path: '/transactions' },
];


const Sidebar = ({ current, onNavigate }) => {
    return (
        <aside className="bg-[#c1e0ff] w-75 min-h-screen flex flex-col border-r border-gray-200">
            {/* Bank Name */}
            <div className="text-[2.5rem] font-bold text-[#263d6b] pt-10 pl-14 pb-22">
                AuraBank
            </div>
            {/* Nav Links */}
            <nav className="flex flex-col gap-5">
                {navItems.map((item, idx) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-5 pl-13 pr-2 py-3 text-2xl font-medium rounded-l-lg cursor-pointer
        ${isActive
                                ? 'bg-white text-[#2872c9] shadow-md'
                                : 'text-[#476488] hover:bg-[#97c6ec] hover:text-[#2872c9]'}`
                        }
                        end={item.path === '/'}
                    >
                        <span className="text-3xl">{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

        </aside>

    )
}

export default Sidebar
