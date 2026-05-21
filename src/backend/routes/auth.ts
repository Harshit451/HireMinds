// Auth routes
// Demonstrates: Route handlers, Bcrypt, JWT authentication

import { Router, Request, Response } from '../router';
import { Users } from '../db';
import { hashPassword, comparePassword } from '../bcrypt';
import { jwtSign } from '../jwt';

export const authRouter = new Router();

// POST /api/auth/signup
authRouter.post('/signup', async (req: Request, res: Response) => {
  const { name, email, password, role, company } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const existing = await Users.findOne({ email });
  if (existing) {
    res.status(400).json({ error: 'Email already registered' });
    return;
  }

  const passwordHash = await hashPassword(password);
  const user = await Users.create({
    name,
    email,
    role,
    company: company || undefined,
    passwordHash,
    createdAt: new Date().toISOString()
  });

  const { passwordHash: _, ...safeUser } = user;
  const token = jwtSign({ sub: user.id, email: user.email, role: user.role });

  res.json({ user: safeUser, token });
});

// POST /api/auth/signin
authRouter.post('/signin', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password required' });
    return;
  }

  const user = await Users.findOne({ email });
  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const valid = await comparePassword(password, user.passwordHash);
  if (!valid) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const { passwordHash: _, ...safeUser } = user;
  const token = jwtSign({ sub: user.id, email: user.email, role: user.role });

  res.json({ user: safeUser, token });
});

// GET /api/auth/me
authRouter.get('/me', async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  res.json({ user: req.user });
});
