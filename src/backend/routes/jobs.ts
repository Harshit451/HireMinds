// Jobs routes
// Demonstrates: CRUD operations, Route parameters, Query handling

import { Router, Request, Response } from '../router';
import { Jobs } from '../db';
import { authMiddleware, requireRole } from '../middleware';

export const jobsRouter = new Router();

// Apply auth middleware to all routes
jobsRouter.use(authMiddleware);

// GET /api/jobs - List all jobs with optional filters
jobsRouter.get('/', async (req: Request, res: Response) => {
  let jobs = await Jobs.findAll();
  
  const { search, type, category, location } = req.query;
  
  if (search) {
    const lower = search.toLowerCase();
    jobs = jobs.filter(job => 
      job.title.toLowerCase().includes(lower) ||
      job.company.toLowerCase().includes(lower) ||
      job.description.toLowerCase().includes(lower) ||
      job.skills.some(s => s.toLowerCase().includes(lower))
    );
  }
  
  if (type && type !== 'all') {
    jobs = jobs.filter(job => job.type === type);
  }
  
  if (category && category !== 'all') {
    jobs = jobs.filter(job => job.category === category);
  }
  
  if (location) {
    const lower = location.toLowerCase();
    jobs = jobs.filter(job => job.location.toLowerCase().includes(lower));
  }
  
  res.json({ jobs });
});

// GET /api/jobs/:id - Get single job
jobsRouter.get('/:id', async (req: Request, res: Response) => {
  const job = await Jobs.findById(req.params.id);
  if (!job) {
    res.status(404).json({ error: 'Job not found' });
    return;
  }
  res.json({ job });
});

// POST /api/jobs - Create job (recruiters only)
jobsRouter.post('/', requireRole('recruiter'), async (req: Request, res: Response) => {
  const { title, company, location, type, salary, description, requirements, skills, category } = req.body;
  
  if (!title || !company || !location || !type || !description) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }
  
  const job = await Jobs.create({
    title,
    company,
    location,
    type,
    salary: salary || 'Competitive',
    description,
    requirements: requirements || [],
    skills: skills || [],
    category: category || 'Engineering',
    posted: 'Just now',
    logo: '🏢',
    recruiterId: req.user.id,
    applicants: 0
  });
  
  res.status(201).json({ job });
});

// PUT /api/jobs/:id - Update job
jobsRouter.put('/:id', requireRole('recruiter'), async (req: Request, res: Response) => {
  const job = await Jobs.findById(req.params.id);
  if (!job) {
    res.status(404).json({ error: 'Job not found' });
    return;
  }
  
  const updated = await Jobs.update(req.params.id, req.body);
  res.json({ job: updated });
});

// DELETE /api/jobs/:id - Delete job
jobsRouter.delete('/:id', requireRole('recruiter'), async (req: Request, res: Response) => {
  const success = await Jobs.deleteById(req.params.id);
  if (!success) {
    res.status(404).json({ error: 'Job not found' });
    return;
  }
  res.json({ success: true });
});
