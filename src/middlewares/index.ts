import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  // simple JSON error handler for now
  const status = err?.status || 500;
  logger.error(err?.message || 'Internal Server Error', { stack: err?.stack });
  res.status(status).json({ error: err?.message || 'Internal Server Error' });
};

// Basic admin API key middleware — replace with JWT/RBAC later
export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization;
    const adminKey = process.env.ADMIN_API_KEY;
    if (!adminKey || !auth) return res.status(401).json({ error: 'Unauthorized' });
    const parts = auth.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer' || parts[1] !== adminKey) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    return next();
  } catch (err) {
    logger.error('adminAuth error', { err });
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
