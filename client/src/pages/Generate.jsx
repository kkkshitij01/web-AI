import React, { useState, useMemo, useCallback } from 'react'
import { ArrowLeft, ArrowRight, Sparkles, RefreshCcw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import axios from "axios"
import { toast } from 'react-toastify'
import { serverUrl } from "../App.jsx"

const ALL_SUGGESTIONS = [
    "Dark themed landing page with a sticky navigation bar, a 3-column pricing section, and an FAQ accordion using Javascript",
    "Minimalist portfolio with a filterable project gallery, smooth scroll navigation, and a floating contact button",
    "Single-page skincare shop with a hero image, a 4-item product grid with hover effects, and a slide-out shopping cart sidebar",
    "Startup 'Coming Soon' page with a full-screen background, a countdown timer script, and a centered email signup form",
    "Restaurant homepage featuring a transparent navbar, a tabbed menu section to switch between breakfast and dinner, and a Google Maps embed",
    "Mobile app showcase with a split-screen hero, a feature list with custom SVG icons, and a simple screenshot carousel slider",
    "Crypto tracker interface with a dark sidebar, a data table for coin prices, and a simple toggle for light/dark mode",
    "Photography website with a CSS masonry layout, a full-screen image lightbox overlay, and a fade-in animation on scroll",
    "E-book landing page with a fixed header, a chapter list with toggleable descriptions, and a star-rating testimonial section",
    "Fitness landing page featuring a BMI calculator script, a grid of workout categories, and a sticky 'Join Now' footer",
    "Creative agency site using glassmorphism cards, a background particle effect, and a project modal popup system",
    "AI service page with a typing-text animation effect, a step-by-step process timeline, and a simple contact form validation",
    "Fashion lookbook with a dual-column layout, large high-res image containers, and a horizontal scroll section for new arrivals",
    "Music podcast site with a custom styled audio player interface, a list of recent episodes, and a social media icon bar",
    "Modern real estate landing page with a hero search bar, property cards with 'Heart' icons, and a simple testimonial slider"
]

export default function Generate() {
    const navigate = useNavigate()
    const [prompt, setPrompt] = useState("")
    const [loading, setLoading] = useState(false)

    const getRandomSet = useCallback(() => {
        return [...ALL_SUGGESTIONS]
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
    }, [])


    const handleShuffle = () => {
        let newSet = getRandomSet()
        setDisplaySuggestions(newSet)
    }

    const [displaySuggestions, setDisplaySuggestions] = useState(() => getRandomSet())
    const handleGenerate = async () => {
        const cleanPrompt = prompt.trim()
        if (cleanPrompt.length < 15) {
            return toast.warn("Give us a bit more detail (at least 15 chars) to build something great.")
        }

        setLoading(true)
        try {
            const { data } = await axios.post(`${serverUrl}/api/website/generate`, { prompt: cleanPrompt }, { withCredentials: true })
            toast.success("Design engineered successfully!")
            navigate(`/editor/${data.websiteId}`)
        } catch (error) {
            toast.error(error.response?.data?.message || "Generation failed. Try again?")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-violet-500/30 overflow-hidden'>

            <div className='fixed inset-0 pointer-events-none'>
                <div className='absolute top-[-10%] left-[-10%] w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.05)_0%,transparent_50%)]' />
                <div className='absolute inset-0 bg-[url("https://grainy-gradients.vercel.app/noise.svg")] opacity-[0.03] brightness-100 contrast-150' />
            </div>
            <header className='relative z-50 border-b border-white/5 bg-[#0c0c0e]/80 backdrop-blur-md '>
                <div className='max-w-6xl mx-auto   px-6 h-14 flex items-center justify-left'>
                    <button onClick={() => navigate('/dashboard')} className='p-1.5 rounded-lg text-white- hover:text-white hover:bg-black bg-black/10 border border-white/20 cursor-pointer'>
                        <ArrowLeft size={15} />
                    </button>
                    <span onClick={() => navigate('/')} className=' mx-6 font-bold tracking-tighter cursor-pointer'>AutoCanvas</span>
                    <div className='w-9' />
                </div>
            </header>

            <main className='relative z-10 max-w-3xl mx-auto px-6 pt-20 pb-12'>
                <AnimatePresence mode="wait">
                    {!loading ? (
                        <motion.div
                            key="input-stage"
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        >
                            <div className='text-center mb-10'>
                                <h1 className='text-5xl md:text-6xl font-extrabold tracking-tighter mb-4'>
                                    What are we <span className='text-zinc-500'>building?</span>
                                </h1>
                                <p className='text-zinc-500 font-light'>Describe your vision. We'll handle the architecture and code.</p>
                            </div>

                            <div className='bg-zinc-900/50 border border-white/10 rounded-2xl p-1 focus-within:border-white/20 transition-all'>
                                <textarea
                                    className='w-full p-4 bg-transparent outline-none resize-none min-h-[160px] text-lg font-light placeholder:text-zinc-700'
                                    placeholder='A minimalist agency site with a dark theme...'
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                />
                                <div className='flex items-center justify-between p-3 border-t border-white/5'>
                                    <span className='text-[10px] font-mono text-zinc-600 uppercase ml-2'>Length: {prompt.length}</span>
                                    <button
                                        disabled={!prompt.trim()}
                                        onClick={handleGenerate}
                                        className='flex items-center gap-2 px-6 py-2 bg-white text-black rounded-xl font-bold text-sm hover:bg-zinc-200 disabled:opacity-40 transition-all'
                                    >
                                        Generate <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className='mt-8'>
                                <div className='flex items-center justify-between mb-4'>
                                    <span className='text-[10px] font-bold text-zinc-600 uppercase tracking-widest'>Try these layouts</span>
                                    <button
                                        onClick={handleShuffle}
                                        className='flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors group'
                                    >
                                        <RefreshCcw size={14} className='group-active:rotate-180 transition-transform duration-500' />
                                        Shuffle
                                    </button>
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                    {displaySuggestions.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setPrompt(s)}
                                            className='text-left px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-xs text-zinc-400 hover:text-white transition-all'
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="loading-stage"
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            className='flex flex-col items-center py-20'
                        >
                            <div className='relative mb-8'>
                                <div className='w-16 h-16 border-2 border-zinc-800 border-t-white rounded-full animate-spin' />
                                <Sparkles className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-500' size={20} />
                            </div>
                            <h2 className='text-2xl font-bold mb-2'>Architecting your site...</h2>
                            <p className='text-zinc-500 text-center max-w-xs text-sm font-light'>
                                We're generating clean components and production-ready layouts based on your prompt.
                            </p>

                            <div className='mt-10 w-full max-w-xs space-y-3'>
                                {['Designing UI', 'Writing Logic', 'Finalizing Code'].map((step, i) => (
                                    <div key={i} className='flex items-center justify-between text-[11px] font-mono text-zinc-600'>
                                        <span>{step}</span>
                                        <div className='w-32 h-1 bg-zinc-900 rounded-full overflow-hidden'>
                                            <motion.div
                                                className='h-full bg-zinc-500'
                                                initial={{ width: 0 }}
                                                animate={{ width: '100%' }}
                                                transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    )
}