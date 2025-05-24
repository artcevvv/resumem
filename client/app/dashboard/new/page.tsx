'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL, getToken } from '../../config/api';
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

            const response = await fetch(`${API_URL}/resumes`, {
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

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (step < 6) {
            setStep(step + 1);
        }
    };

    const handlePrevious = (e: React.FormEvent) => {
        e.preventDefault();
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const canAddLink = () => {
        return formData.links.every(link => link.type.trim() !== '' && link.url.trim() !== '');
    };

    const canAddSkill = () => {
        return formData.skills.every(skill => skill.type.trim() !== '' && skill.level.trim() !== '');
    };

    const canAddEducation = () => {
        return formData.educations.every(education => 
            education.school.trim() !== '' && 
            education.degree.trim() !== '' && 
            education.start_date.trim() !== '' && 
            education.end_date.trim() !== '' && 
            education.city.trim() !== '' && 
            education.description.trim() !== ''
        );
    };

    const canAddCareer = () => {
        return formData.careers.every(career => 
            career.job_title.trim() !== '' && 
            career.employer.trim() !== '' && 
            career.start_date.trim() !== '' && 
            career.end_date.trim() !== '' && 
            career.city.trim() !== '' && 
            career.description.trim() !== ''
        );
    };

    const canAddCourse = () => {
        return formData.courses.every(course => 
            course.name.trim() !== '' && 
            course.url.trim() !== '' && 
            course.start_date.trim() !== '' && 
            course.end_date.trim() !== ''
        );
    };

    const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
        <span className="flex items-center gap-1">
            {children}
            <span className="text-red-500">*</span>
        </span>
    );

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6">
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
                                    value={formData.fullname}
                                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                    placeholder="Enter your full name"
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
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                <RequiredLabel>Phone Number</RequiredLabel>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <PatternFormat
                                    id="phone"
                                    value={formData.phone_number}
                                    onValueChange={(values) => {
                                        setFormData({ ...formData, phone_number: values.value });
                                    }}
                                    format="+# (###) ###-####"
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
                                    value={formData.summary}
                                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                    placeholder="Write a brief summary about yourself"
                                />
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        {formData.links.map((link, index) => (
                            <div key={index} className="flex space-x-4">
                                <div className="flex-1">
                                    <label htmlFor={`link-type-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                        Link Type
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LinkIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id={`link-type-${index}`}
                                            value={link.type}
                                            onChange={(e) => {
                                                const newLinks = [...formData.links];
                                                newLinks[index] = { ...link, type: e.target.value };
                                                setFormData({ ...formData, links: newLinks });
                                            }}
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            placeholder="e.g., LinkedIn, GitHub"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <label htmlFor={`link-url-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                        URL
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Globe className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="url"
                                            id={`link-url-${index}`}
                                            value={link.url}
                                            onChange={(e) => {
                                                const newLinks = [...formData.links];
                                                newLinks[index] = { ...link, url: e.target.value };
                                                setFormData({ ...formData, links: newLinks });
                                            }}
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => {
                                if (canAddLink()) {
                                    setFormData({ ...formData, links: [...formData.links, { type: '', url: '' }] });
                                } else {
                                    setError('Please fill out all current link fields before adding a new one.');
                                }
                            }}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
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
                                    <label htmlFor={`skill-type-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                        Skill Type
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Award className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id={`skill-type-${index}`}
                                            value={skill.type}
                                            onChange={(e) => {
                                                const newSkills = [...formData.skills];
                                                newSkills[index] = { ...skill, type: e.target.value };
                                                setFormData({ ...formData, skills: newSkills });
                                            }}
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            placeholder="Enter skill type"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <label htmlFor={`skill-level-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
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
                                        className="appearance-none block w-full pl-3 pr-10 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
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
                            onClick={() => {
                                if (canAddSkill()) {
                                    setFormData({ ...formData, skills: [...formData.skills, { type: '', level: '' }] });
                                } else {
                                    setError('Please fill out all current skill fields before adding a new one.');
                                }
                            }}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            Add Skill
                        </button>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6">
                        {formData.educations.map((education, index) => (
                            <div key={index} className="space-y-4">
                                <div>
                                    <label htmlFor={`education-school-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                        School
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Building2 className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id={`education-school-${index}`}
                                            value={education.school}
                                            onChange={(e) => {
                                                const newEducations = [...formData.educations];
                                                newEducations[index] = { ...education, school: e.target.value };
                                                setFormData({ ...formData, educations: newEducations });
                                            }}
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            placeholder="Enter school name"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor={`education-degree-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                        Degree
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <GraduationCap className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id={`education-degree-${index}`}
                                            value={education.degree}
                                            onChange={(e) => {
                                                const newEducations = [...formData.educations];
                                                newEducations[index] = { ...education, degree: e.target.value };
                                                setFormData({ ...formData, educations: newEducations });
                                            }}
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            placeholder="Enter degree"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor={`education-start-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                            Start Date
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Calendar className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="date"
                                                id={`education-start-${index}`}
                                                value={education.start_date}
                                                onChange={(e) => {
                                                    const newEducations = [...formData.educations];
                                                    newEducations[index] = { ...education, start_date: e.target.value };
                                                    setFormData({ ...formData, educations: newEducations });
                                                }}
                                                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor={`education-end-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                            End Date
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Calendar className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="date"
                                                id={`education-end-${index}`}
                                                value={education.end_date}
                                                onChange={(e) => {
                                                    const newEducations = [...formData.educations];
                                                    newEducations[index] = { ...education, end_date: e.target.value };
                                                    setFormData({ ...formData, educations: newEducations });
                                                }}
                                                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor={`education-city-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                        City
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPin className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id={`education-city-${index}`}
                                            value={education.city}
                                            onChange={(e) => {
                                                const newEducations = [...formData.educations];
                                                newEducations[index] = { ...education, city: e.target.value };
                                                setFormData({ ...formData, educations: newEducations });
                                            }}
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            placeholder="Enter city"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor={`education-description-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <div className="relative">
                                        <div className="absolute top-3 left-3 pointer-events-none">
                                            <FileText className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <textarea
                                            id={`education-description-${index}`}
                                            rows={3}
                                            value={education.description}
                                            onChange={(e) => {
                                                const newEducations = [...formData.educations];
                                                newEducations[index] = { ...education, description: e.target.value };
                                                setFormData({ ...formData, educations: newEducations });
                                            }}
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            placeholder="Enter education description"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => {
                                if (canAddEducation()) {
                                    setFormData({
                                        ...formData,
                                        educations: [...formData.educations, {
                                            school: '',
                                            degree: '',
                                            start_date: '',
                                            end_date: '',
                                            city: '',
                                            description: '',
                                        }]
                                    });
                                } else {
                                    setError('Please fill out all current education fields before adding a new one.');
                                }
                            }}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            Add Education
                        </button>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-6">
                        {formData.careers.map((career, index) => (
                            <div key={index} className="space-y-4">
                                <div>
                                    <label htmlFor={`career-title-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                        Job Title
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Briefcase className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id={`career-title-${index}`}
                                            value={career.job_title}
                                            onChange={(e) => {
                                                const newCareers = [...formData.careers];
                                                newCareers[index] = { ...career, job_title: e.target.value };
                                                setFormData({ ...formData, careers: newCareers });
                                            }}
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            placeholder="Enter job title"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor={`career-employer-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                        Employer
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Building2 className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id={`career-employer-${index}`}
                                            value={career.employer}
                                            onChange={(e) => {
                                                const newCareers = [...formData.careers];
                                                newCareers[index] = { ...career, employer: e.target.value };
                                                setFormData({ ...formData, careers: newCareers });
                                            }}
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            placeholder="Enter employer"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor={`career-start-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                            Start Date
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Calendar className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="date"
                                                id={`career-start-${index}`}
                                                value={career.start_date}
                                                onChange={(e) => {
                                                    const newCareers = [...formData.careers];
                                                    newCareers[index] = { ...career, start_date: e.target.value };
                                                    setFormData({ ...formData, careers: newCareers });
                                                }}
                                                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor={`career-end-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                            End Date
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Calendar className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="date"
                                                id={`career-end-${index}`}
                                                value={career.end_date}
                                                onChange={(e) => {
                                                    const newCareers = [...formData.careers];
                                                    newCareers[index] = { ...career, end_date: e.target.value };
                                                    setFormData({ ...formData, careers: newCareers });
                                                }}
                                                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor={`career-city-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                        City
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPin className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id={`career-city-${index}`}
                                            value={career.city}
                                            onChange={(e) => {
                                                const newCareers = [...formData.careers];
                                                newCareers[index] = { ...career, city: e.target.value };
                                                setFormData({ ...formData, careers: newCareers });
                                            }}
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            placeholder="Enter city"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor={`career-description-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <div className="relative">
                                        <div className="absolute top-3 left-3 pointer-events-none">
                                            <FileText className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <textarea
                                            id={`career-description-${index}`}
                                            rows={3}
                                            value={career.description}
                                            onChange={(e) => {
                                                const newCareers = [...formData.careers];
                                                newCareers[index] = { ...career, description: e.target.value };
                                                setFormData({ ...formData, careers: newCareers });
                                            }}
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            placeholder="Enter career description"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => {
                                if (canAddCareer()) {
                                    setFormData({
                                        ...formData,
                                        careers: [...formData.careers, {
                                            job_title: '',
                                            employer: '',
                                            start_date: '',
                                            end_date: '',
                                            city: '',
                                            description: '',
                                        }]
                                    });
                                } else {
                                    setError('Please fill out all current career fields before adding a new one.');
                                }
                            }}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            Add Career
                        </button>
                    </div>
                );
            case 6:
                return (
                    <div className="space-y-6">
                        {formData.courses.map((course, index) => (
                            <div key={index} className="space-y-4">
                                <div>
                                    <label htmlFor={`course-name-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                        Course Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <BookOpen className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id={`course-name-${index}`}
                                            value={course.name}
                                            onChange={(e) => {
                                                const newCourses = [...formData.courses];
                                                newCourses[index] = { ...course, name: e.target.value };
                                                setFormData({ ...formData, courses: newCourses });
                                            }}
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            placeholder="Enter course name"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor={`course-url-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                        Course URL
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Globe className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="url"
                                            id={`course-url-${index}`}
                                            value={course.url}
                                            onChange={(e) => {
                                                const newCourses = [...formData.courses];
                                                newCourses[index] = { ...course, url: e.target.value };
                                                setFormData({ ...formData, courses: newCourses });
                                            }}
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor={`course-start-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                            Start Date
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Calendar className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="date"
                                                id={`course-start-${index}`}
                                                value={course.start_date}
                                                onChange={(e) => {
                                                    const newCourses = [...formData.courses];
                                                    newCourses[index] = { ...course, start_date: e.target.value };
                                                    setFormData({ ...formData, courses: newCourses });
                                                }}
                                                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor={`course-end-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                            End Date
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Calendar className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="date"
                                                id={`course-end-${index}`}
                                                value={course.end_date}
                                                onChange={(e) => {
                                                    const newCourses = [...formData.courses];
                                                    newCourses[index] = { ...course, end_date: e.target.value };
                                                    setFormData({ ...formData, courses: newCourses });
                                                }}
                                                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => {
                                if (canAddCourse()) {
                                    setFormData({
                                        ...formData,
                                        courses: [...formData.courses, {
                                            name: '',
                                            url: '',
                                            start_date: '',
                                            end_date: '',
                                        }]
                                    });
                                } else {
                                    setError('Please fill out all current course fields before adding a new one.');
                                }
                            }}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
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
        <div className="min-h-screen">
            <Container>
                <div className="max-w-3xl mx-auto py-12">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                                Create New Resume
                            </h2>
                            <p className="mt-2 text-gray-600">
                                Fill in your information step by step
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="mt-5">
                            {renderStep()}
                            <div className="mt-8 flex justify-between">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={handlePrevious}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                    >
                                        Previous
                                    </button>
                                )}
                                {step < 6 ? (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Creating...' : 'Create Resume'}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
}
