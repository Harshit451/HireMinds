// Express-style Router implementation
// Demonstrates: Routing methods, Route paths, Route parameters, Route handlers

export interface Request {
  method: string;
  path: string;
  body: any;
  params: Record<string, string>;
  query: Record<string, string>;
  user: any;
}

export interface Response {
  statusCode: number;
  data: any;
  status(code: number): Response;
  json(data: any): Response;
}

type RouteHandler = (req: Request, res: Response) => Promise<void> | void;
type Middleware = (req: Request, res: Response, next: () => void) => void | Promise<void>;

interface Route {
  method: string;
  path: string;
  pattern: RegExp;
  paramNames: string[];
  middlewares: Middleware[];
  handler: RouteHandler;
}

export class Router {
  private routes: Route[] = [];
  private middlewares: Middleware[] = [];

  // Router-level middleware
  use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  // Route registration methods
  get(path: string, ...handlers: (Middleware | RouteHandler)[]) {
    this.register('GET', path, handlers);
  }

  post(path: string, ...handlers: (Middleware | RouteHandler)[]) {
    this.register('POST', path, handlers);
  }

  put(path: string, ...handlers: (Middleware | RouteHandler)[]) {
    this.register('PUT', path, handlers);
  }

  delete(path: string, ...handlers: (Middleware | RouteHandler)[]) {
    this.register('DELETE', path, handlers);
  }

  private register(method: string, path: string, handlers: (Middleware | RouteHandler)[]) {
    // Parse route parameters (e.g., /jobs/:id)
    const paramNames: string[] = [];
    const patternStr = path.replace(/:([^/]+)/g, (_, name) => {
      paramNames.push(name);
      return '([^/]+)';
    });
    const pattern = new RegExp(`^${patternStr}$`);

    const middlewares = handlers.slice(0, -1) as Middleware[];
    const handler = handlers[handlers.length - 1] as RouteHandler;

    this.routes.push({ method, path, pattern, paramNames, middlewares, handler });
  }

  async handle(req: Request, res: Response): Promise<boolean> {
    // Run router-level middlewares
    for (const middleware of this.middlewares) {
      await new Promise<void>((resolve) => {
        middleware(req, res, resolve);
      });
    }

    // Find matching route
    for (const route of this.routes) {
      if (route.method !== req.method) continue;

      const match = req.path.match(route.pattern);
      if (match) {
        // Extract route parameters
        route.paramNames.forEach((name, index) => {
          req.params[name] = match[index + 1];
        });

        // Run route-level middlewares
        for (const middleware of route.middlewares) {
          await new Promise<void>((resolve) => {
            middleware(req, res, resolve);
          });
        }

        // Execute handler
        await route.handler(req, res);
        return true;
      }
    }

    res.status(404).json({ error: 'Route not found' });
    return false;
  }
}
