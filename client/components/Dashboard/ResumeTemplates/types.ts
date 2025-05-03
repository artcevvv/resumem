export interface ResumeData {
  ID?: number;
  id?: number;
  fullname: string;
  email: string;
  phone_number: string;
  summary: string;
  CreatedAt?: string;
  UpdatedAt?: string;
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