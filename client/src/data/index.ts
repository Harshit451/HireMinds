import { FileText, MessageSquare, FileEdit, DollarSign, Wand2, Sparkles } from 'lucide-react';

// Re-export categories from jobs.ts
export { categories } from './jobs';

// AI Tools data adapted from src/pages/AITools.tsx
export const aiTools = [
  {
    icon: FileText,
    name: 'Resume Checker',
    desc: 'Upload your PDF resume and get an AI-powered score out of 100 with detailed feedback on each section.',
    path: '/ai/resume-checker',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: MessageSquare,
    name: 'Interview Guide',
    desc: "Get personalized interview questions and answers based on the job you're applying for.",
    path: '/ai/interview-guide',
    color: 'from-green-500 to-emerald-5 00',
  },
  {
    icon: FileEdit,
    name: 'Cover Letter Generator',
    desc: 'Generate professional cover letters tailored to your target job and experience.',
    path: '/ai/cover-letter',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: DollarSign,
    name: 'Salary Estimator',
    desc: 'Get detailed salary insights based on role, location, experience, and skills.',
    path: '/ai/salary-estimator',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Wand2,
    name: 'Job Description Generator',
    desc: 'Create compelling, SEO-optimized job descriptions that attract top talent.',
    path: '/ai/job-description',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Sparkles,
    name: 'Resume Improver',
    desc: 'Upload your resume and get specific suggestions for improvements with before/after examples.',
    path: '/ai/resume-improver',
    color: 'from-pink-5 00 to-rose-500',
  },
];

// Placeholder stats (empty as original data unavailable)
export const stats = [];
