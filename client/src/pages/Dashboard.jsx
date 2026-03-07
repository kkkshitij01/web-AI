import axios from 'axios'
import { ArrowLeft, Globe, Rocket, Trash2, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import { toast } from 'react-toastify'

export default function Dashboard() {
    const [website, setWebsite] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate();

    const handleDeploy = async (id) => {
        try {
            const result = await axios.get(`${serverUrl}/api/website/deploy/${id}`, { withCredentials: true })
            window.open(`${result.data.url}`, "_blank")
        } catch (error) {
            toast.error(error.response?.data?.message || "Deployment failed")
            console.log(error);
        }
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`${serverUrl}/api/website/delete/${deleteId}`, { withCredentials: true });
            setWebsite(prev => prev.filter(w => w._id !== deleteId));
            toast.success("Website deleted");
            setDeleteId(null);
        } catch (error) {
            toast.error(error.response?.data?.message || "Delete failed");
            setDeleteId(null);
        }
    }

    useEffect(() => {
        const featchAllWebsite = async () => {
            setLoading(true);
            try {
                const result = await axios.get(`${serverUrl}/api/website/get-all`, { withCredentials: true });
                setWebsite(result.data || [])
                setLoading(false);
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch")
                setLoading(false);
                console.log(error);
            }
        }
        featchAllWebsite();
    }, []);

    return (
        <div className='min-h-screen bg-[#050505] text-white'>
            <AnimatePresence>
                {deleteId && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4'
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className='bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl'
                        >
                            <div className='w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <Trash2 className='text-red-500' size={24} />
                            </div>
                            <h3 className='text-xl font-bold mb-2'>Delete Project?</h3>
                            <p className='text-zinc-400 text-sm mb-8'>This action cannot be undone. You will lose the code for this website.</p>
                            <div className='flex gap-3'>
                                <button onClick={() => setDeleteId(null)} className='flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition font-medium'>Cancel</button>
                                <button onClick={handleDelete} className='flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-medium'>Delete</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="sticky top-0 z-40 border-b border-white/5 bg-[#0c0c0e]/85 backdrop-blur-xl">
                <div className='max-w-5xl mx-auto px-6 h-14 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <button
                            className='p-1.5 rounded-lg text-white- hover:text-white hover:bg-black bg-black/10 border border-white/20 cursor-pointer'
                            onClick={() => navigate('/')}
                        >
                            <ArrowLeft size={15} />
                        </button>
                        <h1 className='text-sm font-semibold text-white'>Dashboard</h1>
                    </div>
                    <button
                        className='text-sm font-semibold px-4 py-2 rounded-lg text-black bg-white/70 hover:bg-white/90 cursor-pointer transition-colors duration-150 '

                        onClick={() => navigate('/generate')}
                    >
                        + New Website
                    </button>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-6 py-10'>
                <div className='mb-12 relative'>
                    <div className='absolute -left-20 -top-20 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none' />

                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                        <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
                            <div>
                                <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className='text-zinc-400 text-sm font-medium mb-1'>Welcome back,</motion.h2>
                                <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className='text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent uppercase'>
                                    {userData?.name?.split(' ')[0]}
                                </motion.h1>
                            </div>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className='flex gap-8 border-l border-white/5 pl-8'>
                                <div>
                                    <p className='text-[10px] text-zinc-500 uppercase tracking-widest mb-1'>Projects</p>
                                    <p className='text-xl font-mono text-zinc-200'>{website?.length || 0}</p>
                                </div>
                                <div>
                                    <p className='text-[10px] text-zinc-500 uppercase tracking-widest mb-1'>Status</p>
                                    <p className='text-xl font-mono text-emerald-500'>Active</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {loading && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className='h-48 rounded-2xl bg-white/[0.03] mt-10 border border-white/10 animate-pulse overflow-hidden'>
                                <div className='h-32 bg-white/5' />
                                <div className='p-4 space-y-2'>
                                    <div className='h-4 w-3/4 bg-white/5 rounded' />
                                    <div className='h-3 w-1/2 bg-white/5 rounded' />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {website?.length === 0 && !loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='mt-20 flex flex-col items-center justify-center p-12 border-2 border-dashed border-white/10 rounded-3xl bg-white/[0.02]'>
                        <div className='w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6'>
                            <span className='text-3xl text-zinc-500'>🌐</span>
                        </div>
                        <h2 className='text-xl font-semibold mb-2'>No websites yet</h2>
                        <p className='text-zinc-400 mb-8 text-center max-w-sm'>You haven't generated any websites yet. Let's build something amazing today!</p>
                        <button onClick={() => navigate('/generate')} className='px-6 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform'>
                            Create Your First Website
                        </button>
                    </motion.div>
                )}

                {!loading && website?.length > 0 && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {website.map((web, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -4 }}
                                className='group relative flex flex-col rounded-2xl bg-[#0A0A0A] border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 shadow-2xl'
                            >
                                <div className='h-8 bg-zinc-900/80 border-b border-white/5 px-4 flex items-center gap-1.5'>
                                    <div className='w-2 h-2 rounded-full bg-red-500/20 group-hover:bg-red-500/50 transition-colors' />
                                    <div className='w-2 h-2 rounded-full bg-amber-500/20 group-hover:bg-amber-500/50 transition-colors' />
                                    <div className='w-2 h-2 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/50 transition-colors' />
                                    <div className='ml-2 h-3 w-24 bg-white/5 rounded-md' />
                                </div>

                                <div className='relative h-48 w-full bg-white overflow-hidden'>
                                    <iframe srcDoc={web.latestCode} title={web.title} className='absolute inset-0 w-[200%] h-[200%] scale-[0.5] origin-top-left pointer-events-none border-none' />
                                    <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]'>
                                        <button onClick={() => navigate(`/editor/${web._id}`)} className='px-5 py-2 bg-white text-black text-sm font-bold rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300'>
                                            Edit Project
                                        </button>
                                    </div>
                                </div>

                                <div className='p-4 bg-gradient-to-b from-transparent to-black/50'>
                                    <div className='flex items-center justify-between mb-2'>
                                        <h3 className='text-sm font-semibold text-zinc-100 truncate flex-1 pr-2'>{web.title || "Untitled Website"}</h3>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${web.deployed ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-zinc-800 border-white/10 text-zinc-500'}`}>
                                            {web.deployed ? "Live" : "Draft"}
                                        </span>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-[11px] text-zinc-500 font-mono'>
                                            {new Date(parseInt(web._id.substring(0, 8), 16) * 1000).toLocaleDateString()}
                                        </p>
                                        <div className='flex items-center gap-2'>
                                            <button
                                                onClick={() => handleDeploy(web._id)}
                                                className='p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-400 transition-all text-zinc-400'
                                                title="Deploy"
                                            >
                                                {web.deployed ? <Globe size={14} /> : <Rocket size={14} />}
                                            </button>
                                            <button
                                                onClick={() => setDeleteId(web._id)}
                                                className='p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-all text-zinc-400'
                                                title="Delete"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}