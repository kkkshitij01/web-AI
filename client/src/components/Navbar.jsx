import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import { useDispatch, useSelector } from 'react-redux'
import { Coins } from "lucide-react"
import { serverUrl } from '../App';
import axios from 'axios';
import { setUserData } from '../redux/userSlice';
export default function Navbar({ onClose }) {

    const { userData } = useSelector(state => state.user);
    const [openProfile, setOpenProfile] = useState(false);
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
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
            <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
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
                                <button onClick={() => setOpenProfile(!openProfile)} className='flex items-center'><img className='w-9 h-9 rounded-full border border-white/20 object-cover' src={userData.avatar} alt='avatar' /></button>
                                <AnimatePresence>
                                    {
                                        openProfile && (
                                            <>
                                                <motion.div
                                                    initial={{ opacity: 0, y: -15, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -15, scale: 0.95 }}
                                                    className='bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden absolute -right-23 mt-3 w-60 z-50 rounded-xl'
                                                >
                                                    <div className='px-4 py-3 border-b border-white/10'>
                                                        <p className='text-sm flex justify-center items-center font-medium truncate'>{userData.name}</p>
                                                        <p className='text-sm flex justify-center items-center text-zinc-500 truncate'>{userData.email}</p>
                                                    </div>
                                                    <button className='md:hidden w-full px-4 py-3 flex items-center gap-2 text-sm border-b border-white/10 hover:bg-white/5 justify-center ' >
                                                        <Coins size={14} className='text-yellow-400' />
                                                        <span className='text-zinc-300'>Credits</span>
                                                        <span>{userData.credits}</span>
                                                        <span className='font-semibold'>+</span>
                                                    </button>
                                                    <button className='w-full py-3 text-left px-4 text-sm border-b border-white/10 hover:bg-white/5 justify-center flex items-center'>Dashboard</button>
                                                    <button onClick={() => {
                                                        handleLogOut();
                                                    }} className='w-full py-3 text-left px-4 text-sm  hover:bg-white/5 justify-center flex items-center text-red-500 font-bold'>Logout</button>

                                                </motion.div>
                                            </>
                                        )
                                    }
                                </AnimatePresence>
                            </div>
                    }

                </div>
            </div>
        </motion.div>
    )
}
