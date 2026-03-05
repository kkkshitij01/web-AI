import React from 'react'
import { ArrowLeft, Loader2, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from "axios"
import { serverUrl } from "../App.jsx"
import { toast } from 'react-toastify';

export default function Generate() {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleGenerateWebiste = async () => {
        if (!prompt.trim()) {
            toast.error("Please enter a description of your vision to get started.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                theme: "dark",
            });
            return;
        }

        setLoading(true);
        try {
            const result = await axios.post(`${serverUrl}/api/website/generate`, { prompt }, { withCredentials: true })
            console.log(result);
            toast.success("Website generated successfully!");
            navigate(`/editor/${result.data.websiteId}`);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen bg-linear-to-br from-[#050505] via-[#0b0b0b] to-[#050505] text-white'>
            <div className='sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10'>
                <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <button
                            disabled={loading}
                            className='p-2 rounded-lg hover:bg-white/10 transition disabled:opacity-50'
                            onClick={() => { navigate('/') }}
                        >
                            <ArrowLeft size={16} />
                        </button>
                        <h1 className='text-lg font-semibold'>AutoCanvas</h1>
                    </div>
                </div>
            </div>

            <div className='max-w-6xl mx-auto px-6 py-16'>
                <div className='text-center mb-16'>
                    <h1 className='text-4xl md:text-5xl font-bold mb-5 leading-tight'>
                        Build Websites with
                        <span className='block bg-linear-to-r from-purple-600 to-blue-400  bg-clip-text text-transparent'>Real AI Power</span>
                    </h1>
                    <p className='text-zinc-400 mx-auto max-w-2xl'>
                        This process may take several minutes.
                        AutoCanvas focuses on quality, not shortcuts.
                    </p>
                </div>

                <div className='mb-14 group'>
                    <div className='flex items-center justify-between mb-4 px-2'>
                        <div className='flex items-center gap-2'>
                            <div className='w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]' />
                            <h1 className='text-sm font-bold uppercase tracking-[0.2em] text-zinc-400'>
                                Project Description
                            </h1>
                        </div>
                        <span className='text-[10px] font-mono text-zinc-600 tracking-widest uppercase'>
                            {prompt.length} Characters
                        </span>
                    </div>

                    <div className='relative'>
                        <div className='absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[2rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 pointer-events-none' />

                        <textarea
                            disabled={loading}
                            className='relative w-full h-64 p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 backdrop-blur-sm outline-none resize-none text-lg leading-relaxed transition-all duration-300 focus:border-white/20 focus:bg-zinc-900/60 placeholder:text-zinc-700 disabled:opacity-50'
                            onChange={(e) => setPrompt(e.target.value)}
                            value={prompt}
                            placeholder='Describe your vision... e.g., A minimalist portfolio for a high-end fashion brand with a masonry grid and dark aesthetic.'
                        />

                        <div className='absolute bottom-6 right-8 opacity-20 group-focus-within:opacity-100 transition-opacity'>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500"><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col items-center gap-6'>
                    <div className='relative group'>
                        {/* Glow effect for button */}
                        {!loading && prompt.trim() && (
                            <div className='absolute -inset-1 bg-gradient-to-r from-white/20 to-zinc-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none' />
                        )}

                        <button
                            disabled={loading || !prompt.trim()}
                            className='relative px-12 py-4 rounded-full font-bold text-sm bg-white text-black transition-all duration-300 hover:bg-zinc-100 hover:scale-[1.02] active:scale-95 disabled:opacity-20 disabled:pointer-events-none flex items-center gap-3 shadow-[0_20px_40px_-15px_rgba(255,255,255,0.3)]'
                            onClick={handleGenerateWebiste}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className='animate-spin' />
                                    <span>Architecting...</span>
                                </>
                            ) : (
                                <>
                                    <span>Generate Website</span>
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </div>

                    {loading && (
                        <p className='text-[10px] text-zinc-500 uppercase tracking-[0.2em] animate-pulse'>
                            Sit tight, we're building your vision...
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}