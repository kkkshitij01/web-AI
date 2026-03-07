import React from 'react';
import { motion } from "framer-motion";
import { Terminal, ShieldCheck, Zap, Cpu } from 'lucide-react';

const Console = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl mx-auto rounded-3xl border border-white/10 bg-[#080808] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
        >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.01]">
                <div className="flex gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/90 border border-red-500/30" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/90 border border-amber-500/30" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/90 border border-emerald-500/30" />
                </div>

                <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/5">
                    <Terminal size={12} className="text-zinc-500" />
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em]">autocanvas.ai</span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-500">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    CONNECTED
                </div>
            </div>


            <div className="p-10 font-mono text-[14px] leading-relaxed text-left relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none" />

                <div className="mb-8 group">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-[9px] font-bold text-blue-400/80 bg-blue-400/10 px-2 py-0.5 rounded uppercase tracking-wider">Markup</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                    </div>
                    <div className="space-y-1">
                        <div className="flex gap-2">
                            <span className="text-blue-400">&lt;main</span> <span className="text-purple-400">class</span><span className="text-zinc-300">=</span><span className="text-emerald-400">"hero-canvas"</span><span className="text-blue-400">&gt;</span>
                        </div>
                        <div className="pl-6 flex gap-2">
                            <span className="text-blue-400">&lt;h1&gt;</span><span className="text-zinc-100 font-medium">Design at Light Speed</span><span className="text-blue-400">&lt;/h1&gt;</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-blue-400">&lt;/main&gt;</span>
                        </div>
                    </div>
                </div>

                <div className="mb-8 group">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-[9px] font-bold text-purple-400/80 bg-purple-400/10 px-2 py-0.5 rounded uppercase tracking-wider">Style</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                    </div>
                    <div className="space-y-1">
                        <div className="flex gap-2">
                            <span className="text-purple-400">.hero-canvas</span> <span className="text-zinc-300">{"{"}</span>
                        </div>
                        <div className="pl-6 text-zinc-400">
                            <span className="text-blue-300">background</span>: <span className="text-emerald-300">var(--surface)</span>;
                        </div>
                        <div className="pl-6 text-zinc-400">
                            <span className="text-blue-300">display</span>: <span className="text-emerald-300">flex</span>;
                        </div>
                        <div>
                            <span className="text-zinc-300">{"}"}</span>
                        </div>
                    </div>
                </div>

                <div className="group">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-[9px] font-bold text-amber-400/80 bg-amber-400/10 px-2 py-0.5 rounded uppercase tracking-wider">Logic</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <span className="text-purple-400">const</span> <span className="text-blue-300">engine</span> <span className="text-zinc-300">=</span> <span className="text-blue-400">()</span> <span className="text-purple-400">=&gt;</span> <span className="text-zinc-300">init</span><span className="text-blue-400">()</span><span className="text-zinc-300">;</span>
                        <span className="w-2 h-5 bg-blue-500/80 animate-pulse inline-block align-middle ml-1" />
                    </div>
                </div>
            </div>

        </motion.div>
    );
};

export default Console;