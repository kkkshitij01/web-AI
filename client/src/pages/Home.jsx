import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import LoginModel from '../components/LoginModel'
import { useSelector } from 'react-redux'

function Home() {
    const highlights = ["Smart structures, zero guesswork", "Fully Responsive Layouts", "Production Ready Output"]
    const [openLogin, setOpenLogin] = useState(false)
    const { userData } = useSelector(state => state.user);
    return (
        <div className='relative min-h-screen bg-[#040404] text-white overflow-hidden'>
            <Navbar onClose={() => { setOpenLogin(true) }} />
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
                {!userData ? <button className='mt-12 px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition' onClick={() => { setOpenLogin(true) }}>Get Started</button> : <button>a</button>}

            </section>
            <section className='max-w-7xl mx-auto px-6 pb-32'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                    {highlights.map((h, i) => {
                        return <motion.div
                            key={i}
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className='rounded-2xl bg-white/5 border border-white/10 p-8'
                        >
                            <h1 className='text-xl font-semibold mb-3'>{h}</h1>
                            <p className='text-sm text-zinc-400'>LogicLayout analyzes your content to build the perfect foundation. No more dragging boxes around or wondering if it looks right—our AI ensures every pixel serves a purpose.</p>
                        </motion.div>
                    })}
                </div>
            </section >
            <Footer />
            {openLogin && <LoginModel open={openLogin} onClose={() => { setOpenLogin(false) }} />}
        </div >
    )
}

export default Home