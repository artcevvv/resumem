'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '../../../../config/api';
import Container from '@/components/Global/Container';

interface Resume {
    id: number;
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

export default function EditResumePage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [resume, setResume] = useState<Resume | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const token = getToken();
                const response = await fetch(`http://localhost:8080/api/v1/resumes/${params.id}`, {
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
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!resume) return;

        setSaving(true);
        setError('');

        try {
            const token = getToken();
            const response = await fetch(`http://localhost:8080/api/v1/resumes/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(resume),
            });

            if (!response.ok) {
                throw new Error('Failed to update resume');
            }

            router.push(`/dashboard/resumes/${params.id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setSaving(false);
        }
    };

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
            <div className="max-w-4xl mx-auto py-8">
                <div className="bg-background shadow rounded-lg overflow-hidden">
                    <form onSubmit={handleSubmit}>
                        <div className="px-6 py-5 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h1 className="text-3xl font-bold text-white">Edit Resume</h1>
                                <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => router.back()}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-5 space-y-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-white">Basic Information</h2>
                                <div>
                                    <label htmlFor="fullname" className="block text-sm font-medium text-white">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullname"
                                        value={resume.fullname}
                                        onChange={(e) => setResume({ ...resume, fullname: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-white">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={resume.email}
                                        onChange={(e) => setResume({ ...resume, email: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-white">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={resume.phone_number}
                                        onChange={(e) => setResume({ ...resume, phone_number: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="summary" className="block text-sm font-medium text-white">
                                        Summary
                                    </label>
                                    <textarea
                                        id="summary"
                                        rows={4}
                                        value={resume.summary}
                                        onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            {/* Links */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-white">Links</h2>
                                    <button
                                        type="button"
                                        onClick={() => setResume({
                                            ...resume,
                                            links: [...resume.links, { type: '', url: '' }]
                                        })}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                                    >
                                        Add Link
                                    </button>
                                </div>
                                {resume.links.map((link, index) => (
                                    <div key={index} className="flex space-x-4">
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                placeholder="Type (e.g., LinkedIn, GitHub)"
                                                value={link.type}
                                                onChange={(e) => {
                                                    const newLinks = [...resume.links];
                                                    newLinks[index] = { ...link, type: e.target.value };
                                                    setResume({ ...resume, links: newLinks });
                                                }}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="url"
                                                placeholder="URL"
                                                value={link.url}
                                                onChange={(e) => {
                                                    const newLinks = [...resume.links];
                                                    newLinks[index] = { ...link, url: e.target.value };
                                                    setResume({ ...resume, links: newLinks });
                                                }}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newLinks = resume.links.filter((_, i) => i !== index);
                                                setResume({ ...resume, links: newLinks });
                                            }}
                                            className="mt-1 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Skills */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-white">Skills</h2>
                                    <button
                                        type="button"
                                        onClick={() => setResume({
                                            ...resume,
                                            skills: [...resume.skills, { type: '', level: '' }]
                                        })}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                                    >
                                        Add Skill
                                    </button>
                                </div>
                                {resume.skills.map((skill, index) => (
                                    <div key={index} className="flex space-x-4">
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                placeholder="Skill Type"
                                                value={skill.type}
                                                onChange={(e) => {
                                                    const newSkills = [...resume.skills];
                                                    newSkills[index] = { ...skill, type: e.target.value };
                                                    setResume({ ...resume, skills: newSkills });
                                                }}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <select
                                                value={skill.level}
                                                onChange={(e) => {
                                                    const newSkills = [...resume.skills];
                                                    newSkills[index] = { ...skill, level: e.target.value };
                                                    setResume({ ...resume, skills: newSkills });
                                                }}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            >
                                                <option value="">Select Level</option>
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Advanced">Advanced</option>
                                                <option value="Expert">Expert</option>
                                            </select>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newSkills = resume.skills.filter((_, i) => i !== index);
                                                setResume({ ...resume, skills: newSkills });
                                            }}
                                            className="mt-1 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Education */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-white">Education</h2>
                                    <button
                                        type="button"
                                        onClick={() => setResume({
                                            ...resume,
                                            educations: [...resume.educations, {
                                                school: '',
                                                degree: '',
                                                start_date: '',
                                                end_date: '',
                                                city: '',
                                                description: ''
                                            }]
                                        })}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                                    >
                                        Add Education
                                    </button>
                                </div>
                                {resume.educations.map((edu, index) => (
                                    <div key={index} className="space-y-4 p-4 border rounded-lg">
                                        <div>
                                            <label className="block text-sm font-medium text-white">School</label>
                                            <input
                                                type="text"
                                                value={edu.school}
                                                onChange={(e) => {
                                                    const newEducations = [...resume.educations];
                                                    newEducations[index] = { ...edu, school: e.target.value };
                                                    setResume({ ...resume, educations: newEducations });
                                                }}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white">Degree</label>
                                            <input
                                                type="text"
                                                value={edu.degree}
                                                onChange={(e) => {
                                                    const newEducations = [...resume.educations];
                                                    newEducations[index] = { ...edu, degree: e.target.value };
                                                    setResume({ ...resume, educations: newEducations });
                                                }}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-white">Start Date</label>
                                                <input
                                                    type="date"
                                                    value={edu.start_date}
                                                    onChange={(e) => {
                                                        const newEducations = [...resume.educations];
                                                        newEducations[index] = { ...edu, start_date: e.target.value };
                                                        setResume({ ...resume, educations: newEducations });
                                                    }}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-white">End Date</label>
                                                <input
                                                    type="date"
                                                    value={edu.end_date}
                                                    onChange={(e) => {
                                                        const newEducations = [...resume.educations];
                                                        newEducations[index] = { ...edu, end_date: e.target.value };
                                                        setResume({ ...resume, educations: newEducations });
                                                    }}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white">City</label>
                                            <input
                                                type="text"
                                                value={edu.city}
                                                onChange={(e) => {
                                                    const newEducations = [...resume.educations];
                                                    newEducations[index] = { ...edu, city: e.target.value };
                                                    setResume({ ...resume, educations: newEducations });
                                                }}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white">Description</label>
                                            <textarea
                                                rows={3}
                                                value={edu.description}
                                                onChange={(e) => {
                                                    const newEducations = [...resume.educations];
                                                    newEducations[index] = { ...edu, description: e.target.value };
                                                    setResume({ ...resume, educations: newEducations });
                                                }}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newEducations = resume.educations.filter((_, i) => i !== index);
                                                setResume({ ...resume, educations: newEducations });
                                            }}
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                                        >
                                            Remove Education
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Career Experience */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-white">Experience</h2>
                                    <button
                                        type="button"
                                        onClick={() => setResume({
                                            ...resume,
                                            careers: [...resume.careers, {
                                                job_title: '',
                                                employer: '',
                                                start_date: '',
                                                end_date: '',
                                                city: '',
                                                description: ''
                                            }]
                                        })}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                                    >
                                        Add Experience
                                    </button>
                                </div>
                                {resume.careers.map((career, index) => (
                                    <div key={index} className="space-y-4 p-4 border rounded-lg">
                                        <div>
                                            <label className="block text-sm font-medium text-white">Job Title</label>
                                            <input
                                                type="text"
                                                value={career.job_title}
                                                onChange={(e) => {
                                                    const newCareers = [...resume.careers];
                                                    newCareers[index] = { ...career, job_title: e.target.value };
                                                    setResume({ ...resume, careers: newCareers });
                                                }}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white">Employer</label>
                                            <input
                                                type="text"
                                                value={career.employer}
                                                onChange={(e) => {
                                                    const newCareers = [...resume.careers];
                                                    newCareers[index] = { ...career, employer: e.target.value };
                                                    setResume({ ...resume, careers: newCareers });
                                                }}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-white">Start Date</label>
                                                <input
                                                    type="date"
                                                    value={career.start_date}
                                                    onChange={(e) => {
                                                        const newCareers = [...resume.careers];
                                                        newCareers[index] = { ...career, start_date: e.target.value };
                                                        setResume({ ...resume, careers: newCareers });
                                                    }}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-white">End Date</label>
                                                <input
                                                    type="date"
                                                    value={career.end_date}
                                                    onChange={(e) => {
                                                        const newCareers = [...resume.careers];
                                                        newCareers[index] = { ...career, end_date: e.target.value };
                                                        setResume({ ...resume, careers: newCareers });
                                                    }}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white">City</label>
                                            <input
                                                type="text"
                                                value={career.city}
                                                onChange={(e) => {
                                                    const newCareers = [...resume.careers];
                                                    newCareers[index] = { ...career, city: e.target.value };
                                                    setResume({ ...resume, careers: newCareers });
                                                }}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white">Description</label>
                                            <textarea
                                                rows={3}
                                                value={career.description}
                                                onChange={(e) => {
                                                    const newCareers = [...resume.careers];
                                                    newCareers[index] = { ...career, description: e.target.value };
                                                    setResume({ ...resume, careers: newCareers });
                                                }}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newCareers = resume.careers.filter((_, i) => i !== index);
                                                setResume({ ...resume, careers: newCareers });
                                            }}
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                                        >
                                            Remove Experience
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Courses */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-white">Courses</h2>
                                    <button
                                        type="button"
                                        onClick={() => setResume({
                                            ...resume,
                                            courses: [...resume.courses, {
                                                name: '',
                                                url: '',
                                                start_date: '',
                                                end_date: ''
                                            }]
                                        })}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                                    >
                                        Add Course
                                    </button>
                                </div>
                                {resume.courses.map((course, index) => (
                                    <div key={index} className="space-y-4 p-4 border rounded-lg">
                                        <div>
                                            <label className="block text-sm font-medium text-white">Course Name</label>
                                            <input
                                                type="text"
                                                value={course.name}
                                                onChange={(e) => {
                                                    const newCourses = [...resume.courses];
                                                    newCourses[index] = { ...course, name: e.target.value };
                                                    setResume({ ...resume, courses: newCourses });
                                                }}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white">Course URL</label>
                                            <input
                                                type="url"
                                                value={course.url}
                                                onChange={(e) => {
                                                    const newCourses = [...resume.courses];
                                                    newCourses[index] = { ...course, url: e.target.value };
                                                    setResume({ ...resume, courses: newCourses });
                                                }}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-white">Start Date</label>
                                                <input
                                                    type="date"
                                                    value={course.start_date}
                                                    onChange={(e) => {
                                                        const newCourses = [...resume.courses];
                                                        newCourses[index] = { ...course, start_date: e.target.value };
                                                        setResume({ ...resume, courses: newCourses });
                                                    }}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-white">End Date</label>
                                                <input
                                                    type="date"
                                                    value={course.end_date}
                                                    onChange={(e) => {
                                                        const newCourses = [...resume.courses];
                                                        newCourses[index] = { ...course, end_date: e.target.value };
                                                        setResume({ ...resume, courses: newCourses });
                                                    }}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newCourses = resume.courses.filter((_, i) => i !== index);
                                                setResume({ ...resume, courses: newCourses });
                                            }}
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                                        >
                                            Remove Course
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    );
} 