import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { serverUrl } from "../App.jsx"
import axios from "axios"
import Editor from '@monaco-editor/react';
import { ArrowLeft, Code2, MessageSquare, Monitor, Rocket, Send, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { AnimatePresence, motion } from 'motion/react';

export default function WebsiteEditor() {
    const navigate = useNavigate()
    const [showCode, setShowCode] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [showFullPreview, setShowFullPreview] = useState(false);
    const [website, setWebsite] = useState(null);
    const [error, setError] = useState("");
    const [code, setCode] = useState("")
    const [message, setMessage] = useState([])
    const [prompt, setPrompt] = useState("");
    const [thinkingIndex, setThinkingIndex] = useState(0)
    const iframeRef = useRef(null)
    const [updateLodading, setUpdateLoding] = useState(false)

    const handleDeploy = async (id) => {
        try {
            const result = await axios.get(`${serverUrl}/api/website/deploy/${id}`, { withCredentials: true })
            setWebsite(prev => ({
                ...prev,
                deployed: true
            }));
            window.open(`${result.data.url}`, "_blank")
        } catch (error) {
            toast.error(error.response?.data?.message || "Deployment failed")
            console.log(error);
        }
    }
    const thinkingSteps = [
        "Analyzing design requirements...",
        "Mapping site architecture...",
        "Selecting optimal color palette...",
        "Synthesizing layout components...",
        "Generating semantic HTML structure...",
        "Injecting responsive CSS rules...",
        "Optimizing asset delivery...",
        "Refining typography hierarchy...",
        "Fine-tuning interactive elements...",
        "Finalizing cross-browser compatibility..."
    ];
    const { id } = useParams();
    useEffect(() => {
        if (!updateLodading) return
        const i = setInterval(() => { setThinkingIndex((i) => (i + 1) % thinkingSteps.length) }, 1200)
        return () => clearInterval(i);
    }, [updateLodading])
    const handleUpdate = async () => {
        if (!prompt.trim()) {
            toast.error("Please enter a description for the changes!", {
                style: {
                    background: "#0a0a0f",
                    color: "#f87171",
                    border: "0.5px solid rgba(239,68,68,0.3)",
                    borderRadius: "10px",
                    fontSize: "14px",
                },
                iconTheme: {
                    primary: "#f87171",
                    secondary: "#0a0a0f",
                },
            });

            return;
        }
        const text = prompt;
        setPrompt("");
        setUpdateLoding(true);
        setMessage((m) => [...m, { role: "user", content: text }])
        try {
            const result = await axios.post(`${serverUrl}/api/website/update/${id}`, { prompt }, { withCredentials: true })
            setMessage((m) => [...m, { role: "ai", content: result.data.message }])
            setCode(result.data.code)
            setUpdateLoding(false)
            console.log(result);
        } catch (error) {
            setUpdateLoding(false);
            const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(errorMsg);
            return;
        }
    }
    useEffect(() => {
        const handleGetWebsite = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/website/get-by-id/${id}`, { withCredentials: true })
                setWebsite(result.data);
                setCode(result.data.latestCode);
                setMessage(result.data.conversation)
            } catch (error) {
                setError(error.response.data.message);
                toast.error(error);
                console.log(error);
            }
        }
        handleGetWebsite();
    }, [id])
    useEffect(() => {
        if (!iframeRef.current || !code) return;
        const blob = new Blob([code], { type: "text/html" })
        const url = URL.createObjectURL(blob)
        iframeRef.current.src = url
        return () => URL.revokeObjectURL(url);
    }, [code])
    if (error) {
        return (
            <div className='h-screen flex items-center justify-center bg-black text-red-400'>
                {error}
            </div>
        )
    }
    if (!website) {
        return (
            <div className='h-screen flex items-center justify-center bg-black text-white'>
                Loading...
            </div>
        )
    }

    return (
        <div className='h-screen w-screen flex bg-black text-white overflow-hidden'>
            < aside className='hidden lg:flex w-[380px] flex-col border-r border-white/10 bg-black/80'>
                <Header />
                <div className='flex-1 overflow-y-auto px-4 py-4 space-y-4'>
                    {message.map((m, i) => (
                        <div key={i} className={`max-w-[85%] ${m.role === "user" ? "ml-auto" : "mr-auto"}`}>
                            <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? 'bg-white/80 text-black' : 'bg-white/5 border border-white/10 text-zinc-200'}`}>
                                {m.content}
                            </div>

                        </div>
                    ))}
                    {
                        updateLodading && <div className='max-w-[85%] mr-auto'>
                            <div className='px-4 py-2.5 text-zinc-400 border border-white/10 italic rounded-2xl text-xs bg-white/5'>{thinkingSteps[thinkingIndex]}</div>
                        </div>
                    }
                </div>
                <div className='p-3 border-t border-white/10'>
                    <div className='flex gap-2'>
                        <textarea row='1' placeholder='Describe changes...' className='flex-1 rounded-2xl px-4 py-3 border bg-white/5 border-white/10 text-sm outline-none resize-none overflow-hidden' value={prompt} onChange={e => setPrompt(e.target.value)}></textarea>
                        <button className='px-3 py-3 rounded-2xl  bg-white text-black' disabled={updateLodading} onClick={handleUpdate}><Send size={16} /></button>
                    </div>
                </div>
            </aside>
            <div className='flex-1 flex flex-col'>
                <div className='h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80'>
                    <span className='text-xs text-zinc-400'>Live Preview</span>
                    <div className='flex gap-2'>
                        {
                            website.deployed ? "" : <button className='flex items-center gap-2 px-4 py-1.5 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 text-sm font-semibold hover:scale-105 transition' onClick={() => handleDeploy(website._id)}><Rocket size={14} />Deploy</button>
                        }
                        <button className='p-2 lg:hidden' onClick={() => { setShowChat(true) }}><MessageSquare size={18} /></button>
                        <button className='p-2' onClick={() => { setShowCode(true) }}><Code2 size={18} /></button>
                        <button className='p-2' onClick={() => setShowFullPreview(true)}><Monitor size={18} /></button>
                    </div>
                </div>
                <iframe ref={iframeRef} className='w-full flex-1' />
            </div>
            <AnimatePresence>
                {showChat && <motion.div className='fixed inset-0 z-[9999] flex flex-col bg-black'
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ x: "100%" }}>
                    <Header />
                    <div className='flex-1 overflow-y-auto px-4 py-4 space-y-4'>
                        {message.map((m, i) => (
                            <div key={i} className={`max-w-[85%] ${m.role === "user" ? "ml-auto" : "mr-auto"}`}>
                                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? 'bg-white/80 text-black' : 'bg-white/5 border border-white/10 text-zinc-200'}`}>
                                    {m.content}
                                </div>

                            </div>
                        ))}
                        {
                            updateLodading && <div className='max-w-[85%] mr-auto'>
                                <div className='px-4 py-2.5 text-zinc-400 border border-white/10 italic rounded-2xl text-xs bg-white/5'>{thinkingSteps[thinkingIndex]}</div>
                            </div>
                        }
                    </div>
                    <div className='p-3 border-t border-white/10'>
                        <div className='flex gap-2'>
                            <textarea row='1' placeholder='Describe changes...' className='flex-1 rounded-2xl px-4 py-3 border bg-white/5 border-white/10 text-sm outline-none resize-none' value={prompt} onChange={e => setPrompt(e.target.value)}></textarea>
                            <button className='px-4 rounded-2xl py-3 bg-white text-black' disabled={updateLodading} onClick={handleUpdate}><Send size={14} /></button>
                        </div>
                    </div>
                </motion.div>}
            </AnimatePresence>
            <AnimatePresence>

                {showCode && < motion.div className='fixed inset-y-0 right-0 w-full lg:w-[45%] z-[9999] bg-[#1e1e1e] flex flex-col'
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                >
                    <div className='h-12 px-4 flex justify-between items-center border-b border-white/10 bg-[#1e1e1e]'>
                        <span className='text-sm font-medium'>index.html</span>
                        <button className='cursor-pointer' onClick={() => { setShowCode(false) }}><X size={18} /></button>
                    </div>
                    <Editor theme='vs-dark' value={code} language='html' onChange={(v) => setCode(v)} />

                </motion.div>}
            </AnimatePresence>
            <AnimatePresence>

                {showFullPreview && < motion.div className='fixed inset-0 z-[9999] bg-black'
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                >
                    <iframe className='w-full h-full bg-white' srcDoc={code} />
                    <button className='top-4 right-4 p-2 absolute hover:bg-black hover:text-red-700 bg-black/70 rounded-lg cursor-pointer' onClick={() => setShowFullPreview(false)}><X /></button>

                </motion.div>}
            </AnimatePresence>
        </div >
    )
    // _________________________________________________________________________
    // _________________________________________________________________________
    // _________________________________________________________________________
    function Header() {
        return (
            <div className='h-14 px-4 flex items-center justify-between border-b border-white/10 w-full'>
                <button
                    className='p-1.5 rounded-lg text-white- hover:text-white hover:bg-black bg-black/10 border border-white/20 cursor-pointer mr-5'
                    onClick={() => navigate('/dashboard')}
                >
                    <ArrowLeft size={15} />
                </button>
                <span className='font-semibold truncate '>{website.title[0].toUpperCase() + website.title.slice(1, website.title.length)}</span>
                <button onClick={() => { setShowChat(false) }} className='lg:hidden'><X size={18} /></button>
            </div>
        )
    }
}
