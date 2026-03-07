import React, { useState, useMemo } from 'react'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Layout, Globe, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'


import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import LoginModel from '../components/LoginModel'
import Console from '../components/Console'

const HIGHLIGHTS = [
    { title: "Intelligent Structure", desc: "Clean semantic hierarchy built with purpose.", icon: <Layout size={17} /> },
    { title: "Fully Responsive", desc: "Designed for every screen from the ground up.", icon: <Globe size={17} /> },
    { title: "Live in moments", desc: "Go from a sentence to a deployed site instantly.", icon: <Zap size={17} /> },
]

const STEPS = [
    { n: '01', h: 'Describe your idea', b: 'Plain-English prompts. No jargon, no setup.' },
    { n: '02', h: 'Watch it come to life', b: 'Layout and components generated in real time.' },
    { n: '03', h: 'Iterate and Launch', b: 'Refine with follow-up prompts and go live.' },
]


const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
}

function Home() {
    const navigate = useNavigate()
    const [openProfile, setOpenProfile] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const { userData } = useSelector(state => state.user)


    const handleCtaClick = () => {
        if (!userData) return setOpenLogin(true)
        navigate('/dashboard')
    }

    return (
        <div className='relative min-h-screen bg-[#0c0c0e] text-white font-sans selection:bg-violet-500/30 overflow-x-hidden' onClick={() => setOpenProfile(false)}>

            <div className="noise-overlay fixed inset-0 z-0 pointer-events-none opacity-[0.03]" />

            <Navbar
                onClose={() => setOpenLogin(true)}
                openProfile={openProfile}
                setOpenProfile={setOpenProfile}
            />

            {/* _________________________Hero Section____________________*/}
            <section className='relative flex flex-col items-center text-center px-6 pt-32 pb-16'>
                <div className='hero-glow absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none' />

                <motion.div {...fadeInUp} className='relative z-10 flex flex-col items-center'>
                    <h1 className='text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight max-w-4xl'>
                        Turn any idea into a website <br className="hidden md:block" /> in moments.
                    </h1>

                    <p className='mt-7 max-w-md text-zinc-400 leading-relaxed font-light text-lg'>
                        Describe what you want. Our AI builds a complete website—responsive, polished, and ready to launch.
                    </p>

                    <button onClick={handleCtaClick} className='mt-9 group flex items-center gap-2 px-7 py-3 rounded-xl bg-white text-black font-semibold transition-all hover:bg-zinc-200 hover:ring-4 hover:ring-white/10'>
                        {userData ? 'Go to Dashboard' : 'Start building — free'}
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>

                <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className='relative z-10 mt-16 w-full max-w-3xl'>
                    <div className='rounded-2xl border border-white/10 bg-[#0e0e12]/95 shadow-2xl'>
                        <Console />
                    </div>
                </motion.div>
            </section>

            <div className='h-px bg-white/5 max-w-5xl mx-auto' />
            {/* _________________________Feature Grid____________________*/}
            <section className='max-w-6xl mx-auto px-6 py-24'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {HIGHLIGHTS.map((h, i) => (
                        <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }}
                            className='group p-8 bg-white/[0.02] border border-white/[0.08] rounded-2xl hover:bg-white/[0.05] transition-colors'>
                            <div className='w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-violet-400 group-hover:bg-violet-500/10 transition-all mb-6'>
                                {h.icon}
                            </div>
                            <h3 className='text-lg font-semibold mb-2'>{h.title}</h3>
                            <p className='text-sm text-zinc-500 leading-relaxed'>{h.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* _________________________Steps Section____________________*/}
            <section className='max-w-4xl mx-auto px-6 py-20'>
                <div className='mb-12'>
                    <span className='text-[10px] tracking-widest uppercase text-zinc-600'>The process</span>
                    <h2 className='text-4xl font-bold mt-2'>Simple by design.</h2>
                </div>

                <div className="divide-y divide-white/5">
                    {STEPS.map((s, i) => (
                        <div key={i} className='flex items-start gap-6 py-8'>
                            <span className='text-[11px] text-zinc-700 font-mono mt-1'>{s.n}</span>
                            <CheckCircle2 size={18} className='mt-0.5 text-violet-500/40' />
                            <div>
                                <h3 className='text-lg font-semibold text-white mb-1'>{s.h}</h3>
                                <p className='text-zinc-500 font-light leading-relaxed'>{s.b}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className='relative py-32 border-t border-white/5 text-center'>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(124,58,237,0.08),transparent)]' />
                <motion.div {...fadeInUp} className='relative z-10'>
                    <h2 className='text-4xl md:text-6xl font-bold tracking-tight mb-8'>
                        Design Without Boundaries.
                    </h2>
                    <button onClick={handleCtaClick} className='group inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-black font-semibold transition-all hover:bg-zinc-200'>
                        {userData ? 'Back to Dashboard' : 'Build for free'}
                        <ArrowRight size={16} />
                    </button>
                </motion.div>
            </section>

            <Footer />
            {openLogin && <LoginModel open={openLogin} onClose={() => setOpenLogin(false)} />}
        </div>
    )
}

export default Home