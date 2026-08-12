import { Router } from 'express';
import { verify } from '../controllers/verifyController';

const router = Router();

// Public verification: GET /api/v1/verify/:token
router.get('/:token', async (req, res, next) => {
  try {
    await verify(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
