"use client"

import React, { useState } from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'

function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [cookies] = useCookies(['token'])
    const router = useRouter()
    const isLoggedIn = !!cookies.token

    const handleLogout = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        router.push('/')
    }

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
                {isLoggedIn ? (
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 px-4 py-2 rounded-3xl bg-text text-foreground font-medium"
                        >
                            <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
                                <span className="text-text">U</span>
                            </div>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-foreground rounded-3xl shadow-lg py-2">
                                <Link
                                    href="/dashboard"
                                    className="block px-4 py-2 text-text hover:bg-text hover:text-foreground"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/dashboard/new"
                                    className="block px-4 py-2 text-text hover:bg-text hover:text-foreground"
                                >
                                    New Resume
                                </Link>
                                <Link
                                    href="/settings"
                                    className="block px-4 py-2 text-text hover:bg-text hover:text-foreground"
                                >
                                    Settings
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-text hover:bg-text hover:text-foreground"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link href="/login">
                            <button type="button" className='px-6 py-2 rounded-3xl bg-text text-foreground font-medium'>Log In</button>
                        </Link>
                        <Link href="/signup">
                            <button type="button" className='px-6 py-2 rounded-3xl bg-text text-foreground font-medium'>Sign Up</button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header
