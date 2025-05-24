'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL, getToken } from '../../../../config/api';
import Container from '@/components/Global/Container';
import { PatternFormat } from 'react-number-format';
import { 
    User, 
    Mail, 
    Phone, 
    Link as LinkIcon, 
    Briefcase, 
    GraduationCap, 
    BookOpen,
    Building2,
    Award,
    Calendar,
    MapPin,
    FileText,
    Globe
} from 'lucide-react';

interface Education {
    school: string;
    degree: string;
    start_date: string;
    end_date: string;
    city: string;
    description: string;
}

interface Career {
    job_title: string;
    employer: string;
    start_date: string;
    end_date: string;
    city: string;
    description: string;
}

interface Course {
    name: string;
    url: string;
    start_date: string;
    end_date: string;
}

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
    educations: Education[];
    careers: Career[];
    courses: Course[];
}

type Props = {
    params: Promise<{ id: string }>
}

export default function EditResumePage({ params }: Props) {
    const router = useRouter();
    const [resume, setResume] = useState<Resume | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [resumeId, setResumeId] = useState<string>('');

    useEffect(() => {
        const getParams = async () => {
            const resolvedParams = await params;
            setResumeId(resolvedParams.id);
        };
        getParams();
    }, [params]);

    useEffect(() => {
        if (!resumeId) return;

        const fetchResume = async () => {
            try {
                const token = getToken();
                const response = await fetch(`${API_URL}/resumes/${resumeId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch resume');
                }

                const data = await response.json();
                const formattedData = {
                    ...data,
                    educations: data.educations.map((edu: Education) => ({
                        ...edu,
                        start_date: edu.start_date ? edu.start_date.split('T')[0] : '',
                        end_date: edu.end_date ? edu.end_date.split('T')[0] : '',
                    })),
                    careers: data.careers.map((career: Career) => ({
                        ...career,
                        start_date: career.start_date ? career.start_date.split('T')[0] : '',
                        end_date: career.end_date ? career.end_date.split('T')[0] : '',
                    })),
                    courses: data.courses.map((course: Course) => ({
                        ...course,
                        start_date: course.start_date ? course.start_date.split('T')[0] : '',
                        end_date: course.end_date ? course.end_date.split('T')[0] : '',
                    })),
                };
                setResume(formattedData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchResume();
    }, [resumeId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!resume || !resumeId) return;

        setSaving(true);
        setError('');

        try {
            const token = getToken();
            const formattedData = {
                ...resume,
                educations: resume.educations.map(edu => ({
                    ...edu,
                    start_date: edu.start_date ? `${edu.start_date}T00:00:00Z` : null,
                    end_date: edu.end_date ? `${edu.end_date}T00:00:00Z` : null,
                })),
                careers: resume.careers.map(career => ({
                    ...career,
                    start_date: career.start_date ? `${career.start_date}T00:00:00Z` : null,
                    end_date: career.end_date ? `${career.end_date}T00:00:00Z` : null,
                })),
                courses: resume.courses.map(course => ({
                    ...course,
                    start_date: course.start_date ? `${course.start_date}T00:00:00Z` : null,
                    end_date: course.end_date ? `${course.end_date}T00:00:00Z` : null,
                })),
            };

            const response = await fetch(`${API_URL}/resumes/${resumeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update resume');
            }

            router.push(`/dashboard/resumes/${resumeId}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setSaving(false);
        }
    };

    const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
        <span className="flex items-center gap-1">
            {children}
            <span className="text-red-500">*</span>
        </span>
    );

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
        <div className="min-h-screen">
            <Container>
                <div className="max-w-3xl mx-auto py-12">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                                Edit Resume
                            </h2>
                            <p className="mt-2 text-gray-600">
                                Update your resume information
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Basic Information */}
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                                <div>
                                    <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                                        <RequiredLabel>Full Name</RequiredLabel>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="fullname"
                                            value={resume.fullname}
                                            onChange={(e) => setResume({ ...resume, fullname: e.target.value })}
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        <RequiredLabel>Email</RequiredLabel>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            id="email"
                                            value={resume.email}
                                            onChange={(e) => setResume({ ...resume, email: e.target.value })}
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <PatternFormat
                                            id="phone"
                                            value={resume.phone_number}
                                            onValueChange={(values) => {
                                                setResume({ ...resume, phone_number: values.value });
                                            }}
                                            format="+7 (###) ###-####"
                                            mask="_"
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                                        Summary
                                    </label>
                                    <div className="relative">
                                        <div className="absolute top-3 left-3 pointer-events-none">
                                            <FileText className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <textarea
                                            id="summary"
                                            rows={4}
                                            value={resume.summary}
                                            onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            placeholder="Write a brief summary about yourself"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Links */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-gray-900">Links</h2>
                                    <button
                                        type="button"
                                        onClick={() => setResume({
                                            ...resume,
                                            links: [...resume.links, { type: '', url: '' }]
                                        })}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-xl text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                    >
                                        Add Link
                                    </button>
                                </div>
                                {resume.links.map((link, index) => (
                                    <div key={index} className="flex space-x-4">
                                        <div className="flex-1">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <LinkIcon className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Type (e.g., LinkedIn, GitHub)"
                                                    value={link.type}
                                                    onChange={(e) => {
                                                        const newLinks = [...resume.links];
                                                        newLinks[index] = { ...link, type: e.target.value };
                                                        setResume({ ...resume, links: newLinks });
                                                    }}
                                                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Globe className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="url"
                                                    placeholder="URL"
                                                    value={link.url}
                                                    onChange={(e) => {
                                                        const newLinks = [...resume.links];
                                                        newLinks[index] = { ...link, url: e.target.value };
                                                        setResume({ ...resume, links: newLinks });
                                                    }}
                                                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newLinks = resume.links.filter((_, i) => i !== index);
                                                setResume({ ...resume, links: newLinks });
                                            }}
                                            className="mt-1 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-xl text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Skills */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
                                    <button
                                        type="button"
                                        onClick={() => setResume({
                                            ...resume,
                                            skills: [...resume.skills, { type: '', level: '' }]
                                        })}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-xl text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                    >
                                        Add Skill
                                    </button>
                                </div>
                                {resume.skills.map((skill, index) => (
                                    <div key={index} className="flex space-x-4">
                                        <div className="flex-1">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Award className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Skill Type"
                                                    value={skill.type}
                                                    onChange={(e) => {
                                                        const newSkills = [...resume.skills];
                                                        newSkills[index] = { ...skill, type: e.target.value };
                                                        setResume({ ...resume, skills: newSkills });
                                                    }}
                                                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <select
                                                value={skill.level}
                                                onChange={(e) => {
                                                    const newSkills = [...resume.skills];
                                                    newSkills[index] = { ...skill, level: e.target.value };
                                                    setResume({ ...resume, skills: newSkills });
                                                }}
                                                className="appearance-none block w-full pl-3 pr-10 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
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
                                            className="mt-1 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-xl text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Education */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-gray-900">Education</h2>
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
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-xl text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                    >
                                        Add Education
                                    </button>
                                </div>
                                {resume.educations.map((edu, index) => (
                                    <div key={index} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                <RequiredLabel>School</RequiredLabel>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Building2 className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={edu.school}
                                                    onChange={(e) => {
                                                        const newEducations = [...resume.educations];
                                                        newEducations[index] = { ...edu, school: e.target.value };
                                                        setResume({ ...resume, educations: newEducations });
                                                    }}
                                                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                                    placeholder="Enter school name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                <RequiredLabel>Degree</RequiredLabel>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <GraduationCap className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={edu.degree}
                                                    onChange={(e) => {
                                                        const newEducations = [...resume.educations];
                                                        newEducations[index] = { ...edu, degree: e.target.value };
                                                        setResume({ ...resume, educations: newEducations });
                                                    }}
                                                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                                    placeholder="Enter degree"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    <RequiredLabel>Start Date</RequiredLabel>
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Calendar className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="date"
                                                        value={edu.start_date}
                                                        onChange={(e) => {
                                                            const newEducations = [...resume.educations];
                                                            newEducations[index] = { ...edu, start_date: e.target.value };
                                                            setResume({ ...resume, educations: newEducations });
                                                        }}
                                                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    <RequiredLabel>End Date</RequiredLabel>
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Calendar className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="date"
                                                        value={edu.end_date}
                                                        onChange={(e) => {
                                                            const newEducations = [...resume.educations];
                                                            newEducations[index] = { ...edu, end_date: e.target.value };
                                                            setResume({ ...resume, educations: newEducations });
                                                        }}
                                                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                <RequiredLabel>City</RequiredLabel>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <MapPin className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={edu.city}
                                                    onChange={(e) => {
                                                        const newEducations = [...resume.educations];
                                                        newEducations[index] = { ...edu, city: e.target.value };
                                                        setResume({ ...resume, educations: newEducations });
                                                    }}
                                                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                                    placeholder="Enter city"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Description
                                            </label>
                                            <div className="relative">
                                                <div className="absolute top-3 left-3 pointer-events-none">
                                                    <FileText className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <textarea
                                                    rows={3}
                                                    value={edu.description}
                                                    onChange={(e) => {
                                                        const newEducations = [...resume.educations];
                                                        newEducations[index] = { ...edu, description: e.target.value };
                                                        setResume({ ...resume, educations: newEducations });
                                                    }}
                                                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                                    placeholder="Enter education description"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newEducations = resume.educations.filter((_, i) => i !== index);
                                                setResume({ ...resume, educations: newEducations });
                                            }}
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-xl text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                        >
                                            Remove Education
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Career Experience */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
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
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-xl text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                    >
                                        Add Experience
                                    </button>
                                </div>
                                {resume.careers.map((career, index) => (
                                    <div key={index} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Job Title
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Briefcase className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={career.job_title}
                                                    onChange={(e) => {
                                                        const newCareers = [...resume.careers];
                                                        newCareers[index] = { ...career, job_title: e.target.value };
                                                        setResume({ ...resume, careers: newCareers });
                                                    }}
                                                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                                    placeholder="Enter job title"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Employer
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Building2 className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={career.employer}
                                                    onChange={(e) => {
                                                        const newCareers = [...resume.careers];
                                                        newCareers[index] = { ...career, employer: e.target.value };
                                                        setResume({ ...resume, careers: newCareers });
                                                    }}
                                                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                                    placeholder="Enter employer"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Start Date
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Calendar className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="date"
                                                        value={career.start_date}
                                                        onChange={(e) => {
                                                            const newCareers = [...resume.careers];
                                                            newCareers[index] = { ...career, start_date: e.target.value };
                                                            setResume({ ...resume, careers: newCareers });
                                                        }}
                                                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    End Date
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Calendar className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="date"
                                                        value={career.end_date}
                                                        onChange={(e) => {
                                                            const newCareers = [...resume.careers];
                                                            newCareers[index] = { ...career, end_date: e.target.value };
                                                            setResume({ ...resume, careers: newCareers });
                                                        }}
                                                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                City
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <MapPin className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={career.city}
                                                    onChange={(e) => {
                                                        const newCareers = [...resume.careers];
                                                        newCareers[index] = { ...career, city: e.target.value };
                                                        setResume({ ...resume, careers: newCareers });
                                                    }}
                                                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                                    placeholder="Enter city"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Description
                                            </label>
                                            <div className="relative">
                                                <div className="absolute top-3 left-3 pointer-events-none">
                                                    <FileText className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <textarea
                                                    rows={3}
                                                    value={career.description}
                                                    onChange={(e) => {
                                                        const newCareers = [...resume.careers];
                                                        newCareers[index] = { ...career, description: e.target.value };
                                                        setResume({ ...resume, careers: newCareers });
                                                    }}
                                                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                                    placeholder="Enter career description"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newCareers = resume.careers.filter((_, i) => i !== index);
                                                setResume({ ...resume, careers: newCareers });
                                            }}
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-xl text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                        >
                                            Remove Experience
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Courses */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-gray-900">Courses</h2>
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
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-xl text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                    >
                                        Add Course
                                    </button>
                                </div>
                                {resume.courses.map((course, index) => (
                                    <div key={index} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Course Name
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <BookOpen className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={course.name}
                                                    onChange={(e) => {
                                                        const newCourses = [...resume.courses];
                                                        newCourses[index] = { ...course, name: e.target.value };
                                                        setResume({ ...resume, courses: newCourses });
                                                    }}
                                                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                                    placeholder="Enter course name"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Course URL
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Globe className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="url"
                                                    value={course.url}
                                                    onChange={(e) => {
                                                        const newCourses = [...resume.courses];
                                                        newCourses[index] = { ...course, url: e.target.value };
                                                        setResume({ ...resume, courses: newCourses });
                                                    }}
                                                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Start Date
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Calendar className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="date"
                                                        value={course.start_date}
                                                        onChange={(e) => {
                                                            const newCourses = [...resume.courses];
                                                            newCourses[index] = { ...course, start_date: e.target.value };
                                                            setResume({ ...resume, courses: newCourses });
                                                        }}
                                                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    End Date
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Calendar className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="date"
                                                        value={course.end_date}
                                                        onChange={(e) => {
                                                            const newCourses = [...resume.courses];
                                                            newCourses[index] = { ...course, end_date: e.target.value };
                                                            setResume({ ...resume, courses: newCourses });
                                                        }}
                                                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newCourses = resume.courses.filter((_, i) => i !== index);
                                                setResume({ ...resume, courses: newCourses });
                                            }}
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-xl text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                        >
                                            Remove Course
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between pt-6">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
} 