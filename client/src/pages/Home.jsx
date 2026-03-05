import React, { useState } from 'react'
import { motion } from "motion/react"
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import LoginModel from '../components/LoginModel'
import { useSelector } from 'react-redux'
import { Layout, Globe, Zap } from 'lucide-react'

function Home() {
    const navigate = useNavigate();
    const highlights = [
        {
            title: "Intelligent Structure",
            desc: "Architected for clarity. Our engine builds a logical hierarchy that guides users naturally.",
            icon: <Layout size={22} />,
            color: "from-blue-500/20"
        },
        {
            title: "Fluid Adaptation",
            desc: "Responsive by default. Every pixel is calculated to look intentional on any device.",
            icon: <Globe size={22} />,
            color: "from-purple-500/20"
        },
        {
            title: "Instant Deployment",
            desc: "From prompt to production. Your vision is ready for the web in minutes, not days.",
            icon: <Zap size={22} />,
            color: "from-emerald-500/20"
        }
    ]
    const [openProfile, setOpenProfile] = useState(false);
    const [openLogin, setOpenLogin] = useState(false)
    const { userData } = useSelector(state => state.user);
    return (
        <div className='relative min-h-screen bg-[#040404] text-white overflow-hidden' onClick={() => setOpenProfile(false)}>
            <Navbar onClose={() => setOpenLogin(true)} openProfile={openProfile} setOpenProfile={setOpenProfile}
            />


            <section className='pt-44 pb-32 px-6 text-center'>
                <motion.h1
                    transition={{ duration: 0.4 }}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className='text-5xl py-2 md:text-7xl font-bold tracking-tight bg-gradient-to-l to-purple-600 bg-clip-text text-transparent'>
                    Build Amazing Website
                    <span className='bg-gradient-to-r to-blue-400 bg-clip-text text-transparent'> With AI</span>
                </motion.h1>
                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className='mt-10 max-w-2xl mx-auto text-zinc-400 text-lg'>
                    Describe your idea and let AI generate a modern, responsive, production ready website.
                </motion.p>
                <button className='mt-12 px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition' onClick={() => {
                    if (!userData) {
                        setOpenLogin(true);
                    } else {
                        navigate('/dashboard');
                    }
                }}>{userData ? "Go to dashboard" : "Get Started"}</button>

            </section>
            <section className='max-w-7xl mx-auto px-6 pb-44'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {highlights.map((h, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className='group relative rounded-[2.5rem] bg-zinc-950 border border-white/5 p-12 overflow-hidden hover:border-white/10 transition-all duration-500'
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${h.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                            <div className='relative z-10'>
                                <div className='w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-10 text-zinc-400 group-hover:text-white group-hover:bg-white/10 transition-all duration-500'>
                                    {h.icon}
                                </div>
                                <h2 className='text-2xl font-bold mb-4 tracking-tight'>{h.title}</h2>
                                <p className='text-zinc-500 leading-relaxed text-sm font-medium pr-4 group-hover:text-zinc-400 transition-colors'>
                                    {h.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
            <Footer />
            {openLogin && <LoginModel open={openLogin} onClose={() => { setOpenLogin(false) }} />}
        </div>
    )
}

export default Home