'use client';

import { ReactNode } from 'react';
import Container from '@/components/Global/Container';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <Container>
            <div className="flex min-h-screen items-center justify-center">
                <div className="max-w-md w-full space-y-8 p-8 rounded-2xl shadow-lg">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-indigo-600">YourApp</h1>
                        <p className="mt-2 text-sm">
                            Welcome! Please login or create an account.
                        </p>
                    </div>
                    {children}
                    <p className="text-center text-xs">
                        © {new Date().getFullYear()} YourApp. All rights reserved.
                    </p>
                </div>
            </div>
        </Container>
    );
}
