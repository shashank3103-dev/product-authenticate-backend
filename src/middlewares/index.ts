import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  // simple JSON error handler for now
  const status = err?.status || 500;
  logger.error(err?.message || 'Internal Server Error', { stack: err?.stack });
  res.status(status).json({ error: err?.message || 'Internal Server Error' });
};
