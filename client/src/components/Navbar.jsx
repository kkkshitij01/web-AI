import React from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Coins, ChevronDown, LogOut, LayoutDashboard } from "lucide-react"
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'

export default function Navbar({ onClose, openProfile, setOpenProfile }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)

    const handleLogOut = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
            dispatch(setUserData(null))
            setOpenProfile(false)
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0c0c0e]/80 backdrop-blur-xl font-sans"
        >
            <div className='max-w-5xl mx-auto px-6 h-16 flex justify-between items-center'>

                {/* _______________________Logo_____________________ */}
                <Link to="/" className='text-lg font-bold tracking-tighter text-white hover:opacity-80 transition-opacity'>
                    AutoCanvas
                </Link>

                <div className='flex items-center gap-6'>
                    <nav className='hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400'>
                        <button className='hover:text-white transition-colors'>Pricing</button>
                    </nav>

                    {userData && (
                        <div className='hidden md:flex items-center gap-2 py-1.5 px-3 rounded-full bg-white/5 border border-white/10 text-xs'>
                            <Coins size={14} className='text-yellow-500' />
                            <span className='text-zinc-300'>{userData.credits} <span className="opacity-50">credits</span></span>
                        </div>
                    )}
                    {!userData ? (
                        <button
                            onClick={onClose}
                            className='text-sm font-semibold px-5 py-2 rounded-lg bg-white text-black hover:bg-zinc-200 transition-all active:scale-95'
                        >
                            Get Started
                        </button>
                    ) : (
                        <div className='relative'>
                            <button
                                onClick={(e) => { e.stopPropagation(); setOpenProfile(!openProfile) }}
                                className='flex items-center gap-2 group p-1'
                            >
                                <div className={`p-0.5 rounded-full transition-all duration-300 ${openProfile ? 'bg-gradient-to-tr from-violet-500 to-blue-400' : 'bg-white/10 group-hover:bg-white/20'}`}>
                                    <img
                                        className='w-7 h-7 rounded-full object-cover bg-zinc-900'
                                        src={userData.avatar}
                                        alt='User avatar'
                                    />
                                </div>
                                <ChevronDown
                                    size={14}
                                    className={`transition-transform duration-300 text-zinc-500 group-hover:text-white ${openProfile ? 'rotate-180 text-white' : ''}`}
                                />
                            </button>

                            <AnimatePresence>
                                {openProfile && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className='absolute right-0 mt-3 w-64 rounded-2xl bg-[#0f0f12] border border-white/10 p-2 shadow-2xl backdrop-blur-2xl'
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className='px-4 py-3 border-b border-white/5'>
                                            <p className='text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1'>Account</p>
                                            <p className='text-sm font-medium text-white truncate'>{userData.name}</p>
                                            <p className='text-xs text-zinc-500 truncate'>{userData.email}</p>
                                        </div>

                                        <div className='mt-2 space-y-1'>
                                            <MenuButton icon={<LayoutDashboard size={16} />} label="Dashboard" onClick={() => { navigate('/dashboard'); setOpenProfile(false); }} />

                                            <button
                                                onClick={handleLogOut}
                                                className='w-full px-4 py-2.5 flex items-center gap-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors'
                                            >
                                                <LogOut size={16} />
                                                <span>Log out</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </motion.nav>
    )
}


const MenuButton = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className='w-full px-4 py-2.5 flex items-center gap-3 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all'
    >
        {icon}
        <span>{label}</span>
    </button>
)