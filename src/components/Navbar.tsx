import { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'motion/react'
import { changeRoleToOwner } from '../services/owner'

const Navbar = () => {
    const { setShowLogin, user, logout, isOwner, setIsOwner } = useAppContext()
    const location = useLocation()
    const [open, setOpen] = useState(false)
    const [searchFocused, setSearchFocused] = useState(false)
    const navigate = useNavigate()

    const changeRole = async () => {
        try {
            const data = await changeRoleToOwner()
            if (data.success) {
                setIsOwner(true)
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const isHomePage = location.pathname === '/'

    return (
        <>
            {/* Backdrop for mobile menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 sm:hidden"
                    />
                )}
            </AnimatePresence>

            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all ${
                    isHomePage
                        ? 'bg-light/80 border-gray-200/50'
                        : 'bg-white/80 border-gray-200/50'
                }`}
            >
                <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4">
                    {/* Logo */}
                    <Link to="/">
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            src={assets.logo}
                            alt="logo"
                            className="h-8 cursor-pointer"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex items-center gap-8">
                        {/* Menu Links */}
                        <div className="flex items-center gap-6">
                            {menuLinks.map((link, index) => {
                                const isActive = location.pathname === link.path
                                return (
                                    <Link key={index} to={link.path}>
                                        <motion.div
                                            whileHover={{ y: -2 }}
                                            className="relative"
                                        >
                                            <span
                                                className={`text-sm font-medium transition-colors ${
                                                    isActive
                                                        ? 'text-primary'
                                                        : 'text-gray-600 hover:text-primary'
                                                }`}
                                            >
                                                {link.name}
                                            </span>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                                                    transition={{
                                                        type: 'spring',
                                                        stiffness: 380,
                                                        damping: 30,
                                                    }}
                                                />
                                            )}
                                        </motion.div>
                                    </Link>
                                )
                            })}
                        </div>

                        {/* Search Bar (Desktop) */}
                        <motion.div
                            animate={{
                                width: searchFocused ? '280px' : '200px',
                            }}
                            className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                                searchFocused
                                    ? 'bg-white shadow-lg border-2 border-primary'
                                    : 'bg-white/50 border border-gray-200'
                            }`}
                        >
                            <img
                                src={assets.search_icon}
                                alt="search"
                                className="w-4 h-4 opacity-60"
                            />
                            <input
                                type="text"
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                                className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
                                placeholder="Search cars..."
                            />
                        </motion.div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                    isOwner ? navigate('/owner') : changeRole()
                                }
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                            >
                                {isOwner ? (
                                    <span className="flex items-center gap-2">
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                            />
                                        </svg>
                                        Dashboard
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                        List Cars
                                    </span>
                                )}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                    user ? logout() : setShowLogin(true)
                                }
                                className="px-6 py-2 bg-linear-to-r from-primary to-blue-600 hover:from-primary-dull hover:to-blue-700 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all"
                            >
                                {user ? 'Logout' : 'Login'}
                            </motion.button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setOpen(!open)}
                        className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Menu"
                    >
                        <motion.div
                            animate={open ? 'open' : 'closed'}
                            className="w-6 h-5 flex flex-col justify-between"
                        >
                            <motion.span
                                variants={{
                                    closed: { rotate: 0, y: 0 },
                                    open: { rotate: 45, y: 8 },
                                }}
                                className="w-full h-0.5 bg-gray-600 rounded-full"
                            />
                            <motion.span
                                variants={{
                                    closed: { opacity: 1 },
                                    open: { opacity: 0 },
                                }}
                                className="w-full h-0.5 bg-gray-600 rounded-full"
                            />
                            <motion.span
                                variants={{
                                    closed: { rotate: 0, y: 0 },
                                    open: { rotate: -45, y: -8 },
                                }}
                                className="w-full h-0.5 bg-gray-600 rounded-full"
                            />
                        </motion.div>
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className={`fixed top-16 right-0 w-80 h-screen ${
                                isHomePage ? 'bg-light' : 'bg-white'
                            } border-l border-gray-200 shadow-2xl z-50 sm:hidden overflow-y-auto`}
                        >
                            <div className="flex flex-col p-6 gap-6">
                                {/* Mobile Search */}
                                <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg">
                                    <img
                                        src={assets.search_icon}
                                        alt="search"
                                        className="w-4 h-4 opacity-60"
                                    />
                                    <input
                                        type="text"
                                        className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
                                        placeholder="Search cars..."
                                    />
                                </div>

                                {/* Mobile Menu Links */}
                                <div className="flex flex-col gap-4">
                                    {menuLinks.map((link, index) => {
                                        const isActive =
                                            location.pathname === link.path
                                        return (
                                            <Link
                                                key={index}
                                                to={link.path}
                                                onClick={() => setOpen(false)}
                                            >
                                                <motion.div
                                                    initial={{ x: 50, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className={`px-4 py-3 rounded-lg transition-all ${
                                                        isActive
                                                            ? 'bg-primary text-white'
                                                            : 'hover:bg-gray-100 text-gray-700'
                                                    }`}
                                                >
                                                    <span className="font-medium">
                                                        {link.name}
                                                    </span>
                                                </motion.div>
                                            </Link>
                                        )
                                    })}
                                </div>

                                {/* Mobile Action Buttons */}
                                <div className="flex flex-col gap-3 pt-6 border-t border-gray-200">
                                    <motion.button
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        onClick={() => {
                                            isOwner
                                                ? navigate('/owner')
                                                : changeRole()
                                            setOpen(false)
                                        }}
                                        className="w-full px-4 py-3 bg-white border border-gray-200 hover:border-primary hover:text-primary rounded-lg font-medium transition-all"
                                    >
                                        {isOwner ? '📊 Dashboard' : '🚗 List Cars'}
                                    </motion.button>

                                    <motion.button
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        onClick={() => {
                                            user ? logout() : setShowLogin(true)
                                            setOpen(false)
                                        }}
                                        className="w-full px-4 py-3 bg-linear-to-r from-primary to-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                                    >
                                        {user ? 'Logout' : 'Login'}
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    )
}

export default Navbar