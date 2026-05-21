// Express-style server running in browser
// Demonstrates: Client-Server Architecture, HTTP Module, Express.js Framework

import { Router, Request, Response } from './router';
import { corsMiddleware, loggerMiddleware, bodyParser, errorHandler } from './middleware';
import { authRouter } from './routes/auth';
import { jobsRouter } from './routes/jobs';
import { applicationsRouter } from './routes/applications';

class ExpressApp {
  private middlewares: ((req: Request, res: Response, next: () => void) => void)[] = [];
  private routers: Map<string, Router> = new Map();

  // Application-level middleware
  use(pathOrMiddleware: string | ((req: Request, res: Response, next: () => void) => void), router?: Router) {
    if (typeof pathOrMiddleware === 'function') {
      this.middlewares.push(pathOrMiddleware);
    } else if (router) {
      this.routers.set(pathOrMiddleware, router);
    }
  }

  // Handle incoming request - demonstrates request handling flow
  async handleRequest(method: string, path: string, body?: any): Promise<Response> {
    const req: Request = { method, path, body, params: {}, query: {}, user: null };
    const res: Response = { 
      statusCode: 200, 
      data: null,
      status(code: number) { this.statusCode = code; return this; },
      json(data: any) { this.data = data; return this; }
    };

    // Parse query string
    const [pathname, queryString] = path.split('?');
    req.path = pathname;
    if (queryString) {
      const params = new URLSearchParams(queryString);
      params.forEach((value, key) => { req.query[key] = value; });
    }

    // Run application-level middlewares
    for (const middleware of this.middlewares) {
      await new Promise<void>((resolve) => {
        middleware(req, res, resolve);
      });
    }

    // Find matching router
    for (const [basePath, router] of this.routers) {
      if (req.path.startsWith(basePath)) {
        const subPath = req.path.slice(basePath.length) || '/';
        req.path = subPath;
        try {
          await router.handle(req, res);
        } catch (error: any) {
          errorHandler(error, req, res);
        }
        return res;
      }
    }

    res.status(404).json({ error: 'Not Found' });
    return res;
  }
}

// Create Express app instance
const app = new ExpressApp();

// Register application-level middleware
app.use(corsMiddleware);
app.use(loggerMiddleware);
app.use(bodyParser);

// Register routers (Router-level middleware pattern)
app.use('/api/auth', authRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/applications', applicationsRouter);

// Export the request handler
export async function handleRequest(method: string, path: string, body?: any): Promise<Response> {
  return app.handleRequest(method, path, body);
}
