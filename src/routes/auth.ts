import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { registerSchema, loginSchema } from '../schemas/authSchemas';

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    registerSchema.parse(req.body);
    await register(req, res);
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    loginSchema.parse(req.body);
    await login(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
