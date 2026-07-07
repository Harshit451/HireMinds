import { User, Job, Application } from '../types';
import { supabase } from './supabase';

// ============================================
// AUTH API - SUPABASE
// ============================================

export async function apiSignUp(data: {
  name: string;
  email: string;
  password: string;
  role: 'seeker' | 'recruiter';
  company?: string;
}): Promise<{ user: User }> {

  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    throw error;
  }

  const user: User = {
    id: authData.user?.id || crypto.randomUUID(),
    name: data.name,
    email: data.email,
    role: data.role,
    company: data.company,
    createdAt: new Date().toISOString()
  };

  const { error: insertError } = await supabase
    .from('users')
    .insert([{
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company
    }]);

  if (insertError) {
    throw insertError;
  }

  return { user };
}

export async function apiSignIn(
  email: string,
  password: string
): Promise<{ user: User }> {

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .single();

  // FIX: create missing profile automatically
  if (!profile) {

    const fallbackUser: User = {
      id: data.user.id,
      name: data.user.email?.split('@')[0] || 'User',
      email: data.user.email || '',
      role: 'seeker',
      createdAt: new Date().toISOString()
    };

    await supabase.from('users').insert([{
      id: fallbackUser.id,
      name: fallbackUser.name,
      email: fallbackUser.email,
      role: fallbackUser.role
    }]);

    return { user: fallbackUser };
  }

  return {
    user: {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      role: profile.role,
      company: profile.company,
      createdAt: profile.created_at
    }
  };
}

export async function apiSignOut(): Promise<void> {
  await supabase.auth.signOut();
}

export async function apiGetCurrentUser(): Promise<User | null> {

  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) return null;

  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', auth.user.id)
    .single();

  if (!data) return null;

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
    company: data.company,
    createdAt: data.created_at
  };
}

// ============================================
// JOBS API
// ============================================

export async function apiCreateJob(
  job: Omit<Job, 'id' | 'posted' | 'applicants'>
): Promise<Job> {

  const { data, error } = await supabase
    .from('jobs')
    .insert([{
      ...job,
      applicants: 0
    }])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function apiGetJobs(): Promise<Job[]> {

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data.map((job: any) => ({
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.type,
    salary: job.salary,
    description: job.description,
    requirements: job.requirements || [],
    skills: job.skills || [],
    category: job.category,
    logo: job.logo || '🏢',
    applicants: job.applicants || 0,
    posted: new Date(job.created_at).toLocaleDateString()
  }));
}

// ============================================
// APPLICATIONS API
// ============================================

export async function apiApplyToJob(
  jobId: string,
  resume?: string,
  coverLetter?: string
): Promise<Application> {

  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) {
    throw new Error('Must be logged in');
  }

  const { data, error } = await supabase
    .from('applications')
    .insert([{
      job_id: jobId,
      user_id: auth.user.id,
      status: 'pending',
      resume,
      cover_letter: coverLetter
    }])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function apiSaveJob(jobId: string) {

  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) {
    throw new Error('Must be logged in');
  }

  const { error } = await supabase
    .from('saved_jobs')
    .insert([{
      user_id: auth.user.id,
      job_id: jobId
    }]);

  if (error) throw error;
}

export async function apiGetSavedJobs() {

  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) return [];

  const { data, error } = await supabase
    .from('saved_jobs')
    .select(`
      jobs (*)
    `)
    .eq('user_id', auth.user.id);

  if (error) throw error;

  return data;
}