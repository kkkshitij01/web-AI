import React from 'react'

export default function Footer() {
    return (
        <footer className='border-t border-white/10 py-10 text-center text-sm text-zinc-500'>
            &copy;{new Date().getFullYear()} AutoCanvas
        </footer>
    )
}
