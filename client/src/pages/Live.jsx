import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, } from 'lucide-react';
import { serverUrl } from '../App';

export default function Live() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [html, setHtml] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWebsite = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`${serverUrl}/api/website/get-by-slug/${id}`);
                setHtml(data.latestCode);
            } catch (err) {
                console.error("Error fetching website:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchWebsite();
    }, [id]);

    if (loading) {
        return (
            <div className="h-screen bg-[#050505] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                    <p className="text-zinc-500 font-medium animate-pulse">Launching Preview...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-[#050505] flex flex-col overflow-hidden">
            <nav className="h-14 border-b border-white/10 bg-black/50 backdrop-blur-xl flex items-center justify-between px-4 z-50">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-400 hover:text-white"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div className="h-4 w-[1px] bg-white/10 mx-1" />
                    <div>
                        <p className="text-[10px] text-emerald-500 flex items-center gap-1 font-bold tracking-wider uppercase">
                            <span className="w-1 h-1 rounded-full bg-emerald-500" /> Live Preview
                        </p>
                    </div>
                </div>
            </nav>


            <main className="flex-1 bg-[#0A0A0A] p-2 md:p-4">
                <div className="w-full h-full rounded-xl overflow-hidden bg-white border border-white/10 shadow-2xl relative">
                    <iframe
                        srcDoc={html}
                        title="Live Preview"
                        className="w-full h-full border-none shadow-2xl"
                        sandbox="allow-scripts allow-modals allow-forms"
                    />
                </div>
            </main>
        </div>
    );
}