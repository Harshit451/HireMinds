export interface User {
  id: string;
  name: string;
  email: string;
  role: 'seeker' | 'recruiter';
  avatar?: string;
  company?: string;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Internship';
  salary: string;
  description: string;
  requirements: string[];
  skills: string[];
  posted: string;
  category: string;
  logo?: string;
  recruiterId?: string;
  applicants?: number;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: 'pending' | 'reviewed' | 'interview' | 'rejected' | 'accepted';
  appliedAt: string;
  resume?: string;
  coverLetter?: string;
}
