// Express-style middleware
// Demonstrates: Application-level, Router-level, Error-handling middleware

import { Request, Response } from './router';
import { jwtVerify } from './jwt';
import { Users } from './db';

// CORS middleware
export function corsMiddleware(_req: Request, _res: Response, next: () => void) {
  next();
}

// Logger middleware (like Morgan)
export function loggerMiddleware(req: Request, _res: Response, next: () => void) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
}

// Body parser middleware
export function bodyParser(_req: Request, _res: Response, next: () => void) {
  // Body is already parsed in our implementation
  next();
}

// Auth middleware (like Passport.js)
export async function authMiddleware(req: Request, _res: Response, next: () => void) {
  const token = req.body?.token || req.query?.token;
  
  if (!token) {
    next();
    return;
  }

  const payload = jwtVerify(token);
  if (!payload) {
    next();
    return;
  }

  const user = await Users.findById(payload.sub);
  if (user) {
    const { passwordHash, ...safeUser } = user;
    req.user = safeUser;
  }
  
  next();
}

// Role-based access control
export function requireRole(role: string) {
  return (req: Request, res: Response, next: () => void) => {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    if (req.user.role !== role) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    next();
  };
}

// Error handling middleware
export function errorHandler(error: any, _req: Request, res: Response) {
  console.error('Server error:', error);
  res.status(500).json({ 
    error: error.message || 'Internal Server Error' 
  });
}
