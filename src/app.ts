import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth';
import { logger } from './utils/logger';
import { errorHandler } from './middlewares';

dotenv.config();

const app = express();
app.use(express.json());

// request logging
app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/auth', authRouter);

import verifyRouter from './routes/verify';
import adminProductsRouter from './routes/adminProducts';

// Public verification endpoint
app.use('/api/v1/verify', verifyRouter);

// Admin product management (protected) — router enforces admin auth
app.use('/api/v1/admin/products', adminProductsRouter);

app.get('/health', (req, res) => {
  logger.info('health check');
  return res.json({ status: 'ok' });
});

// error handler (uses logger internally)
app.use(errorHandler);

export default app;
