export interface ResumeData {
  fullname: string;
  email: string;
  phone_number: string;
  summary: string;
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