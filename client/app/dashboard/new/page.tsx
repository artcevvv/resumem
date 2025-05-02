'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '../../config/api';

interface ResumeFormData {
    fullname: string;
    email: string;
    phone_number: string;
    summary: string;
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

export default function NewResumePage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<ResumeFormData>({
        fullname: '',
        email: '',
        phone_number: '',
        summary: '',
        links: [{ type: '', url: '' }],
        skills: [{ type: '', level: '' }],
        educations: [{
            school: '',
            degree: '',
            start_date: '',
            end_date: '',
            city: '',
            description: '',
        }],
        careers: [{
            job_title: '',
            employer: '',
            start_date: '',
            end_date: '',
            city: '',
            description: '',
        }],
        courses: [{
            name: '',
            url: '',
            start_date: '',
            end_date: '',
        }],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = getToken();
            const formattedData = {
                fullname: formData.fullname,
                phone_number: formData.phone_number,
                email: formData.email,
                summary: formData.summary,
                links: formData.links.map(link => ({
                    type: link.type,
                    url: link.url
                })),
                skills: formData.skills.map(skill => ({
                    type: skill.type,
                    level: skill.level
                })),
                educations: formData.educations.map(education => ({
                    school: education.school,
                    degree: education.degree,
                    start_date: education.start_date ? `${education.start_date}T00:00:00Z` : null,
                    end_date: education.end_date ? `${education.end_date}T00:00:00Z` : null,
                    city: education.city,
                    description: education.description
                })),
                careers: formData.careers.map(career => ({
                    job_title: career.job_title,
                    employer: career.employer,
                    start_date: career.start_date ? `${career.start_date}T00:00:00Z` : null,
                    end_date: career.end_date ? `${career.end_date}T00:00:00Z` : null,
                    city: career.city,
                    description: career.description
                })),
                courses: formData.courses.map(course => ({
                    name: course.name,
                    url: course.url,
                    start_date: course.start_date ? `${course.start_date}T00:00:00Z` : null,
                    end_date: course.end_date ? `${course.end_date}T00:00:00Z` : null
                }))
            };

            const response = await fetch('http://localhost:8080/api/v1/resumes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create resume');
            }

            router.push('/dashboard');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="fullname" className="block text-sm font-medium">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullname"
                                value={formData.fullname}
                                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={formData.phone_number}
                                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="summary" className="block text-sm font-medium">
                                Summary
                            </label>
                            <textarea
                                id="summary"
                                rows={4}
                                value={formData.summary}
                                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        {formData.links.map((link, index) => (
                            <div key={index} className="flex space-x-4">
                                <div className="flex-1">
                                    <label htmlFor={`link-type-${index}`} className="block text-sm font-medium">
                                        Link Type
                                    </label>
                                    <input
                                        type="text"
                                        id={`link-type-${index}`}
                                        value={link.type}
                                        onChange={(e) => {
                                            const newLinks = [...formData.links];
                                            newLinks[index] = { ...link, type: e.target.value };
                                            setFormData({ ...formData, links: newLinks });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor={`link-url-${index}`} className="block text-sm font-medium">
                                        URL
                                    </label>
                                    <input
                                        type="url"
                                        id={`link-url-${index}`}
                                        value={link.url}
                                        onChange={(e) => {
                                            const newLinks = [...formData.links];
                                            newLinks[index] = { ...link, url: e.target.value };
                                            setFormData({ ...formData, links: newLinks });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, links: [...formData.links, { type: '', url: '' }] })}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Add Link
                        </button>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6">
                        {formData.skills.map((skill, index) => (
                            <div key={index} className="flex space-x-4">
                                <div className="flex-1">
                                    <label htmlFor={`skill-type-${index}`} className="block text-sm font-medium">
                                        Skill Type
                                    </label>
                                    <input
                                        type="text"
                                        id={`skill-type-${index}`}
                                        value={skill.type}
                                        onChange={(e) => {
                                            const newSkills = [...formData.skills];
                                            newSkills[index] = { ...skill, type: e.target.value };
                                            setFormData({ ...formData, skills: newSkills });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor={`skill-level-${index}`} className="block text-sm font-medium">
                                        Level
                                    </label>
                                    <select
                                        id={`skill-level-${index}`}
                                        value={skill.level}
                                        onChange={(e) => {
                                            const newSkills = [...formData.skills];
                                            newSkills[index] = { ...skill, level: e.target.value };
                                            setFormData({ ...formData, skills: newSkills });
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
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, skills: [...formData.skills, { type: '', level: '' }] })}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Add Skill
                        </button>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6">
                        {formData.educations.map((education, index) => (
                            <div key={index} className="space-y-4 p-4 border rounded-lg">
                                <div>
                                    <label htmlFor={`education-school-${index}`} className="block text-sm font-medium">
                                        School
                                    </label>
                                    <input
                                        type="text"
                                        id={`education-school-${index}`}
                                        value={education.school}
                                        onChange={(e) => {
                                            const newEducations = [...formData.educations];
                                            newEducations[index] = { ...education, school: e.target.value };
                                            setFormData({ ...formData, educations: newEducations });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`education-degree-${index}`} className="block text-sm font-medium">
                                        Degree
                                    </label>
                                    <input
                                        type="text"
                                        id={`education-degree-${index}`}
                                        value={education.degree}
                                        onChange={(e) => {
                                            const newEducations = [...formData.educations];
                                            newEducations[index] = { ...education, degree: e.target.value };
                                            setFormData({ ...formData, educations: newEducations });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor={`education-start-${index}`} className="block text-sm font-medium">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            id={`education-start-${index}`}
                                            value={education.start_date}
                                            onChange={(e) => {
                                                const newEducations = [...formData.educations];
                                                newEducations[index] = { ...education, start_date: e.target.value };
                                                setFormData({ ...formData, educations: newEducations });
                                            }}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`education-end-${index}`} className="block text-sm font-medium">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            id={`education-end-${index}`}
                                            value={education.end_date}
                                            onChange={(e) => {
                                                const newEducations = [...formData.educations];
                                                newEducations[index] = { ...education, end_date: e.target.value };
                                                setFormData({ ...formData, educations: newEducations });
                                            }}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor={`education-city-${index}`} className="block text-sm font-medium">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        id={`education-city-${index}`}
                                        value={education.city}
                                        onChange={(e) => {
                                            const newEducations = [...formData.educations];
                                            newEducations[index] = { ...education, city: e.target.value };
                                            setFormData({ ...formData, educations: newEducations });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`education-description-${index}`} className="block text-sm font-medium">
                                        Description
                                    </label>
                                    <textarea
                                        id={`education-description-${index}`}
                                        rows={3}
                                        value={education.description}
                                        onChange={(e) => {
                                            const newEducations = [...formData.educations];
                                            newEducations[index] = { ...education, description: e.target.value };
                                            setFormData({ ...formData, educations: newEducations });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => setFormData({
                                ...formData,
                                educations: [...formData.educations, {
                                    school: '',
                                    degree: '',
                                    start_date: '',
                                    end_date: '',
                                    city: '',
                                    description: '',
                                }]
                            })}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Add Education
                        </button>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-6">
                        {formData.careers.map((career, index) => (
                            <div key={index} className="space-y-4 p-4 border rounded-lg">
                                <div>
                                    <label htmlFor={`career-title-${index}`} className="block text-sm font-medium">
                                        Job Title
                                    </label>
                                    <input
                                        type="text"
                                        id={`career-title-${index}`}
                                        value={career.job_title}
                                        onChange={(e) => {
                                            const newCareers = [...formData.careers];
                                            newCareers[index] = { ...career, job_title: e.target.value };
                                            setFormData({ ...formData, careers: newCareers });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`career-employer-${index}`} className="block text-sm font-medium">
                                        Employer
                                    </label>
                                    <input
                                        type="text"
                                        id={`career-employer-${index}`}
                                        value={career.employer}
                                        onChange={(e) => {
                                            const newCareers = [...formData.careers];
                                            newCareers[index] = { ...career, employer: e.target.value };
                                            setFormData({ ...formData, careers: newCareers });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor={`career-start-${index}`} className="block text-sm font-medium">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            id={`career-start-${index}`}
                                            value={career.start_date}
                                            onChange={(e) => {
                                                const newCareers = [...formData.careers];
                                                newCareers[index] = { ...career, start_date: e.target.value };
                                                setFormData({ ...formData, careers: newCareers });
                                            }}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`career-end-${index}`} className="block text-sm font-medium">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            id={`career-end-${index}`}
                                            value={career.end_date}
                                            onChange={(e) => {
                                                const newCareers = [...formData.careers];
                                                newCareers[index] = { ...career, end_date: e.target.value };
                                                setFormData({ ...formData, careers: newCareers });
                                            }}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor={`career-city-${index}`} className="block text-sm font-medium">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        id={`career-city-${index}`}
                                        value={career.city}
                                        onChange={(e) => {
                                            const newCareers = [...formData.careers];
                                            newCareers[index] = { ...career, city: e.target.value };
                                            setFormData({ ...formData, careers: newCareers });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`career-description-${index}`} className="block text-sm font-medium">
                                        Description
                                    </label>
                                    <textarea
                                        id={`career-description-${index}`}
                                        rows={3}
                                        value={career.description}
                                        onChange={(e) => {
                                            const newCareers = [...formData.careers];
                                            newCareers[index] = { ...career, description: e.target.value };
                                            setFormData({ ...formData, careers: newCareers });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => setFormData({
                                ...formData,
                                careers: [...formData.careers, {
                                    job_title: '',
                                    employer: '',
                                    start_date: '',
                                    end_date: '',
                                    city: '',
                                    description: '',
                                }]
                            })}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Add Career
                        </button>
                    </div>
                );
            case 6:
                return (
                    <div className="space-y-6">
                        {formData.courses.map((course, index) => (
                            <div key={index} className="space-y-4 p-4 border rounded-lg">
                                <div>
                                    <label htmlFor={`course-name-${index}`} className="block text-sm font-medium">
                                        Course Name
                                    </label>
                                    <input
                                        type="text"
                                        id={`course-name-${index}`}
                                        value={course.name}
                                        onChange={(e) => {
                                            const newCourses = [...formData.courses];
                                            newCourses[index] = { ...course, name: e.target.value };
                                            setFormData({ ...formData, courses: newCourses });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`course-url-${index}`} className="block text-sm font-medium">
                                        Course URL
                                    </label>
                                    <input
                                        type="url"
                                        id={`course-url-${index}`}
                                        value={course.url}
                                        onChange={(e) => {
                                            const newCourses = [...formData.courses];
                                            newCourses[index] = { ...course, url: e.target.value };
                                            setFormData({ ...formData, courses: newCourses });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor={`course-start-${index}`} className="block text-sm font-medium">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            id={`course-start-${index}`}
                                            value={course.start_date}
                                            onChange={(e) => {
                                                const newCourses = [...formData.courses];
                                                newCourses[index] = { ...course, start_date: e.target.value };
                                                setFormData({ ...formData, courses: newCourses });
                                            }}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`course-end-${index}`} className="block text-sm font-medium">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            id={`course-end-${index}`}
                                            value={course.end_date}
                                            onChange={(e) => {
                                                const newCourses = [...formData.courses];
                                                newCourses[index] = { ...course, end_date: e.target.value };
                                                setFormData({ ...formData, courses: newCourses });
                                            }}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => setFormData({
                                ...formData,
                                courses: [...formData.courses, {
                                    name: '',
                                    url: '',
                                    start_date: '',
                                    end_date: '',
                                }]
                            })}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Add Course
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-background shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium">Create New Resume</h3>
                    <div className="mt-2 max-w-xl text-sm">
                        <p>Fill in your information step by step.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-5">
                        {error && (
                            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
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
                        )}
                        {renderStep()}
                        <div className="mt-5 flex justify-between">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={() => setStep(step - 1)}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Previous
                                </button>
                            )}
                            {step < 6 ? (
                                <button
                                    type="button"
                                    onClick={() => setStep(step + 1)}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    {loading ? 'Creating...' : 'Create Resume'}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
