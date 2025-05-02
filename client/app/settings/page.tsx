'use client'

import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

export default function Settings() {
  const [username, setUsername] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [cookies] = useCookies(['token'])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (newPassword && newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }

    try {
      const response = await fetch('http://localhost:8080/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.token}`
        },
        body: JSON.stringify({
          username,
          currentPassword,
          newPassword: newPassword || undefined
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update settings')
      }

      setSuccess('Settings updated successfully')
      setUsername('')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-foreground p-8 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-text mb-8">Settings</h2>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-text">
              New Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-background border border-text rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-text"
            />
          </div>

          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-text">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-background border border-text rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-text"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-text">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-background border border-text rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-text"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-text">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-background border border-text rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-text"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-foreground bg-text hover:bg-text/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-text"
            >
              Update Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 