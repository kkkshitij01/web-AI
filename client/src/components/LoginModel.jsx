import React from 'react'
import { motion } from "motion/react"
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../fireBase.js'
import axios from "axios"
import { serverUrl } from "../App.jsx"
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice.js'
export default function LoginModel({ open, onClose }) {
    const dispatch = useDispatch();
    const handleGoogleAuth = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            const { data } = await axios.post(`${serverUrl}/api/auth/google`, { name: result.user.displayName, email: result.user.email, avatar: result.user.photoURL }, { withCredentials: true })
            dispatch(setUserData(data));
            onClose();

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <motion.div
                className='fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-xl px-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => { onClose() }}
            >
                <motion.div

                    initial={{ scale: 0.88, opacity: 0, y: 100 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="relative w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-br from-purple-500/40 via-blue-500/30 to-transparent">
                    <div className='relative rounded-3xl bg-[#0b0b0b] border border-white/10 ' onClick={(e) => {
                        e.stopPropagation();
                    }}>
                        <motion.div className='absolute -top-32 -left-32 w-80 h-80 bg-purple-500/30 blur-[140px]'
                            animate={{ opacity: [0.25, 0.4, 0.25] }}
                            transition={{ duration: 6, repeat: Infinity }}
                        >

                        </motion.div>
                        <motion.div className='absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500/25 blur-[140px]'
                            animate={{ opacity: [0.25, 0.4, 0.25] }}
                            transition={{ duration: 6, repeat: Infinity }}
                        >
                        </motion.div>
                        <button className='absolute top-5 right-5 z-20 text-zinc-500 hover:text-white transition text-lg' onClick={() => { onClose(false) }}> X </button>
                        <div className='relative px-8 pt-14 pb-10 text-center'>
                            <h1 className='inline-block mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300'>
                                AI-Powered Website Builder
                            </h1>
                            <h2 className='text-3xl font-semibold leading-tight mb-3 space-x-2'>
                                <span>Welcome to</span>
                                <span className='bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>AutoCanvas</span>
                            </h2>
                            <motion.button onClick={handleGoogleAuth} className='group relative w-full h-13 rounded-xl bg-white text-black font-semibold shadow-xl overflow-hidden'
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                            >
                                <div className='relative flex items-center justify-center gap-3' >
                                    <img className='w-5 h-5' src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="google" /> Continue with google
                                </div>
                            </motion.button>
                            <div className='flex items-center gap-4 my-10'>
                                <div className='h-px flex-1 bg-white/10' />
                                <span className='text-xs text-zinc-500 tracking-wide'>Secure Login</span>
                                <div className='h-px flex-1 bg-white/10' />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </>
    )
}
