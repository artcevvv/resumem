"use client"

import React, { useState, useEffect, useRef } from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { User } from 'lucide-react'

interface HeaderProps {
  isLoggedIn: boolean
  onLogout: () => void
}

function Header({ isLoggedIn, onLogout }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Close dropdown and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isMobileMenuOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'unset'
      }
      return () => {
        document.body.style.overflow = 'unset'
      }
    }
  }, [isMobileMenuOpen])

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <>
      <header className="w-full py-4 md:py-4 px-4 md:px-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40 flex justify-between items-center">
        <div className="md:w-auto w-full flex gap-12 text-center justify-center">
          <div className='w-full md:w-auto flex items-center justify-between'>
            <Link href="/">
              <Logo />
            </Link>
            <button
              onClick={handleMobileMenuClick}
              className="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-7">
            <Link href="/templates" className='text-gray-600 hover:text-gray-900 text-lg font-medium transition-colors'>Templates</Link>
            <Link href="/contacts" className='text-gray-600 hover:text-gray-900 text-lg font-medium transition-colors'>Contact Us</Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleDropdownClick}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
              >
                <User className="w-6 h-6" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-200">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/new"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    New Resume
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    Settings
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login">
                <button type="button" className='px-6 py-2 rounded-xl text-gray-700 hover:text-gray-900 font-medium transition-colors'>Log In</button>
              </Link>
              <Link href="/register">
                <button type="button" className='px-6 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors'>Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer Content */}
        <div
          className={`absolute right-0 top-0 h-full w-64 bg-white transform transition-transform duration-300 ease-in-out shadow-xl ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="p-4">
            <div className="flex flex-col gap-6">
              <nav className="flex flex-col gap-4">
                <Link
                  href="/templates"
                  className='text-lg text-gray-700 hover:text-indigo-600 font-medium transition-colors'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Templates
                </Link>
                <Link
                  href="/contacts"
                  className='text-lg text-gray-700 hover:text-indigo-600 font-medium transition-colors'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </nav>
              <div className='border-t border-gray-200'></div>
              <div className="flex flex-col gap-4">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/dashboard"
                      className='text-lg text-gray-700 hover:text-indigo-600 font-medium transition-colors'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/new"
                      className='text-lg text-gray-700 hover:text-indigo-600 font-medium transition-colors'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      New Resume
                    </Link>
                    <Link
                      href="/settings"
                      className='text-lg text-gray-700 hover:text-indigo-600 font-medium transition-colors'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      className='text-lg text-gray-700 hover:text-indigo-600 font-medium transition-colors text-left'
                      onClick={() => {
                        onLogout()
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className='text-lg text-gray-700 hover:text-indigo-600 font-medium transition-colors'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Log In
                    </Link>
                    <Link
                      href="/register"
                      className='text-lg text-gray-700 hover:text-indigo-600 font-medium transition-colors'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
