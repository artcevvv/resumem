'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login, setToken } from '@/app/config/api';
import Container from '@/components/Global/Container';
import { Mail, Lock } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await login(email, password);
            
            if (!response.token) {
            }
            
            await setToken(response.token);
            router.push('/register');
            window.location.reload();
        } catch (err) {
            console.error('Login error:', err);
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
            <Container>
                <div className='flex min-h-[80vh] items-center justify-center py-12'>
                    <div className="max-w-md w-full">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                                    Welcome back
                                </h2>
                                <p className="mt-2 text-gray-600">
                                    Don&apos;t have an account?{' '}
                                    <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                                        Sign up
                                    </Link>
                                </p>
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email address
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="email-address"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl border border-red-100">
                                        {error}
                                    </div>
                                )}

                                <div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? 'Signing in...' : 'Sign in'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
