import { ArrowLeft, Check, Cpu } from 'lucide-react';
import axios from "axios"
import React, { useState } from 'react'
import { serverUrl } from "../App"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { toast } from 'react-toastify';
const plans = [
  {
    key: "Basic",
    name: "Basic",
    price: 1000,
    credits: 200,
    description: "Perfect for rapid ideation and exploring the engine's potential.",
    features: [
      "Vanilla HTML/CSS/JS Output",
      "Standard Generation Speed",
      "Basic Responsive Framework",
    ],
    popular: false,
    button: "Get Started",
  },
  {
    key: "pro",
    name: "Pro",
    price: 2000,
    credits: 500,
    description: "Tailored for freelancers and developers building client-ready sites.",
    features: [
      "Priority Synthesis Speed",
      "Advanced SEO Optimization",
      "One-Click Live Deployment"
    ],
    popular: true,
    button: "Go Pro",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: 5000,
    credits: 2000,
    description: "Scaling web  production for agencies and technical teams.",
    features: [
      "Multi-Page Architecture Support",
      "Highest Priority GPU Access",
      "Dedicated Technical Support"
    ],
    popular: false,
    button: "Buy",
  },
];
export default function Prices() {
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const { userData } = useSelector(state => state.user)
  const handlePurchase = async (planKey) => {
    if (!userData) {
      toast.error("Please log in first", {
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
      navigate("/");
      return;
    }
    setLoading(planKey);
    try {
      const result = await axios.post(`${serverUrl}/api/billing`, { planType: planKey }, { withCredentials: true })
      window.location.href = result.data.sessionUrl;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(null);
    }
  }
  return (
    <div className='relative min-h-screen overflow-hidden bg-[#050505] text-white px-6 pt-16 pb-24'>
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]' />
        <div className='absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]' />
      </div>
      <button
        className='p-1.5 rounded-lg text-white- hover:text-white hover:bg-black bg-black/10 border border-white/20 cursor-pointer'
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={15} />
      </button>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className='relative z-10 max-w-4xl mx-auto text-center mb-14'
      >
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>Choose Your Velocity</h1>

        <p className='text-zinc-400'>Buy credit once. Build anytime</p>
      </motion.div>
      <div className='relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
        {
          plans.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: 5 }}
              transition={{ delay: i * 0.12 }}
              className={`relative rounded-3xl p-8 border backdrop-blur-xl transition-all
                ${p.popular ? "border-indigo-500/50 hover:border-indigo-500 bg-gradient-to-b from indigo-500/10 to-transparent shadow-2xl " : "border-indigo-400/70 hover:border-indigo-400  bg-white/5 hover-indigo-400 hover:bg-white/10"}
                `}
            >
              {p.popular && <span className=' absolute top-5 right-5 px-3 py-1 text-xs rounded-full bg-indigo-500 shadow-2xl shadow-indigo-500'>Most Popular</span>}
              <h1 className='text-xl font-semibold mb-2'>{p.name}</h1>
              <p className='text-zinc-400 text-sm mb-6'>{p.description}</p>
              <div className='flex items-end gap-1 mb-4'>
                <span className=' text-zinc-400 mb-1'>Rs</span>
                <span className='text-4xl font-semibold'>{p.price}</span>
              </div>
              <div className='flex items-end gap-2 mb-8'>
                <Cpu className='text-yellow-400' size={18} />
                <span className='font-semibold '> {p.credits} <span className='text-zinc-400'>Credits</span> </span>
              </div>
              <ul className='space-y-3 mb-10'>
                {p.features.map((feature, i) => (
                  <li key={i} className='flex items-center gap-2 text-sm text-zinc-300'> <Check size={16} className='text-green-400 ' />{feature}</li>
                ))}
              </ul>
              <motion.button whileTap={{ scale: 0.97 }}
                className='w-full py-3 disabled:opacity-60 rounded-xl font-semibold transition bg-white/10 hover:bg-white/20'
                onClick={() => handlePurchase(p.key)}
                disabled={loading}
              >
                {loading === p.key ? "Redirectiong..." : p.button}
              </motion.button>
            </motion.div>
          ))
        }
      </div>
    </div >
  )
}
