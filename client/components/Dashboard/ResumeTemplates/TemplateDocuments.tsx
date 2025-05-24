import ProfessionalTemplate from './ProfessionalTemplate';
import ModernTemplate from './ModernTemplate';
import CreativeTemplate from './CreativeTemplate';
import { ResumeData } from './types';

// Sample resume data for previews
const sampleResumeData: ResumeData = {
    fullname: "John Doe",
    email: "john.doe@example.com",
    phone_number: "+1 (555) 123-4567",
    summary: "Experienced professional with a strong background in software development and project management. Skilled in leading teams and delivering high-quality solutions.",
    skills: [
        { type: "JavaScript", level: "Expert" },
        { type: "React", level: "Advanced" },
        { type: "Node.js", level: "Advanced" },
        { type: "TypeScript", level: "Intermediate" },
        { type: "Python", level: "Intermediate" }
    ],
    careers: [
        {
            job_title: "Senior Software Engineer",
            employer: "Tech Solutions Inc.",
            start_date: "2020-01-01",
            end_date: "Present",
            city: "San Francisco, CA",
            description: "Led development of enterprise applications using React and Node.js. Managed a team of 5 developers and implemented CI/CD pipelines."
        },
        {
            job_title: "Software Developer",
            employer: "Digital Innovations",
            start_date: "2018-03-01",
            end_date: "2019-12-31",
            city: "Seattle, WA",
            description: "Developed and maintained web applications using JavaScript and Python. Collaborated with UX designers to implement responsive interfaces."
        }
    ],
    educations: [
        {
            degree: "Master of Science in Computer Science",
            school: "Stanford University",
            start_date: "2016-09-01",
            end_date: "2018-05-31",
            city: "Stanford, CA",
            description: "Specialized in Software Engineering and Artificial Intelligence."
        },
        {
            degree: "Bachelor of Science in Computer Science",
            school: "University of Washington",
            start_date: "2012-09-01",
            end_date: "2016-05-31",
            city: "Seattle, WA",
            description: "Graduated with honors. Focused on Web Development and Database Systems."
        }
    ],
    links: [
        {
            type: "LinkedIn",
            url: "https://linkedin.com/in/johndoe"
        },
        {
            type: "GitHub",
            url: "https://github.com/johndoe"
        }
    ],
    courses: [
        {
            name: "Advanced React Patterns",
            url: "https://example.com/course1",
            start_date: "2021-01-01",
            end_date: "2021-03-31"
        },
        {
            name: "Cloud Architecture",
            url: "https://example.com/course2",
            start_date: "2021-04-01",
            end_date: "2021-06-30"
        }
    ]
};

export const getTemplateDocument = (templateId: string) => {
    switch (templateId) {
        case 'professional':
            return <ProfessionalTemplate resume={sampleResumeData} />;
        case 'modern':
            return <ModernTemplate resume={sampleResumeData} />;
        case 'creative':
            return <CreativeTemplate resume={sampleResumeData} />;
        default:
            return <ProfessionalTemplate resume={sampleResumeData} />;
    }
}; 