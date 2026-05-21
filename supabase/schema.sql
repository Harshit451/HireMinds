-- ============================================
-- HIREMINDS AI - SUPABASE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('seeker', 'recruiter')),
  company TEXT,
  avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Allow insert during signup
CREATE POLICY "Enable insert for authenticated users" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================
-- JOBS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Full-time', 'Part-time', 'Contract', 'Remote', 'Internship')),
  salary TEXT,
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  logo TEXT DEFAULT '🏢',
  recruiter_id UUID REFERENCES users(id) ON DELETE SET NULL,
  applicants INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Anyone can view jobs
CREATE POLICY "Anyone can view jobs" ON jobs
  FOR SELECT USING (true);

-- Only recruiters can insert jobs
CREATE POLICY "Recruiters can create jobs" ON jobs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role = 'recruiter'
    )
  );

-- Recruiters can update their own jobs
CREATE POLICY "Recruiters can update own jobs" ON jobs
  FOR UPDATE USING (recruiter_id = auth.uid());

-- Recruiters can delete their own jobs
CREATE POLICY "Recruiters can delete own jobs" ON jobs
  FOR DELETE USING (recruiter_id = auth.uid());

-- ============================================
-- APPLICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'interview', 'rejected', 'accepted')),
  resume TEXT,
  cover_letter TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(job_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Users can view their own applications
CREATE POLICY "Users can view own applications" ON applications
  FOR SELECT USING (auth.uid() = user_id);

-- Recruiters can view applications for their jobs
CREATE POLICY "Recruiters can view job applications" ON applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM jobs 
      WHERE jobs.id = applications.job_id 
      AND jobs.recruiter_id = auth.uid()
    )
  );

-- Users can create applications
CREATE POLICY "Users can apply to jobs" ON applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Recruiters can update application status
CREATE POLICY "Recruiters can update application status" ON applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM jobs 
      WHERE jobs.id = applications.job_id 
      AND jobs.recruiter_id = auth.uid()
    )
  );

-- ============================================
-- SAVED JOBS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS saved_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, job_id)
);

-- Enable Row Level Security
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;

-- Users can view their own saved jobs
CREATE POLICY "Users can view own saved jobs" ON saved_jobs
  FOR SELECT USING (auth.uid() = user_id);

-- Users can save jobs
CREATE POLICY "Users can save jobs" ON saved_jobs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can unsave jobs
CREATE POLICY "Users can unsave jobs" ON saved_jobs
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to increment applicants count
CREATE OR REPLACE FUNCTION increment_applicants(job_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE jobs 
  SET applicants = applicants + 1 
  WHERE id = job_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- SAMPLE DATA (Optional)
-- ============================================

-- Insert sample jobs (run this after creating the tables)
INSERT INTO jobs (title, company, location, type, salary, description, requirements, skills, category, logo, applicants) VALUES
('Senior Full Stack Developer', 'TechCorp Solutions', 'San Francisco, CA', 'Full-time', '$120,000 - $180,000', 
 'We are looking for a Senior Full Stack Developer to join our dynamic team. You will be responsible for developing and maintaining web applications using modern technologies.',
 ARRAY['5+ years of experience in full-stack development', 'Proficiency in Node.js, Express.js, and React', 'Experience with PostgreSQL and MongoDB', 'Knowledge of AWS or GCP', 'Strong problem-solving skills'],
 ARRAY['Node.js', 'React', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
 'Engineering', '🏢', 45),

('AI/ML Engineer', 'DataMinds AI', 'Remote', 'Remote', '$140,000 - $200,000',
 'Join our AI team to build cutting-edge machine learning models and deploy them at scale. You will work on natural language processing, computer vision, and predictive analytics projects.',
 ARRAY['MS/PhD in Computer Science or related field', '3+ years of experience in ML/AI', 'Strong Python skills with TensorFlow/PyTorch', 'Experience with LLMs and generative AI', 'Published research is a plus'],
 ARRAY['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision', 'MLOps'],
 'AI/ML', '🤖', 78),

('Backend Developer (Node.js)', 'StartupHub', 'New York, NY', 'Full-time', '$100,000 - $140,000',
 'We need a talented Backend Developer to build scalable APIs and microservices. You will work with Express.js, implement authentication with JWT and Passport.js, and manage databases with Prisma.',
 ARRAY['3+ years of Node.js experience', 'Expert knowledge of Express.js framework', 'Experience with REST APIs and GraphQL', 'Database design with PostgreSQL/MongoDB', 'Understanding of microservices architecture'],
 ARRAY['Node.js', 'Express.js', 'Prisma', 'JWT', 'MongoDB', 'Socket.io'],
 'Engineering', '🚀', 32),

('DevOps Engineer', 'CloudScale Inc', 'Seattle, WA', 'Full-time', '$130,000 - $170,000',
 'Looking for a DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines. Experience with Kubernetes, Docker, and cloud platforms is essential.',
 ARRAY['4+ years of DevOps experience', 'Expertise in AWS/GCP/Azure', 'Strong Kubernetes and Docker skills', 'Experience with Terraform and Ansible', 'CI/CD pipeline management'],
 ARRAY['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'Linux'],
 'DevOps', '☁️', 28),

('Frontend Developer (React)', 'DesignFirst Studio', 'Austin, TX', 'Full-time', '$90,000 - $130,000',
 'Join our creative team to build beautiful and performant user interfaces. You will work closely with designers to implement pixel-perfect designs using React and modern CSS.',
 ARRAY['3+ years of React experience', 'Strong CSS/Tailwind skills', 'Experience with TypeScript', 'Knowledge of state management (Redux/Zustand)', 'Eye for design and UX'],
 ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Figma', 'Jest'],
 'Engineering', '🎨', 56),

('Junior Web Developer', 'CodeAcademy Pro', 'Chicago, IL', 'Internship', '$50,000 - $70,000',
 'Great opportunity for recent graduates to start their career in web development. You will learn modern web technologies including Node.js, Express, and React while working on real projects.',
 ARRAY['Bachelor''s degree in CS or related field', 'Basic knowledge of HTML, CSS, JavaScript', 'Familiarity with React or Vue', 'Eagerness to learn', 'Good communication skills'],
 ARRAY['JavaScript', 'HTML', 'CSS', 'React', 'Git', 'Node.js'],
 'Engineering', '📚', 89);

-- ============================================
-- INDEXES (for performance)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category);
CREATE INDEX IF NOT EXISTS idx_jobs_type ON jobs(type);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_job_id ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_saved_jobs_user_id ON saved_jobs(user_id);
