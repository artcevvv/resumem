import Link from 'next/link';

interface ResumeCardProps {
    resume: {
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
        }>;
        careers: Array<{
            job_title: string;
            employer: string;
            start_date: string;
            end_date: string;
            city: string;
        }>;
    };
}

export default function ResumeCard({ resume }: ResumeCardProps) {
    return (
        <div className="bg-background overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
            <Link href={`/dashboard/resumes/${resume.id}`} className="block">
                <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-text truncate">{resume.fullname}</h4>
                        <div className="flex space-x-2">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-background text-text">
                                {new Date(resume.CreatedAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex items-center text-sm text-text">
                            <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {resume.email}
                        </div>
                        <div className="flex items-center text-sm text-text">
                            <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {resume.phone_number}
                        </div>
                        
                        {resume.skills && resume.skills.length > 0 && (
                            <div className="mt-3">
                                <h5 className="text-sm font-bold text-text mb-2">Skills</h5>
                                <div className="flex flex-wrap gap-2">
                                    {resume.skills.slice(0, 3).map((skill, index) => (
                                        <span key={index} className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                            {skill.type} ({skill.level})
                                        </span>
                                    ))}
                                    {resume.skills.length > 3 && (
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-text">
                                            +{resume.skills.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {resume.educations && resume.educations.length > 0 && (
                            <div className="mt-3">
                                <h5 className="text-sm font-bold text-text mb-2">Education</h5>
                                <div className="space-y-2">
                                    {resume.educations.slice(0, 2).map((edu, index) => (
                                        <div key={index} className="text-sm text-text">
                                            <div className="font-medium">{edu.degree}</div>
                                            <div className="text-text">{edu.school}</div>
                                        </div>
                                    ))}
                                    {resume.educations.length > 2 && (
                                        <div className="text-sm text-text">
                                            +{resume.educations.length - 2} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {resume.careers && resume.careers.length > 0 && (
                            <div className="mt-3">
                                <h5 className="text-sm font-bold text-text mb-2">Experience</h5>
                                <div className="space-y-2">
                                    {resume.careers.slice(0, 2).map((career, index) => (
                                        <div key={index} className="text-sm text-text">
                                            <div className="font-medium">{career.job_title}</div>
                                            <div className="text-text">{career.employer}</div>
                                        </div>
                                    ))}
                                    {resume.careers.length > 2 && (
                                        <div className="text-sm text-text">
                                            +{resume.careers.length - 2} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm text-text line-clamp-2">{resume.summary}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
} 