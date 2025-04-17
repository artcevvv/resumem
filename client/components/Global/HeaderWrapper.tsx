'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from './Header'
import { getToken } from '@/app/config/api'

export default function HeaderWrapper() {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const token = getToken()
        setIsLoggedIn(!!token)
    }, [])

    const handleLogout = () => {
        document.cookie = 'token=; path=/; max-age=0'
        router.push('/')
    }

    return <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
} 