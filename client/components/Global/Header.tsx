import React from 'react'
import Logo from './Logo'
import Link from 'next/link'

function Header() {
  return (
    <header className="w100 bg-foreground py-[24px] px-[40px] rounded-3xl flex center justify-between mb-6">
        <div className='flex items-center gap-10 text-center'>
            <Link href="/">
                <Logo />
            </Link>
            <nav className='flex gap-7 items-center'>
                <Link href="/templates" className='text-xl font-normal tracking-tighter'>Templates</Link>
                <Link href="/contacts" className='text-xl font-normal tracking-tighter'>Contact Us</Link>
            </nav>
        </div>
        <div className="flex gap-4">
            <Link href="/login">
                <button type="button" className='px-6 py-2 rounded-3xl bg-text text-foreground font-medium'>Log In</button>
            </Link>
            <Link href="/signup">
                <button type="button" className='px-6 py-2 rounded-3xl bg-text text-foreground font-medium'>Sign Up</button>
            </Link>
        </div>
    </header>
  )
}

export default Header