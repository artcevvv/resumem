'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getToken } from '../config/api';
import Container from '@/components/Global/Container';
import ResumeCard from '@/components/Dashboard/ResumeCard';

interface ServerResume {
    ID?: number;
    id?: number;
    fullname: string;
    email: string;
    phone_number: string;
    summary: string;
    CreatedAt: string;
    UpdatedAt: string;
    links: Array<{ type: string; url: string }>;
    skills: Array<{ type: string; level: string }>;
    educations: Array<{
        school: string;
        degree: string;
        start_date: string;
        end_date: string;
        city: string;
    }>;
    careers: Array<{
        job_title: string;
        employer: string;
        start_date: string;
        end_date: string;
        city: string;
    }>;
}

export default function DashboardPage() {
    const [resumes, setResumes] = useState<ServerResume[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const token = getToken();
                const response = await fetch('http://localhost:8080/api/v1/resumes', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch resumes');
                }

                const data = await response.json() as ServerResume[];
                console.log('Received resumes data:', data);
                
                // Ensure each resume has an ID
                const processedData = data.map((resume) => ({
                    ...resume,
                    id: resume.ID || resume.id // Handle both cases
                }));
                
                console.log('Processed resumes data:', processedData);
                setResumes(processedData);
            } catch (err) {
                console.error('Error fetching resumes:', err);
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchResumes();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Container>
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
                <div>
                    <h3 className="text-2xl font-bold text-white">My Resumes</h3>
                    <p className="mt-1 text-sm text-white">Manage and view all your professional resumes</p>
                </div>
                <Link
                    href="/dashboard/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Create New Resume
                </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
                {resumes.map((resume) => {
                    const id = resume.ID || resume.id;
                    if (!id) return null;
                    return <ResumeCard key={id} resume={{ ...resume, id }} />;
                })}
                {resumes.length === 0 && (
                    <div className="col-span-full">
                        <div className="text-center py-12 bg-white rounded-lg shadow">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-bold text-gray-900">No resumes</h3>
                            <p className="mt-1 text-sm text-white">Get started by creating a new resume.</p>
                            <div className="mt-6">
                                <Link
                                    href="/dashboard/new"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Create New Resume
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
}
