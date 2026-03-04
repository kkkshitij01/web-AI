import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from "axios"
import { serverUrl } from "../App.jsx"

export default function Generate() {
    const [prompt, setPrompt] = useState("");
    const navigate = useNavigate();
    const handleGenerateWebiste = async () => {
        try {
            const result = await axios.post(`${serverUrl}/api/website/generate`, { prompt }, { withCredentials: true })
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='min-h-screen bg-linear-to-br from-[#050505] via-[#0b0b0b] to-[#050505] text-white'>
            <div className='sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10'>
                <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <button className='p-2 rounded-lg hover:bg-white/10 transition' onClick={() => { navigate('/') }}><ArrowLeft size={16} /></button>
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
                <div className='mb-14'>
                    <h1 className='text-xl font-semibold mb-2'>Describe your website</h1>
                    <div className='relative'>
                        <textarea className='w-full h-56 p-6 rounded-3xl bg-black/90 border border-white/30 outline-none resize-none leading-relaxed focus:ring-2 focus:ring-white/60' onChange={(e) => setPrompt(e.target.value)} value={prompt} placeholder=' Provide a detailed overview of your website...'></textarea>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button className='px-10 py-4 rounded-2xl font-bold text-lg bg-white text-black' onClick={handleGenerateWebiste}>Generate Website</button>
                </div>
            </div>
        </div>
    )
}
