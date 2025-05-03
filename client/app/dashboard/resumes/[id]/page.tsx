'use client';

import { useEffect, useState, use } from 'react';
import { getToken } from '../../../config/api';
import Container from '@/components/Global/Container';
import Link from 'next/link';
import TemplateSelector from '../../../../components/Dashboard/ResumeTemplates/TemplateSelector';
import BackButton from '../../../../components/Dashboard/BackButton';

interface Resume {
    ID: number;
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
        description: string;
    }>;
    careers: Array<{
        job_title: string;
        employer: string;
        start_date: string;
        end_date: string;
        city: string;
        description: string;
    }>;
    courses: Array<{
        name: string;
        url: string;
        start_date: string;
        end_date: string;
    }>;
}

export default function ResumePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [resume, setResume] = useState<Resume | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showTemplateSelector, setShowTemplateSelector] = useState(false);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const token = getToken();
                const response = await fetch(`http://localhost:8080/api/v1/resumes/${resolvedParams.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch resume');
                }

                const data = await response.json();
                setResume(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchResume();
    }, [resolvedParams.id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error || !resume) {
        return (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">{error || 'Resume not found'}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Container>
            <BackButton />
            <div className="max-w-4xl mx-auto py-8">
                <div className="bg-background shadow rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-gray-200">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-text">{resume.fullname}</h1>
                                    <div className="mt-2 flex flex-col space-x-4 text-text">
                                        <div className="flex items-center">
                                            <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            {resume.email}
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            {resume.phone_number}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                                <div className="text-sm text-text">
                                    <div>Created: {new Date(resume.CreatedAt).toLocaleDateString()}</div>
                                    <div>Updated: {new Date(resume.UpdatedAt).toLocaleDateString()}</div>
                                </div>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => setShowTemplateSelector(true)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download PDF
                                    </button>
                                    <Link
                                        href={`/dashboard/resumes/${resume.ID}/edit`}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit Resume
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-5 space-y-8">
                        {/* Summary */}
                        <div>
                            <h2 className="text-xl font-semibold text-text mb-3">Summary</h2>
                            <p className="text-text">{resume.summary}</p>
                        </div>

                        {/* Links */}
                        {resume.links && resume.links.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold text-text mb-3">Links</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {resume.links.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center p-3 bg-background border border-gray-400 rounded-lg hover:bg-background/80 transition-colors"
                                        >
                                            <span className="text-text">{link.type}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Skills */}
                        {resume.skills && resume.skills.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold text-text mb-3">Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {resume.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                        >
                                            {skill.type} ({skill.level})
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Education */}
                        {resume.educations && resume.educations.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold text-text mb-3">Education</h2>
                                <div className="space-y-4">
                                    {resume.educations.map((edu, index) => (
                                        <div key={index} className="bg-background border border-gray-400 p-4 rounded-lg">
                                            <h3 className="text-lg font-medium text-text">{edu.degree}</h3>
                                            <p className="text-text">{edu.school}</p>
                                            <p className="text-gray-400">
                                                {new Date(edu.start_date).toLocaleDateString()} - {edu.end_date ? new Date(edu.end_date).toLocaleDateString() : 'Present'}
                                            </p>
                                            <p className="text-gray-400">{edu.city}</p>
                                            {edu.description && (
                                                <p className="mt-2 text-white">{edu.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Career Experience */}
                        {resume.careers && resume.careers.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold text-text mb-3">Experience</h2>
                                <div className="space-y-4">
                                    {resume.careers.map((career, index) => (
                                        <div key={index} className="bg-background border border-gray-400 p-4 rounded-lg">
                                            <h3 className="text-lg font-medium text-text">{career.job_title}</h3>
                                            <p className="text-text">{career.employer}</p>
                                            <p className="text-gray-400">
                                                {new Date(career.start_date).toLocaleDateString()} - {career.end_date ? new Date(career.end_date).toLocaleDateString() : 'Present'}
                                            </p>
                                            <p className="text-gray-400">{career.city}</p>
                                            {career.description && (
                                                <p className="mt-2 text-white">{career.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Courses */}
                        {resume.courses && resume.courses.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold text-text mb-3">Courses</h2>
                                <div className="space-y-4">
                                    {resume.courses.map((course, index) => (
                                        <div key={index} className="bg-background border border-gray-400 p-4 rounded-lg">
                                            <h3 className="text-lg font-medium text-text">{course.name}</h3>
                                            <p className="text-gray-400">
                                                {new Date(course.start_date).toLocaleDateString()} - {course.end_date ? new Date(course.end_date).toLocaleDateString() : 'Present'}
                                            </p>
                                            {course.url && (
                                                <a
                                                    href={course.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-400 hover:text-blue-300 mt-2 inline-block"
                                                >
                                                    View Course
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showTemplateSelector && (
                <TemplateSelector
                    resume={resume}
                    onClose={() => setShowTemplateSelector(false)}
                />
            )}
        </Container>
    );
} 