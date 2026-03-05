import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Coins, ChevronDown, LogOut, LayoutDashboard } from "lucide-react"
import { serverUrl } from '../App';
import axios from 'axios';
import { setUserData } from '../redux/userSlice';

export default function Navbar({ onClose, openProfile, setOpenProfile }) {

    const navigate = useNavigate();
    const { userData } = useSelector(state => state.user);

    const dispatch = useDispatch();

    const handleLogOut = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
            dispatch(setUserData(null));
            setOpenProfile(false);
        } catch (error) {
            console.log(`LogOut Error occoured ${error}`)
        }
    }

    return (
        <motion.div

            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10" >
            <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center' >
                <div className='text-lg font-semibold'>
                    AutoCanvas
                </div>
                <div className='flex items-center gap-5'>
                    <div className='hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer'>
                        Pricing
                    </div>
                    {
                        userData && <div className='hidden md:flex items-center gap-2 py-1.5 px-3 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10 transition '>
                            <Coins size={14} className='text-yellow-400' />
                            <span className='text-zinc-300'>Credits</span>
                            <span>{userData.credits}</span>
                            <span className='font-semibold'>+</span>
                        </div>
                    }
                    {
                        !userData ? <button className='px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm' onClick={onClose}>Get Started</button> :
                            <div className='relative'>
                                <button

                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenProfile(!openProfile)
                                    }}
                                    className='flex items-center gap-2 group outline-none'
                                >
                                    <div className='p-[1.5px] rounded-full bg-gradient-to-b from-white/20 to-transparent group-hover:from-purple-500/50 transition-all'>
                                        <img
                                            className='w-8 h-8 rounded-full object-cover bg-zinc-900 border border-white/10'
                                            referrerPolicy='no-referrer'
                                            src={userData.avatar}
                                            alt='avatar'
                                        />
                                    </div>
                                    <ChevronDown size={14} className={`text-zinc-500 transition-transform duration-500 ${openProfile ? 'rotate-180 text-white' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {
                                        openProfile && (
                                            <>


                                                <motion.div
                                                    onClick={(e) => e.stopPropagation()}
                                                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 15, scale: 0.98 }}
                                                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                                    className='absolute right-0 mt-4 w-64 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-50 rounded-2xl p-2'
                                                >
                                                    <div className='px-4 py-4 mb-1'>
                                                        <p className='text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1'>Account</p>
                                                        <p className='text-sm font-semibold text-white truncate'>{userData.name}</p>
                                                        <p className='text-[11px] text-zinc-500 truncate'>{userData.email}</p>
                                                    </div>

                                                    <div className='space-y-0.5'>
                                                        <button className='md:hidden w-full px-4 py-3 flex items-center gap-3 text-sm text-zinc-400 hover:bg-white/5 hover:text-white rounded-xl transition-all'>
                                                            <Coins size={16} className='text-yellow-500' />
                                                            <span>Credits: {userData.credits}</span>
                                                        </button>

                                                        <button
                                                            onClick={() => { navigate('/dashboard'); setOpenProfile(false); }}
                                                            className='w-full px-4 py-3 flex items-center gap-3 text-sm text-zinc-400 hover:bg-white/5 hover:text-white rounded-xl transition-all'
                                                        >
                                                            <LayoutDashboard size={16} />
                                                            Dashboard
                                                        </button>

                                                        <button
                                                            onClick={handleLogOut}
                                                            className='w-full px-4 py-3 flex items-center gap-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all'
                                                        >
                                                            <LogOut size={16} />
                                                            Logout
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            </>
                                        )
                                    }
                                </AnimatePresence>
                            </div>
                    }
                </div>
            </div>
        </motion.div >
    )
}