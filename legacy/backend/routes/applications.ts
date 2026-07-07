// Applications routes
// Demonstrates: CRUD operations, Authentication middleware

import { Router, Request, Response } from '../router';
import { Applications, Jobs } from '../db';
import { authMiddleware } from '../middleware';

export const applicationsRouter = new Router();

applicationsRouter.use(authMiddleware);

// POST /api/applications - Apply to job
applicationsRouter.post('/', async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'Must be logged in to apply' });
    return;
  }
  
  const { jobId, resume, coverLetter } = req.body;
  
  if (!jobId) {
    res.status(400).json({ error: 'Job ID required' });
    return;
  }
  
  const job = await Jobs.findById(jobId);
  if (!job) {
    res.status(404).json({ error: 'Job not found' });
    return;
  }
  
  // Check if already applied
  const existing = await Applications.findOne({ 
    jobId, 
    userId: req.user.id 
  });
  
  if (existing) {
    res.status(400).json({ error: 'Already applied to this job' });
    return;
  }
  
  const application = await Applications.create({
    jobId,
    userId: req.user.id,
    status: 'pending',
    appliedAt: new Date().toISOString(),
    resume,
    coverLetter
  });
  
  // Update applicant count
  await Jobs.update(jobId, { applicants: (job.applicants || 0) + 1 });
  
  res.status(201).json({ application });
});

// GET /api/applications - Get user's applications
applicationsRouter.get('/', async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'Must be logged in' });
    return;
  }
  
  const applications = await Applications.findAll({ userId: req.user.id });
  res.json({ applications });
});

// GET /api/applications/job/:jobId - Get applications for a job (recruiters)
applicationsRouter.get('/job/:jobId', async (req: Request, res: Response) => {
  if (!req.user || req.user.role !== 'recruiter') {
    res.status(403).json({ error: 'Recruiters only' });
    return;
  }
  
  const applications = await Applications.findAll({ jobId: req.params.jobId });
  res.json({ applications });
});
